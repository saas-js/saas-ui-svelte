<script lang="ts">
	import CRMSidebar from "./CRMSidebar.svelte";
	import CRMHeader from "./CRMHeader.svelte";
	import RevenueCard from "./RevenueCard.svelte";
	import CustomerMetricsCard from "./CustomerMetricsCard.svelte";
	import { Flex } from "@saas-ui/svelte/layout/flex";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { Grid } from "@saas-ui/svelte/layout/grid";

	let timeRange = $state("year");
	let sidebarOpen = $state(true);

	// Refs to chart components for prefetching
	let revenueCard: ReturnType<typeof RevenueCard>;
	let customerMetricsCard: ReturnType<typeof CustomerMetricsCard>;

	function handlePrefetch(value: string) {
		revenueCard?.prefetch?.(value);
		customerMetricsCard?.prefetch?.(value);
	}
</script>

<Flex
	class="border-border-default bg-bg-muted w-full max-w-360 overflow-hidden rounded-md border xl:max-w-400"
>
	<CRMSidebar
		open={sidebarOpen}
		onToggle={() => (sidebarOpen = !sidebarOpen)}
	/>

	<Flex direction="column" class="flex-1 overflow-hidden">
		<CRMHeader
			{timeRange}
			onTimeRangeChange={(value) => (timeRange = value)}
			{sidebarOpen}
			onToggleSidebar={() => (sidebarOpen = !sidebarOpen)}
			onPrefetch={handlePrefetch}
		/>

		<Box
			as="main"
			class="flex-1 overflow-auto bg-gray-50/50 p-4 dark:bg-gray-900/50"
		>
			<Grid gap={4} class="xl:grid-cols-3">
				<RevenueCard bind:this={revenueCard} {timeRange} />
				<CustomerMetricsCard
					bind:this={customerMetricsCard}
					{timeRange}
				/>
			</Grid>
		</Box>
	</Flex>
</Flex>
