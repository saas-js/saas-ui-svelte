<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import { Portal } from "@ark-ui/svelte/portal";
	import { getContext, type Snippet } from "svelte";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";
	import "./combobox-animations.css";

	interface Props {
		/**
		 * The dropdown content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<ComboboxContext>(COMBOBOX_CTX);
</script>

<Portal>
	<Combobox.Positioner class={ctx?.styles?.positioner()}>
		<Combobox.Content
			class={ctx?.styles?.content({ class: className })}
			style={ctx?.colourStyle}
			{...rest}
		>
			{@render children()}
		</Combobox.Content>
	</Combobox.Positioner>
</Portal>

