<script module lang="ts">
	import { tv } from "tailwind-variants";

	export const segmentGroupItem = tv({
		base: "data-[state=checked]:before:opacity-0 [&+[data-state=checked]]:before:opacity-0",
		variants: {
			disabled: {
				true: "cursor-not-allowed",
				false: "",
			},
		},
		defaultVariants: {
			disabled: false,
		},
	});
</script>

<script lang="ts">
	import { SegmentGroup } from "@ark-ui/svelte/segment-group";
	import { getContext, type Snippet, type Component } from "svelte";
	import { twMerge } from "tailwind-merge";
	import {
		SEGMENT_GROUP_CTX,
		type SegmentGroupContext,
	} from "./segment-group-root.svelte";
	import { getColourStyle } from "$saas/utils/colours";
	import { Icon } from "$saas/components/icon";

	interface Props {
		/**
		 * Content to render inside the segment item (composition API).
		 */
		children?: Snippet;
		/**
		 * The label text displayed in the segment.
		 */
		label?: string;
		/**
		 * Icon component to display before the label.
		 */
		icon?: Component<any>;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The value of this segment item.
		 */
		value: string;
		/**
		 * Whether this segment item is disabled.
		 * @default false
		 */
		disabled?: boolean;
		[key: string]: any;
	}

	let {
		children,
		label,
		icon,
		class: className,
		value,
		disabled = false,
		...restProps
	}: Props = $props();

	const ctx = getContext<SegmentGroupContext>(SEGMENT_GROUP_CTX);
	const styles = $derived(ctx.styles);
	const colourVars = $derived(getColourStyle(ctx.colour));

	const isDisabled = $derived(disabled || ctx.disabled);

	function handlePrefetch() {
		if (!isDisabled) {
			ctx.onPrefetch?.(value);
		}
	}

	// Map segment size to icon size
	const iconSizeMap = {
		xs: "xs",
		sm: "sm",
		md: "sm",
		lg: "md",
	} as const;
	const iconSize = $derived(iconSizeMap[ctx.size ?? "md"]);
</script>

<SegmentGroup.Item
	{value}
	disabled={isDisabled}
	class={twMerge(
		styles.item(),
		segmentGroupItem({ disabled: isDisabled }),
		className,
	)}
	style={colourVars}
	onmouseenter={handlePrefetch}
	onfocus={handlePrefetch}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{#if icon}
			<Icon as={icon} size={iconSize} />
		{/if}
		<SegmentGroup.ItemText class={styles.itemText()}>
			{label}
		</SegmentGroup.ItemText>
	{/if}
	<SegmentGroup.ItemHiddenInput />
</SegmentGroup.Item>
