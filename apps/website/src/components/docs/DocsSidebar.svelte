<script lang="ts">
	import { Link } from "@saas-ui/svelte/components/link";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { VStack, HStack } from "@saas-ui/svelte/layout/stack";
	import { Heading } from "@saas-ui/svelte/typography/heading";

	interface NavItem {
		label: string;
		href?: string;
	}

	interface NavGroup {
		title: string;
		items: NavItem[];
	}

	interface Props {
		groups: NavGroup[];
		currentPath?: string;
	}

	let { groups, currentPath = "" }: Props = $props();

	function isActive(href: string | undefined): boolean {
		if (!href) return false;
		return currentPath === href;
	}

	// Helper to insert spaces before capital letters (e.g. "ActionLabel" -> "Action Label")
	function formatLabel(label: string): string {
		return label.replace(/([a-z])([A-Z])/g, "$1 $2");
	}
</script>

<Box
	as="nav"
	aria-label="Documentation sections"
	class="flex flex-1 flex-col gap-0 px-5 py-8 text-sm"
>
	{#each groups as group}
		<VStack gap={0} class="relative my-3">
			<HStack gap={1} class="h-6 rounded-md text-xs">
				<Heading
					as="h5"
					size="xs"
					class="text-fg-default flex flex-1 items-center px-2 font-medium"
				>
					{group.title}
				</Heading>
			</HStack>
			<VStack gap={0} class="pt-1">
				{#each group.items as item}
					{#if item.href}
						<Box
							class="relative py-px text-[.8125rem] leading-[1.1375rem]"
						>
							<Link
								href={item.href}
								class="relative isolate flex h-7 w-full cursor-pointer items-center gap-2 overflow-hidden rounded px-2 font-medium text-ellipsis whitespace-nowrap transition-colors duration-150 outline-none focus-visible:z-10 {isActive(
									item.href,
								)
									? 'text-fg-default bg-bg-subtle'
									: 'text-fg-muted hover:bg-bg-subtle hover:text-fg-default'}"
							>
								{formatLabel(item.label)}
							</Link>
						</Box>
					{/if}
				{/each}
			</VStack>
		</VStack>
	{/each}
</Box>
