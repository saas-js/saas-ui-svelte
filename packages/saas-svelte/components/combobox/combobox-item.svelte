<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import type { CollectionItem } from "@ark-ui/svelte/combobox";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";

	interface Props {
		item: CollectionItem;
		children: Snippet;
		class?: string;
		[key: string]: unknown;
	}

	let { item, children, class: className, ...rest }: Props = $props();

	const ctx = getContext<ComboboxContext>(COMBOBOX_CTX);
</script>

<Combobox.Item
	{item}
	class={twMerge(ctx?.styles?.item() ?? "", className as string)}
	style={ctx?.colourStyle}
	{...rest}
>
	{@render children()}
</Combobox.Item>
