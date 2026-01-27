<script lang="ts">
	import { Steps } from "@ark-ui/svelte/steps";
	import type { Snippet } from "svelte";
	import { button, type ButtonVariants } from "$saas/components/button/button.svelte";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";

	interface Props {
		/**
		 * The content of the trigger.
		 */
		children?: Snippet;
		/**
		 * The button variant.
		 * @default "outline"
		 */
		variant?: ButtonVariants["variant"];
		/**
		 * The button size.
		 * @default "sm"
		 */
		size?: ButtonVariants["size"];
		/**
		 * The colour theme.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
		[key: string]: any;
	}

	let {
		children,
		variant = "outline",
		size = "sm",
		colour = "gray",
		class: className,
		...restProps
	}: Props = $props();

	const colourVars = $derived(getColourStyle(colour));
	const buttonClass = $derived(button({ variant, size, className }));
</script>

<Steps.PrevTrigger class={buttonClass} style={colourVars} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</Steps.PrevTrigger>
