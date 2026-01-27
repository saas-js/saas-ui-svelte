<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { VisuallyHidden } from "$saas/utilities/visually-hidden";
	import { Button } from "$saas/components/button";
	import { commonArgTypes, getControls } from "../utils";
	import Bell from "phosphor-svelte/lib/Bell";

	const { Story } = defineMeta({
		title: "utilities/Visually Hidden",
		component: VisuallyHidden,
		argTypes: {
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["children", "class"]),
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Button>
		<Bell class="h-4 w-4" aria-hidden="true" />
		3
		<VisuallyHidden {...args}>Notifications</VisuallyHidden>
	</Button>
{/snippet}

<Story name="Basic" template={basicStory} />
