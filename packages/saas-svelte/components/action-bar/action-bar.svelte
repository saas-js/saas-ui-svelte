<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const actionBar = tv({
		slots: {
			root: [
				"fixed bottom-4 left-0 right-0",
				"z-popover",
				"flex justify-center",
				"px-2",
				"pointer-events-none",
			],
			content: [
				"pointer-events-auto",
				"inline-flex items-center gap-x-3 gap-y-3",
				"px-3 py-2.5",
				"rounded-md",
				"shadow-md",
				"bg-bg-overlay backdrop-blur-lg text-fg-default",
				"leading-normal antialiased",
				"whitespace-nowrap",
				"overflow-x-auto",
				"max-w-full",
				"data-[state=open]:animate-action-bar-in data-[state=closed]:animate-action-bar-out",
			],
			selectionTrigger: [
				"appearance-auto self-stretch items-center gap-2",
				"text-sm leading-sm",
				"inline-flex px-4 py-1",
				"rounded-l1 border border-dashed border-border-default",
				"text-fg-muted",
				"cursor-pointer",
				"transition-all duration-moderate",
				"hover:bg-bg-subtle",
				"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-fg-muted",
			],
			separator: ["bg-border-default w-px h-5 self-stretch"],
			closeButton: [
				"appearance-none select-none whitespace-nowrap align-middle",
				"cursor-pointer isolate",
				"shrink-0 justify-center items-center gap-2",
				"min-w-7 h-7",
				"text-sm font-medium leading-sm",
				"inline-flex rounded-l1",
				"text-fg-muted outline-0",
				"transition-all duration-moderate",
				"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-fg-muted",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				"hover:bg-bg-subtle hover:text-fg-default",
			],
		},
	});

	export type ActionBarVariants = VariantProps<typeof actionBar>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { Portal } from "@ark-ui/svelte/portal";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Whether the action bar is open/visible.
		 * @default false
		 */
		open?: boolean;
		/**
		 * Callback fired when the open state changes.
		 */
		onOpenChange?: (details: { open: boolean }) => void;
		/**
		 * Whether to close the action bar when clicking outside.
		 * @default false
		 */
		closeOnInteractOutside?: boolean;
		/**
		 * Content to render inside the action bar.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		open = false,
		onOpenChange,
		closeOnInteractOutside = false,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const styles = actionBar();

	// Track visibility separately to allow exit animation to complete
	let visible = $state(false);

	$effect(() => {
		if (open) {
			visible = true;
		}
	});

	function handleAnimationEnd(event: AnimationEvent) {
		// Only handle the out animation (using composed fade-out + slide-to-bottom-full)
		if (!open && event.animationName === "fade-out") {
			visible = false;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (!closeOnInteractOutside || !open) return;
		const target = event.target as HTMLElement;
		if (!target.closest('[data-part="action-bar-content"]')) {
			onOpenChange?.({ open: false });
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

{#if visible}
	<Portal>
		<div
			class={twMerge(styles.root() as string, className as string)}
			data-part="action-bar-root"
			data-state={open ? "open" : "closed"}
			role="toolbar"
			aria-label="Bulk actions"
			{...restProps}
		>
			<div
				class={twMerge(styles.content() as string)}
				data-part="action-bar-content"
				data-state={open ? "open" : "closed"}
				onanimationend={handleAnimationEnd}
			>
				{@render children?.()}
			</div>
		</div>
	</Portal>
{/if}
