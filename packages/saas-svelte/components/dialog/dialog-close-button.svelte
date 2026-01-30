<script lang="ts">
import { Dialog } from "@ark-ui/svelte";
import XIcon from "phosphor-svelte/lib/XIcon";
import { twMerge } from "tailwind-merge";

interface Props {
	class?: string;
	[key: string]: any;
}

let { class: className, ...rest }: Props = $props();
</script>

<Dialog.CloseTrigger
	class={twMerge(
		"absolute",
		"right-4",
		"top-4",
		"min-w-7",
		"h-7",
		"rounded",
		"flex",
		"items-center",
		"justify-center",
		"shrink-0",
		"gap-y-2",
		"gap-x-2",
		"cursor-pointer",
		"text-fg-muted",
		"text-sm",
		"font-medium",
		"leading-sm",
		"antialiased",
		"isolate",
		"appearance-none",
		"select-none",
		"outline-0",
		"transition-colors",
		"duration-200",
		"hover:bg-bg-subtle",
		"focus-visible:outline-1",
		"focus-visible:outline-offset-2",
		"focus-visible:outline-solid",
		"focus-visible:outline-fg-muted",
		"disabled:opacity-50",
		"disabled:cursor-not-allowed",
		className,
	)}
	{...rest}
>
	<XIcon class="size-4 shrink-0" weight="bold" />
	<span class="sr-only">Close</span>
</Dialog.CloseTrigger>
