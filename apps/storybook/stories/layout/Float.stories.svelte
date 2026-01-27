<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Float } from "$saas/layout/float";
	import { Box } from "$saas/layout/box";
	import { Circle } from "$saas/layout/circle";
	import { Avatar } from "$saas/components/avatar";
	import { Badge } from "$saas/components/badge";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { commonArgTypes, getControls, floatPlacements } from "../utils";

	const placeholder = "relative size-20 bg-bg-subtle dark:bg-bg-emphasized";

	type Args = {
		placement?:
			| "top-end"
			| "bottom-end"
			| "bottom-start"
			| "top-start"
			| "bottom-center"
			| "top-center"
			| "middle-center"
			| "middle-end"
			| "middle-start"
			| undefined;
		offsetX?: string | number;
		offsetY?: string | number;
		offset?: string | number;
		children?: any;
		class?: any;
	};

	const { Story } = defineMeta({
		title: "layout/Float",
		component: Float,
		argTypes: {
			placement: {
				control: "select",
				options: floatPlacements,
				description: "The placement of the indicator.",
				table: { defaultValue: { summary: "top-end" } },
			},
			offsetX: {
				control: "text",
				description: "The x offset of the indicator.",
			},
			offsetY: {
				control: "text",
				description: "The y offset of the indicator.",
			},
			offset: {
				control: "text",
				description: "The x and y offset of the indicator.",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"placement",
				"offsetX",
				"offsetY",
				"offset",
				"children",
				"class",
			]),
		},
		args: {
			placement: "top-end",
		},
	});
</script>

{#snippet basicStory(args: Args)}
	<Box class={placeholder}>
		<Float {...args}>
			<Circle size="xs" colour="red">3</Circle>
		</Float>
	</Box>
{/snippet}

{#snippet placementsStory()}
	<HStack gap={8} class="flex-wrap" align="start">
		{#each floatPlacements as placement}
			<VStack gap={2} align="center">
				<Text size="xs">{placement}</Text>
				<Box class={placeholder}>
					<Float {placement}>
						<Circle size="xs" colour="red">3</Circle>
					</Float>
				</Box>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet offsetsStory()}
	<HStack gap={8} align="center">
		<VStack gap={2} align="center">
			<Text size="xs">offsetX="-4"</Text>
			<Box class={placeholder}>
				<Float offsetX="-4">
					<Circle size="xs" colour="red">3</Circle>
				</Float>
			</Box>
		</VStack>
		<VStack gap={2} align="center">
			<Text size="xs">offsetY="-4"</Text>
			<Box class={placeholder}>
				<Float offsetY="-4">
					<Circle size="xs" colour="red">3</Circle>
				</Float>
			</Box>
		</VStack>
		<VStack gap={2} align="center">
			<Text size="xs">offset="4"</Text>
			<Box class={placeholder}>
				<Float offset="4">
					<Circle size="xs" colour="red">3</Circle>
				</Float>
			</Box>
		</VStack>
	</HStack>
{/snippet}

{#snippet avatarStory()}
	<Box class="relative inline-block">
		<Avatar
			size="lg"
			shape="rounded"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			name="David Wilson"
		/>
		<Float placement="bottom-end">
			<Badge size="sm" variant="solid" colour="teal">New</Badge>
		</Float>
	</Box>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Placements" template={placementsStory} />

<Story name="Offsets" template={offsetsStory} />

<Story name="With Avatar" template={avatarStory} />
