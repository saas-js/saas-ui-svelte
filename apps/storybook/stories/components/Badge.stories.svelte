<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Text } from "$saas/typography/text";
	import Star from "phosphor-svelte/lib/Star";
	import CheckCircle from "phosphor-svelte/lib/CheckCircle";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Badge } from "$saas/components/badge";
	import {
		colours,
		commonArgTypes,
		getControls,
		badgeVariants,
		badgeSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Badge",
		component: Badge,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: badgeVariants,
			},
			size: {
				...commonArgTypes.size,
				options: badgeSizes,
				table: { defaultValue: { summary: "sm" } },
			},
			colour: commonArgTypes.colour,
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"colour",
				"children",
				"class",
			]),
		},
		args: {
			variant: "subtle",
			size: "sm",
			colour: "gray",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Badge {...args}>Badge</Badge>
{/snippet}

{#snippet withIconStory()}
	<VStack align="start" gap={2}>
		<Badge variant="solid" colour="blue">
			<Star class="h-3" aria-hidden="true" />
			New
		</Badge>
		<Badge variant="solid" colour="green">
			New
			<CheckCircle class="h-3" aria-hidden="true" />
		</Badge>
	</VStack>
{/snippet}

{#snippet variantsStory()}
	<HStack align="start" gap={4}>
		{#each badgeVariants as variant}
			<VStack gap={2}>
				<Text size="xs">{variant}</Text>
				<Badge {variant}>Badge</Badge>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet sizesStory()}
	<HStack align="start" gap={4}>
		{#each badgeSizes as size}
			<VStack gap={2}>
				<Text size="xs">{size}</Text>
				<Badge {size}>New</Badge>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={2}>
		{#each colours as colour}
			<HStack gap={4} align="center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Badge {colour} variant="outline">Outline</Badge>
				<Badge {colour} variant="solid">Solid</Badge>
				<Badge {colour} variant="subtle">Subtle</Badge>
				<Badge {colour} variant="surface">Surface</Badge>
			</HStack>
		{/each}
	</VStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="With Icon" template={withIconStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Colours" template={coloursStory} />
