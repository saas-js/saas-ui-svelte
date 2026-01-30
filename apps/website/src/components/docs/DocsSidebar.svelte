<script lang="ts">
	import { Collapsible } from "@saas-ui/svelte/components/collapsible";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Link } from "@saas-ui/svelte/components/link";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { VStack, HStack } from "@saas-ui/svelte/layout/stack";
	import { Heading } from "@saas-ui/svelte/typography/heading";
	import CaretRight from "phosphor-svelte/lib/CaretRightIcon";

	interface NavItem {
		label: string;
		href?: string;
		children?: NavItem[];
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

	function hasActiveChild(items: NavItem[]): boolean {
		return items.some(
			(item) =>
				isActive(item.href) ||
				(item.children && hasActiveChild(item.children)),
		);
	}

	// Helper to insert spaces before capital letters (e.g. "ActionLabel" -> "Action Label")
	function formatLabel(label: string): string {
		return label.replace(/([a-z])([A-Z])/g, "$1 $2");
	}
</script>

<Box
	as="nav"
	class="flex flex-col flex-1 px-4 py-8 overflow-y-auto text-sm gap-0"
>
	{#each groups as group}
		<VStack gap={0} class="relative my-3">
			<HStack gap={1} class="h-6 text-xs rounded-md">
				<Heading
					as="h5"
					size="xs"
					class="flex items-center flex-1 px-2 font-medium text-fg-default"
				>
					{group.title}
				</Heading>
			</HStack>
			<VStack gap={0} class="pt-1">
				{#each group.items as item}
					{#if item.children && item.children.length > 0}
						<Collapsible.Root open={hasActiveChild(item.children)}>
							<Collapsible.Trigger
								class="flex items-center gap-1 w-full transition-colors duration-150 rounded-md cursor-pointer select-none hover:bg-bg-subtle h-8 text-[.8125rem]"
							>
								<Heading
									as="h5"
									size="xs"
									class="flex-1 flex items-center font-medium px-2 {hasActiveChild(
										item.children,
									)
										? 'text-fg-default'
										: 'text-fg-muted'}"
								>
									{formatLabel(item.label)}
								</Heading>
								<Box class="pr-1">
									<Icon
										as={CaretRight}
										size="xs"
										class="transition-transform duration-200 ease-in-out in-data-[state=open]:rotate-90"
									/>
								</Box>
							</Collapsible.Trigger>
							<Collapsible.Content
								class="flex flex-col pt-1 pb-2 overflow-hidden"
							>
								{#each item.children as child}
									<Box
										class="text-[.8125rem] leading-[1.1375rem] relative py-px pl-4 before:content-[''] before:z-[-1] before:bg-border-subtle before:w-px before:h-full before:absolute before:left-2 before:inset-y-0"
									>
										<Link
											href={child.href}
											class="relative isolate text-ellipsis whitespace-nowrap cursor-pointer w-full flex items-center gap-2 h-7 transition-colors duration-150 overflow-hidden px-2.5 rounded outline-none focus-visible:z-10 {isActive(
												child.href,
											)
												? 'text-fg-default font-medium bg-bg-subtle'
												: 'text-fg-muted hover:bg-bg-subtle hover:text-fg-default'}"
										>
											{formatLabel(child.label)}
										</Link>
									</Box>
								{/each}
							</Collapsible.Content>
						</Collapsible.Root>
					{:else if item.href}
						<Box
							class="text-[.8125rem] leading-[1.1375rem] relative py-px"
						>
							<Link
								href={item.href}
								class="relative isolate text-ellipsis whitespace-nowrap cursor-pointer w-full flex items-center gap-2 h-7 transition-colors duration-150 overflow-hidden rounded font-medium px-2 outline-none focus-visible:z-10 {isActive(
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
