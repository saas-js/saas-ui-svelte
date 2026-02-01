<script lang="ts">
	import { Slider } from "@ark-ui/svelte/slider";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { SLIDER_CTX, type SliderContext } from "./slider-root.svelte";
	import { Box } from "$saas/layout/box";

	interface Props {
		/**
		 * The value at which to place the marker.
		 */
		value: number;
		/**
		 * Content to render inside the marker.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Whether to show a dot indicator.
		 * @default true
		 */
		showDot?: boolean;
		[key: string]: any;
	}

	let {
		value,
		children,
		class: className,
		showDot = true,
		...restProps
	}: Props = $props();

	const ctx = getContext<SliderContext>(SLIDER_CTX);
	const styles = $derived(ctx.styles);
</script>

<Slider.Marker
	{value}
	class={twMerge("group", styles.marker(), className)}
	{...restProps}
>
	{#if showDot}
		<Box class={twMerge(styles.markerDot(), "bg-(--c-contrast)")} />
	{/if}
	{@render children?.()}
</Slider.Marker>
