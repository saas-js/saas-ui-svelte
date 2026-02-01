<script lang="ts">
	import { Progress } from "@ark-ui/svelte/progress";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { PROGRESS_CTX, type ProgressContext } from "./progress-root.svelte";

	interface Props {
		/**
		 * Content to render inside the track (typically Progress.Range).
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<ProgressContext>(PROGRESS_CTX);
	const styles = $derived(ctx.styles);
</script>

<Progress.Track class={twMerge(styles.track(), className)} {...restProps}>
	{@render children?.()}
</Progress.Track>
