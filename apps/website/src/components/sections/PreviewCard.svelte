<script lang="ts">
	import type { Snippet } from "svelte";
	import { Card } from "@saas-ui/svelte/components/card";
	import { Centre } from "@saas-ui/svelte/layout/centre";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<Card.Root variant="outline" class="p-8 bg-bg-muted w-75 h-75 shrink-0">
	<Centre class="w-full h-full">
		{@render children?.()}
	</Centre>
</Card.Root>
