<script lang="ts">
	import { Progress } from "@ark-ui/svelte/progress";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { PROGRESS_CTX, type ProgressContext } from "./progress-root.svelte";

	interface Props {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { class: className, ...restProps }: Props = $props();

	const ctx = getContext<ProgressContext>(PROGRESS_CTX);
	const styles = $derived(ctx.styles);
	const isIndeterminate = $derived(ctx.value === null);

	// Calculate stripe classes - use explicit property syntax to avoid tailwind-merge conflict with bg-(--c-solid)
	const stripeClasses = $derived.by(() => {
		if (!ctx.striped) return "";
		const baseStripe =
			"bg-[linear-gradient(45deg,rgba(255,255,255,0.3)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.3)_75%,transparent_75%,transparent)] bg-size-[1rem_1rem]";
		const animatedStripe = ctx.animated
			? "animate-[progress-stripe_1s_linear_infinite]"
			: "";
		return `${baseStripe} ${animatedStripe}`;
	});

	// Indeterminate animation classes - smooth left position animation
	const indeterminateClasses = $derived(
		isIndeterminate
			? "animate-[progress-indeterminate_1s_ease_infinite] absolute top-0 min-w-1/2 will-change-[left]"
			: "",
	);
</script>

<Progress.Range
	class={twMerge(
		styles.range(),
		stripeClasses,
		indeterminateClasses,
		className,
	)}
	{...restProps}
/>

<style>
	/* Global keyframes for Tailwind arbitrary animation values */
	:global {
		@keyframes progress-stripe {
			from {
				background-position: 1rem 0;
			}
			to {
				background-position: 0 0;
			}
		}

		@keyframes progress-indeterminate {
			0% {
				left: -50%;
			}
			100% {
				left: 100%;
			}
		}
	}
</style>
