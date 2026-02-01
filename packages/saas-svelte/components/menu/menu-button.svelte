<script lang="ts">
import { Menu } from "@ark-ui/svelte/menu";
import type { MenuTriggerProps } from "@ark-ui/svelte/menu";
import { button, type ButtonVariants } from "../button/button.svelte";
import type { Snippet } from "svelte";
import { type ColourName, getColourStyle } from "$saas/utils/colours";
import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
import { getContext } from "svelte";
import type { BreadcrumbVariants } from "../breadcrumb/breadcrumb-root.svelte";

interface BreadcrumbContext {
	size: BreadcrumbVariants["size"];
}

interface Props extends MenuTriggerProps {
	/**
	 * The button content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The visual style of the button.
	 * @default "outline"
	 */
	variant?: ButtonVariants["variant"] | "breadcrumb";
	/**
	 * The size of the button.
	 * @default "md"
	 */
	size?: ButtonVariants["size"];
	/**
	 * The colour palette of the button.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Whether to show the dropdown indicator.
	 * @default true
	 */
	showIndicator?: boolean;
	/**
	 * Additional inline styles.
	 */
	style?: string;
}

let {
	children,
	class: className,
	asChild,
	variant = "outline",
	size,
	colour = "gray",
	showIndicator = false,
	style,
	...rest
}: Props = $props();

const breadcrumbContext = getContext<BreadcrumbContext | undefined>(
	"breadcrumb",
);

const isBreadcrumb = $derived(variant === "breadcrumb");
const buttonVariant = $derived(
	(isBreadcrumb ? "ghost" : variant) as ButtonVariants["variant"],
);
// For breadcrumb variant, use the breadcrumb context size; otherwise use the provided size or default to "md"
const buttonSize = $derived(
	isBreadcrumb ? (breadcrumbContext?.size ?? "sm") : (size ?? "md"),
);
const breadcrumbClasses =
	"h-auto min-h-0 text-fg-muted hover:text-fg-default hover:bg-transparent gap-2 px-0 cursor-default font-normal transition-none [&]:focus-visible:outline-neutral-focus-ring [&_svg]:size-[1em]";

// Don't apply colour variables for breadcrumb variant - it inherits from parent
const colourVars = $derived(isBreadcrumb ? undefined : getColourStyle(colour));
const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
const finalClassName = $derived(
	isBreadcrumb
		? [breadcrumbClasses, className].filter(Boolean).join(" ")
		: className,
);
</script>

{#if asChild}
	<Menu.Trigger asChild={asChild} {...rest}>
		{@render children()}
	</Menu.Trigger>
{:else}
	<Menu.Trigger
		class={button({
			variant: buttonVariant,
			size: buttonSize,
			class: finalClassName,
		})}
		style={finalStyle}
		{...rest}
	>
		{@render children()}
		{#if showIndicator || isBreadcrumb}
			<CaretDownIcon aria-hidden="true" />
		{/if}
	</Menu.Trigger>
{/if}
