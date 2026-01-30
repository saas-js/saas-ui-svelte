<script lang="ts">
import CRMSidebar from "./CRMSidebar.svelte";
import CRMHeader from "./CRMHeader.svelte";
import RevenueCard from "./RevenueCard.svelte";
import CustomerMetricsCard from "./CustomerMetricsCard.svelte";

let timeRange = $state("year");
let sidebarOpen = $state(true);
</script>

<div
	class="border-border-default bg-bg-muted flex w-full max-w-360 overflow-hidden rounded-md border"
>
	<CRMSidebar
		open={sidebarOpen}
		onToggle={() => (sidebarOpen = !sidebarOpen)}
	/>

	<div class="flex flex-1 flex-col">
		<div
			class="bg-bg-default flex h-full flex-col overflow-hidden {sidebarOpen
				? 'md:border-border-default md:my-2 md:mr-2 md:rounded-md md:border'
				: ''}"
		>
			<CRMHeader
				timeRange={timeRange}
				onTimeRangeChange={(value) => (timeRange = value)}
				sidebarOpen={sidebarOpen}
				onToggleSidebar={() => (sidebarOpen = !sidebarOpen)}
			/>

			<main
				class="flex-1 overflow-auto bg-gray-50/50 p-4 dark:bg-gray-900/50"
			>
				<div class="grid gap-4 xl:grid-cols-3">
					<RevenueCard timeRange={timeRange} />
					<CustomerMetricsCard timeRange={timeRange} />
				</div>
			</main>
		</div>
	</div>
</div>
