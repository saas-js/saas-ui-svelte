<script lang="ts" module>
	import { createToaster } from "$saas/components/toast";

	// Single shared toaster for all Toast stories
	export const sharedToaster = createToaster({ duration: 5000 });
</script>

<script lang="ts">
	import { Toaster } from "$saas/components/toast";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="h-auto">
	{@render children()}
</div>
<Toaster toaster={sharedToaster} />
