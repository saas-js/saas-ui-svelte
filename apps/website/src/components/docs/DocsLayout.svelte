<script lang="ts">
import type { Snippet } from "svelte";
import { fade } from "svelte/transition";
import DocsSidebar from "./DocsSidebar.svelte";
import TableOfContents from "./TableOfContents.svelte";
import { getDocsNavigation } from "../../lib/docs-navigation";
import { Box } from "@saas-ui/svelte/layout/box";
import { HStack } from "@saas-ui/svelte/layout/stack";
import {
	getSideMenuOpen,
	setSideMenuOpen,
	closeMobileMenu,
} from "../../lib/mobile-nav.svelte";

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
	base?: string;
	children: Snippet;
}

let { currentPath = "", tocItems = [], githubUrl, base = "", children }: Props = $props();

const navGroups = getDocsNavigation(base);
let mobileNavOpen = $derived(getSideMenuOpen());

$effect(() => {
	if (typeof window === "undefined") return;
	const mq = matchMedia("(min-width: 1024px)");
	const close = () => mq.matches && closeMobileMenu();
	close();
	mq.addEventListener("change", close);
	return () => mq.removeEventListener("change", close);
});
</script>

<Box class="max-w-8xl relative mx-auto w-full" inert={mobileNavOpen ? true : undefined}>
	<HStack gap={0} class="items-start">
		<!-- Desktop Sidebar -->
		<Box
			as="aside"
			class="bg-bg-default border-border-default sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r lg:block"
		>
			<DocsSidebar groups={navGroups} currentPath={currentPath} />
		</Box>

		<!-- Main Content -->
		<Box as="main" class="flex min-w-0 flex-1">
			<Box class="min-w-0 flex-1 px-4 py-10 md:px-8 lg:px-12">
				{@render children()}
			</Box>

			<!-- Table of Contents -->
			{#if tocItems.length > 0}
				<TableOfContents items={tocItems} githubUrl={githubUrl} />
			{/if}
		</Box>
	</HStack>
</Box>

<!-- Mobile Navigation Overlay and Panel -->
{#if mobileNavOpen}
	<!-- Backdrop (z-55 to cover navbar which is z-50) -->
	<button
		type="button"
		class="fixed inset-0 z-55 bg-black/20 lg:hidden"
		onclick={() => setSideMenuOpen(false)}
		aria-label="Close navigation"
		transition:fade={{ duration: 150 }}
	></button>

	<!-- Panel (z-56 to be above backdrop) -->
	<div
		class="bg-bg-default border-border-default fixed top-14 bottom-0 left-0 z-56 w-56 overflow-y-auto border-r lg:hidden"
		transition:fade={{ duration: 150 }}
	>
		<DocsSidebar groups={navGroups} currentPath={currentPath} />
	</div>
{/if}
