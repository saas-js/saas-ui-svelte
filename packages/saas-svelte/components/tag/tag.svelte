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
			"gap-x-1 gap-y-1",
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
				outline:
					"text-(--c-fg) shadow-[inset_0_0_0_1px_var(--c-border)]",
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
				sm: "w-3.5 h-3.5 -mr-0.5",
				md: "w-4 h-4 -mr-1",
				lg: "w-5 h-5 -mr-1.5",
				xl: "w-5 h-5 -mr-1.5",
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
			"w-full",
			"h-full",
			"after:content-['']",
			"after:w-6",
			"after:h-6",
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
				sm: "w-3.5 h-3.5",
				md: "w-4 h-4",
				lg: "w-5 h-5",
				xl: "w-6 h-6",
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
				sm: "w-3.5 h-3.5 -ml-0.5",
				md: "w-4 h-4 -ml-1",
				lg: "w-5 h-5 -ml-1.5",
				xl: "w-6 h-6 -ml-2",
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
	import { getColourStyle } from "$saas/utils/colours";
	import X from "phosphor-svelte/lib/X";
	import { Icon } from "$saas/components/icon";
	import { Avatar } from "$saas/components/avatar";

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

<span class={finalClass} style={finalStyle} {...restProps}>
	{#if startAvatar}
		<span class={avatarClass}>
			<Avatar src={startAvatar.src} name={startAvatar.name} size="full" />
		</span>
	{:else if startIcon}
		<span class={elementClass}>
			<Icon as={startIcon} class="w-4/5 h-4/5" aria-hidden="true" />
		</span>
	{:else if startElement}
		<span class={elementClass}>
			{@render startElement()}
		</span>
	{/if}
	<span class={labelClass}>
		{@render children()}
	</span>
	{#if endIcon}
		<span class={elementClass}>
			<Icon
				as={endIcon}
				class="w-full h-full"
				weight="bold"
				aria-hidden="true"
			/>
		</span>
	{:else if endElement}
		<span class={elementClass}>
			{@render endElement()}
		</span>
	{/if}
	{#if closable}
		<span class={tagCloseTrigger({ size })}>
			<button
				type="button"
				class={tagCloseButton()}
				onclick={handleClose}
				aria-label="Remove tag"
			>
				<X class="w-full h-full fill-current" aria-hidden="true" />
			</button>
		</span>
	{/if}
</span>
