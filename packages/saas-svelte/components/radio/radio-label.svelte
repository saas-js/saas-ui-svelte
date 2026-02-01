<script lang="ts">
	import { RadioGroup } from "@ark-ui/svelte/radio-group";
	import { type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The content of the group label.
		 */
		children: Snippet;
		/**
		 * Additional classes to apply to the label.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();
</script>

<RadioGroup.Label
	class={twMerge(
		"text-sm leading-5 font-medium antialiased select-none",
		className,
	)}
	{...restProps}
>
	{@render children()}
</RadioGroup.Label>
