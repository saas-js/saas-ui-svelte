<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Centre, Square, AbsoluteCentre } from "$saas/layout/centre";
	import { Circle } from "$saas/layout/circle";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import Phone from "phosphor-svelte/lib/Phone";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Centre",
		component: Centre,
		argTypes: {
			inline: {
				control: "boolean",
				description: "Whether to use inline-flex instead of flex.",
				table: { defaultValue: { summary: "false" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["inline", "children", "class"]),
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Centre {...args} class="bg-bg-emphasized h-[100px] w-80">
		<Text>This will be centred</Text>
	</Centre>
{/snippet}

{#snippet squareStory()}
	<Square size={10} class="bg-purple-700 text-white">
		<Icon as={Phone} />
	</Square>
{/snippet}

{#snippet circleStory()}
	<Circle size="md" colour="blue">
		<Icon as={Phone} />
	</Circle>
{/snippet}

{#snippet absoluteCentreStory()}
	<div class="relative h-24 bg-bg-emphasized">
		<AbsoluteCentre class="bg-accent-solid text-white p-4">
			<Icon as={Phone} />
		</AbsoluteCentre>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Square" template={squareStory} />

<Story name="Circle" template={circleStory} />

<Story name="AbsoluteCentre" template={absoluteCentreStory} />
