<script lang="ts">
	import { fade } from "svelte/transition";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { VStack } from "@saas-ui/svelte/layout/stack";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Heading } from "@saas-ui/svelte/typography/heading";
	import DocsSidebar from "./docs/DocsSidebar.svelte";
	import { getDocsNavigation } from "../lib/docs-navigation";
	import {
		getSideMenuOpen,
		setSideMenuOpen,
		closeMobileMenu,
	} from "../lib/mobile-nav.svelte";

	interface Props {
		currentPath?: string;
	}

	let { currentPath = "" }: Props = $props();

	// Normalize base URL - remove trailing slash to avoid double slashes
	const rawBase = import.meta.env.BASE_URL || "";
	const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

	const navLinks = [
		{ href: `${base}/docs`, label: "Docs" },
		{ href: `${base}/storybook`, label: "Storybook" },
	];

	const navGroups = getDocsNavigation(base);

	let mobileNavOpen = $derived(getSideMenuOpen());

	let isDocsPage = $state(false);

	$effect(() => {
		if (typeof window === "undefined") return;
		isDocsPage = window.location.pathname.includes("/docs");
	});

	$effect(() => {
		if (typeof window === "undefined") return;
		const mq = matchMedia("(min-width: 1024px)");
		const close = () => mq.matches && closeMobileMenu();
		close();
		mq.addEventListener("change", close);
		return () => mq.removeEventListener("change", close);
	});
</script>

{#if mobileNavOpen}
	<!-- Backdrop -->
	<button
		type="button"
		tabindex="-1"
		class="fixed inset-0 top-14.25 z-60 bg-black/20 lg:hidden"
		onclick={() => setSideMenuOpen(false)}
		aria-label="Close navigation"
		transition:fade={{ duration: 150 }}
	></button>

	<!-- Panel -->
	<div
		class="bg-bg-default border-border-default fixed top-14.25 bottom-0 left-0 z-61 w-56 overflow-y-auto border-r lg:hidden"
		transition:fade={{ duration: 150 }}
	>
		{#if isDocsPage}
			<DocsSidebar groups={navGroups} {currentPath} />
		{:else}
			<nav class="flex flex-col gap-6 p-8">
				<Box>
					<Heading as="h5" size="xs" class="text-fg-default mb-2 px-2"
						>Resources</Heading
					>
					<VStack gap={1} class="w-full">
						{#each navLinks as { href, label }}
							<Button
								as="a"
								{href}
								variant="ghost"
								class="w-full justify-start"
								onclick={() => setSideMenuOpen(false)}
							>
								{label}
							</Button>
						{/each}
					</VStack>
				</Box>
				<Box>
					<Heading as="h5" size="xs" class="text-fg-default mb-2 px-2"
						>Legal</Heading
					>
					<VStack gap={1} class="w-full">
						<Button
							as="a"
							href={`${base}/license`}
							variant="ghost"
							class="w-full justify-start"
							onclick={() => setSideMenuOpen(false)}
						>
							License
						</Button>
						<Button
							as="a"
							href={`${base}/privacy`}
							variant="ghost"
							class="w-full justify-start"
							onclick={() => setSideMenuOpen(false)}
						>
							Privacy
						</Button>
						<Button
							as="a"
							href={`${base}/terms`}
							variant="ghost"
							class="w-full justify-start"
							onclick={() => setSideMenuOpen(false)}
						>
							Terms
						</Button>
					</VStack>
				</Box>
			</nav>
		{/if}
	</div>
{/if}
