<script lang="ts">
	import type { Snippet } from "svelte";
	import { Portal as ArkPortal } from "@ark-ui/svelte/portal";
	import { onMount } from "svelte";

	interface Props {
		/**
		 * Whether to disable the portal and render children in place.
		 * Useful for SSR or when you don't want portal behavior.
		 */
		disabled?: boolean;
		/**
		 * The container element to render the portal into.
		 * Defaults to document.body.
		 */
		container?: HTMLElement | null;
		/**
		 * The content to render in the portal.
		 */
		children: Snippet;
	}

	let { disabled = false, container, children }: Props = $props();

	// Track if we're on the client side
	let isClient = $state(false);

	onMount(() => {
		isClient = true;
	});
</script>

{#if disabled || !isClient}
	{@render children()}
{:else}
	<ArkPortal container={container ?? undefined}>
		{@render children()}
	</ArkPortal>
{/if}
