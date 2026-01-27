<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Tag } from "$saas/components/tag";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		colours,
		getControls,
		tagVariants,
		tagSizes,
	} from "../utils";
	import Plus from "phosphor-svelte/lib/Plus";
	import Check from "phosphor-svelte/lib/Check";

	const { Story } = defineMeta({
		title: "components/Tag",
		component: Tag,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: tagVariants,
				table: { defaultValue: { summary: "surface" } },
			},
			size: {
				...commonArgTypes.size,
				options: tagSizes,
			},
			colour: commonArgTypes.colour,
			closable: {
				control: "boolean",
				description: "Whether the tag is closable.",
				table: { defaultValue: { summary: "false" } },
			},
			maxWidth: {
				control: "text",
				description:
					"Maximum width of the tag. Content exceeding this width will be truncated.",
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"colour",
				"closable",
				"maxWidth",
				"class",
			]),
		},
		args: {
			variant: "surface",
			size: "md",
			colour: "gray",
			closable: false,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Tag {...args}>Tag</Tag>
{/snippet}

{#snippet variantsStory()}
	<VStack gap={4}>
		{#each tagVariants as variant}
			<HStack gap={2}>
				<Tag {variant}>Gray</Tag>
				<Tag {variant} closable>Gray</Tag>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet sizesStory()}
	<VStack gap={2}>
		{#each tagSizes as size}
			<HStack gap={10} align="center" class="px-4">
				<Text class="min-w-[8ch]">{size}</Text>
				<Tag {size}>Gray</Tag>
				<Tag {size} closable>Gray</Tag>
				<Tag {size} endIcon={Check}>Gray</Tag>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={2}>
		{#each colours as colour}
			<HStack gap={10} align="center" class="px-4">
				<Text class="min-w-[8ch]">{colour}</Text>
				<Tag {colour} size="sm">Content</Tag>
				<Tag {colour} size="sm" startIcon={Plus}>Content</Tag>
				<Tag {colour} size="sm" variant="solid" closable>Content</Tag>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet closableStory()}
	<HStack gap={2}>
		<Tag closable onClose={() => console.log("Close Tag 1")}>Tag 1</Tag>
		<Tag closable onClose={() => console.log("Close Tag 2")}>Tag 2</Tag>
	</HStack>
{/snippet}

{#snippet overflowStory()}
	<Tag colour="blue" size="sm" maxWidth="200px" closable>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
		molestias, laboriosam, quod, quia quidem quae voluptatem natus
		exercitationem autem quibusdam
	</Tag>
{/snippet}

{#snippet avatarStory()}
	<HStack gap={2} align="center">
		<Tag
			size="sm"
			startAvatar={{
				src: "https://api.dicebear.com/9.x/shapes/svg?seed=emily",
				name: "Emily",
			}}
		>
			Emily (sm)
		</Tag>
		<Tag
			size="md"
			startAvatar={{
				src: "https://api.dicebear.com/9.x/shapes/svg?seed=emily",
				name: "Emily",
			}}
		>
			Emily (md)
		</Tag>
		<Tag
			size="lg"
			startAvatar={{
				src: "https://api.dicebear.com/9.x/shapes/svg?seed=emily",
				name: "Emily",
			}}
		>
			Emily (lg)
		</Tag>
		<Tag
			size="xl"
			startAvatar={{
				src: "https://api.dicebear.com/9.x/shapes/svg?seed=emily",
				name: "Emily",
			}}
		>
			Emily (xl)
		</Tag>
	</HStack>
{/snippet}

{#snippet asButtonStory()}
	<button class="contents">
		<Tag variant="solid" endIcon={Check}>Fish</Tag>
	</button>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Closable" template={closableStory} />

<Story name="Overflow" template={overflowStory} />

<Story name="Avatar" template={avatarStory} />

<Story name="As Button" template={asButtonStory} />
