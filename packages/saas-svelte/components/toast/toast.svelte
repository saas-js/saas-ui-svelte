<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";

	export const toast = tv({
		slots: {
			root: [
				// Layout
				"w-[calc(100vw-2rem)]",
				"md:w-96",
				"flex",
				"items-start",
				"gap-x-2",
				"pl-3",
				"pr-6",
				"py-3",
				// Appearance
				"rounded-md",
				"border",
				"border-border-muted",
				"shadow-lg",
				"bg-bg-overlay",
				"text-fg-default",
				"antialiased",
				// Positioning
				"pointer-events-auto",
				"relative",
			],
			icon: "shrink-0 size-5 stroke-current fill-current stroke-0",
			spinner: [
				"shrink-0",
				"size-4",
				"mt-0.5",
				"animate-spin",
				"[animation-duration:var(--durations-slow)]",
				"text-accent-solid",
			],
			content: "flex flex-col flex-1 max-w-full",
			title: "text-sm font-medium leading-sm me-2",
			description: "opacity-80 text-sm leading-sm inline",
			descriptionOnly: "text-sm leading-sm flex-1",
			action: [
				"appearance-auto",
				"cursor-pointer",
				"h-6",
				"self-start",
				"text-sm",
				"font-medium",
				"leading-sm",
				"transition-colors",
				"duration-moderate",
				"-ms-3",
				"px-3",
				"rounded",
				"text-accent-fg/80",
				"hover:text-accent-fg",
				"hover:bg-bg-subtle",
			],
			close: [
				"absolute",
				"top-2",
				"end-2",
				"appearance-none",
				"select-none",
				"cursor-pointer",
				"shrink-0",
				"justify-center",
				"items-center",
				"min-w-6",
				"h-6",
				"text-xs",
				"font-medium",
				"inline-flex",
				"rounded",
				"text-fg-default",
				"outline-0",
				"transition-colors",
				"duration-moderate",
				"hover:bg-bg-subtle",
			],
		},
		variants: {
			status: {
				info: {
					icon: "",
					descriptionOnly: "font-medium",
				},
				success: {
					icon: "text-fg-success",
					descriptionOnly: "font-medium",
				},
				warning: {
					icon: "text-fg-warning",
					descriptionOnly: "font-medium",
				},
				error: {
					icon: "text-fg-error",
					descriptionOnly: "font-medium",
				},
				loading: {
					icon: "text-accent-fg",
					descriptionOnly: "opacity-80",
				},
			},
		},
		defaultVariants: {
			status: "info",
		},
	});

	export type ToastVariants = VariantProps<typeof toast>;
	export type ToastStatus =
		| "info"
		| "success"
		| "warning"
		| "error"
		| "loading";
</script>

<script lang="ts">
	import type { Snippet, Component } from "svelte";
	import CheckCircleIcon from "phosphor-svelte/lib/CheckCircleIcon";
	import WarningCircleIcon from "phosphor-svelte/lib/WarningCircleIcon";
	import XIcon from "phosphor-svelte/lib/XIcon";
	import { Icon } from "$saas/components/icon";
	import { Spinner } from "$saas/components/spinner";
	import { Flex } from "$saas/layout/flex";
	import { VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";

	interface Props {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The status/type of the toast notification.
		 * @default "info"
		 */
		status?: ToastStatus;
		/**
		 * Custom icon component, or false to hide the icon.
		 */
		icon?: boolean | Component<any>;
		/**
		 * The title text of the toast.
		 */
		title?: string;
		/**
		 * The description text of the toast.
		 */
		description?: string;
		/**
		 * An action button to display in the toast.
		 */
		action?: { label: string; onClick?: () => void };
		/**
		 * Whether the toast can be dismissed.
		 * @default true
		 */
		closable?: boolean;
		/**
		 * Callback invoked when the toast is closed.
		 */
		onclose?: () => void;
		/**
		 * Custom content to render inside the toast.
		 */
		children?: Snippet;
	}

	let {
		class: className,
		status = "info",
		icon,
		title,
		description,
		action,
		closable = true,
		onclose,
		children,
	}: Props = $props();

	const ICONS: Record<ToastStatus, Component<any> | null> = {
		info: null,
		success: CheckCircleIcon,
		warning: WarningCircleIcon,
		error: WarningCircleIcon,
		loading: null,
	};

	const resolvedIcon = $derived(
		typeof icon !== "boolean" && icon
			? icon
			: icon === false
				? null
				: ICONS[status],
	);

	// Single-line toast: description only, no title or action, and not loading
	const isSingleLine = $derived(
		description && !title && !action && status !== "loading",
	);

	const styles = $derived(toast({ status }));
</script>

<Flex
	align="start"
	gap={2}
	class={twMerge(styles.root(), className as string)}
	role="status"
	aria-live="polite"
>
	{#if children}
		{@render children()}
	{:else if isSingleLine}
		{#if status === "loading"}
			<Spinner size="sm" colour="indigo" class="mt-0.5 shrink-0" />
		{:else if resolvedIcon}
			<Icon as={resolvedIcon} class={styles.icon()} />
		{/if}
		<Text as="p" class={twMerge(styles.descriptionOnly())}
			>{description}</Text
		>
	{:else}
		{#if status === "loading"}
			<Spinner size="sm" colour="indigo" class="mt-0.5 shrink-0" />
		{:else if resolvedIcon}
			<Icon as={resolvedIcon} class={styles.icon()} />
		{/if}

		<VStack gap={0} class={twMerge(styles.content())}>
			{#if title}
				<Text as="p" class={twMerge(styles.title())}>{title}</Text>
			{/if}
			{#if description}
				<Text as="p" class={twMerge(styles.description())}
					>{description}</Text
				>
			{/if}
			{#if action}
				<button
					type="button"
					class={styles.action()}
					onclick={action.onClick}
				>
					{action.label}
				</button>
			{/if}
		</VStack>
	{/if}

	{#if closable}
		<button
			type="button"
			class={styles.close()}
			aria-label="Dismiss notification"
			onclick={onclose}
		>
			<Icon as={XIcon} size="xs" />
		</button>
	{/if}
</Flex>
