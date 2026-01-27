<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Container } from "$saas/layout/container";
	import { DecorativeBox, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { commonArgTypes, getControls, containerSizes } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Container",
		component: Container,
		argTypes: {
			maxW: {
				control: "select",
				options: containerSizes,
				description: "The maximum width of the container.",
				table: { defaultValue: { summary: "8xl" } },
			},
			fluid: {
				control: "boolean",
				description: "Whether the container should be fluid.",
				table: { defaultValue: { summary: "false" } },
			},
			centerContent: {
				control: "boolean",
				description: "Whether to center the content.",
				table: { defaultValue: { summary: "false" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["maxW", "fluid", "centerContent", "children", "class"]),
		},
		args: {
			maxW: "8xl",
		},
	});

	const sampleSizes = ["sm", "md", "xl", "2xl"] as const;
</script>

{#snippet basicStory(args: any)}
	<Container {...args}>
		<DecorativeBox class="px-2">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		</DecorativeBox>
	</Container>
{/snippet}

{#snippet sizesStory()}
	<VStack gap={4}>
		{#each sampleSizes as size}
			<div>
				<Text weight="medium" class="mb-1 text-center block">{size}</Text>
				<Container maxW={size}>
					<DecorativeBox class="px-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</DecorativeBox>
				</Container>
			</div>
		{/each}
	</VStack>
{/snippet}

{#snippet fluidStory()}
	<Container fluid>
		<DecorativeBox class="px-2">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		</DecorativeBox>
	</Container>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Fluid" template={fluidStory} />
