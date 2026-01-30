<script lang="ts">
import { getAnyMenuOpen, closeAllMobileMenus } from "../lib/mobile-nav.svelte";
import { fade } from "svelte/transition";

let anyMenuOpen = $derived(getAnyMenuOpen());
</script>

{#if anyMenuOpen}
	<button
		type="button"
		class="bg-bg-backdrop fixed inset-0 z-40 h-full w-full lg:hidden"
		onclick={() => closeAllMobileMenus()}
		aria-label="Close menu"
		transition:fade={{ duration: 150 }}
	></button>
{/if}
