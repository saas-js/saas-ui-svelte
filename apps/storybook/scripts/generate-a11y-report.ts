/**
 * Run accessibility tests and catch JS errors on all stories in parallel.
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

interface StoryResult {
	storyId: string;
	component: string;
	story: string;
	status: "success" | "error" | "warning";
	violations: number;
	passes: number;
	incomplete: number;
	jsErrors: string[];
	pageError?: string;
}

async function main() {
	console.log(
		`Testing ${IS_DEV ? "dev server" : "static build"} at ${BASE_URL}`
	);

	// Load stories
	let stories: Story[];
	try {
		const indexPath = path.resolve("storybook-static/index.json");
		const content = IS_DEV
			? await fetch(`${BASE_URL}/index.json`).then((r) => r.json())
			: JSON.parse(fs.readFileSync(indexPath, "utf-8"));
		stories = Object.values(
			content.entries as Record<string, Story>
		).filter((s) => s.type === "story");
	} catch {
		console.error(
			"Could not load index.json. Ensure Storybook is built or running."
		);
		process.exit(1);
	}

	console.log(`Found ${stories.length} stories (${CONCURRENCY} parallel)\n`);

	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext();
	const limit = pLimit(CONCURRENCY);
	const report: { generatedAt: string; stories: Record<string, StoryResult> } =
		{
			generatedAt: new Date().toISOString(),
			stories: {},
		};

	let completed = 0;
	let passed = 0;
	let failed = 0;
	let warnings = 0;
	const total = stories.length;
	const start = Date.now();
	const failedStories: { id: string; errors: string[] }[] = [];

	await Promise.all(
		stories.map((story) =>
			limit(async () => {
				const page = await context.newPage();
				const url = `${IFRAME_URL}?id=${story.id}&viewMode=story`;

				// Collect JS errors
				const jsErrors: string[] = [];
				let pageError: string | undefined;

				// Listen for console errors
				page.on("console", (msg) => {
					if (msg.type() === "error") {
						jsErrors.push(msg.text());
					}
				});

				// Listen for page errors (uncaught exceptions)
				page.on("pageerror", (error) => {
					jsErrors.push(`Uncaught: ${error.message}`);
				});

				try {
					const response = await page.goto(url, {
						waitUntil: "domcontentloaded",
						timeout: 30000,
					});

					// Check for HTTP errors
					if (response && !response.ok()) {
						pageError = `HTTP ${response.status()}: ${response.statusText()}`;
					}

					// Wait a bit for any async errors to appear
					await page.waitForTimeout(500);

					// Run accessibility tests
					const results = await new AxeBuilder({ page })
						.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
						.analyze();

					// Determine status based on both a11y violations AND JS errors
					const hasA11yViolations = results.violations.length > 0;
					const hasJsErrors = jsErrors.length > 0;
					const hasPageError = !!pageError;

					let status: "success" | "error" | "warning";
					if (hasA11yViolations || hasJsErrors || hasPageError) {
						status = "error";
						failed++;
						failedStories.push({
							id: story.id,
							errors: [
								...(hasPageError ? [pageError] : []),
								...jsErrors,
								...(hasA11yViolations
									? [`${results.violations.length} a11y violations`]
									: []),
							],
						});
					} else {
						status = "success";
						passed++;
					}

					report.stories[story.id] = {
						storyId: story.id,
						component: story.title.split("/").pop() ?? story.title,
						story: story.name,
						status,
						violations: results.violations.length,
						passes: results.passes.length,
						incomplete: results.incomplete.length,
						jsErrors,
						pageError,
					};
				} catch (error) {
					// Page failed to load or test crashed
					const errorMsg =
						error instanceof Error ? error.message : String(error);
					warnings++;
					failedStories.push({
						id: story.id,
						errors: [`Test failed: ${errorMsg}`],
					});

					report.stories[story.id] = {
						storyId: story.id,
						component: story.title.split("/").pop() ?? story.title,
						story: story.name,
						status: "warning",
						violations: -1,
						passes: 0,
						incomplete: 0,
						jsErrors,
						pageError: errorMsg,
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

	console.log(
		`\nPassed: ${passed} | Failed: ${failed} | Warnings: ${warnings} | Total: ${total}`
	);

	// Print failed stories summary
	if (failedStories.length > 0) {
		console.log(`\n${"=".repeat(60)}`);
		console.log(`FAILED STORIES (${failedStories.length}):`);
		console.log(`${"=".repeat(60)}`);
		for (const story of failedStories) {
			console.log(`\n${story.id}:`);
			for (const error of story.errors) {
				console.log(`  - ${error}`);
			}
		}
	}

	// Exit with error code if any failures
	if (failed > 0 || warnings > 0) {
		process.exit(1);
	}
}

main().catch(console.error);
