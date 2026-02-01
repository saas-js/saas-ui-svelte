<script lang="ts">
import { Accordion } from "@ark-ui/svelte/accordion";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { ACCORDION_CTX, type AccordionContext } from "./accordion-root.svelte";

interface Props {
	/**
	 * The content of the accordion item.
	 */
	children: Snippet;
	/**
	 * Additional classes to apply to the item.
	 */
	class?: string;
	/**
	 * The unique value of the item.
	 */
	value: string;
	[key: string]: any;
}

let { children, class: className, value, ...restProps }: Props = $props();

const ctx = getContext<AccordionContext>(ACCORDION_CTX);
const styles = $derived(ctx.styles);

function handlePrefetch() {
	ctx.onPrefetch?.(value);
}
</script>

<Accordion.Item
	class={twMerge(styles.item(), className)}
	value={value}
	onmouseenter={handlePrefetch}
	onfocus={handlePrefetch}
	{...restProps}
>
	{@render children()}
</Accordion.Item>
