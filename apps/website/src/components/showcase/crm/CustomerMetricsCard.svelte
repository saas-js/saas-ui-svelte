<script lang="ts">
	import { onMount, untrack } from "svelte";
	import {
		Chart,
		ArcElement,
		DoughnutController,
		Tooltip,
	} from "chart.js";
	import { Card } from "@saas-ui/svelte/components/card";
	import { DataList } from "@saas-ui/svelte/components/data-list";

	Chart.register(ArcElement, DoughnutController, Tooltip);

	interface Props {
		timeRange: string;
	}

	let { timeRange }: Props = $props();

	let canvas: HTMLCanvasElement | undefined = $state();
	let chart: Chart | null = $state(null);
	let prevTimeRange = $state("");

	let metrics = $state({
		acquisitionCost: "$233.00",
		lifetimeValue: "$893.00",
		churnRate: "4.5%",
		retentionRate: "95.5%",
		churnByTier: { starter: 7, pro: 4, enterprise: 2.5 },
		pieData: [70, 40, 25],
	});

	function generateData(range: string) {
		const seed = range === "year" ? 1 : range === "month" ? 2 : 3;
		const random = (min: number, max: number, i: number) => {
			const x = Math.sin(seed * 100 + i * 50) * 10000;
			return min + (x - Math.floor(x)) * (max - min);
		};

		const starter = 5 + random(0, 4, 1);
		const pro = 2 + random(0, 3, 2);
		const enterprise = 1 + random(0, 2, 3);

		const total = starter + pro + enterprise;
		const churnRate = (total / 3).toFixed(1);
		const retentionRate = (100 - parseFloat(churnRate)).toFixed(1);

		return {
			acquisitionCost: `$${Math.floor(180 + random(0, 100, 4))}.00`,
			lifetimeValue: `$${Math.floor(750 + random(0, 300, 5))}.00`,
			churnRate: `${churnRate}%`,
			retentionRate: `${retentionRate}%`,
			churnByTier: {
				starter: parseFloat(starter.toFixed(1)),
				pro: parseFloat(pro.toFixed(1)),
				enterprise: parseFloat(enterprise.toFixed(1)),
			},
			pieData: [
				Math.round(starter * 10),
				Math.round(pro * 10),
				Math.round(enterprise * 10),
			],
		};
	}

	function getChartColors() {
		const style = getComputedStyle(document.documentElement);
		const isDark = document.documentElement.classList.contains("dark");
		return {
			tooltipBg: isDark ? "#18181b" : "white",
			tooltipTitle: isDark ? "#a1a1aa" : "#71717a",
			tooltipBody: isDark ? "#fafafa" : "#18181b",
			tooltipBorder: isDark ? "#3f3f46" : "#e4e4e7",
			pieColors: [
				style.getPropertyValue("--color-indigo-600").trim(),
				style.getPropertyValue("--color-pink-600").trim(),
				isDark
					? style.getPropertyValue("--color-gray-100").trim()
					: style.getPropertyValue("--color-gray-900").trim(),
			],
		};
	}

	$effect(() => {
		const currentRange = timeRange;
		const currentChart = untrack(() => chart);
		const prev = untrack(() => prevTimeRange);

		if (currentChart && prev !== "" && prev !== currentRange) {
			const data = generateData(currentRange);
			metrics = data;
			currentChart.data.datasets[0].data = data.pieData;

			const tooltip = currentChart.options.plugins?.tooltip;
			if (tooltip && tooltip.callbacks) {
				tooltip.callbacks.label = (context) => {
					const percentages = [data.churnByTier.starter, data.churnByTier.pro, data.churnByTier.enterprise];
					return `${context.label}: ${percentages[context.dataIndex]}%`;
				};
			}

			currentChart.options.animation = {
				duration: 200,
				easing: "easeOutCubic",
			};
			currentChart.update();
		}

		prevTimeRange = currentRange;
	});

	onMount(() => {
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				const colors = getChartColors();
				const data = generateData(timeRange);
				metrics = data;
				prevTimeRange = timeRange;

				chart = new Chart(ctx, {
					type: "doughnut",
					data: {
						labels: ["Starter", "Pro", "Enterprise"],
						datasets: [
							{
								data: data.pieData,
								backgroundColor: colors.pieColors,
								borderWidth: 0,
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						animation: false,
						cutout: "70%",
						plugins: {
							legend: { display: false },
							tooltip: {
								backgroundColor: colors.tooltipBg,
								titleColor: colors.tooltipTitle,
								bodyColor: colors.tooltipBody,
								borderColor: colors.tooltipBorder,
								borderWidth: 1,
								cornerRadius: 8,
								padding: 10,
								callbacks: {
									label: (context) => {
										const percentages = [data.churnByTier.starter, data.churnByTier.pro, data.churnByTier.enterprise];
										return `${context.label}: ${percentages[context.dataIndex]}%`;
									},
								},
							},
						},
					},
				});
			}
		}

		const observer = new MutationObserver(() => {
			const colors = getChartColors();

			if (chart) {
				chart.data.datasets[0].backgroundColor = colors.pieColors;
				const tooltip = chart.options.plugins?.tooltip;
				if (tooltip) {
					tooltip.backgroundColor = colors.tooltipBg;
					tooltip.titleColor = colors.tooltipTitle;
					tooltip.bodyColor = colors.tooltipBody;
					tooltip.borderColor = colors.tooltipBorder;
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

<Card.Root class="bg-bg-default min-w-0 overflow-hidden p-4 xl:col-span-1">
	<Card.Header class="gap-0 p-0 pb-2">
		<Card.Title class="text-fg-muted text-[.8125rem] font-medium leading-4"
			>Customer metrics</Card.Title
		>
	</Card.Header>
	<Card.Body class="p-0 pt-2">
		<DataList.Root
			orientation="vertical"
			class="grid grid-cols-2 gap-x-4 gap-y-4"
		>
			<DataList.Item class="min-w-0 gap-1 text-xs leading-[1.1375rem]">
				<DataList.ItemLabel class="truncate"
					>Acquisition cost</DataList.ItemLabel
				>
				<DataList.ItemValue class="text-base font-medium"
					>{metrics.acquisitionCost}</DataList.ItemValue
				>
			</DataList.Item>
			<DataList.Item class="min-w-0 gap-1 text-xs leading-[1.1375rem]">
				<DataList.ItemLabel class="truncate">Lifetime value</DataList.ItemLabel>
				<DataList.ItemValue class="text-base font-medium"
					>{metrics.lifetimeValue}</DataList.ItemValue
				>
			</DataList.Item>
			<DataList.Item class="min-w-0 gap-1 text-xs leading-[1.1375rem]">
				<DataList.ItemLabel class="truncate">Churn rate</DataList.ItemLabel>
				<DataList.ItemValue class="text-base font-medium"
					>{metrics.churnRate}</DataList.ItemValue
				>
			</DataList.Item>
			<DataList.Item class="min-w-0 gap-1 text-xs leading-[1.1375rem]">
				<DataList.ItemLabel class="truncate">Retention rate</DataList.ItemLabel>
				<DataList.ItemValue class="text-base font-medium"
					>{metrics.retentionRate}</DataList.ItemValue
				>
			</DataList.Item>
			<DataList.Item class="col-span-2 gap-1 text-xs leading-[1.1375rem]">
				<DataList.ItemLabel>Churn by tier</DataList.ItemLabel>
				<DataList.ItemValue class="flex min-w-0 items-center gap-4 overflow-hidden">
					<div class="h-25 w-25 shrink-0">
						<canvas bind:this={canvas}></canvas>
					</div>
					<ul class="flex min-w-0 flex-col overflow-hidden text-xs">
						<li class="flex items-center gap-2 whitespace-nowrap">
							<span
								class="inline-block h-2 w-2 shrink-0 rounded-full bg-indigo-600"
							></span>
							Starter: {metrics.churnByTier.starter}%
						</li>
						<li class="flex items-center gap-2 whitespace-nowrap">
							<span
								class="inline-block h-2 w-2 shrink-0 rounded-full bg-pink-600"
							></span>
							Pro: {metrics.churnByTier.pro}%
						</li>
						<li class="flex items-center gap-2 whitespace-nowrap">
							<span
								class="inline-block h-2 w-2 shrink-0 rounded-full bg-gray-900 dark:bg-gray-100"
							></span>
							Enterprise: {metrics.churnByTier.enterprise}%
						</li>
					</ul>
				</DataList.ItemValue>
			</DataList.Item>
		</DataList.Root>
	</Card.Body>
</Card.Root>
