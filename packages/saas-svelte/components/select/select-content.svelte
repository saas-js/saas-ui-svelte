<script lang="ts">
import { Select, useSelectContext } from "@ark-ui/svelte/select";
import { Portal } from "@ark-ui/svelte/portal";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { SELECT_CTX, type SelectContext } from "./select-root.svelte";
import "./select-animations.css";

interface Props {
	/**
	 * The select content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Whether to render the select content in a portal.
	 * @default true
	 */
	portal?: boolean;
	[key: string]: any;
}

let { children, class: className, portal = true, ...rest }: Props = $props();

const ctx = getContext<SelectContext>(SELECT_CTX);
const selectApi = useSelectContext();

function handleKeyDown(event: KeyboardEvent) {
	if (event.key === "Tab") {
		selectApi().setOpen(false);
	}
}
</script>

{#snippet selectContent()}
	<Select.Positioner class={ctx?.styles?.positioner() ?? ""}>
		<Select.Content
			class={twMerge(ctx?.styles?.content() ?? "", className as string)}
			style={ctx?.colourStyle}
			onkeydown={handleKeyDown}
			{...rest}
		>
			{@render children()}
		</Select.Content>
	</Select.Positioner>
{/snippet}

{#if portal}
	<Portal>
		{@render selectContent()}
	</Portal>
{:else}
	{@render selectContent()}
{/if}
