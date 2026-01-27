<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import type { Snippet } from "svelte";
	import { tv } from "tailwind-variants";

	const dialogTitle = tv({
		base: ["text-base", "font-semibold", "leading-6", "antialiased"],
	});

	interface Props {
		children: Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<Dialog.Title class={dialogTitle({ class: className })} {...rest}>
	{@render children()}
</Dialog.Title>
