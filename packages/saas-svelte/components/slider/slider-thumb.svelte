<script lang="ts">
	import { Slider } from "@ark-ui/svelte/slider";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { SLIDER_CTX, type SliderContext } from "./slider-root.svelte";

	interface Props {
		/**
		 * The index of the thumb (for range sliders, 0 for first thumb, 1 for second, etc).
		 */
		index: number;
		/**
		 * Content to render inside the thumb.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The name for the hidden input.
		 */
		name?: string;
		[key: string]: any;
	}

	let {
		index,
		children,
		class: className,
		name,
		...restProps
	}: Props = $props();

	const ctx = getContext<SliderContext>(SLIDER_CTX);
	const styles = $derived(ctx.styles);
</script>

<Slider.Thumb
	{index}
	{name}
	class={twMerge(styles.thumb(), className)}
	{...restProps}
>
	<Slider.HiddenInput />
	{@render children?.()}
</Slider.Thumb>
