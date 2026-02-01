<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const float = tv({
	base: "absolute inline-flex items-center justify-center",
	variants: {
		placement: {
			"bottom-end":
				"inset-y-[auto_0] inset-x-[auto_0] [translate:50%_50%]",
			"bottom-start":
				"inset-y-[auto_0] inset-x-[0_auto] [translate:-50%_50%]",
			"top-end": "inset-y-[0_auto] inset-x-[auto_0] [translate:50%_-50%]",
			"top-start":
				"inset-y-[0_auto] inset-x-[0_auto] [translate:-50%_-50%]",
			"bottom-center":
				"inset-y-[auto_0] inset-x-[50%] [translate:-50%_50%]",
			"top-center":
				"inset-y-[0_auto] inset-x-[50%] [translate:-50%_-50%]",
			"middle-center":
				"inset-y-[50%] inset-x-[50%] [translate:-50%_-50%]",
			"middle-end": "inset-y-[50%] inset-x-[auto_0] [translate:50%_-50%]",
			"middle-start":
				"inset-y-[50%] inset-x-[0_auto] [translate:-50%_-50%]",
		},
	},
	defaultVariants: {
		placement: "top-end",
	},
});

export type FloatVariants = VariantProps<typeof float>;
</script>

<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
	/**
	 * The placement of the floating element.
	 * @default "top-end"
	 */
	placement?: FloatVariants["placement"];
	/**
	 * Offset applied to the X axis (right direction).
	 */
	offsetX?: number | string;
	/**
	 * Offset applied to the Y axis (up direction, Cartesian style).
	 */
	offsetY?: number | string;
	/**
	 * Offset applied to both X and Y axes.
	 */
	offset?: number | string;
	/**
	 * The content to render inside the floating container.
	 */
	children?: Snippet;
}

let {
	placement = "top-end",
	offsetX,
	offsetY,
	offset,
	children,
	class: className,
	style,
	...restProps
}: Props = $props();

// Format values using Chakra's spacing scale (4 = 1rem = 16px)
const toUnit = (val?: string | number) => {
	if (val === undefined) return undefined;
	if (typeof val === "number") {
		return `${val * 0.25}rem`;
	}
	const num = parseFloat(val);
	if (!isNaN(num)) {
		return `${num * 0.25}rem`;
	}
	return val;
};

// Calculate dynamic styles for offsets using Margins
// This bypasses the Tailwind JIT limitation
const offsetStyles = $derived.by(() => {
	const styles: Record<string, string> = {};
	const xVal = toUnit(offsetX ?? offset);
	const yVal = toUnit(offsetY ?? offset);

	if (!xVal && !yVal) return undefined;

	const isBottom = placement.includes("bottom");
	const isEnd = placement.includes("end");

	// Y Axis Logic
	if (yVal) {
		// If bottom anchored, margin-bottom pushes it up.
		// If top/middle anchored, margin-top pushes it down.
		if (isBottom) {
			styles["margin-bottom"] = yVal;
		} else {
			styles["margin-top"] = yVal;
		}
	}

	// X Axis Logic
	if (xVal) {
		// If right (end) anchored, margin-right pushes it left.
		// If left (start) anchored, margin-left pushes it right.
		if (isEnd) {
			styles["margin-right"] = xVal;
		} else {
			styles["margin-left"] = xVal;
		}
	}

	// Convert object to style string
	return Object.entries(styles)
		.map(([k, v]) => `${k}: ${v};`)
		.join(" ");
});

const finalClass = $derived(twMerge(float({ placement }), className as string));

// Merge the calculated offset styles with any user-provided styles
const finalStyle = $derived.by(() => {
	const userStyle = style ? (typeof style === "string" ? style : "") : "";
	const offsets = offsetStyles || "";
	return [userStyle, offsets].filter(Boolean).join("; ");
});
</script>

<div class={finalClass} style={finalStyle} {...restProps}>
	{@render children?.()}
</div>
