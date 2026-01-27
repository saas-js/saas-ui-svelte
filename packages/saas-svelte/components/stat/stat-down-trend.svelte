<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { STAT_CTX, type StatContext } from "./stat-root.svelte";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";

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

	const variantClasses = $derived(
		variant === "subtle"
			? "bg-(--c-muted) text-(--c-fg) px-1.5"
			: "text-(--c-fg) px-0",
	);
</script>

<dd
	class={twMerge(styles.trend(), variantClasses, className)}
	style={colourStyle}
	{...restProps}
>
	<span class={styles.trendIcon()} aria-hidden="true">
		<svg
			viewBox="0 0 24 24"
			class="w-[1em] h-[1em] fill-none stroke-current stroke-[3px] [stroke-linecap:round] [stroke-linejoin:round]"
		>
			<path d="M12 5v14"></path>
			<path d="m19 12-7 7-7-7"></path>
		</svg>
	</span>
	{@render children()}
</dd>
