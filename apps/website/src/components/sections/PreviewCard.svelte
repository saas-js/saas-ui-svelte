<script lang="ts">
	import type { Snippet } from "svelte";
	import { Centre } from "@saas-ui/svelte/layout/centre";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div
	class="relative flex flex-col p-8 border rounded-lg border-border-default bg-bg-muted w-75 h-75 shrink-0"
>
	<Centre class="w-full h-full">
		{@render children?.()}
	</Centre>
</div>
