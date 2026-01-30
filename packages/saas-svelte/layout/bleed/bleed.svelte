<script lang="ts">
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props {
	/**
	 * The negative margin on the x-axis (both inline-start and inline-end).
	 * Uses Tailwind spacing scale.
	 */
	inline?: number;
	/**
	 * The negative margin on the y-axis (both block-start and block-end).
	 * Uses Tailwind spacing scale.
	 */
	block?: number;
	/**
	 * The negative margin on the inline-start axis (left in LTR).
	 * Uses Tailwind spacing scale.
	 */
	inlineStart?: number;
	/**
	 * The negative margin on the inline-end axis (right in LTR).
	 * Uses Tailwind spacing scale.
	 */
	inlineEnd?: number;
	/**
	 * The negative margin on the block-start axis (top).
	 * Uses Tailwind spacing scale.
	 */
	blockStart?: number;
	/**
	 * The negative margin on the block-end axis (bottom).
	 * Uses Tailwind spacing scale.
	 */
	blockEnd?: number;
	/**
	 * The content to render inside the bleed container.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Additional HTML attributes to spread onto the element.
	 */
	[key: string]: unknown;
}

let {
	inline,
	block,
	inlineStart,
	inlineEnd,
	blockStart,
	blockEnd,
	children,
	class: className,
	...restProps
}: Props = $props();

const toRem = (value: number | undefined) =>
	value !== undefined ? `${-value * 0.25}rem` : undefined;

const marginInlineStart = $derived(toRem(inlineStart ?? inline));
const marginInlineEnd = $derived(toRem(inlineEnd ?? inline));
const marginBlockStart = $derived(toRem(blockStart ?? block));
const marginBlockEnd = $derived(toRem(blockEnd ?? block));
</script>

<div
	class={twMerge(className)}
	style:margin-inline-start={marginInlineStart}
	style:margin-inline-end={marginInlineEnd}
	style:margin-block-start={marginBlockStart}
	style:margin-block-end={marginBlockEnd}
	{...restProps}
>
	{@render children?.()}
</div>
