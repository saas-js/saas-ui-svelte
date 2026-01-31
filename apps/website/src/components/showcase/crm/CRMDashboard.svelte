<script lang="ts">
import CRMSidebar from "./CRMSidebar.svelte";
import CRMHeader from "./CRMHeader.svelte";
import RevenueCard from "./RevenueCard.svelte";
import CustomerMetricsCard from "./CustomerMetricsCard.svelte";

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

<div
	class="border-border-default bg-bg-muted flex w-full max-w-360 overflow-hidden rounded-md border xl:max-w-400"
>
	<CRMSidebar
		open={sidebarOpen}
		onToggle={() => (sidebarOpen = !sidebarOpen)}
	/>

	<div class="flex flex-1 flex-col overflow-hidden">
		<CRMHeader
			timeRange={timeRange}
			onTimeRangeChange={(value) => (timeRange = value)}
			sidebarOpen={sidebarOpen}
			onToggleSidebar={() => (sidebarOpen = !sidebarOpen)}
			onPrefetch={handlePrefetch}
		/>

		<main
			class="flex-1 overflow-auto bg-gray-50/50 p-4 dark:bg-gray-900/50"
		>
			<div class="grid gap-4 xl:grid-cols-3">
				<RevenueCard bind:this={revenueCard} timeRange={timeRange} />
				<CustomerMetricsCard bind:this={customerMetricsCard} timeRange={timeRange} />
			</div>
		</main>
	</div>
</div>
