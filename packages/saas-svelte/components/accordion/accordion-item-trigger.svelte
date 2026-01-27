<script lang="ts">
	import { Accordion } from "@ark-ui/svelte";
	import CaretRight from "phosphor-svelte/lib/CaretRight";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import {
		ACCORDION_CTX,
		type AccordionContext,
	} from "./accordion-root.svelte";

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
		<CaretRight
			class="text-current inline-block w-full h-full"
			weight="bold"
		/>
	</Accordion.ItemIndicator>
</Accordion.ItemTrigger>
