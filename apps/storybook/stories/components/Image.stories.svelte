<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Image } from "$saas/components/image";
	import { Stack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		imageRoundedOptions,
		imageFitOptions,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Image",
		component: Image,
		argTypes: {
			src: {
				control: "text",
				description: "The image source URL.",
			},
			alt: {
				control: "text",
				description: "Alternative text for the image.",
			},
			width: {
				control: "text",
				description:
					"The width of the image (CSS value or number for pixels).",
			},
			height: {
				control: "text",
				description:
					"The height of the image (CSS value or number for pixels).",
			},
			aspectRatio: {
				control: "text",
				description:
					"The aspect ratio of the image (e.g., 16/9, 4/3, 1).",
			},
			rounded: {
				control: "select",
				options: imageRoundedOptions,
				description: "The border radius of the image.",
				table: { defaultValue: { summary: "none" } },
			},
			fit: {
				control: "select",
				options: imageFitOptions,
				description: "The object-fit property of the image.",
				table: { defaultValue: { summary: "cover" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"src",
				"alt",
				"width",
				"height",
				"aspectRatio",
				"rounded",
				"fit",
				"class",
			]),
		},
		args: {
			src: "https://picsum.photos/seed/saas/800/600",
			alt: "Sample image",
			rounded: "md",
			fit: "cover",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Image {...args} />
{/snippet}

{#snippet heightStory()}
	<Image
		src="https://picsum.photos/seed/height/800/400"
		alt="Image with fixed height"
		height="200px"
		rounded="md"
	/>
{/snippet}

{#snippet circularStory()}
	<Image
		src="https://picsum.photos/seed/circular/400/400"
		alt="Circular image"
		width={150}
		height={150}
		rounded="full"
		fit="cover"
	/>
{/snippet}

{#snippet aspectRatioStory()}
	<Image
		src="https://picsum.photos/seed/aspect/800/600"
		alt="Image with aspect ratio"
		aspectRatio="4/3"
		width="300px"
		rounded="md"
	/>
{/snippet}

{#snippet fitStory()}
	<Stack gap={6} class="flex-row items-start flex-wrap">
		{#each imageFitOptions as fit}
			<VStack gap={2} class="items-center">
				<Text size="xs">{fit}</Text>
				<Image
					src="https://picsum.photos/seed/fit/400/300"
					alt={`Image with ${fit} fit`}
					{fit}
					width={200}
					height={150}
					rounded="md"
					class="border border-border-subtle"
				/>
			</VStack>
		{/each}
	</Stack>
{/snippet}

{#snippet roundedStory()}
	<Stack gap={6} class="flex-row items-start flex-wrap">
		{#each imageRoundedOptions as rounded}
			<VStack gap={2} class="items-center">
				<Text size="xs">{rounded}</Text>
				<Image
					src="https://picsum.photos/seed/rounded/200/200"
					alt={`Image with ${rounded} border radius`}
					{rounded}
					width={100}
					height={100}
				/>
			</VStack>
		{/each}
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Height" template={heightStory} />

<Story name="Circular" template={circularStory} />

<Story name="Aspect Ratio" template={aspectRatioStory} />

<Story name="Object Fit" template={fitStory} />

<Story name="Rounded" template={roundedStory} />
