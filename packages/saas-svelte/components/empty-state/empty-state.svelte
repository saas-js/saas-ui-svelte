<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const emptyState = tv({
		slots: {
			root: "flex w-full h-full px-8 py-12 antialiased",
			content: "flex flex-col text-sm leading-5",
			iconWrapper:
				"flex items-center justify-center mb-3 text-3xl leading-9 tracking-tight",
			title: "wrap-break-word font-semibold text-base leading-6",
			description: "wrap-break-word text-fg-muted text-sm leading-5",
			actions: "flex gap-2 mt-3",
		},
		variants: {
			size: {
				sm: {
					root: "px-4 py-6",
					iconWrapper: "text-2xl mb-2",
					title: "text-sm",
					description: "text-xs",
					actions: "mt-2",
				},
				md: {
					root: "px-8 py-12",
					iconWrapper: "text-3xl mb-3",
					title: "text-base",
					description: "text-sm",
					actions: "mt-3",
				},
				lg: {
					root: "px-12 py-16",
					iconWrapper: "text-4xl mb-4",
					title: "text-lg",
					description: "text-base",
					actions: "mt-4",
				},
			},
			align: {
				centre: {
					root: "flex-col justify-center items-center",
					content: "text-center justify-center items-center gap-1",
				},
				start: {
					root: "flex-col justify-start items-start",
					content: "text-left justify-start items-start gap-1",
				},
				end: {
					root: "flex-col justify-end items-end",
					content: "text-right justify-end items-end gap-1",
				},
			},
		},
		defaultVariants: {
			size: "md",
			align: "centre",
		},
	});

	export type EmptyStateVariants = VariantProps<typeof emptyState>;
</script>

<script lang="ts">
	import type { Snippet, Component } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import { Icon } from "$saas/components/icon";
	import { Flex } from "$saas/layout/flex";
	import { Heading } from "$saas/typography/heading";
	import { Text } from "$saas/typography/text";

	interface Props {
		/**
		 * Additional CSS classes to apply to the empty state container.
		 */
		class?: string;
		/**
		 * The size of the empty state component.
		 * @default "md"
		 */
		size?: EmptyStateVariants["size"];
		/**
		 * The alignment of the empty state content.
		 * @default "centre"
		 */
		align?: EmptyStateVariants["align"];
		/**
		 * The colour palette of the empty state icon.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * The icon to display. Pass a Phosphor icon component.
		 */
		icon?: Component<any>;
		/**
		 * The title text to display.
		 */
		title?: string;
		/**
		 * The description text to display.
		 */
		description?: string;
		/**
		 * The content to be rendered inside the empty state (e.g., action buttons).
		 */
		children?: Snippet;
		/**
		 * Inline styles to apply to the empty state.
		 */
		style?: string;
		/**
		 * Additional HTML attributes to spread onto the container element.
		 */
		[key: string]: any;
	}

	let {
		class: className,
		size = "md",
		align = "centre",
		colour = "gray",
		icon,
		title,
		description,
		children,
		style,
		...restProps
	}: Props = $props();

	const colourStyle = $derived(getColourStyle(colour));
	const finalStyle = $derived(
		[colourStyle, style].filter(Boolean).join("; "),
	);

	const {
		root,
		content,
		iconWrapper,
		title: titleClass,
		description: descriptionClass,
		actions,
	} = $derived(emptyState({ size, align }));
</script>

<Flex class={twMerge(root(), className)} style={finalStyle} {...restProps}>
	<Flex direction="column" class={content()}>
		{#if icon}
			<Flex
				align="center"
				justify="center"
				class={twMerge(iconWrapper(), "text-(--c-solid)")}
			>
				<Icon as={icon} size="2xl" />
			</Flex>
		{/if}

		{#if title}
			<Heading as="h3" class={titleClass()}>
				{title}
			</Heading>
		{/if}

		{#if description}
			<Text class={descriptionClass()}>
				{description}
			</Text>
		{/if}

		{#if children}
			<Flex class={actions()}>
				{@render children()}
			</Flex>
		{/if}
	</Flex>
</Flex>
