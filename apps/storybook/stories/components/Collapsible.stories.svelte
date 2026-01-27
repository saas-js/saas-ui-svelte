<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Collapsible } from "$saas/components/collapsible";
	import { Card } from "$saas/components/card";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Collapsible",
		component: Collapsible,
		argTypes: {
			defaultOpen: {
				control: "boolean",
				description: "Whether the collapsible is open by default.",
			},
			disabled: {
				control: "boolean",
				description: "Whether the collapsible is disabled.",
			},
			lazyMount: {
				control: "boolean",
				description: "Whether to enable lazy mounting of content.",
				table: { defaultValue: { summary: "false" } },
			},
			unmountOnExit: {
				control: "boolean",
				description: "Whether to unmount the content when collapsed.",
				table: { defaultValue: { summary: "false" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"defaultOpen",
				"disabled",
				"lazyMount",
				"unmountOnExit",
				"class",
			]),
		},
		args: {
			defaultOpen: false,
			disabled: false,
			lazyMount: false,
			unmountOnExit: false,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Collapsible {...args}>
		<Collapsible.Trigger>Toggle Collapsible</Collapsible.Trigger>
		<Collapsible.Content>
			<Card.Root class="p-2 px-4 text-sm">
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a galley
				of type and scrambled it to make a type specimen book.
			</Card.Root>
		</Collapsible.Content>
	</Collapsible>
{/snippet}

{#snippet lazyMountedStory()}
	<Collapsible unmountOnExit>
		<Collapsible.Trigger
			>Toggle Collapse (Unmount on exit)</Collapsible.Trigger
		>
		<Collapsible.Content>
			<Card.Root class="p-2 px-4 text-sm">
				If you inspect the DOM, you'll notice that the content is
				unmounted when collapsed. This is useful for performance reasons
				when you have a lot of collapsible content.
			</Card.Root>
		</Collapsible.Content>
	</Collapsible>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="LazyMounted" template={lazyMountedStory} />
