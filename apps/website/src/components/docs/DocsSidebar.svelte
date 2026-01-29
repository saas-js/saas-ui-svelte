<script lang="ts">
	import { Collapsible } from "@saas-ui/svelte/components/collapsible";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { VStack } from "@saas-ui/svelte/layout/stack";
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
		return currentPath === href || currentPath.startsWith(href + "/");
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

<nav class="flex flex-col flex-1 overflow-y-auto gap-0 px-4 py-8 text-sm">
	{#each groups as group}
		<div class="relative my-3">
			<div class="flex items-center gap-1 h-6 text-xs rounded-md">
				<h5
					class="flex-1 flex items-center font-medium px-2 text-fg-default"
				>
					{group.title}
				</h5>
			</div>
			<div class="flex flex-col pt-1">
				{#each group.items as item}
					{#if item.children && item.children.length > 0}
						<Collapsible.Root open={hasActiveChild(item.children)}>
							<Collapsible.Trigger
								class="flex items-center gap-1 w-full transition-all duration-150 rounded-md cursor-pointer select-none hover:bg-bg-subtle h-8 text-[.8125rem]"
							>
								<h5
									class="flex-1 flex items-center font-medium px-2 {hasActiveChild(
										item.children,
									)
										? 'text-fg-default'
										: 'text-fg-muted'}"
								>
									{formatLabel(item.label)}
								</h5>
								<div class="pr-1">
									<Icon
										as={CaretRight}
										size="xs"
										class="transition-transform duration-200 ease-in-out [[data-state=open]_&]:rotate-90"
									/>
								</div>
							</Collapsible.Trigger>
							<Collapsible.Content
								class="flex flex-col pt-1 overflow-hidden pb-2"
							>
								{#each item.children as child}
									<div
										class="text-[.8125rem] leading-[1.1375rem] relative py-px pl-4 before:content-[''] before:z-[-1] before:bg-border-subtle before:w-px before:h-full before:absolute before:left-2 before:inset-y-0"
									>
										<a
											href={child.href}
											class="isolate text-ellipsis whitespace-nowrap cursor-pointer w-full flex items-center gap-2 h-7 transition-all duration-150 overflow-hidden px-2.5 rounded {isActive(
												child.href,
											)
												? 'text-fg-default font-medium bg-bg-subtle'
												: 'text-fg-muted hover:bg-bg-subtle hover:text-fg-default'}"
										>
											{formatLabel(child.label)}
										</a>
									</div>
								{/each}
							</Collapsible.Content>
						</Collapsible.Root>
					{:else if item.href}
						<div
							class="text-[.8125rem] leading-[1.1375rem] relative py-px"
						>
							<a
								href={item.href}
								class="isolate text-ellipsis whitespace-nowrap cursor-pointer w-full flex items-center gap-2 h-7 transition-all duration-150 overflow-hidden rounded font-medium px-2 {isActive(
									item.href,
								)
									? 'text-fg-default bg-bg-subtle'
									: 'text-fg-muted hover:bg-bg-subtle hover:text-fg-default'}"
							>
								{formatLabel(item.label)}
							</a>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</nav>
