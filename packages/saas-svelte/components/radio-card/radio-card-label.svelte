<script lang="ts">
	import { RadioGroup } from "@ark-ui/svelte/radio-group";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import {
		RADIO_CARD_CTX,
		type RadioCardContext,
	} from "./radio-card-root.svelte";

	interface Props {
		/**
		 * The content of the group label.
		 */
		children: Snippet;
		/**
		 * Additional classes to apply to the label.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<RadioCardContext>(RADIO_CARD_CTX);
	const styles = $derived(ctx.styles);
</script>

<RadioGroup.Label class={twMerge(styles.label(), className)} {...restProps}>
	{@render children()}
</RadioGroup.Label>
