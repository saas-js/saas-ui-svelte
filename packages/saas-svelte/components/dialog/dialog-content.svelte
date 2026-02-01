<script lang="ts">
import { Dialog } from "@ark-ui/svelte/dialog";
import { Portal } from "@ark-ui/svelte/portal";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { getContext, type Snippet } from "svelte";
import { DIALOG_CTX } from "./dialog-root.svelte";

interface Props {
	children: Snippet;
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...rest }: Props = $props();

type DialogContext = {
	size: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "cover";
	placement: "center" | "top" | "bottom";
	scrollBehavior: "inside" | "outside";
	motionPreset: "scale" | "slide-in-bottom" | "none";
};

const ctx = getContext(DIALOG_CTX) as DialogContext;

// For cover size, override placement and scrollBehavior
const effectivePlacement = $derived(
	ctx.size === "cover" ? "center" : ctx.placement,
);
const effectiveScrollBehavior = $derived(
	ctx.size === "cover" ? "inside" : ctx.scrollBehavior,
);

const positionerStyles = tv({
	base: [
		"fixed",
		"inset-0",
		"z-1000",
		"flex",
		"justify-center",
		"pointer-events-auto",
		"overscroll-y-none",
	],
	variants: {
		placement: {
			center: "items-center",
			top: "items-start",
			bottom: "items-end",
		},
		scrollBehavior: {
			inside: "overflow-hidden",
			outside: "overflow-y-auto overflow-x-auto",
		},
		size: {
			xs: "",
			sm: "",
			md: "",
			lg: "",
			xl: "",
			full: "",
			cover: "p-10 items-center justify-center",
		},
	},
	defaultVariants: {
		placement: "center",
		scrollBehavior: "outside",
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
		"mx-auto",
		"outline-none",
		"antialiased",
		"text-sm",
		"leading-sm",
		"pointer-events-auto",
		"z-1000",
	],
	variants: {
		size: {
			xs: "w-full max-w-sm rounded-lg",
			sm: "w-full max-w-md rounded-lg",
			md: "w-full max-w-lg rounded-lg",
			lg: "w-full max-w-2xl rounded-lg",
			xl: "w-full max-w-4xl rounded-lg",
			full: "w-full h-full my-0",
			cover: "w-full h-full rounded-lg my-0 overflow-hidden",
		},
		scrollBehavior: {
			inside: "max-h-[calc(100vh-var(--spacing-16))] my-auto",
			outside: "my-16",
		},
		placement: {
			center: "",
			top: "mb-auto",
			bottom: "mt-auto",
		},
	},
	compoundVariants: [
		{
			size: "full",
			scrollBehavior: "outside",
			class: "my-0",
		},
	],
	defaultVariants: {
		size: "md",
		placement: "center",
	},
});
</script>

<Portal>
	<Dialog.Backdrop
		class="duration-moderate bg-bg-backdrop data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-999 transition-opacity"
		data-state-layer
	/>

	<Dialog.Positioner
		class={positionerStyles({
			placement: effectivePlacement,
			scrollBehavior: effectiveScrollBehavior,
			size: ctx.size,
		})}
	>
		<Dialog.Content
			tabindex={-1}
			class={twMerge(
				contentStyles({
					size: ctx.size,
					scrollBehavior: effectiveScrollBehavior,
					placement: effectivePlacement,
					class: className,
				}),
				ctx.motionPreset === "slide-in-bottom"
					? "data-[state=open]:animate-dialog-slide-in data-[state=closed]:animate-dialog-slide-out"
					: "data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out",
			)}
			data-motion-preset={ctx.motionPreset}
			{...rest}
		>
			{@render children()}
		</Dialog.Content>
	</Dialog.Positioner>
</Portal>
