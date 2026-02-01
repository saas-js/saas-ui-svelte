<script lang="ts">
import ToggleTip from "./toggle-tip.svelte";
import type { ToggleTipVariants } from "./toggle-tip.svelte";
import type { PopoverRootProps } from "@ark-ui/svelte/popover";
import { Icon } from "$saas/components/icon";
import InfoIcon from "phosphor-svelte/lib/InfoIcon";
import type { Snippet } from "svelte";

interface Props extends Omit<PopoverRootProps, "id" | "children"> {
	/**
	 * The unique identifier for the info tip.
	 */
	id?: string;
	/**
	 * The content to display in the info tip.
	 * Can be provided as a prop or as children.
	 */
	content?: string | Snippet;
	/**
	 * Content to display in the info tip (alternative to content prop).
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The size of the info tip.
	 * @default "xs"
	 */
	size?: ToggleTipVariants["size"];
	/**
	 * The positioning options for the info tip.
	 */
	positioning?: PopoverRootProps["positioning"];
	/**
	 * Accessible label for the info button.
	 * @default "More information"
	 */
	"aria-label"?: string;
}

let {
	id,
	content,
	children,
	class: className,
	size = "xs",
	positioning = { placement: "top", gutter: 8 },
	"aria-label": ariaLabel = "More information",
	...rest
}: Props = $props();

// Use content prop if provided, otherwise fall back to children
const effectiveContent = $derived(content ?? children);
</script>

<ToggleTip
	content={effectiveContent}
	size={size}
	id={id}
	positioning={positioning}
	class={className}
	{...rest}
>
	{#snippet trigger(props)}
		<button
			type="button"
			aria-label={ariaLabel}
			class="duration-moderate hover:bg-bg-subtle focus-visible:outline-border-emphasized inline-flex size-4 cursor-pointer items-center justify-center rounded border-0 bg-transparent p-0 align-middle outline-0 transition-colors focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-solid"
			{...props()}
		>
			<Icon as={InfoIcon} size="sm" aria-hidden="true" />
		</button>
	{/snippet}
</ToggleTip>
