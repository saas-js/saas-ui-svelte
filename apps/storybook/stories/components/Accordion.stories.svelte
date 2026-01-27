<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Accordion } from "$saas/components/accordion";
	import { Stack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import User from "phosphor-svelte/lib/User";
	import Gear from "phosphor-svelte/lib/Gear";
	import CreditCard from "phosphor-svelte/lib/CreditCard";
	import {
		commonArgTypes,
		getControls,
		variants,
		accordionSizes,
	} from "../utils";

	function createItems(prefix: string) {
		return [
			{
				value: "a",
				title: `${prefix} First Item`,
				content: "Some value 1...",
			},
			{
				value: "b",
				title: `${prefix} Second Item`,
				content: "Some value 2...",
			},
			{
				value: "c",
				title: `${prefix} Third Item`,
				content: "Some value 3...",
			},
		];
	}

	const basicItems = createItems("Basic");
	const controlledItems = createItems("Controlled");
	const multipleItems = createItems("Multiple");
	const disabledItems = [
		{
			value: "a",
			title: "Disabled First Item",
			content: "Some value 1...",
		},
		{
			value: "b",
			title: "Disabled Second Item",
			content: "Some value 2...",
			disabled: true,
		},
		{
			value: "c",
			title: "Disabled Third Item",
			content: "Some value 3...",
		},
	];

	const { Story } = defineMeta({
		title: "components/Accordion",
		component: Accordion.Root,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: variants.filter((v) =>
					["outline", "subtle", "enclosed", "plain"].includes(v),
				),
			},
			size: {
				...commonArgTypes.size,
				options: accordionSizes,
			},
			collapsible: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			multiple: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			defaultValue: {
				control: "object",
			},
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"collapsible",
				"multiple",
				"defaultValue",
				"class",
			]),
		},
		args: {
			variant: "outline",
			size: "md",
			collapsible: true,
			multiple: false,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Accordion.Root
		id="basic-accordion"
		items={basicItems}
		{...args}
		defaultValue={args.defaultValue ?? ["b"]}
	/>
{/snippet}

{#snippet controlledStory()}
	<Accordion.Root
		id="controlled-accordion"
		items={controlledItems}
		collapsible
		defaultValue={["b"]}
	/>
{/snippet}

{#snippet withIconStory()}
	<Accordion.Root id="icon-accordion" collapsible defaultValue={["account"]}>
		<Accordion.Item value="account">
			<Accordion.ItemTrigger>
				<Icon as={User} size="sm" colour="gray" />
				Account Details
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				Manage your profile information and email preferences here.
			</Accordion.ItemContent>
		</Accordion.Item>

		<Accordion.Item value="billing">
			<Accordion.ItemTrigger>
				<Icon as={CreditCard} size="sm" colour="gray" />
				Billing & Plan
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				View your invoice history and manage your subscription plan.
			</Accordion.ItemContent>
		</Accordion.Item>

		<Accordion.Item value="preferences">
			<Accordion.ItemTrigger>
				<Icon as={Gear} size="sm" colour="gray" />
				Preferences
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				Adjust your notification settings and application theme.
			</Accordion.ItemContent>
		</Accordion.Item>
	</Accordion.Root>
{/snippet}

{#snippet multipleStory()}
	<Accordion.Root
		id="multiple-accordion"
		items={multipleItems}
		collapsible
		multiple
		defaultValue={["a", "b"]}
	/>
{/snippet}

{#snippet sizesStory()}
	<Stack gap={8}>
		{#each accordionSizes as size}
			<Stack gap={2}>
				<Text size="xs">{size}</Text>
				<Accordion.Root
					id="size-{size}-accordion"
					items={createItems(`Size ${size}`)}
					{size}
					collapsible
					defaultValue={["b"]}
				/>
			</Stack>
		{/each}
	</Stack>
{/snippet}

{#snippet variantsStory()}
	<Stack gap={8}>
		{#each ["outline", "subtle", "enclosed", "plain"] as const as variant}
			<Stack gap={2}>
				<Text size="xs">{variant}</Text>
				<Accordion.Root
					id="variant-{variant}-accordion"
					items={createItems(`Variant ${variant}`)}
					{variant}
					collapsible
					defaultValue={["b"]}
				/>
			</Stack>
		{/each}
	</Stack>
{/snippet}

{#snippet disabledItemStory()}
	<Accordion.Root
		id="disabled-accordion"
		items={disabledItems}
		collapsible
		defaultValue={["a"]}
	/>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="With Icon" template={withIconStory} />

<Story name="Multiple" template={multipleStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Disabled Item" template={disabledItemStory} />
