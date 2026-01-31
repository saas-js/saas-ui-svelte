<script lang="ts">
	import { SegmentGroup } from "@saas-ui/svelte/components/segment-group";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { Flex } from "@saas-ui/svelte/layout/flex";
	import { Heading } from "@saas-ui/svelte/typography/heading";

	interface Props {
		timeRange: string;
		onTimeRangeChange: (value: string) => void;
		sidebarOpen: boolean;
		onToggleSidebar: () => void;
		onPrefetch?: (value: string) => void;
	}

	let { timeRange, onTimeRangeChange, sidebarOpen, onToggleSidebar, onPrefetch }: Props =
		$props();
</script>

<header
	class="bg-gray-50/50 dark:bg-gray-900/50 border-border-default grid shrink-0 grid-cols-[auto_max-content_1fr] items-center gap-x-2 border-b px-3 [grid-template-areas:'nav_heading_actions'] grid-rows-[minmax(40px,auto)]"
>
	{#if !sidebarOpen}
		<button
			type="button"
			class="hover:bg-bg-emphasized inline-flex h-8 min-w-8 shrink-0 cursor-pointer items-center justify-center rounded transition-colors duration-150 [grid-area:nav] focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-fg-muted"
			aria-label="Open sidebar"
			onclick={onToggleSidebar}
		>
			<svg
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke-linecap="round"
				stroke-linejoin="round"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 shrink-0 fill-none stroke-current"
			>
				<rect width="18" height="18" x="3" y="3" rx="2"></rect>
				<path d="M9 3v18"></path>
				<path d="m14 9 3 3-3 3"></path>
			</svg>
		</button>
	{/if}
	<Box class="[grid-area:heading]">
		<Heading as="h2" size="xs" weight="medium" class="mr-4">
			Reports
		</Heading>
	</Box>
	<Flex
		inline
		align="center"
		gap={2}
		class="isolate relative [grid-area:actions] [justify-content:end]"
	>
		<SegmentGroup.Root
			value={timeRange}
			onValueChange={(e) => onTimeRangeChange(e.value ?? "year")}
			onPrefetch={onPrefetch}
			size="xs"
		>
			<SegmentGroup.Item value="year">Last year</SegmentGroup.Item>
			<SegmentGroup.Item value="month">Last month</SegmentGroup.Item>
			<SegmentGroup.Item value="week">Last 7 days</SegmentGroup.Item>
			<SegmentGroup.Indicator />
		</SegmentGroup.Root>
	</Flex>
</header>
