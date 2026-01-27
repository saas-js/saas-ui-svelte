<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Group } from "$saas/layout/group";
	import { Button } from "$saas/components/button";
	import { Badge } from "$saas/components/badge";
	import { VStack, DecorativeBox } from "$saas/layout/stack";
	import { commonArgTypes, getControls, orientations } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Group",
		component: Group as any,
		argTypes: {
			attached: {
				control: "boolean",
				description:
					"If `true`, the elements will be attached together.",
				table: { defaultValue: { summary: "false" } },
			},
			grow: {
				control: "boolean",
				description:
					"If `true`, the elements will grow to fill the available space.",
				table: { defaultValue: { summary: "false" } },
			},
			orientation: {
				control: "radio",
				options: orientations,
				description: "The orientation of the group.",
				table: { defaultValue: { summary: "horizontal" } },
			},
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls(["attached", "grow", "orientation", "class"]),
		},
		args: {
			attached: false,
			grow: false,
			orientation: "horizontal",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<div class="flex justify-center">
		<Group {...args}>
			<DecorativeBox class="h-20 w-40!">1</DecorativeBox>
			<DecorativeBox class="h-20 w-40!">2</DecorativeBox>
		</Group>
	</div>
{/snippet}

{#snippet buttonsStory()}
	<div class="flex justify-center">
		<Group>
			<Button variant="outline">Item 1</Button>
			<Button variant="outline">Item 2</Button>
		</Group>
	</div>
{/snippet}

{#snippet attachedStory()}
	<div class="flex justify-center">
		<VStack gap={4}>
			<Group attached>
				<Button variant="outline">Item 1</Button>
				<Button variant="outline">Item 2</Button>
			</Group>

			<Group attached>
				<Badge variant="solid" colour="purple">Commit status</Badge>
				<Badge variant="solid" colour="green">90+</Badge>
			</Group>
		</VStack>
	</div>
{/snippet}

{#snippet growStory()}
	<div class="flex justify-center w-full">
		<div class="w-full max-w-(--sizes-md)">
			<Group grow>
				<Button variant="outline">First</Button>
				<Button variant="outline">Second</Button>
				<Button variant="outline">Third</Button>
			</Group>
		</div>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="With Buttons" template={buttonsStory} />

<Story name="Attached" template={attachedStory} />

<Story name="Grow" template={growStory} />
