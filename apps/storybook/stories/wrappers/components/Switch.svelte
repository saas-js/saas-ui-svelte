<script lang="ts" module>
	// Wrapper components for complex Switch stories
	// These are imported by Switch.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Switch } from "$saas/components/switch";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import Check from "phosphor-svelte/lib/Check";
	import X from "phosphor-svelte/lib/X";
	import Sun from "phosphor-svelte/lib/Sun";
	import Moon from "phosphor-svelte/lib/Moon";
	import { colours, switchSizes, switchVariants } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "colours"
			| "disabled"
			| "thumbLabel"
			| "trackLabel";
	}

	let { story }: Props = $props();
</script>

{#snippet checkIcon()}
	<Icon as={Check} class="h-3.5" />
{/snippet}

{#snippet xIcon()}
	<Icon as={X} class="h-3.5" />
{/snippet}

{#snippet sunIcon()}
	<Icon as={Sun} weight="fill" class="h-3.5 text-yellow-400" />
{/snippet}

{#snippet moonIcon()}
	<Icon as={Moon} weight="fill" class="text-fg-muted h-3.5" />
{/snippet}

{#if story === "basic"}
	<Switch>Activate Chakra</Switch>
{:else if story === "sizes"}
	<HStack gap={8}>
		{#each switchSizes as size}
			<Switch {size}>{size}</Switch>
		{/each}
	</HStack>
{:else if story === "variants"}
	<HStack gap={8}>
		{#each switchVariants as variant}
			<Switch {variant} checked>{variant}</Switch>
		{/each}
	</HStack>
{:else if story === "colours"}
	<VStack gap={4} align="start">
		{#each colours as colour}
			<HStack gap={6} class="items-center">
				<Text size="xs" class="min-w-[8ch]">{colour}</Text>
				{#each switchVariants as variant}
					<Switch
						{colour}
						{variant}
						aria-label="{colour} {variant} off"
					/>
					<Switch
						{colour}
						{variant}
						checked
						aria-label="{colour} {variant} on"
					/>
				{/each}
			</HStack>
		{/each}
	</VStack>
{:else if story === "disabled"}
	<HStack gap={4}>
		<Switch disabled>Disabled Off</Switch>
		<Switch disabled checked>Disabled On</Switch>
	</HStack>
{:else if story === "thumbLabel"}
	<Switch size="lg" thumbLabel={{ on: checkIcon, off: xIcon }}>
		Switch me
	</Switch>
{:else if story === "trackLabel"}
	<Switch size="lg" colour="blue" trackLabel={{ on: sunIcon, off: moonIcon }}>
		Dark mode
	</Switch>
{/if}
