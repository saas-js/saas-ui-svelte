<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import {
	BREADCRUMB_CTX,
	type BreadcrumbContext,
} from "./breadcrumb-root.svelte";
import DotsThreeIcon from "phosphor-svelte/lib/DotsThreeIcon";

interface Props extends HTMLAttributes<HTMLLIElement> {
	/**
	 * Whether to show the separator after the ellipsis.
	 * @default true
	 */
	showSeparator?: boolean;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { showSeparator = true, class: className, ...restProps }: Props = $props();

const context = getContext<BreadcrumbContext>(BREADCRUMB_CTX);
const styles = $derived(context?.styles);
</script>

<li
	role="presentation"
	aria-hidden="true"
	class={twMerge(styles?.ellipsis() ?? "", className as string)}
	{...restProps}
>
	<DotsThreeIcon class="size-3.5" weight="bold" aria-hidden="true" />
</li>

{#if showSeparator}
	<li aria-hidden="true" class={styles?.separator()}>
		{#if typeof context?.separator === "string"}
			{context.separator}
		{:else if context?.separator}
			{@const Separator = context.separator}
			<Separator />
		{:else}
			/
		{/if}
	</li>
{/if}
