<script lang="ts">
	import { Button } from "@saas-ui/svelte/components/button";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { Flex } from "@saas-ui/svelte/layout/flex";
	import { Heading } from "@saas-ui/svelte/typography/heading";
	import { Text } from "@saas-ui/svelte/typography/text";
	import FunnelIcon from "phosphor-svelte/lib/FunnelIcon";
	import { emails, getPreview } from "./emails";

	interface Props {
		selectedId: string | null;
		onSelect: (id: string) => void;
		sidebarOpen: boolean;
		onToggleSidebar: () => void;
	}

	let { selectedId, onSelect, sidebarOpen, onToggleSidebar }: Props = $props();
</script>

<Flex direction="column" class="flex-1 bg-bg-default">
	<!-- Header -->
	<Flex
		justify="between"
		align="center"
		gap={2}
		class="z-10 bg-bg-default shrink-0 h-12 sticky border-b border-border-default top-0 px-3"
	>
		<Heading as="h2" size="xs" weight="medium" class="text-fg-muted">Inbox</Heading>
		<Button variant="ghost" size="sm" icon colour="gray" aria-label="Filter">
			<Icon as={FunnelIcon} size="sm" />
		</Button>
	</Flex>

	<!-- Email list -->
	<Box class="flex-1 overflow-y-auto p-2">
		{#each emails as email}
			<button
				type="button"
				class="appearance-none cursor-pointer w-full text-left mb-1 px-2.5 py-1.5 rounded transition-colors duration-150 hover:bg-bg-subtle focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-indigo-600 {selectedId ===
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
					<Text size="xs" class="text-[.675rem] text-fg-muted shrink-0">{email.date}</Text>
				</Flex>
				<Text size="xs" class="text-fg-emphasized mt-0.5">{email.subject}</Text>
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
