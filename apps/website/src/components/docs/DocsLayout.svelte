<script lang="ts">
	import type { Snippet } from "svelte";
	import DocsSidebar from "./DocsSidebar.svelte";
	import TableOfContents from "./TableOfContents.svelte";
	import { getDocsNavigation } from "../../lib/docs-navigation";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Icon } from "@saas-ui/svelte/components/icon";
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

<div class="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 w-full relative">
	<div class="flex items-start">
		<!-- Desktop Sidebar -->
		<aside
			class="hidden lg:block shrink-0 w-40 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto border-r border-border-default"
		>
			<DocsSidebar groups={navGroups} {currentPath} />
		</aside>

		<!-- Main Content -->
		<main class="flex-1 min-w-0 flex">
			<div class="flex-1 min-w-0 px-4 md:px-8 lg:px-12 py-10">
				{@render children()}
			</div>

			<!-- Table of Contents -->
			{#if tocItems.length > 0}
				<TableOfContents items={tocItems} {githubUrl} />
			{/if}
		</main>
	</div>
</div>

<!-- Mobile Navigation Button -->
<div class="lg:hidden fixed bottom-4 right-4 z-50">
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
</div>

<!-- Mobile Navigation Panel -->
{#if mobileNavOpen}
	<div class="lg:hidden fixed inset-0 z-40 pt-14">
		<!-- Backdrop -->
		<button
			type="button"
			class="absolute inset-0 bg-bg-backdrop"
			onclick={() => (mobileNavOpen = false)}
			aria-label="Close navigation"
		></button>
		<!-- Panel -->
		<aside
			class="absolute left-0 top-14 bottom-0 w-40 max-w-40 bg-bg-default border-r border-border-default overflow-y-auto"
		>
			<DocsSidebar groups={navGroups} {currentPath} />
		</aside>
	</div>
{/if}
