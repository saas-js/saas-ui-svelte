<script lang="ts">
import { Tabs } from "@ark-ui/svelte/tabs";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import { TABS_CTX, type TabsContext } from "./tabs-root.svelte";

interface Props {
	/**
	 * Additional classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { class: className, ...restProps }: Props = $props();

const ctx = getContext<TabsContext>(TABS_CTX);
const styles = $derived(ctx.styles);
</script>

<Tabs.Indicator class={twMerge(styles.indicator(), className)} {...restProps} />
