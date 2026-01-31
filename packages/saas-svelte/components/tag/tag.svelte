<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import type { HTMLAttributes } from "svelte/elements";
import type { ColourName } from "$saas/utils/colours";

/**
 * Tailwind Variants styles for the Tag component.
 */
export const tag = tv({
	base: [
		"align-top",
		"select-none",
		"items-center",
		"gap-1",
		"max-w-full",
		"inline-flex",
		"rounded-full",
		"antialiased",
		"focus-visible:outline-offset-2",
		"focus-visible:outline-1",
		"focus-visible:outline-solid",
		"focus-visible:outline-ring",
	],
	variants: {
		variant: {
			subtle: "bg-(--c-muted) text-(--c-fg)",
			solid: "bg-(--c-solid) text-(--c-contrast)",
			outline: "text-(--c-fg) shadow-[inset_0_0_0_1px_var(--c-border)]",
			surface:
				"bg-(--c-muted) text-(--c-fg) shadow-[inset_0_0_0_1px_var(--c-border)]",
		},
		size: {
			sm: "min-h-5 text-xs leading-4 px-1.5",
			md: "min-h-6 text-xs leading-4 px-2",
			lg: "min-h-7 text-sm leading-5 px-2.5",
			xl: "min-h-8 text-sm leading-5 px-3",
		},
	},
	defaultVariants: {
		variant: "surface",
		size: "md",
	},
});

/**
 * Tailwind Variants styles for the Tag label.
 */
export const tagLabel = tv({
	base: [
		"line-clamp-1",
		"overflow-hidden",
		"[display:-webkit-box]",
		"[-webkit-line-clamp:1]",
	],
});

/**
 * Tailwind Variants styles for the Tag close trigger wrapper.
 */
export const tagCloseTrigger = tv({
	base: ["shrink-0", "block"],
	variants: {
		size: {
			sm: "size-3.5 -mr-0.5",
			md: "size-4 -mr-1",
			lg: "size-5 -mr-1.5",
			xl: "size-5 -mr-1.5",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

/**
 * Tailwind Variants styles for the Tag close button.
 */
export const tagCloseButton = tv({
	base: [
		"appearance-auto",
		"cursor-pointer",
		"text-current",
		"opacity-80",
		"outline-0",
		"justify-center",
		"items-center",
		"flex",
		"relative",
		"p-px",
		"rounded-full",
		"size-full",
		"after:content-['']",
		"after:size-6",
		"after:absolute",
		"after:rounded-full",
		"focus-visible:outline-2",
		"focus-visible:outline-solid",
		"focus-visible:outline-ring",
		"hover:opacity-100",
		"hover:bg-bg-muted",
	],
});

/**
 * Tailwind Variants styles for the Tag start/end element.
 */
export const tagElement = tv({
	base: ["shrink-0", "justify-center", "items-center", "inline-flex"],
	variants: {
		size: {
			sm: "size-3.5",
			md: "size-4",
			lg: "size-5",
			xl: "size-6",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const tagAvatar = tv({
	base: ["shrink-0", "justify-center", "items-center", "inline-flex"],
	variants: {
		size: {
			sm: "size-3.5 -ml-0.5",
			md: "size-4 -ml-1",
			lg: "size-5 -ml-1.5",
			xl: "size-6 -ml-2",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type TagVariants = VariantProps<typeof tag>;
</script>

<script lang="ts">
import type { Snippet, Component } from "svelte";
import { twMerge } from "tailwind-merge";
import { getColourStyle } from "$saas/utils/colours";
import XIcon from "phosphor-svelte/lib/XIcon";
import { Icon } from "$saas/components/icon";
import { Avatar } from "$saas/components/avatar";
import { Box } from "$saas/layout/box";

interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
	/**
	 * The tag content.
	 */
	children: Snippet;
	/**
	 * The visual style of the tag.
	 * @default "surface"
	 */
	variant?: TagVariants["variant"];
	/**
	 * The size of the tag.
	 * @default "md"
	 */
	size?: TagVariants["size"];
	/**
	 * The colour palette of the tag.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Whether the tag is closable.
	 * @default false
	 */
	closable?: boolean;
	/**
	 * Callback when the close button is clicked.
	 */
	onClose?: () => void;
	/**
	 * Icon component to display at the start of the tag.
	 */
	startIcon?: Component;
	/**
	 * Icon component to display at the end of the tag.
	 */
	endIcon?: Component;
	/**
	 * Avatar configuration for start element. Accepts src and name.
	 */
	startAvatar?: { src?: string; name?: string };
	/**
	 * Element to display at the start of the tag (for complex content).
	 */
	startElement?: Snippet;
	/**
	 * Element to display at the end of the tag (for complex content).
	 */
	endElement?: Snippet;
	/**
	 * Maximum width of the tag. Content exceeding this width will be truncated.
	 */
	maxWidth?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	children,
	variant = "surface",
	size = "md",
	colour = "gray",
	closable = false,
	onClose,
	startIcon,
	endIcon,
	startAvatar,
	startElement,
	endElement,
	maxWidth,
	class: className,
	style,
	...restProps
}: Props = $props();

const colourStyle = $derived(getColourStyle(colour));
const maxWidthStyle = $derived(maxWidth ? `max-width: ${maxWidth}` : "");
const finalStyle = $derived(
	[colourStyle, maxWidthStyle, style].filter(Boolean).join("; "),
);

const finalClass = $derived(tag({ variant, size, class: className }));
const labelClass = $derived(tagLabel());
const closeClass = $derived(tagCloseTrigger({ size }));
const elementClass = $derived(tagElement({ size }));
const avatarClass = $derived(tagAvatar({ size }));

function handleClose(event: MouseEvent) {
	event.stopPropagation();
	onClose?.();
}
</script>

<Box as="span" class={twMerge(finalClass)} style={finalStyle} {...restProps}>
	{#if startAvatar}
		<Box as="span" class={twMerge(avatarClass)}>
			<Avatar src={startAvatar.src} name={startAvatar.name} size="full" />
		</Box>
	{:else if startIcon}
		<Box as="span" class={twMerge(elementClass)}>
			<Icon as={startIcon} class="size-4/5" aria-hidden="true" />
		</Box>
	{:else if startElement}
		<Box as="span" class={twMerge(elementClass)}>
			{@render startElement()}
		</Box>
	{/if}
	<Box as="span" class={twMerge(labelClass)}>
		{@render children()}
	</Box>
	{#if endIcon}
		<Box as="span" class={twMerge(elementClass)}>
			<Icon
				as={endIcon}
				class="size-full"
				weight="bold"
				aria-hidden="true"
			/>
		</Box>
	{:else if endElement}
		<Box as="span" class={twMerge(elementClass)}>
			{@render endElement()}
		</Box>
	{/if}
	{#if closable}
		<Box as="span" class={twMerge(tagCloseTrigger({ size }))}>
			<button
				type="button"
				class={tagCloseButton()}
				onclick={handleClose}
				aria-label="Remove tag"
			>
				<XIcon class="size-full fill-current" aria-hidden="true" />
			</button>
		</Box>
	{/if}
</Box>
