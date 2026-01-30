<script lang="ts">
import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";
import { collapsibleContent } from "./collapsible.svelte";
import type { Snippet } from "svelte";

interface Props {
	/**
	 * The content to show when expanded.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className }: Props = $props();
</script>

<ArkCollapsible.Content class={collapsibleContent({ class: className })}>
	{@render children?.()}
</ArkCollapsible.Content>
