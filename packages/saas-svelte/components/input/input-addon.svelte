<script lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

const addon = tv({
	base: [
		"flex",
		"items-center",
		"flex-none",
		"whitespace-nowrap",
		"border",
		"border-solid",
		"rounded",
		"bg-bg-subtle",
		"border-border-default",
		"text-fg-default",
		"antialiased",
		"focus-visible:z-1",
	],
	variants: {
		size: {
			xs: "h-6 px-2 text-xs leading-4",
			sm: "h-7 px-2.5 text-sm leading-5",
			md: "h-8 px-3 text-sm leading-5",
			lg: "h-10 px-4 text-sm leading-5",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The size of the addon.
	 */
	size?: VariantProps<typeof addon>["size"];
	/**
	 * The content to be rendered inside the component.
	 */
	children?: Snippet;
}

let { children, class: className, size = "md", ...restProps }: Props = $props();

const classes = $derived(addon({ size, class: className }) as string);
</script>

<div class={classes} {...restProps}>
	{@render children?.()}
</div>
