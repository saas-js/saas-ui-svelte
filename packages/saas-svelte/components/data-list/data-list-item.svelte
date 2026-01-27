<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import {
		DATA_LIST_CTX,
		type DataListContext,
	} from "./data-list-root.svelte";

	interface Props {
		/**
		 * The content of the data list item.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply to the item.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<DataListContext>(DATA_LIST_CTX);
	const styles = $derived(ctx.styles);
</script>

<div class={twMerge(styles.item(), className)} {...restProps}>
	{@render children()}
</div>
