<script lang="ts">
	import { getAnyMenuOpen, closeAllMobileMenus } from "../lib/mobile-nav.svelte";
	import { fade } from "svelte/transition";

	let anyMenuOpen = $derived(getAnyMenuOpen());
</script>

{#if anyMenuOpen}
	<button
		type="button"
		class="fixed inset-0 z-40 w-full h-full bg-bg-backdrop lg:hidden"
		onclick={() => closeAllMobileMenus()}
		aria-label="Close menu"
		transition:fade={{ duration: 150 }}
	></button>
{/if}
