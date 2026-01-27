<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { STAT_CTX, type StatContext } from "./stat-root.svelte";

	interface Props {
		/**
		 * The content of the label.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<StatContext>(STAT_CTX);
	const styles = $derived(ctx.styles);
</script>

<dt class={twMerge(styles.label(), className)} {...restProps}>
	{@render children()}
</dt>
