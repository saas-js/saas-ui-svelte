<script lang="ts">
import type { Snippet } from "svelte";
import { Card } from "@saas-ui/svelte/components/card";
import { Centre } from "@saas-ui/svelte/layout/centre";

interface Props {
	children?: Snippet;
}

let { children }: Props = $props();
</script>

<Card.Root variant="outline" class="bg-bg-muted h-75 w-75 shrink-0 p-8">
	<Centre class="h-full w-full">
		{@render children?.()}
	</Centre>
</Card.Root>
