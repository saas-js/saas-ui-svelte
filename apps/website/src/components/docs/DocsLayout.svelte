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
import {
	getSideMenuOpen,
	setSideMenuOpen,
	closeAllMobileMenus,
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
	children: Snippet;
}

let { currentPath = "", tocItems = [], githubUrl, children }: Props = $props();

const navGroups = getDocsNavigation();
let mobileNavOpen = $derived(getSideMenuOpen());

$effect(() => {
	if (typeof window === "undefined") return;
	const mq = matchMedia("(min-width: 1024px)");
	const close = () => mq.matches && closeAllMobileMenus();
	close();
	mq.addEventListener("change", close);
	return () => mq.removeEventListener("change", close);
});
</script>

<Box class="max-w-8xl relative mx-auto w-full px-4 md:px-6 lg:px-8">
	<HStack gap={0} class="items-start">
		<!-- Desktop Sidebar -->
		<Box
			as="aside"
			class="border-border-default sticky top-14 hidden h-[calc(100vh-3.5rem)] w-40 shrink-0 overflow-y-auto border-r lg:block"
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

<!-- Mobile Navigation Button -->
<Box class="fixed right-4 bottom-4 z-50 lg:hidden">
	<Button
		variant="surface"
		size="md"
		icon
		class="rounded-lg shadow-lg"
		onclick={() => setSideMenuOpen(!mobileNavOpen)}
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
	<Box
		class="bg-bg-default border-border-default animate-fade-in fixed top-14 bottom-0 left-0 z-40 w-40 max-w-40 overflow-y-auto border-r lg:hidden"
	>
		<DocsSidebar groups={navGroups} currentPath={currentPath} />
	</Box>
{/if}
