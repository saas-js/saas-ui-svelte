<script module lang="ts">
import { type VariantProps } from "tailwind-variants";
import {
	popoverContentStyles,
	type PopoverContentVariants,
} from "$saas/components/shared/popover-content.svelte";

export type ToggleTipVariants = {
	size?: "xs" | "sm" | "md" | "lg";
};
</script>

<script lang="ts">
import { Popover as ArkPopover } from "@ark-ui/svelte";
import { Portal } from "@ark-ui/svelte/portal";
import type { PopoverRootProps } from "@ark-ui/svelte/popover";
import type { Snippet, Component } from "svelte";
import { twMerge } from "tailwind-merge";
import { Button } from "$saas/components/button";
import { Icon } from "$saas/components/icon";

interface Props extends Omit<PopoverRootProps, "id" | "children"> {
	/**
	 * The unique identifier for the toggle tip.
	 * If not provided, a unique ID will be auto-generated.
	 */
	id?: string;
	/**
	 * The content to display in the toggle tip.
	 * Can be a string, snippet, or use children when triggerText/triggerIcon is provided.
	 */
	content?: string | Snippet;
	/**
	 * Content to display in the toggle tip when using triggerText/triggerIcon.
	 * When using simple trigger props, children become the content.
	 * When using custom trigger, use the trigger prop instead.
	 */
	children?: Snippet;
	/**
	 * Custom trigger element. Receives trigger props that must be spread onto an interactive element.
	 * Use this for custom triggers instead of children.
	 */
	trigger?: Snippet<[() => Record<string, any>]>;
	/**
	 * Simple text to display on the trigger button.
	 * When provided, children become the content.
	 */
	triggerText?: string;
	/**
	 * Icon component to display on the trigger button.
	 * When provided, children become the content.
	 */
	triggerIcon?: Component;
	/**
	 * Variant for the auto-generated trigger button.
	 * @default "ghost"
	 */
	triggerVariant?: "ghost" | "outline" | "solid" | "subtle" | "plain";
	/**
	 * Size for the auto-generated trigger button.
	 * @default "sm"
	 */
	triggerSize?: "xs" | "sm" | "md" | "lg";
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Additional CSS classes to apply to the trigger.
	 */
	triggerClass?: string;
	/**
	 * Accessible label for the trigger button.
	 */
	triggerAriaLabel?: string;
	/**
	 * The size of the toggle tip.
	 * @default "md"
	 */
	size?: ToggleTipVariants["size"];
	/**
	 * Whether to automatically set focus on the first focusable content within the popover when opened.
	 * @default true
	 */
	autoFocus?: boolean;
	/**
	 * Whether to close the popover when the escape key is pressed.
	 * @default true
	 */
	closeOnEscape?: boolean;
	/**
	 * Whether to close the popover when the user clicks outside of the popover.
	 * @default true
	 */
	closeOnInteractOutside?: boolean;
	/**
	 * Whether the popover should be modal.
	 * @default false
	 */
	modal?: boolean;
	/**
	 * Whether the popover is portalled.
	 * @default true
	 */
	portalled?: boolean;
	/**
	 * Shorthand for positioning.placement.
	 * @default "top"
	 */
	placement?: NonNullable<PopoverRootProps["positioning"]>["placement"];
	/**
	 * The positioning options for the toggle tip. Overrides placement if both are provided.
	 */
	positioning?: PopoverRootProps["positioning"];
}

let {
	id,
	content,
	children,
	trigger,
	triggerText,
	triggerIcon,
	triggerVariant = "ghost",
	triggerSize = "sm",
	class: className,
	triggerClass,
	triggerAriaLabel,
	size = "md",
	autoFocus = true,
	closeOnEscape = true,
	closeOnInteractOutside = true,
	modal = false,
	portalled = true,
	placement = "top",
	positioning,
	...rest
}: Props = $props();

const hasSimpleTrigger = $derived(triggerText || triggerIcon);
// When using simple trigger props, children become the content
const effectiveContent = $derived(
	content ?? (hasSimpleTrigger ? children : undefined),
);

const finalPositioning = $derived(
	positioning ?? { placement, gutter: 8, strategy: "absolute" as const },
);

const styles = $derived(
	popoverContentStyles({
		interactive: true,
		zIndex: 50,
		animation: "scale",
		fontWeight: "normal",
		padding: size === "lg" ? "md" : "sm",
	}),
);

const sizeClasses = {
	xs: "text-2xs leading-2xs px-1.5 py-0.5",
	sm: "text-xs leading-xs px-2 py-1",
	md: "text-sm leading-sm px-2.5 py-1",
	lg: "text-md leading-md px-3 py-1.5",
} as const;

const sizeClass = $derived(sizeClasses[size || "md"]);
</script>

<ArkPopover.Root
	id={id}
	autoFocus={autoFocus}
	closeOnEscape={closeOnEscape}
	closeOnInteractOutside={closeOnInteractOutside}
	modal={modal}
	portalled={portalled}
	positioning={finalPositioning}
	{...rest}
>
	<ArkPopover.Trigger class={triggerClass}>
		{#snippet asChild(props)}
			{#if trigger}
				{@render trigger(props)}
			{:else if hasSimpleTrigger}
				{@const triggerProps = props()}
				<Button
					variant={triggerVariant}
					size={triggerSize}
					icon={triggerIcon && !triggerText}
					aria-label={triggerAriaLabel}
					{...triggerProps}
					class={typeof triggerProps.class === "string" ? triggerProps.class : undefined}
					style={typeof triggerProps.style === "string" ? triggerProps.style : undefined}
				>
					{#if triggerIcon}
						<Icon as={triggerIcon} aria-hidden="true" />
					{/if}
					{#if triggerText}
						{triggerText}
					{/if}
				</Button>
			{/if}
		{/snippet}
	</ArkPopover.Trigger>
	<Portal>
		<ArkPopover.Positioner class={styles.positioner()}>
			<ArkPopover.Content
				class={twMerge(styles.content(), sizeClass, className as string)}
			>
				{#if typeof effectiveContent === "string"}
					{effectiveContent}
				{:else if effectiveContent}
					{@render effectiveContent()}
				{/if}
			</ArkPopover.Content>
		</ArkPopover.Positioner>
	</Portal>
</ArkPopover.Root>
