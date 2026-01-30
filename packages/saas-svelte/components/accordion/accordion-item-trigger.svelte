<script lang="ts">
import { Accordion } from "@ark-ui/svelte";
import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { ACCORDION_CTX, type AccordionContext } from "./accordion-root.svelte";

interface Props {
	/**
	 * The content of the trigger.
	 */
	children: Snippet;
	/**
	 * Additional classes to apply to the trigger.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<AccordionContext>(ACCORDION_CTX);
const styles = $derived(ctx.styles);
</script>

<Accordion.ItemTrigger
	class={twMerge(styles.trigger(), className)}
	{...restProps}
>
	{@render children()}

	<Accordion.ItemIndicator class={styles.indicator()}>
		<CaretRightIcon
			class="inline-block size-full text-current"
			weight="bold"
		/>
	</Accordion.ItemIndicator>
</Accordion.ItemTrigger>
