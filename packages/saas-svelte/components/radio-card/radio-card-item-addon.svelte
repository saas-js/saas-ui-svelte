<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import {
		RADIO_CARD_CTX,
		type RadioCardContext,
	} from "./radio-card-root.svelte";

	interface Props {
		/**
		 * The content of the addon.
		 */
		children: Snippet;
		/**
		 * Additional classes to apply to the addon.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<RadioCardContext>(RADIO_CARD_CTX);
	const styles = $derived(ctx.styles);
</script>

<div class={twMerge(styles.addon(), className)} {...restProps}>
	{@render children()}
</div>
