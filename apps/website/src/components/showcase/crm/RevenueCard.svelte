<script lang="ts">
	import { onMount, untrack } from "svelte";
	import {
		Chart,
		BarController,
		BarElement,
		LinearScale,
		CategoryScale,
		Tooltip,
	} from "chart.js";
	import { Card } from "@saas-ui/svelte/components/card";

	Chart.register(
		BarController,
		BarElement,
		LinearScale,
		CategoryScale,
		Tooltip
	);

	interface Props {
		timeRange: string;
	}

	let { timeRange }: Props = $props();

	let canvas: HTMLCanvasElement | undefined = $state();
	let chart: Chart | null = $state(null);
	let totalRevenue = $state("$12,500.00");
	let prevTimeRange = $state("");

	// Data cache for prefetching
	const dataCache = new Map<string, { labels: string[]; data: number[] }>();

	/**
	 * Prefetch and cache data for a time range.
	 * Called on hover to make subsequent switches instant.
	 */
	export function prefetch(range: string) {
		if (!dataCache.has(range)) {
			dataCache.set(range, generateData(range));
		}
	}

	function getOrGenerateData(range: string): { labels: string[]; data: number[] } {
		if (dataCache.has(range)) {
			return dataCache.get(range)!;
		}
		const data = generateData(range);
		dataCache.set(range, data);
		return data;
	}

	function generateData(range: string): { labels: string[]; data: number[] } {
		const seed = range === "year" ? 1 : range === "month" ? 2 : 3;
		const random = (min: number, max: number, i: number) => {
			const x = Math.sin(seed * 100 + i * 50) * 10000;
			return Math.floor(min + (x - Math.floor(x)) * (max - min));
		};

		if (range === "year") {
			return {
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
				data: Array.from({ length: 10 }, (_, i) => {
					const base = 10000 + i * 1200;
					return base + random(-2000, 3000, i);
				}),
			};
		} else if (range === "month") {
			return {
				labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
				data: Array.from({ length: 4 }, (_, i) => {
					const base = 2500 + i * 400;
					return base + random(-500, 800, i);
				}),
			};
		} else {
			return {
				labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				data: Array.from({ length: 7 }, (_, i) => {
					const base = 800 + i * 150;
					return base + random(-200, 400, i);
				}),
			};
		}
	}

	function getChartColors() {
		const style = getComputedStyle(document.documentElement);
		const isDark = document.documentElement.classList.contains("dark");
		return {
			bar: style.getPropertyValue("--color-indigo-600").trim(),
			barHover: style.getPropertyValue("--color-indigo-500").trim(),
			gridColor: isDark
				? "rgba(255, 255, 255, 0.1)"
				: "rgba(0, 0, 0, 0.1)",
			textColor: isDark ? "#a1a1aa" : "#71717a",
			tooltipBg: isDark ? "#18181b" : "white",
			tooltipTitle: isDark ? "#a1a1aa" : "#71717a",
			tooltipBody: isDark ? "#fafafa" : "#18181b",
			tooltipBorder: isDark ? "#3f3f46" : "#e4e4e7",
		};
	}

	$effect(() => {
		const currentRange = timeRange;
		const currentChart = untrack(() => chart);
		const prev = untrack(() => prevTimeRange);

		if (currentChart && prev !== "" && prev !== currentRange) {
			const { labels, data } = getOrGenerateData(currentRange);
			currentChart.data.labels = labels;
			currentChart.data.datasets[0].data = data;
			currentChart.options.animation = {
				duration: 200,
				easing: "easeOutCubic",
			};
			currentChart.update();
			totalRevenue = `$${data[data.length - 1].toLocaleString()}.00`;
		}

		prevTimeRange = currentRange;
	});

	onMount(() => {
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				const colors = getChartColors();
				const { labels, data } = getOrGenerateData(timeRange);
				totalRevenue = `$${data[data.length - 1].toLocaleString()}.00`;
				prevTimeRange = timeRange;

				chart = new Chart(ctx, {
					type: "bar",
					data: {
						labels,
						datasets: [
							{
								data,
								backgroundColor: colors.bar,
								hoverBackgroundColor: colors.barHover,
								borderRadius: 2,
								barThickness: 20,
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						animation: false,
						plugins: {
							legend: { display: false },
							tooltip: {
								backgroundColor: colors.tooltipBg,
								titleColor: colors.tooltipTitle,
								titleFont: { size: 12, weight: "normal" },
								bodyColor: colors.tooltipBody,
								bodyFont: { size: 14, weight: "bold" },
								borderColor: colors.tooltipBorder,
								borderWidth: 1,
								cornerRadius: 8,
								padding: 10,
								displayColors: false,
								callbacks: {
									title: () => "Revenue",
									label: (context) => {
										const value = context.parsed.y ?? 0;
										return `$${value.toLocaleString()}.00`;
									},
								},
							},
						},
						scales: {
							x: {
								grid: { display: false },
								ticks: { color: colors.textColor },
								border: { display: false },
							},
							y: {
								grid: { color: colors.gridColor },
								ticks: {
									color: colors.textColor,
									callback: (value) =>
										`$${Number(value).toLocaleString()}.00`,
								},
								border: { display: false },
							},
						},
					},
				});
			}
		}

		const observer = new MutationObserver(() => {
			const colors = getChartColors();

			if (chart) {
				chart.data.datasets[0].backgroundColor = colors.bar;
				chart.data.datasets[0].hoverBackgroundColor = colors.barHover;
				const tooltip = chart.options.plugins?.tooltip;
				if (tooltip) {
					tooltip.backgroundColor = colors.tooltipBg;
					tooltip.titleColor = colors.tooltipTitle;
					tooltip.bodyColor = colors.tooltipBody;
					tooltip.borderColor = colors.tooltipBorder;
				}
				if (chart.options.scales?.x?.ticks) {
					chart.options.scales.x.ticks.color = colors.textColor;
				}
				if (chart.options.scales?.y) {
					if (chart.options.scales.y.grid) {
						chart.options.scales.y.grid.color = colors.gridColor;
					}
					if (chart.options.scales.y.ticks) {
						chart.options.scales.y.ticks.color = colors.textColor;
					}
				}
				chart.update("none");
			}
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => {
			observer.disconnect();
			chart?.destroy();
		};
	});
</script>

<Card.Root class="bg-bg-default min-w-0 overflow-hidden p-4 xl:col-span-2">
	<Card.Header class="gap-0 p-0 pb-2">
		<Card.Title class="text-fg-muted text-sm font-medium leading-4"
			>Revenue</Card.Title
		>
		<p class="text-base font-medium">{totalRevenue}</p>
	</Card.Header>
	<Card.Body class="h-60 min-w-0 p-0 pt-2">
		<canvas bind:this={canvas} class="min-w-0"></canvas>
	</Card.Body>
</Card.Root>
