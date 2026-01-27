<script lang="ts">
	import { Slider } from "@ark-ui/svelte/slider";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { SLIDER_CTX, type SliderContext } from "./slider-root.svelte";

	interface Props {
		/**
		 * Content to render inside the control (typically Track and Thumb).
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<SliderContext>(SLIDER_CTX);
	const styles = $derived(ctx.styles);
</script>

<Slider.Control class={twMerge(styles.control(), className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</Slider.Control>
