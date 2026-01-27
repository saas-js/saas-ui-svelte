<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Stack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Avatar } from "$saas/components/avatar";
	import {
		commonArgTypes,
		getControls,
		avatarSizes,
		avatarShapes,
		avatarVariants,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Avatar",
		component: Avatar,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: avatarVariants,
			},
			colour: commonArgTypes.colour,
			size: {
				...commonArgTypes.size,
				options: avatarSizes,
			},
			shape: {
				control: "select",
				options: avatarShapes,
				description: "The shape of the avatar.",
				table: { defaultValue: { summary: "full" } },
			},
			ring: {
				control: "boolean",
				description: "Whether to show a ring around the avatar.",
				table: { defaultValue: { summary: "false" } },
			},
			src: {
				control: "text",
				description: "The source for the avatar image.",
				table: { defaultValue: { summary: "" } },
			},
			name: {
				control: "text",
				description:
					"The name to use for alt text and fallback initials.",
				table: { defaultValue: { summary: "" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"src",
				"name",
				"size",
				"variant",
				"shape",
				"colour",
				"borderless",
				"ring",
				"children",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "solid",
			shape: "full",
			colour: "gray",
			name: "David Wilson",
			src: "https://api.dicebear.com/9.x/shapes/svg?seed=jacob",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Avatar {...args} />
{/snippet}

{#snippet sizesStory()}
	<Stack gap={6} class="flex-row items-start">
		{#each avatarSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Avatar
					{size}
					name="David Wilson"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
				/>
			</VStack>
		{/each}
	</Stack>
{/snippet}

{#snippet shapeStory()}
	<Stack gap={8} class="flex-row items-start">
		{#each avatarShapes as shape}
			<VStack gap={2} class="items-center">
				<Text size="xs">{shape}</Text>
				<Avatar
					{shape}
					size="lg"
					name="David Wilson"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
				/>
			</VStack>
		{/each}
	</Stack>
{/snippet}

{#snippet fallbackStory()}
	<Stack gap={4} class="flex-row items-center">
		<Avatar name="Oshigaki Kisame" />
		<Avatar name="Sasuke Uchiha" colour="teal" />
		<Avatar colour="red" />
	</Stack>
{/snippet}

{#snippet ringStory()}
	<Stack gap={4} class="flex-row items-center">
		<Avatar
			name="David Wilson"
			colour="pink"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			ring
		/>
		<Avatar
			name="Marcus Chen"
			colour="green"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
			ring
		/>
		<Avatar
			name="Sarah Johnson"
			colour="blue"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
			ring
		/>
	</Stack>
{/snippet}

{#snippet groupStory()}
	<Avatar.Group size="lg">
		<Avatar
			name="David Wilson"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
		/>
		<Avatar
			name="Marcus Chen"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
		/>
		<Avatar
			name="Sarah Johnson"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
		/>
		<Avatar fallback="+3" variant="solid" />
	</Avatar.Group>
{/snippet}

{#snippet stackingStory()}
	<Stack gap={8}>
		<Avatar.Group size="lg" stacking="last-on-top">
			<Avatar
				name="David Wilson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			/>
			<Avatar
				name="Marcus Chen"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
			/>
			<Avatar
				name="Sarah Johnson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
			/>
			<Avatar fallback="+3" />
		</Avatar.Group>

		<Avatar.Group size="lg" stacking="first-on-top">
			<Avatar
				name="David Wilson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			/>
			<Avatar
				name="Marcus Chen"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
			/>
			<Avatar
				name="Sarah Johnson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
			/>
			<Avatar fallback="+3" />
		</Avatar.Group>

		<Avatar.Group size="lg" spaceX="1" borderless>
			<Avatar
				name="David Wilson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			/>
			<Avatar
				name="Marcus Chen"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
			/>
			<Avatar
				name="Sarah Johnson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
			/>
			<Avatar fallback="+3" />
		</Avatar.Group>
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="Shape" template={shapeStory} />
<Story name="Fallback" template={fallbackStory} />
<Story name="With Ring" template={ringStory} />
<Story name="Group" template={groupStory} />
<Story name="Stacking" template={stackingStory} />
