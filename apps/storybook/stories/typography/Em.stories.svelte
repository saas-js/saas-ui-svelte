<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Em } from "$saas/typography/em";
	import { Text } from "$saas/typography/text";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "typography/Emphasis",
		component: Em,
		argTypes: {
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["class", "children"]),
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Text>
		The <Em {...args}>design system</Em> is a collection of UI elements
	</Text>
{/snippet}

<Story name="Basic" template={basicStory} />
