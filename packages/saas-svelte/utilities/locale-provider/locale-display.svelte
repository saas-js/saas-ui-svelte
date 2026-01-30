<script lang="ts">
import { getLocaleContext } from "$saas/utilities/locale-provider";
import type { Snippet } from "svelte";

interface Props {
	/**
	 * Additional content to render below the locale display.
	 */
	children?: Snippet;
}

let { children }: Props = $props();

const context = getLocaleContext();
const displayData = $derived({
	locale: context?.locale || "en-US",
	dir: context?.dir || "ltr",
});
</script>

<div class="flex flex-col gap-2">
	<pre
		class="bg-bg-subtle leading-sm rounded p-4 font-mono text-sm">{JSON.stringify(
			displayData,
			null,
			2,
		)}</pre>
	{@render children?.()}
</div>
