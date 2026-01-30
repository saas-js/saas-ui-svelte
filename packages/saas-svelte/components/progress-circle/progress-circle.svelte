<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Progress Circle styles using tailwind-variants.
 * Used to display a task's progress in a circular form.
 */
export const progressCircle = tv({
	slots: {
		root: "inline-flex relative",
		circle: "transform -rotate-90",
		track: "fill-transparent",
		range: "fill-transparent transition-[stroke-dashoffset] duration-(--durations-slow)",
		valueText: [
			"absolute inset-0 flex items-center justify-center",
			"font-medium tabular-nums tracking-tight",
		],
	},
	variants: {
		/**
		 * The size of the progress circle.
		 * @default "md"
		 */
		size: {
			xs: {
				root: "text-2xs",
				circle: "size-4",
				track: "[stroke-width:3px]",
				range: "[stroke-width:3px]",
				valueText: "text-2xs",
			},
			sm: {
				root: "text-xs",
				circle: "size-6",
				track: "[stroke-width:4px]",
				range: "[stroke-width:4px]",
				valueText: "text-xs",
			},
			md: {
				root: "text-sm",
				circle: "size-10",
				track: "[stroke-width:5px]",
				range: "[stroke-width:5px]",
				valueText: "text-xs",
			},
			lg: {
				root: "text-sm",
				circle: "size-14",
				track: "[stroke-width:6px]",
				range: "[stroke-width:6px]",
				valueText: "text-sm",
			},
			xl: {
				root: "text-base",
				circle: "size-16",
				track: "[stroke-width:7px]",
				range: "[stroke-width:7px]",
				valueText: "text-sm",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type ProgressCircleVariants = VariantProps<typeof progressCircle>;
</script>

<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import { type ColourName, getColourStyle } from "$saas/utils/colours";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The current value of the progress (0-100).
	 * Set to `null` for indeterminate state.
	 * @default 0
	 */
	value?: number | null;
	/**
	 * The minimum value.
	 * @default 0
	 */
	min?: number;
	/**
	 * The maximum value.
	 * @default 100
	 */
	max?: number;
	/**
	 * The size of the progress circle.
	 * @default "md"
	 */
	size?: ProgressCircleVariants["size"];
	/**
	 * The colour palette.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Whether to show the value as text in the center.
	 * @default false
	 */
	showValue?: boolean;
	/**
	 * Custom thickness for the stroke (overrides size default).
	 */
	thickness?: string;
	/**
	 * Whether to use rounded stroke caps.
	 * @default false
	 */
	rounded?: boolean;
	/**
	 * Accessible label for the progress.
	 */
	label?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	value = 0,
	min = 0,
	max = 100,
	size = "md",
	colour = "gray",
	showValue = false,
	thickness,
	rounded = false,
	label,
	class: className,
	style,
	...restProps
}: Props = $props();

const colourStyle = $derived(getColourStyle(colour));
const finalStyle = $derived([colourStyle, style].filter(Boolean).join("; "));

const styles = $derived(progressCircle({ size }));

// Size mappings for SVG calculations
const sizeMap = {
	xs: { size: 16, strokeWidth: 3 },
	sm: { size: 24, strokeWidth: 4 },
	md: { size: 40, strokeWidth: 5 },
	lg: { size: 56, strokeWidth: 6 },
	xl: { size: 64, strokeWidth: 7 },
};

const currentSize = $derived(sizeMap[size || "md"]);
const effectiveStrokeWidth = $derived(
	thickness ? parseFloat(thickness) : currentSize.strokeWidth,
);
const radius = $derived((currentSize.size - effectiveStrokeWidth) / 2);
const circumference = $derived(2 * Math.PI * radius);
const center = $derived(currentSize.size / 2);

// Calculate the dash offset based on value
const isIndeterminate = $derived(value === null);
const normalizedValue = $derived(
	value === null ? 0 : Math.min(Math.max((value - min) / (max - min), 0), 1),
);
const strokeDashoffset = $derived(
	circumference - normalizedValue * circumference,
);

// Format percentage for display
const displayValue = $derived(
	value === null ? "" : `${Math.round(normalizedValue * 100)}%`,
);

// Aria values
const ariaValueNow = $derived(value === null ? undefined : value);
const ariaLabel = $derived(
	label || (value === null ? "Loading" : `${displayValue}`),
);
</script>

<div
	class={twMerge(styles.root(), className as string)}
	role="progressbar"
	aria-valuenow={ariaValueNow}
	aria-valuemin={min}
	aria-valuemax={max}
	aria-label={ariaLabel}
	data-state={isIndeterminate ? "indeterminate" : "loading"}
	style={finalStyle}
	{...restProps}
>
	<svg
		class="{styles.circle()} {isIndeterminate ? 'animate-spin' : ''}"
		viewBox="0 0 {currentSize.size} {currentSize.size}"
		style="shape-rendering: geometricPrecision;"
	>
		<!-- Track circle -->
		<circle
			class={styles.track()}
			cx={center}
			cy={center}
			r={radius}
			stroke="var(--c-muted)"
			stroke-width={effectiveStrokeWidth}
			style={thickness ? `stroke-width: ${thickness};` : ""}
		/>
		<!-- Range/progress circle -->
		<circle
			class={styles.range()}
			cx={center}
			cy={center}
			r={radius}
			stroke="var(--c-solid)"
			stroke-width={effectiveStrokeWidth}
			stroke-dasharray={circumference}
			stroke-dashoffset={isIndeterminate
				? circumference * 0.75
				: strokeDashoffset}
			stroke-linecap={rounded ? "round" : "butt"}
			style={thickness ? `stroke-width: ${thickness};` : ""}
		/>
	</svg>
	{#if showValue && !isIndeterminate}
		<span class={styles.valueText()} aria-live="polite">
			{displayValue}
		</span>
	{/if}
</div>
