<script lang="ts">
	import type { Snippet } from "svelte";
	import { Centre } from "@saas-ui/svelte/layout/centre";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div
	class="flex flex-col relative rounded-lg border border-border-default bg-bg-muted w-75 h-75 p-8 shrink-0"
>
	<Centre class="w-full h-full">
		{@render children?.()}
	</Centre>
</div>
