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
	class="flex flex-1 flex-col gap-0 overflow-y-auto px-5 py-8 text-sm"
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
					{#if item.children && item.children.length > 0}
						<Collapsible.Root open={hasActiveChild(item.children)}>
							<Collapsible.Trigger
								class="hover:bg-bg-subtle flex h-8 w-full cursor-pointer items-center gap-1 rounded-md text-[.8125rem] transition-colors duration-150 select-none"
							>
								<Heading
									as="h5"
									size="xs"
									class="flex flex-1 items-center px-2 font-medium {hasActiveChild(
										item.children,
									)
										? 'text-fg-default'
										: 'text-fg-muted'}"
								>
									{formatLabel(item.label)}
								</Heading>
								<Box class="px-1">
									<Icon
										as={CaretRight}
										size="xs"
										class="transition-transform duration-200 ease-in-out in-data-[state=open]:rotate-90"
									/>
								</Box>
							</Collapsible.Trigger>
							<Collapsible.Content
								class="flex flex-col overflow-hidden pt-1 pb-2"
							>
								{#each item.children as child}
									<Box
										class="before:bg-border-subtle relative py-px pl-4 text-[.8125rem] leading-[1.1375rem] before:absolute before:inset-y-0 before:left-2 before:z-[-1] before:h-full before:w-px before:content-['']"
									>
										<Link
											href={child.href}
											class="relative isolate flex h-7 w-full cursor-pointer items-center gap-2 overflow-hidden rounded px-2.5 text-ellipsis whitespace-nowrap transition-colors duration-150 outline-none focus-visible:z-10 {isActive(
												child.href,
											)
												? 'text-fg-default bg-bg-subtle font-medium'
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
