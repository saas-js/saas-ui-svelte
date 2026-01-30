<script lang="ts">
import { Slider } from "@ark-ui/svelte/slider";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import { SLIDER_CTX, type SliderContext } from "./slider-root.svelte";

interface Props {
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { class: className, ...restProps }: Props = $props();

const ctx = getContext<SliderContext>(SLIDER_CTX);
const styles = $derived(ctx.styles);
</script>

<Slider.Range class={twMerge(styles.range(), className)} {...restProps} />
