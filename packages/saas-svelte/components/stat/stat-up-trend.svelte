<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { STAT_CTX, type StatContext } from "./stat-root.svelte";
import { getColourStyle, type ColourName } from "$saas/utils/colours";
import { ArrowUpIcon } from "phosphor-svelte";
import { Text } from "$saas/typography/text";

interface Props {
	/**
	 * The trend value content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The visual variant of the trend indicator.
	 * @default "subtle"
	 */
	variant?: "subtle" | "plain";
	/**
	 * The colour palette.
	 * @default "green"
	 */
	colour?: ColourName;
	[key: string]: any;
}

let {
	children,
	class: className,
	variant = "subtle",
	colour = "green",
	...restProps
}: Props = $props();

const ctx = getContext<StatContext>(STAT_CTX);
const styles = $derived(ctx.styles);
const colourStyle = $derived(getColourStyle(colour));

const variantClasses = $derived(
	variant === "subtle"
		? "bg-(--c-muted) text-(--c-fg) px-1.5"
		: "text-(--c-fg) px-0",
);
</script>

<div
	role="definition"
	class={twMerge(styles.trend(), variantClasses, className)}
	style={colourStyle}
	{...restProps}
>
	<Text as="span" class={twMerge(styles.trendIcon())} aria-hidden="true">
		<ArrowUpIcon weight="bold" size="1em" />
	</Text>
	{@render children()}
</div>
