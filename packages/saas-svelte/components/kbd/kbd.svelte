<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	export const kbd = tv({
		base: [
			"whitespace-nowrap",
			"[word-spacing:-0.5em]",
			"select-none",
			"shrink-0",
			"items-center",
			"inline-flex",
			"px-1",
			"rounded",
			"font-medium",
			"antialiased",
			"gap-0.5",
		],
		variants: {
			variant: {
				raised: [
					"bg-(--c-subtle)",
					"text-(--c-fg)",
					"border-t",
					"border-b-2",
					"border-x",
					"border-(--c-muted)",
				],
				outline: ["border", "border-(--c-border)", "text-(--c-fg)"],
				subtle: ["bg-(--c-subtle)", "text-(--c-fg)"],
				plain: ["text-(--c-fg)"],
			},
			size: {
				sm: "h-4 text-2xs leading-3",
				md: "h-5 text-xs leading-4",
				lg: "h-6 text-sm leading-5",
			},
		},
		defaultVariants: {
			variant: "subtle",
			size: "md",
		},
	});

	export type KbdVariants = VariantProps<typeof kbd>;

	/** Map of key names to their symbols */
	export const keySymbols: Record<string, string> = {
		command: "⌘",
		cmd: "⌘",
		meta: "⌘",
		option: "⌥",
		alt: "⌥",
		shift: "⇧",
		control: "⌃",
		ctrl: "⌃",
		enter: "↵",
		return: "↵",
		backspace: "⌫",
		delete: "⌦",
		escape: "⎋",
		esc: "⎋",
		tab: "⇥",
		capslock: "⇪",
		up: "↑",
		down: "↓",
		left: "←",
		right: "→",
		space: "␣",
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ColourName } from "$saas/utils/colours";
	import { getColourStyle } from "$saas/utils/colours";
	import { Box } from "$saas/layout/box";
	import { twMerge } from "tailwind-merge";

	interface Props extends HTMLAttributes<HTMLElement> {
		/**
		 * The visual style of the component.
		 * @default "subtle"
		 */
		variant?: KbdVariants["variant"];
		/**
		 * The size of the component.
		 * @default "md"
		 */
		size?: KbdVariants["size"];
		/**
		 * The colour palette of the component.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Modifier keys to display before children (e.g., ["command", "shift"]).
		 * Supported keys: command, cmd, meta, option, alt, shift, control, ctrl,
		 * enter, return, backspace, delete, escape, esc, tab, capslock,
		 * up, down, left, right, space
		 */
		keys?: string[];
		/**
		 * Content to render inside the kbd.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Inline styles to apply via the style attribute.
		 */
		style?: string;
	}

	let {
		variant = "subtle",
		size = "md",
		colour = "gray",
		keys = [],
		class: className,
		style,
		children,
		...restProps
	}: Props = $props();

	const colourStyle = $derived(getColourStyle(colour));
	const finalStyle = $derived(
		[colourStyle, style].filter(Boolean).join("; "),
	);

	const finalClass = $derived(twMerge(kbd({ variant, size }), className));

	const keyElements = $derived(
		keys.map((key) => keySymbols[key.toLowerCase()] || key),
	);
</script>

<kbd class={finalClass} style={finalStyle} {...restProps}>
	{#each keyElements as symbol}
		<Box as="span">{symbol}</Box>
	{/each}
	{@render children?.()}
</kbd>
