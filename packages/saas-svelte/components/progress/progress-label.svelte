<script lang="ts">
import { Progress } from "@ark-ui/svelte/progress";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { PROGRESS_CTX, type ProgressContext } from "./progress-root.svelte";
import { Tooltip } from "$saas/components/tooltip";
import { Button } from "$saas/components/button";
import InfoIcon from "phosphor-svelte/lib/InfoIcon";

interface Props {
	/**
	 * Content to render inside the label.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Info tooltip text. When provided, displays an info icon with a tooltip.
	 */
	info?: string;
	[key: string]: any;
}

let { children, class: className, info, ...restProps }: Props = $props();

const ctx = getContext<ProgressContext>(PROGRESS_CTX);
const styles = $derived(ctx.styles);
</script>

<Progress.Label
	class={twMerge(styles.label(), info && "items-center gap-1", className)}
	{...restProps}
>
	{@render children?.()}
	{#if info}
		<Tooltip content={info}>
			<Button variant="ghost" size="xs" icon aria-label="Info">
				<InfoIcon aria-hidden="true" />
			</Button>
		</Tooltip>
	{/if}
</Progress.Label>
