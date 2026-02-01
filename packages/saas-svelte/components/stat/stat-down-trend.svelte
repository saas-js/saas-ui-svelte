<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { STAT_CTX, type StatContext } from "./stat-root.svelte";
import { getColourStyle, type ColourName } from "$saas/utils/colours";
import ArrowDownIcon from "phosphor-svelte/lib/ArrowDownIcon";
import { Text } from "$saas/typography/text";
import { statTrend } from "./stat-up-trend.svelte";

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
	 * @default "red"
	 */
	colour?: ColourName;
	[key: string]: any;
}

let {
	children,
	class: className,
	variant = "subtle",
	colour = "red",
	...restProps
}: Props = $props();

const ctx = getContext<StatContext>(STAT_CTX);
const styles = $derived(ctx.styles);
const colourStyle = $derived(getColourStyle(colour));
</script>

<div
	role="definition"
	class={twMerge(styles.trend(), statTrend({ variant }), className)}
	style={colourStyle}
	{...restProps}
>
	<Text as="span" class={twMerge(styles.trendIcon())} aria-hidden="true">
		<ArrowDownIcon weight="bold" size="1em" />
	</Text>
	{@render children()}
</div>
