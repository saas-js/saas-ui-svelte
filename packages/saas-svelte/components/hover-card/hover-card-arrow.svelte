<script lang="ts">
import { HoverCard } from "@ark-ui/svelte/hover-card";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import {
	HOVER_CARD_CTX,
	type HoverCardContext,
} from "./hover-card-root.svelte";

interface Props {
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: unknown;
}

let { class: className, ...rest }: Props = $props();

const ctx = getContext<HoverCardContext>(HOVER_CARD_CTX);
</script>

<HoverCard.Arrow class={twMerge(ctx?.styles?.arrow() ?? "", className as string)} {...rest}>
	<HoverCard.ArrowTip class={ctx?.styles?.arrowTip()} />
</HoverCard.Arrow>
