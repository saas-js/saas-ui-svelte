<script lang="ts" module>
	// Wrapper component for Accordion stories
</script>

<script lang="ts">
	import { Accordion } from "$saas/components/accordion";
	import { Stack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import User from "phosphor-svelte/lib/User";
	import Gear from "phosphor-svelte/lib/Gear";
	import CreditCard from "phosphor-svelte/lib/CreditCard";

	const accordionSizes = ["sm", "md", "lg"] as const;

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

	interface Props {
		story:
			| "basic"
			| "controlled"
			| "withIcon"
			| "multiple"
			| "sizes"
			| "variants"
			| "disabledItem";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Accordion.Root
		id="basic-accordion"
		items={basicItems}
		variant="outline"
		size="md"
		collapsible
		defaultValue={["b"]}
	/>
{:else if story === "controlled"}
	<Accordion.Root
		id="controlled-accordion"
		items={controlledItems}
		collapsible
		defaultValue={["b"]}
	/>
{:else if story === "withIcon"}
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
{:else if story === "multiple"}
	<Accordion.Root
		id="multiple-accordion"
		items={multipleItems}
		collapsible
		multiple
		defaultValue={["a", "b"]}
	/>
{:else if story === "sizes"}
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
{:else if story === "variants"}
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
{:else if story === "disabledItem"}
	<Accordion.Root
		id="disabled-accordion"
		items={disabledItems}
		collapsible
		defaultValue={["a"]}
	/>
{/if}
