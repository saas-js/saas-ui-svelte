/**
 * Run accessibility tests and catch JS errors on all stories in parallel.
 * Usage: npm run a11y-report (static build) or npm run a11y-report:dev (dev server)
 */

import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import pLimit from "p-limit";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const IS_DEV = process.argv.includes("--dev");
const STATIC_PORT = 6007;
const BASE_URL = IS_DEV ? "http://localhost:6006" : `http://localhost:${STATIC_PORT}`;
const IFRAME_URL = `${BASE_URL}/iframe.html`;
const CONCURRENCY = 4;

// Simple static file server for testing the build
function createStaticServer(dir: string, port: number): Promise<http.Server> {
	return new Promise((resolve, reject) => {
		const mimeTypes: Record<string, string> = {
			".html": "text/html",
			".js": "application/javascript",
			".css": "text/css",
			".json": "application/json",
			".png": "image/png",
			".jpg": "image/jpeg",
			".svg": "image/svg+xml",
			".woff": "font/woff",
			".woff2": "font/woff2",
		};

		const server = http.createServer((req, res) => {
			let filePath = path.join(dir, req.url === "/" ? "index.html" : req.url || "");
			// Remove query string
			filePath = filePath.split("?")[0];

			const ext = path.extname(filePath);
			const contentType = mimeTypes[ext] || "application/octet-stream";

			fs.readFile(filePath, (err, content) => {
				if (err) {
					if (err.code === "ENOENT") {
						res.writeHead(404);
						res.end("Not found");
					} else {
						res.writeHead(500);
						res.end("Server error");
					}
				} else {
					res.writeHead(200, { "Content-Type": contentType });
					res.end(content);
				}
			});
		});

		server.on("error", reject);
		server.listen(port, () => resolve(server));
	});
}

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
	let server: http.Server | null = null;

	// Start static server if not using dev mode
	if (!IS_DEV) {
		const staticDir = path.resolve("storybook-static");
		if (!fs.existsSync(staticDir)) {
			console.error("storybook-static directory not found. Run build first.");
			process.exit(1);
		}
		server = await createStaticServer(staticDir, STATIC_PORT);
	}

	console.log(
		`Testing ${IS_DEV ? "dev server" : "static build"} at ${BASE_URL}`
	);

	// Load stories
	let stories: Story[];
	try {
		const content = await fetch(`${BASE_URL}/index.json`).then((r) => r.json());
		stories = Object.values(
			content.entries as Record<string, Story>
		).filter((s) => s.type === "story");
	} catch {
		console.error(
			"Could not load index.json. Ensure Storybook is built or running."
		);
		server?.close();
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

				// Listen for console errors (ignore resource loading errors)
				page.on("console", (msg) => {
					if (msg.type() === "error") {
						const text = msg.text();
						// Skip resource loading errors (fonts, images, etc.)
						if (!text.includes("Failed to load resource")) {
							jsErrors.push(text);
						}
					}
				});

				// Listen for page errors (uncaught exceptions)
				// Ignore errors that are side effects of resource loading failures
				page.on("pageerror", (error) => {
					const msg = error.message;
					if (!msg.includes("Cannot read properties of undefined")) {
						jsErrors.push(`Uncaught: ${msg}`);
					}
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
								...(pageError ? [pageError] : []),
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

	// Clean up server
	server?.close();

	// Exit with error code if any failures
	if (failed > 0 || warnings > 0) {
		process.exit(1);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
