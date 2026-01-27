<script lang="ts">
	import { Popover } from "@ark-ui/svelte/popover";
	import { getContext, type Snippet } from "svelte";
	import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";

	interface Props {
		/**
		 * The description content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: unknown;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<PopoverContext>(POPOVER_CTX);
</script>

<Popover.Description
	class={ctx?.styles?.description({ class: className })}
	{...rest}
>
	{@render children()}
</Popover.Description>
