<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { STAT_CTX, type StatContext } from "./stat-root.svelte";
import { Text } from "$saas/typography/text";

interface Props {
	/**
	 * The unit text content.
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

<Text as="span" class={twMerge(styles.valueUnit(), className)} {...restProps}>
	{@render children()}
</Text>
