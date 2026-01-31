<script lang="ts">
import { Accordion } from "@ark-ui/svelte";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { ACCORDION_CTX, type AccordionContext } from "./accordion-root.svelte";
import { Box } from "$saas/layout/box";

interface Props {
	/**
	 * The content of the accordion item.
	 */
	children: Snippet;
	/**
	 * Additional classes to apply to the content.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<AccordionContext>(ACCORDION_CTX);
const styles = $derived(ctx.styles);
</script>

<Accordion.ItemContent
	class={twMerge(
		styles.content(),
		"data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
		className,
	)}
	{...restProps}
>
	<Box class={styles.contentBody()}>
		{@render children()}
	</Box>
</Accordion.ItemContent>
