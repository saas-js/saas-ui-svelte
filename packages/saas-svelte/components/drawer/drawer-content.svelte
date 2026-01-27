<script lang="ts">
	import { Dialog, Portal } from "@ark-ui/svelte";
	import { tv } from "tailwind-variants";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { DRAWER_CTX } from "./drawer-root.svelte";

	interface Props {
		/**
		 * The drawer content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The offset from the edge of the viewport (in spacing units).
		 * Overrides the attached prop when set.
		 */
		offset?: string;
		/**
		 * Custom border radius class (e.g., "rounded-md", "rounded-lg").
		 * When used with offset, applies rounding to the drawer.
		 */
		rounded?: string;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		offset,
		rounded,
		...rest
	}: Props = $props();

	type DrawerContext = {
		size: "xs" | "sm" | "md" | "lg" | "xl" | "full";
		placement: "start" | "end" | "top" | "bottom";
		attached: boolean;
	};

	const ctx = getContext(DRAWER_CTX) as DrawerContext;

	// Determine if we should use offset styling
	const hasOffset = $derived(offset !== undefined);

	const positionerStyles = tv({
		base: [
			"fixed",
			"inset-0",
			"z-1000",
			"flex",
			"pointer-events-auto",
			"overscroll-y-none",
		],
		variants: {
			placement: {
				start: "justify-start items-stretch",
				end: "justify-end items-stretch",
				top: "justify-stretch items-start",
				bottom: "justify-stretch items-end",
			},
			attached: {
				true: "p-0",
				false: "p-2",
			},
		},
		defaultVariants: {
			placement: "end",
			attached: false,
		},
	});

	const contentStyles = tv({
		base: [
			"relative",
			"flex",
			"flex-col",
			"bg-bg-overlay",
			"backdrop-blur-xl",
			"shadow-overlay",
			"outline-none",
			"antialiased",
			"text-sm",
			"leading-sm",
			"pointer-events-auto",
			"z-1000",
			"max-h-screen",
			"overflow-hidden",
		],
		variants: {
			size: {
				xs: "",
				sm: "",
				md: "",
				lg: "",
				xl: "",
				full: "",
			},
			placement: {
				start: "h-full",
				end: "h-full",
				top: "w-full",
				bottom: "w-full",
			},
			attached: {
				true: "",
				false: "rounded-lg",
			},
		},
		compoundVariants: [
			// Horizontal sizes (start/end placement)
			{ placement: "start", size: "xs", class: "w-full max-w-xs" },
			{ placement: "start", size: "sm", class: "w-full max-w-md" },
			{ placement: "start", size: "md", class: "w-full max-w-lg" },
			{ placement: "start", size: "lg", class: "w-full max-w-2xl" },
			{ placement: "start", size: "xl", class: "w-full max-w-4xl" },
			{ placement: "start", size: "full", class: "w-full" },
			{ placement: "end", size: "xs", class: "w-full max-w-xs" },
			{ placement: "end", size: "sm", class: "w-full max-w-md" },
			{ placement: "end", size: "md", class: "w-full max-w-lg" },
			{ placement: "end", size: "lg", class: "w-full max-w-2xl" },
			{ placement: "end", size: "xl", class: "w-full max-w-4xl" },
			{ placement: "end", size: "full", class: "w-full" },
			// Vertical sizes (top/bottom placement)
			{ placement: "top", size: "xs", class: "h-1/4" },
			{ placement: "top", size: "sm", class: "h-1/3" },
			{ placement: "top", size: "md", class: "h-1/2" },
			{ placement: "top", size: "lg", class: "h-2/3" },
			{ placement: "top", size: "xl", class: "h-3/4" },
			{ placement: "top", size: "full", class: "h-full" },
			{ placement: "bottom", size: "xs", class: "h-1/4" },
			{ placement: "bottom", size: "sm", class: "h-1/3" },
			{ placement: "bottom", size: "md", class: "h-1/2" },
			{ placement: "bottom", size: "lg", class: "h-2/3" },
			{ placement: "bottom", size: "xl", class: "h-3/4" },
			{ placement: "bottom", size: "full", class: "h-full" },
		],
		defaultVariants: {
			size: "sm",
			placement: "end",
			attached: false,
		},
	});

	// Map placement to animation classes
	const getAnimationClasses = (placement: string) => {
		const animations: Record<string, string> = {
			start: "data-[state=open]:animate-drawer-in-left data-[state=closed]:animate-drawer-out-left",
			end: "data-[state=open]:animate-drawer-in-right data-[state=closed]:animate-drawer-out-right",
			top: "data-[state=open]:animate-drawer-in-top data-[state=closed]:animate-drawer-out-top",
			bottom: "data-[state=open]:animate-drawer-in-bottom data-[state=closed]:animate-drawer-out-bottom",
		};
		return animations[placement] || animations.end;
	};
</script>

<Portal>
	<Dialog.Backdrop
		class="fixed inset-0 z-999 transition-opacity duration-moderate bg-bg-backdrop data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
		data-state-layer
	/>

	<Dialog.Positioner
		class={positionerStyles({
			placement: ctx.placement,
			attached: hasOffset ? false : ctx.attached,
		})}
		style={hasOffset ? `padding: ${offset}` : undefined}
	>
		<Dialog.Content
			tabindex={-1}
			class={twMerge(
				contentStyles({
					size: ctx.size,
					placement: ctx.placement,
					attached: hasOffset ? false : ctx.attached,
				}),
				hasOffset && rounded ? rounded : "",
				getAnimationClasses(ctx.placement),
				className,
			)}
			{...rest}
		>
			{@render children()}
		</Dialog.Content>
	</Dialog.Positioner>
</Portal>
