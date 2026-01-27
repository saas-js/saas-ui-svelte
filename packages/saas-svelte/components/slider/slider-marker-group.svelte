<script lang="ts">
	import { Slider } from "@ark-ui/svelte/slider";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { SLIDER_CTX, type SliderContext } from "./slider-root.svelte";

	interface Props {
		/**
		 * Content to render inside the marker group (typically Marker components).
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

<Slider.MarkerGroup
	class={twMerge(styles.markerGroup(), className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</Slider.MarkerGroup>
