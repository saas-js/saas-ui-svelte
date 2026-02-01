<script lang="ts">
	import { Button } from "@saas-ui/svelte/components/button";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Kbd } from "@saas-ui/svelte/components/kbd";
	import { Tooltip } from "@saas-ui/svelte/components/tooltip";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { Flex } from "@saas-ui/svelte/layout/flex";
	import { Heading } from "@saas-ui/svelte/typography/heading";
	import { Text } from "@saas-ui/svelte/typography/text";
	import FunnelIcon from "phosphor-svelte/lib/FunnelIcon";
	import ArrowsClockwiseIcon from "phosphor-svelte/lib/ArrowsClockwiseIcon";
	import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
	import { emails, getPreview } from "./emails";

	interface Props {
		selectedId: string | null;
		onSelect: (id: string) => void;
		sidebarOpen: boolean;
		onToggleSidebar: () => void;
	}

	let { selectedId, onSelect, sidebarOpen, onToggleSidebar }: Props =
		$props();
</script>

<Flex direction="column" class="bg-bg-default flex-1">
	<!-- Header -->
	<Flex
		align="center"
		gap={2}
		class="bg-bg-default border-border-default sticky top-0 z-10 h-12 shrink-0 border-b px-3"
	>
		<!-- Search input -->
		<Flex align="center" class="relative flex-1">
			<Flex
				align="center"
				justify="center"
				class="text-fg-muted pointer-events-none absolute z-2 h-full px-2.5 text-[.8125rem]"
			>
				<Icon as={MagnifyingGlassIcon} size="xs" />
			</Flex>
			<input
				placeholder="Search inbox"
				class="border-border-default bg-bg-default hover:border-border-emphasized h-7 w-full min-w-7 appearance-none rounded border pr-10 pl-7 text-[.8125rem] leading-[1.1375rem] outline-0 focus-visible:border-indigo-600 focus-visible:outline-indigo-600 focus-visible:outline-solid hover:focus-visible:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
			/>
			<Flex
				align="center"
				justify="center"
				class="absolute right-0 z-2 h-full px-2 text-[.8125rem]"
			>
				<Kbd keys={["command"]} colour="indigo">K</Kbd>
			</Flex>
		</Flex>
		<Tooltip content="Refresh">
			<Button
				variant="ghost"
				size="sm"
				icon
				colour="gray"
				aria-label="Refresh"
			>
				<Icon as={ArrowsClockwiseIcon} size="sm" />
			</Button>
		</Tooltip>
		<Tooltip content="Filter">
			<Button
				variant="ghost"
				size="sm"
				icon
				colour="gray"
				aria-label="Filter"
			>
				<Icon as={FunnelIcon} size="sm" />
			</Button>
		</Tooltip>
	</Flex>

	<!-- Email list -->
	<Box class="flex-1 overflow-y-auto p-2">
		{#each emails as email}
			<button
				type="button"
				class="hover:bg-bg-subtle mb-1 w-full cursor-pointer appearance-none rounded px-2.5 py-1.5 text-left transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-indigo-600 focus-visible:outline-solid {selectedId ===
				email.id
					? 'bg-bg-subtle'
					: ''}"
				onclick={() => onSelect(email.id)}
			>
				<Flex justify="between" align="center" gap={2} class="w-full">
					<Heading
						as="h4"
						size="xs"
						weight="medium"
						class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
					>
						{email.from}
					</Heading>
					<Text
						size="xs"
						class="text-fg-muted shrink-0 text-[.675rem]"
						>{email.date}</Text
					>
				</Flex>
				<Text size="xs" class="text-fg-emphasized mt-0.5"
					>{email.subject}</Text
				>
				<Text
					size="xs"
					class="text-fg-muted mt-0.5 overflow-hidden"
					style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
				>
					{getPreview(email.content)}
				</Text>
			</button>
		{/each}
	</Box>
</Flex>
