<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const container = tv({
	base: "w-full mx-auto px-4 md:px-6 lg:px-8",
	variants: {
		maxW: {
			sm: "max-w-sm",
			md: "max-w-md",
			lg: "max-w-lg",
			xl: "max-w-xl",
			"2xl": "max-w-2xl",
			"3xl": "max-w-3xl",
			"4xl": "max-w-4xl",
			"5xl": "max-w-5xl",
			"6xl": "max-w-6xl",
			"7xl": "max-w-7xl",
			"8xl": "max-w-360",
			full: "max-w-full",
		},
		fluid: {
			true: "max-w-full",
			false: "",
		},
		centerContent: {
			true: "flex items-center justify-center",
			false: "",
		},
	},
	defaultVariants: {
		maxW: "8xl",
		fluid: false,
		centerContent: false,
	},
});

export type ContainerVariants = VariantProps<typeof container>;
</script>

<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	/**
	 * The maximum width of the container.
	 * @default "8xl"
	 */
	maxW?: ContainerVariants["maxW"];
	/**
	 * Whether the container should be fluid (full width).
	 * @default false
	 */
	fluid?: boolean;
	/**
	 * Whether to center the content inside the container.
	 * @default false
	 */
	centerContent?: boolean;
	/**
	 * The content to render inside the container.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Additional HTML attributes to spread onto the element.
	 */
	[key: string]: unknown;
}

let {
	maxW = "8xl",
	fluid = false,
	centerContent = false,
	children,
	class: className,
	...restProps
}: Props = $props();

// When fluid is true, maxW is ignored (fluid takes precedence)
const finalClass = $derived(
	container({
		maxW: fluid ? undefined : maxW,
		fluid,
		centerContent,
		class: className,
	}),
);
</script>

<div class={finalClass} {...restProps}>
	{@render children?.()}
</div>
