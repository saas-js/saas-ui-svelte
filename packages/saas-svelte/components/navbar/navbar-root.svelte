<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const NAVBAR_CTX = Symbol("NAVBAR_CTX");

export const navbar = tv({
	slots: {
		root: [
			"z-100",
			"text-fg-default",
			"bg-bg-default",
			"justify-center",
			"items-center",
			"w-full",
			"text-sm",
			"transition-[transform,background-color]",
			"duration-200",
			"ease-in-out",
			"flex",
			"inset-x-0",
			"top-0",
			"antialiased",
		],
		content: [
			"lg:px-6",
			"justify-between",
			"items-center",
			"gap-4",
			"w-full",
			"h-14",
			"flex",
			"px-4",
		],
		brand: [
			"h-full",
			"whitespace-nowrap",
			"justify-start",
			"items-center",
			"flex",
		],
		itemGroup: ["justify-start", "items-center", "h-full", "flex"],
		item: [],
		link: [
			"text-current",
			"whitespace-nowrap",
			"justify-center",
			"items-center",
			"h-8",
			"leading-none",
			"no-underline",
			"transition-[background-color]",
			"duration-200",
			"inline-flex",
			"px-3",
			"rounded",
			"focus-visible:outline-offset-2",
			"focus-visible:outline-1",
			"focus-visible:outline-solid",
			"focus-visible:outline-fg-muted",
			"hover:bg-bg-subtle",
			"active:font-semibold",
		],
	},
	variants: {
		variant: {
			default: {
				root: "bg-bg-default",
				link: "hover:bg-bg-subtle data-active:font-semibold",
			},
			glass: {
				root: "bg-bg-overlay backdrop-blur-lg",
				link: "hover:bg-bg-subtle data-active:font-semibold",
			},
			solid: {
				root: "bg-(--c-solid) text-(--c-contrast)",
				link: "hover:bg-white/10 data-active:font-semibold",
			},
		},
		position: {
			static: { root: "" },
			sticky: { root: "sticky" },
			fixed: { root: "fixed" },
		},
		bordered: {
			true: { root: "border-b border-border-default" },
			false: {},
		},
	},
	defaultVariants: {
		variant: "default",
		position: "static",
		bordered: false,
	},
});

export type NavbarVariants = VariantProps<typeof navbar>;

export interface NavbarContext {
	variant: NavbarVariants["variant"];
	styles: ReturnType<typeof navbar>;
	colourStyle: string;
}
</script>

<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { setContext } from "svelte";
import { twMerge } from "tailwind-merge";
import { type ColourName, getColourStyle } from "$saas/utils/colours";

interface Props extends HTMLAttributes<HTMLElement> {
	/** The visual style of the navbar. @default "default" */
	variant?: NavbarVariants["variant"];
	/** The position of the navbar. @default "static" */
	position?: NavbarVariants["position"];
	/** Whether to show a bottom border. @default false */
	bordered?: boolean;
	/** The colour palette for solid variant. @default "accent" */
	colour?: ColourName;
	/** Whether to hide the navbar when scrolling down and show when scrolling up. @default false */
	shouldHideOnScroll?: boolean;
	/** Reference to the parent scroll container. Auto-detects if not provided. */
	parentRef?: HTMLElement | null;
	/** Content to render inside the navbar. */
	children?: Snippet;
	/** Additional CSS classes to apply. */
	class?: string;
	/** Accessible label for the navigation landmark. @default "Main navigation" */
	"aria-label"?: string;
}

let {
	variant = "default",
	position = "static",
	bordered = false,
	colour = "accent",
	shouldHideOnScroll = false,
	parentRef = null,
	children,
	class: className,
	style,
	"aria-label": ariaLabel = "Main navigation",
	...rest
}: Props = $props();

let navElement = $state<HTMLElement | null>(null);
let isHidden = $state(false);
let lastScrollY = 0;

const styles = $derived(navbar({ variant, position, bordered }));
const colourStyle = $derived(variant === "solid" ? getColourStyle(colour) : "");
const hideTransform = $derived(
	shouldHideOnScroll && isHidden ? "transform: translateY(-100%);" : "",
);
const finalStyle = $derived(
	[colourStyle, hideTransform, style].filter(Boolean).join(" "),
);

setContext<NavbarContext>(NAVBAR_CTX, {
	get variant() {
		return variant ?? "default";
	},
	get styles() {
		return styles;
	},
	get colourStyle() {
		return colourStyle;
	},
});

$effect(() => {
	if (!shouldHideOnScroll || typeof window === "undefined") return;

	const getScrollParent = (el: HTMLElement | null): HTMLElement | Window => {
		let parent = el?.parentElement;
		while (parent) {
			const { overflowY } = getComputedStyle(parent);
			if (overflowY === "auto" || overflowY === "scroll") return parent;
			parent = parent.parentElement;
		}
		return window;
	};

	const target = parentRef ?? getScrollParent(navElement);
	const getScrollY = () =>
		target instanceof Window ? target.scrollY : target.scrollTop;

	const onScroll = () => {
		const scrollY = getScrollY();
		isHidden = scrollY > lastScrollY && scrollY > 56;
		lastScrollY = scrollY;
	};

	target.addEventListener("scroll", onScroll, { passive: true });
	return () => target.removeEventListener("scroll", onScroll);
});
</script>

<nav
	bind:this={navElement}
	class={twMerge(styles.root(), className as string)}
	style={finalStyle}
	aria-label={ariaLabel}
	{...rest}
>
	{@render children?.()}
</nav>
