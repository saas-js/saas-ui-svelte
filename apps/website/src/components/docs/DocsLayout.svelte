<script lang="ts">
	import type { Snippet } from "svelte";
	import DocsSidebar from "./DocsSidebar.svelte";
	import TableOfContents from "./TableOfContents.svelte";
	import { getDocsNavigation } from "../../lib/docs-navigation";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { HStack } from "@saas-ui/svelte/layout/stack";
	import List from "phosphor-svelte/lib/ListIcon";
	import X from "phosphor-svelte/lib/X";

	interface TocItem {
		label: string;
		href: string;
		level?: number;
		children?: TocItem[];
	}

	interface Props {
		currentPath?: string;
		tocItems?: TocItem[];
		githubUrl?: string;
		children: Snippet;
	}

	let {
		currentPath = "",
		tocItems = [],
		githubUrl,
		children,
	}: Props = $props();

	const navGroups = getDocsNavigation();
	let mobileNavOpen = $state(false);
</script>

<Box class="relative w-full px-4 mx-auto max-w-8xl md:px-6 lg:px-8">
	<HStack gap={0} class="items-start">
		<!-- Desktop Sidebar -->
		<Box
			as="aside"
			class="hidden lg:block shrink-0 w-40 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto border-r border-border-default"
		>
			<DocsSidebar groups={navGroups} {currentPath} />
		</Box>

		<!-- Main Content -->
		<Box as="main" class="flex flex-1 min-w-0">
			<Box class="flex-1 min-w-0 px-4 py-10 md:px-8 lg:px-12">
				{@render children()}
			</Box>

			<!-- Table of Contents -->
			{#if tocItems.length > 0}
				<TableOfContents items={tocItems} {githubUrl} />
			{/if}
		</Box>
	</HStack>
</Box>

<!-- Mobile Navigation Button -->
<Box class="fixed z-50 lg:hidden bottom-4 right-4">
	<Button
		variant="surface"
		size="md"
		class="rounded-lg shadow-lg"
		onclick={() => (mobileNavOpen = !mobileNavOpen)}
		aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
	>
		{#if mobileNavOpen}
			<Icon as={X} size="sm" />
		{:else}
			<Icon as={List} size="sm" />
		{/if}
	</Button>
</Box>

<!-- Mobile Navigation Panel -->
{#if mobileNavOpen}
	<Box class="fixed inset-0 z-40 lg:hidden pt-14">
		<!-- Backdrop -->
		<Button
			variant="ghost"
			class="absolute inset-0 w-full h-full rounded-none bg-bg-backdrop"
			onclick={() => (mobileNavOpen = false)}
			aria-label="Close navigation"
		/>
		<!-- Panel -->
		<Box
			as="aside"
			class="absolute bottom-0 left-0 w-40 overflow-y-auto border-r top-14 max-w-40 bg-bg-default border-border-default"
		>
			<DocsSidebar groups={navGroups} {currentPath} />
		</Box>
	</Box>
{/if}
