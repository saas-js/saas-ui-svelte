/**
 * Run axe accessibility tests on all stories in parallel.
 * Usage: npm run a11y-report (static build) or npm run a11y-report:dev (dev server)
 */

import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import pLimit from "p-limit";
import fs from "node:fs";
import path from "node:path";

const IS_DEV = process.argv.includes("--dev");
const BASE_URL = IS_DEV
    ? "http://localhost:6006"
    : `file://${path.resolve("storybook-static")}`;
const IFRAME_URL = `${BASE_URL}/iframe.html`;
const CONCURRENCY = 4;

interface Story {
    id: string;
    title: string;
    name: string;
    type: string;
}

async function main() {
    console.log(`Testing ${IS_DEV ? "dev server" : "static build"} at ${BASE_URL}`);

    // Load stories
    let stories: Story[];
    try {
        const indexPath = path.resolve("storybook-static/index.json");
        const content = IS_DEV
            ? await fetch(`${BASE_URL}/index.json`).then((r) => r.json())
            : JSON.parse(fs.readFileSync(indexPath, "utf-8"));
        stories = Object.values(content.entries as Record<string, Story>).filter(
            (s) => s.type === "story"
        );
    } catch {
        console.error("Could not load index.json. Ensure Storybook is built or running.");
        process.exit(1);
    }

    console.log(`Found ${stories.length} stories (${CONCURRENCY} parallel)\n`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const limit = pLimit(CONCURRENCY);
    const report: { generatedAt: string; stories: Record<string, unknown> } = {
        generatedAt: new Date().toISOString(),
        stories: {},
    };

    let completed = 0;
    let passed = 0;
    let failed = 0;
    const total = stories.length;
    const start = Date.now();

    await Promise.all(
        stories.map((story) =>
            limit(async () => {
                const page = await context.newPage();
                const url = `${IFRAME_URL}?id=${story.id}&viewMode=story`;

                try {
                    await page.goto(url, { waitUntil: "domcontentloaded" });
                    const results = await new AxeBuilder({ page })
                        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
                        .analyze();

                    const status = results.violations.length === 0 ? "success" : "error";
                    report.stories[story.id] = {
                        storyId: story.id,
                        component: story.title.split("/").pop(),
                        story: story.name,
                        status,
                        violations: results.violations.length,
                        passes: results.passes.length,
                        incomplete: results.incomplete.length,
                    };

                    if (status === "success") {
                        passed++;
                    } else {
                        failed++;
                    }
                } catch {
                    report.stories[story.id] = {
                        storyId: story.id,
                        component: story.title.split("/").pop(),
                        story: story.name,
                        status: "warning",
                        violations: -1,
                        passes: 0,
                        incomplete: 0,
                    };
                } finally {
                    await page.close();
                    completed++;
                    process.stdout.write(`\rProgress: ${completed}/${total}`);
                }
            })
        )
    );

    const duration = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\nCompleted in ${duration}s\n`);

    await browser.close();

    // Write reports
    const outputPaths = ["a11y-report.json", "../website/public/a11y-report.json"];
    for (const p of outputPaths) {
        const fullPath = path.resolve(p);
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, JSON.stringify(report, null, 2));
        console.log(`Report: ${fullPath}`);
    }

    console.log(`\nPassed: ${passed} | Failed: ${failed} | Total: ${total}`);
}

main().catch(console.error);
