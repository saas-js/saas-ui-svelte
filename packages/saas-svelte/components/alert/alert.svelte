<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const alert = tv({
		slots: {
			root: "relative w-full flex items-start p-4 rounded-md text-sm leading-5 antialiased gap-3",
			iconWrapper:
				"shrink-0 inline-flex items-center justify-center size-5 text-lg leading-7",
			content: "flex-1 flex flex-col gap-1",
			title: "font-medium",
			description: "inline",
		},
		variants: {
			variant: {
				subtle: {
					root: "bg-(--c-muted) text-(--c-fg)",
					iconWrapper: "text-current",
				},
				solid: {
					root: "bg-(--c-solid) text-(--c-contrast)",
					iconWrapper: "text-(--c-contrast)",
				},
				surface: {
					root: "bg-(--c-muted) text-(--c-fg) shadow-[inset_0_0_0_1px_var(--c-solid)]",
					iconWrapper: "text-(--c-fg)",
				},
				outline: {
					root: "bg-transparent text-(--c-fg) shadow-[inset_0_0_0_1px_var(--c-subtle)]",
					iconWrapper: "text-(--c-fg)",
				},
			},
		},
		defaultVariants: {
			variant: "subtle",
		},
	});

	export type AlertVariants = VariantProps<typeof alert>;
</script>

<script lang="ts">
	import InfoIcon from "phosphor-svelte/lib/InfoIcon";
	import CheckCircleIcon from "phosphor-svelte/lib/CheckCircleIcon";
	import WarningIcon from "phosphor-svelte/lib/WarningIcon";
	import XCircleIcon from "phosphor-svelte/lib/XCircleIcon";
	import type { Snippet, Component } from "svelte";
	import { twMerge } from "tailwind-merge";

	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import { Icon } from "$saas/components/icon";
	import { Flex } from "$saas/layout/flex";
	import { Box } from "$saas/layout/box";
	import { Stack } from "$saas/layout/stack";

	type Status = "info" | "success" | "warning" | "error" | "neutral";

	interface Props {
		/**
		 * Additional CSS classes to apply to the alert.
		 */
		class?: string;
		/**
		 * The visual style of the alert.
		 * @default "subtle"
		 */
		variant?: AlertVariants["variant"];
		/**
		 * The status of the alert, which controls the color and icon.
		 * @default "info"
		 */
		status?: Status;
		/**
		 * The colour palette of the alert.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Override the default icon. Pass `false` to hide the icon.
		 */
		icon?: boolean | Component<any>;
		/**
		 * The title of the alert.
		 */
		title?: string;
		/**
		 * The content to be rendered inside the alert.
		 */
		children?: Snippet;
		/**
		 * Inline styles to apply to the alert.
		 */
		style?: string;
		[key: string]: any;
	}

	let {
		class: className,
		variant = "subtle",
		status = "info",
		colour,
		icon,
		title,
		children,
		style,
		...restProps
	}: Props = $props();

	const statusColourMap: Record<Status, ColourName> = {
		info: "blue",
		success: "green",
		warning: "orange",
		error: "red",
		neutral: "gray",
	};

	const resolvedColour = $derived(
		colour ?? statusColourMap[status] ?? "gray",
	);

	const colourStyle = $derived(getColourStyle(resolvedColour));
	const finalStyle = $derived(
		[colourStyle, style].filter(Boolean).join("; "),
	);

	const statusIconMap = {
		info: InfoIcon,
		success: CheckCircleIcon,
		warning: WarningIcon,
		error: XCircleIcon,
		neutral: InfoIcon,
	};

	const IconToRender = $derived.by(() => {
		if (icon === false) return null;
		if (icon && typeof icon !== "boolean") return icon;
		return statusIconMap[status];
	});

	const {
		root,
		iconWrapper,
		content,
		title: titleClass,
		description,
	} = $derived(alert({ variant }));
</script>

<Flex
	role="alert"
	align="start"
	class={twMerge(root(), className as string)}
	style={finalStyle}
	{...restProps}
>
	{#if IconToRender}
		<Box as="span" class={iconWrapper()}>
			<Icon as={IconToRender} size="md" />
		</Box>
	{/if}

	<Stack gap={1} class={content()}>
		{#if title}
			<Box class={titleClass()}>
				{title}
			</Box>
		{/if}

		{#if children}
			<Box class={description()}>
				{@render children?.()}
			</Box>
		{/if}
	</Stack>
</Flex>
