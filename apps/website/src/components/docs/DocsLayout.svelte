<script lang="ts">
import type { Snippet } from "svelte";
import DocsSidebar from "./DocsSidebar.svelte";
import TableOfContents from "./TableOfContents.svelte";
import { getDocsNavigation } from "../../lib/docs-navigation";
import { Box } from "@saas-ui/svelte/layout/box";
import { HStack } from "@saas-ui/svelte/layout/stack";
import { getSideMenuOpen } from "../../lib/mobile-nav.svelte";

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

const navGroups = $derived(getDocsNavigation(base));
let mobileNavOpen = $derived(getSideMenuOpen());
</script>

<Box class="max-w-8xl relative mx-auto w-full" inert={mobileNavOpen ? true : undefined}>
	<HStack gap={0} class="items-start">
		<!-- Desktop Sidebar -->
		<Box
			as="aside"
			aria-label="Documentation navigation"
			class="bg-bg-default border-border-default sticky top-14.25 hidden h-[calc(100vh-3.5625rem)] w-56 shrink-0 overflow-y-auto border-r lg:block"
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
