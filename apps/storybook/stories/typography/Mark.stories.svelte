<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Mark } from "$saas/typography/mark";
	import { Text } from "$saas/typography/text";
	import { DataList } from "$saas/components/data-list";
	import { commonArgTypes, getControls, markVariants } from "../utils";

	const { Story } = defineMeta({
		title: "typography/Mark",
		component: Mark,
		argTypes: {
			variant: {
				control: "select",
				options: markVariants,
				table: { defaultValue: { summary: "subtle" } },
			},
			colour: commonArgTypes.colour,
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["variant", "colour", "class", "children"]),
		},
		args: {
			variant: "subtle",
			colour: "gray",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Text>
		The <Mark {...args}>design system</Mark> is a collection of UI elements
	</Text>
{/snippet}

{#snippet variantsStory()}
	<DataList.Root orientation="vertical">
		{#each markVariants as variant}
			<DataList.Item>
				<DataList.ItemLabel>{variant}</DataList.ItemLabel>
				<DataList.ItemValue>
					<Text>
						The <Mark {variant} colour="indigo">design system</Mark>
						is a collection of UI elements
					</Text>
				</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Variants" template={variantsStory} />
