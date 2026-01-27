<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { List } from "$saas/components/list";
	import CheckCircle from "phosphor-svelte/lib/CheckCircle";
	import CircleDashed from "phosphor-svelte/lib/CircleDashed";
	import {
		commonArgTypes,
		getControls,
		listVariants,
		alignOptions,
		listAsOptions,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/List",
		parameters: {
			controls: getControls(["variant", "align", "as", "class"]),
		},
		argTypes: {
			variant: {
				control: "select",
				options: listVariants,
				description: "The visual style of the list.",
				table: { defaultValue: { summary: "marker" } },
			},
			align: {
				control: "select",
				options: alignOptions,
				description:
					"The alignment of list item content with indicators.",
				table: { defaultValue: { summary: "start" } },
			},
			as: {
				control: "select",
				options: listAsOptions,
				description: "The HTML element to render.",
				table: { defaultValue: { summary: "ul" } },
			},
			class: commonArgTypes.class,
		},
		args: {
			variant: "marker",
			align: "start",
			as: "ul",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<List.Root {...args}>
		<List.Item
			>Lorem ipsum dolor sit amet, consectetur adipisicing elit</List.Item
		>
		<List.Item
			>Assumenda, quia temporibus eveniet a libero incidunt suscipit</List.Item
		>
		<List.Item
			>Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</List.Item
		>
	</List.Root>
{/snippet}

{#snippet orderedStory(args: any)}
	<List.Root {...args} as="ol">
		<List.Item
			>Lorem ipsum dolor sit amet, consectetur adipisicing elit</List.Item
		>
		<List.Item
			>Assumenda, quia temporibus eveniet a libero incidunt suscipit</List.Item
		>
		<List.Item
			>Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</List.Item
		>
	</List.Root>
{/snippet}

{#snippet withIconStory(args: any)}
	<List.Root {...args} variant="plain" align="start">
		<List.Item>
			<List.Indicator colour="green">
				<CheckCircle class="h-full w-full" aria-hidden="true" />
			</List.Indicator>
			<span
				>Lorem ipsum dolor sit amet, consectetur adipisicing elit. This
				is a longer text that wraps to multiple lines to demonstrate
				alignment.</span
			>
		</List.Item>
		<List.Item>
			<List.Indicator colour="green">
				<CheckCircle class="h-full w-full" aria-hidden="true" />
			</List.Indicator>
			<span
				>Assumenda, quia temporibus eveniet a libero incidunt suscipit.
				Another multi-line example to show how icons align.</span
			>
		</List.Item>
		<List.Item>
			<List.Indicator colour="green">
				<CircleDashed class="h-full w-full" aria-hidden="true" />
			</List.Indicator>
			<span
				>Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</span
			>
		</List.Item>
	</List.Root>
{/snippet}

{#snippet nestedStory(args: any)}
	<List.Root {...args}>
		<List.Item>First order item</List.Item>
		<List.Item>First order item</List.Item>
		<List.Item>
			First order item with list
			<List.Root class="pl-5" variant={args.variant}>
				<List.Item>Nested item</List.Item>
				<List.Item>Nested item</List.Item>
				<List.Item>Nested item</List.Item>
			</List.Root>
		</List.Item>
		<List.Item>First order item</List.Item>
	</List.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Ordered" template={orderedStory} args={{ as: "ol" }} />

<Story
	name="With Icon"
	template={withIconStory}
	args={{ variant: "plain", align: "start" }}
/>

<Story name="Nested" template={nestedStory} />
