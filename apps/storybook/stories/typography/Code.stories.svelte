<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Code } from "$saas/typography/code";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import {
		colours,
		commonArgTypes,
		getControls,
		codeVariants,
		codeSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "typography/Code",
		component: Code,
		argTypes: {
			variant: {
				control: "select",
				options: codeVariants as any,
				table: { defaultValue: { summary: "subtle" } },
			},
			size: {
				control: "select",
				options: codeSizes as any,
				table: { defaultValue: { summary: "sm" } },
			},
			colour: {
				...commonArgTypes.colour,
				options: colours as any,
			},
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

{#snippet sizesStory()}
	<VStack align="start" gap={2}>
		{#each codeSizes as size}
			<HStack align="center" gap={10} class="px-4 w-full">
				<Text size="sm" class="min-w-[8ch]">{size}</Text>
				<Code {size}>console.log()</Code>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet variantsStory()}
	<VStack align="start" gap={2}>
		{#each codeVariants as variant}
			<HStack align="center" gap={10} class="px-4 w-full">
				<Text size="sm" class="min-w-[8ch]">{variant}</Text>
				<Code {variant}>console.log()</Code>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={2}>
		{#each colours as colour}
			<HStack align="center" gap={10} class="px-4 w-full">
				<Text size="sm" class="min-w-[8ch]">{colour}</Text>
				<Code variant="solid" colour={colour as any}>console.log()</Code
				>
				<Code variant="outline" colour={colour as any}
					>console.log()</Code
				>
				<Code variant="subtle" colour={colour as any}
					>console.log()</Code
				>
				<Code variant="surface" colour={colour as any}
					>console.log()</Code
				>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet basicStory(args: any)}
	<Code {...args}>console.log("Hello, world!")</Code>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Colours" template={coloursStory} />
