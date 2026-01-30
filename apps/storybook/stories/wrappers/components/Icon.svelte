<script lang="ts" module>
	// Wrapper components for complex Icon stories
	// These are imported by Icon.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Text } from "$saas/typography/text";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Icon } from "$saas/components/icon";
	import { DataList } from "$saas/components/data-list";
	import Star from "phosphor-svelte/lib/Star";
	import Heart from "phosphor-svelte/lib/Heart";
	import { colours, sizes, iconWeights } from "../../utils";

	interface Props {
		story: "basic" | "colours" | "sizes" | "weights" | "customSvg";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Icon as={Heart} colour="yellow" size="lg" weight="fill" />
{:else if story === "colours"}
	<HStack gap={4} class="flex-wrap">
		{#each colours as colour}
			<VStack gap={2} class="items-center">
				<Text size="xs">{colour}</Text>
				<Icon as={Heart} {colour} weight="fill" size="lg" />
			</VStack>
		{/each}
	</HStack>
{:else if story === "sizes"}
	<HStack gap={4} class="items-end">
		{#each sizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Icon as={Star} colour="yellow" weight="fill" {size} />
			</VStack>
		{/each}
	</HStack>
{:else if story === "weights"}
	<DataList.Root>
		{#each iconWeights as weight}
			<DataList.Item>
				<DataList.ItemLabel>{weight}</DataList.ItemLabel>
				<DataList.ItemValue>
					<Icon as={Heart} colour="rose" size="xl" {weight} />
				</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{:else if story === "customSvg"}
	<Icon size="xl" colour="blue" viewBox="0 0 32 32">
		<path
			fill="currentColor"
			d="M16,11.5a3,3,0,1,0-3-3A3,3,0,0,0,16,11.5Z"
		/>
		<path
			fill="currentColor"
			d="M16.868.044A8.579,8.579,0,0,0,16,0a15.99,15.99,0,0,0-.868,31.956A8.579,8.579,0,0,0,16,32,15.99,15.99,0,0,0,16.868.044ZM16,26.5a3,3,0,1,1,3-3A3,3,0,0,1,16,26.5ZM16,15A8.483,8.483,0,0,0,8.788,27.977,13.986,13.986,0,0,1,16,2a6.5,6.5,0,0,1,0,13Z"
		/>
	</Icon>
{/if}
