<script lang="ts">
import { RadioGroup } from "@ark-ui/svelte/radio-group";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { RADIO_GROUP_CTX, type RadioGroupContext } from "./radio-group.svelte";

interface Props {
	/**
	 * The content of the label.
	 */
	children: Snippet;
	/**
	 * Additional classes to apply to the label.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<RadioGroupContext>(RADIO_GROUP_CTX);
const styles = $derived(ctx.styles);
</script>

<RadioGroup.ItemText class={twMerge(styles.label(), className)} {...restProps}>
	{@render children()}
</RadioGroup.ItemText>
