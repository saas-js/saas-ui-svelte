<script lang="ts">
	import { onMount } from "svelte";
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Filler,
	} from "chart.js";
	import { Card } from "@saas-ui/svelte/components/card";
	import { Stat } from "@saas-ui/svelte/components/stat";
	import { Box } from "@saas-ui/svelte/layout/box";

	Chart.register(
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Filler,
	);

	let chartCanvas: HTMLCanvasElement | undefined = $state();
	let chartInstance: Chart | null = null;

	onMount(() => {
		if (!chartCanvas) return;
		const ctx = chartCanvas.getContext("2d");
		if (!ctx) return;

		function getChartColors() {
			const style = getComputedStyle(document.documentElement);
			const isDark = document.documentElement.classList.contains("dark");
			return {
				line: style.getPropertyValue("--color-indigo-600").trim(),
				fill: isDark
					? style.getPropertyValue("--color-indigo-950").trim()
					: style.getPropertyValue("--color-indigo-100").trim(),
				tooltipBg: isDark ? "#18181b" : "white",
				tooltipTitle: isDark ? "#a1a1aa" : "#71717a",
				tooltipBody: isDark ? "#fafafa" : "#18181b",
				tooltipBorder: isDark ? "#3f3f46" : "#e4e4e7",
			};
		}

		function createChart() {
			const colors = getChartColors();
			return new Chart(ctx!, {
				type: "line",
				data: {
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							data: [36.6, 42, 46.8, 55.1, 65.7, 73.2, 95.4],
							borderColor: colors.line,
							backgroundColor: colors.fill,
							borderWidth: 2,
							fill: true,
							tension: 0,
							pointRadius: 0,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					interaction: {
						intersect: false,
						mode: "index",
					},
					plugins: {
						legend: { display: false },
						tooltip: {
							enabled: true,
							backgroundColor: colors.tooltipBg,
							titleColor: colors.tooltipTitle,
							titleFont: { size: 12, weight: "normal" },
							bodyColor: colors.tooltipBody,
							bodyFont: { size: 14, weight: "bold" },
							borderColor: colors.tooltipBorder,
							borderWidth: 1,
							cornerRadius: 8,
							padding: 10,
							boxPadding: 4,
							displayColors: false,
							callbacks: {
								title: () => "Revenue",
								label: (context) => {
									const value = (context.parsed.y ?? 0) * 1000;
									return `${value.toLocaleString()} · ${context.label}`;
								},
							},
						},
					},
					scales: {
						x: { display: false },
						y: { display: false },
					},
				},
			});
		}

		chartInstance = createChart();

		const observer = new MutationObserver(() => {
			if (!chartInstance) return;
			const colors = getChartColors();

			// Update dataset colours
			chartInstance.data.datasets[0].borderColor = colors.line;
			chartInstance.data.datasets[0].backgroundColor = colors.fill;

			// Update tooltip colours
			const tooltip = chartInstance.options.plugins?.tooltip;
			if (tooltip) {
				tooltip.backgroundColor = colors.tooltipBg;
				tooltip.titleColor = colors.tooltipTitle;
				tooltip.bodyColor = colors.tooltipBody;
				tooltip.borderColor = colors.tooltipBorder;
			}

			chartInstance.update("none");
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => {
			observer.disconnect();
			chartInstance?.destroy();
		};
	});
</script>

<Card.Root variant="elevated">
	<Card.Body class="pb-2">
		<Stat.Root>
			<Stat.Label>Revenue</Stat.Label>
			<Stat.ValueText>$12,450</Stat.ValueText>
			<Stat.HelpText>
				<Stat.UpTrend>+$2,345 (23.2%)</Stat.UpTrend>
				vs last month
			</Stat.HelpText>
		</Stat.Root>
	</Card.Body>
	<Box class="w-full h-24">
		<canvas bind:this={chartCanvas}></canvas>
	</Box>
</Card.Root>
