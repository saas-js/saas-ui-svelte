<script lang="ts">
	import { fade } from "svelte/transition";
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
		<DocsSidebar groups={navGroups} {currentPath} />
	</div>
{/if}
