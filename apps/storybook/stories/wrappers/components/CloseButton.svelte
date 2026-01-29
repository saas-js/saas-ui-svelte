<script lang="ts" module>
	// Wrapper components for complex CloseButton stories
</script>

<script lang="ts">
	import { CloseButton } from "$saas/components/close-button";
	import { HStack } from "$saas/layout/stack";
	import { Icon } from "$saas/components/icon";
	import XCircle from "phosphor-svelte/lib/XCircle";
	import { closeButtonSizes } from "../../utils";

	interface Props {
		story: "basic" | "sizes" | "variants" | "customIcon";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<CloseButton />
{:else if story === "sizes"}
	<HStack gap={4} class="flex-wrap items-center">
		{#each closeButtonSizes as size}
			<CloseButton {size} variant="outline" />
		{/each}
	</HStack>
{:else if story === "variants"}
	<HStack gap={2}>
		<CloseButton variant="ghost" colour="indigo" />
		<CloseButton variant="outline" colour="indigo" />
		<CloseButton variant="subtle" colour="indigo" />
		<CloseButton variant="solid" colour="indigo" />
		<CloseButton variant="glass" colour="indigo" />
	</HStack>
{:else if story === "customIcon"}
	<CloseButton variant="ghost">
		<Icon as={XCircle} size="md" />
	</CloseButton>
{/if}
