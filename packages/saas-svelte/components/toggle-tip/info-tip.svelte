<script lang="ts">
	import ToggleTip from "./toggle-tip.svelte";
	import type { ToggleTipVariants } from "./toggle-tip.svelte";
	import type { PopoverRootProps } from "@ark-ui/svelte/popover";
	import { Icon } from "$saas/components/icon";
	import Info from "phosphor-svelte/lib/Info";
	import type { Snippet } from "svelte";

	interface Props extends Omit<PopoverRootProps, "id" | "children"> {
		/**
		 * The unique identifier for the info tip.
		 */
		id?: string;
		/**
		 * The content to display in the info tip.
		 */
		content: string | Snippet;
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
		class: className,
		size = "xs",
		positioning = { placement: "top", gutter: 8 },
		"aria-label": ariaLabel = "More information",
		...rest
	}: Props = $props();
</script>

<ToggleTip {content} {size} {id} {positioning} class={className} {...rest}>
	{#snippet trigger(props)}
		<button
			type="button"
			aria-label={ariaLabel}
			class="inline-flex items-center justify-center align-middle p-0 border-0 bg-transparent h-4 w-4 cursor-pointer rounded outline-0 transition-all duration-moderate hover:bg-bg-subtle focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-border-emphasized"
			{...props()}
		>
			<Icon as={Info} size="sm" aria-hidden="true" />
		</button>
	{/snippet}
</ToggleTip>
