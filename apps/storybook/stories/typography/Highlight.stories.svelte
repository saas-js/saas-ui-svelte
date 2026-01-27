<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Highlight } from "$saas/typography/highlight";
	import { Heading } from "$saas/typography/heading";
	import { Text } from "$saas/typography/text";
	import { Stack } from "$saas/layout/stack";
	import { commonArgTypes, getControls, markVariants } from "../utils";

	const { Story } = defineMeta({
		title: "typography/Highlight",
		component: Highlight,
		argTypes: {
			query: {
				control: "text",
			},
			text: {
				control: "text",
			},
			ignoreCase: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			matchAll: {
				control: "boolean",
				table: { defaultValue: { summary: "true" } },
			},
			variant: {
				control: "select",
				options: markVariants,
				table: { defaultValue: { summary: "subtle" } },
			},
			colour: commonArgTypes.colour,
			markClass: {
				control: "text",
				description:
					"Additional CSS classes to apply to the highlighted text",
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"query",
				"text",
				"ignoreCase",
				"matchAll",
				"variant",
				"colour",
				"markClass",
				"class",
			]),
		},
		args: {
			query: "spotlight",
			text: "With the Highlight component, you can spotlight words.",
			ignoreCase: false,
			matchAll: true,
			variant: "subtle",
			colour: "orange",
		},
	});
</script>

{#snippet multipleStory()}
	<Heading size="lg">
		<Highlight
			query={["spotlight", "emphasise", "accentuate"]}
			text="With the Highlight component, you can spotlight, emphasise and accentuate words."
			variant="subtle"
			colour="teal"
		/>
	</Heading>
{/snippet}

{#snippet customStyleStory()}
	<Highlight
		query="component"
		variant="text"
		text="With the Highlight component, you can spotlight words."
	/>
{/snippet}

{#snippet searchQueryStory()}
	{@const query = "spot"}
	{@const results = ["Spotlight bulb", "Spot cleaner", "Spot ceiling"]}
	<Stack>
		<Text>Search result for: spot</Text>
		<Stack>
			{#each results as item}
				<Highlight ignoreCase {query} variant="text" text={item} />
			{/each}
		</Stack>
	</Stack>
{/snippet}

{#snippet markClassStory()}
	<Highlight
		query="custom"
		variant="plain"
		text="Use markClass to apply custom styling to highlighted text."
		markClass="underline decoration-2 decoration-pink-500"
	/>
{/snippet}

{#snippet basicStory(args: any)}
	<Highlight {...args} />
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Multiple" template={multipleStory} />

<Story name="Custom Style" template={customStyleStory} />

<Story name="Search Query" template={searchQueryStory} />

<Story name="Mark Class" template={markClassStory} />
