<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { RadioCard } from "$saas/components/radio-card";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import ArrowRight from "phosphor-svelte/lib/ArrowRight";
	import Prohibit from "phosphor-svelte/lib/Prohibit";
	import Lock from "phosphor-svelte/lib/Lock";
	import CurrencyDollar from "phosphor-svelte/lib/CurrencyDollar";
	import TrendUp from "phosphor-svelte/lib/TrendUp";
	import Clock from "phosphor-svelte/lib/Clock";
	import {
		colours,
		radioCardSizes,
		radioCardAligns,
		orientations,
		commonArgTypes,
		getControls,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Radio Card",
		component: RadioCard.Root,
		argTypes: {
			value: {
				control: "text",
				description: "The controlled value of the radio card group.",
			},
			size: {
				...commonArgTypes.size,
				options: radioCardSizes,
			},
			align: {
				control: "select",
				options: radioCardAligns,
				description: "The alignment of content within cards.",
				table: { defaultValue: { summary: "start" } },
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
				table: { defaultValue: { summary: "indigo" } },
			},
			orientation: {
				control: "select",
				options: orientations,
				description: "Layout orientation of the items container.",
				table: { defaultValue: { summary: "horizontal" } },
			},
			disabled: commonArgTypes.disabled,
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"value",
				"size",
				"align",
				"colour",
				"orientation",
				"disabled",
				"class",
				"children",
			]),
		},
		args: {
			size: "md",
			align: "start",
			colour: "indigo",
		},
	});

	const frameworks = [
		{ value: "next", title: "Next.js", description: "Best for apps" },
		{ value: "vite", title: "Vite", description: "Best for SPAs" },
		{
			value: "astro",
			title: "Astro",
			description: "Best for static sites",
		},
	];

	const permissions = [
		{
			value: "allow",
			title: "Allow",
			description: "This user can access the system",
		},
		{
			value: "deny",
			title: "Deny",
			description: "This user will be denied access",
		},
		{
			value: "lock",
			title: "Lock",
			description: "This user will be locked out",
		},
	];

	const contractTypes = [
		{ value: "fixed", title: "Fixed Rate" },
		{ value: "milestone", title: "Milestone" },
		{ value: "hourly", title: "Hourly" },
	];
</script>

<script lang="ts">
	let controlledValue = $state("next");
</script>

{#snippet basicStory(args: any)}
	<div class="max-w-3xl">
		<RadioCard.Root {...args} defaultValue="next">
			<RadioCard.Label>Select framework</RadioCard.Label>
			<HStack align="stretch">
				{#each frameworks as item}
					<RadioCard.Item
						label={item.title}
						description={item.description}
						value={item.value}
					/>
				{/each}
			</HStack>
		</RadioCard.Root>
	</div>
{/snippet}

{#snippet controlledStory()}
	<div class="max-w-3xl">
		<VStack gap={4} align="start">
			<Text size="sm" class="text-fg-muted">
				Selected: {controlledValue}
			</Text>
			<RadioCard.Root
				bind:value={controlledValue}
				onValueChange={({ value }) => (controlledValue = value)}
			>
				<RadioCard.Label>Select framework</RadioCard.Label>
				<HStack align="stretch">
					{#each frameworks as item}
						<RadioCard.Item
							label={item.title}
							description={item.description}
							value={item.value}
						/>
					{/each}
				</HStack>
			</RadioCard.Root>
		</VStack>
	</div>
{/snippet}

{#snippet sizesStory()}
	<div class="w-64">
		<VStack gap={8}>
			{#each radioCardSizes as size}
				<RadioCard.Root {size} defaultValue="next">
					<RadioCard.Label>size = ({size})</RadioCard.Label>
					<HStack align="stretch">
						<RadioCard.Item label="Next.js" value="next" />
					</HStack>
				</RadioCard.Root>
			{/each}
		</VStack>
	</div>
{/snippet}

{#snippet coloursStory()}
	<div class="w-64">
		<VStack gap={6}>
			{#each colours as colour}
				<RadioCard.Root {colour} defaultValue="next">
					<RadioCard.Label>{colour}</RadioCard.Label>
					<HStack align="stretch">
						<RadioCard.Item label="Next.js" value="next" />
					</HStack>
				</RadioCard.Root>
			{/each}
		</VStack>
	</div>
{/snippet}

{#snippet withIconStory()}
	<div class="max-w-3xl">
		<RadioCard.Root defaultValue="allow">
			<RadioCard.Label>Select permission</RadioCard.Label>
			<HStack align="stretch">
				<RadioCard.Item
					label="Allow"
					description="This user can access the system"
					value="allow"
					icon={ArrowRight}
				/>
				<RadioCard.Item
					label="Deny"
					description="This user will be denied access"
					value="deny"
					icon={Prohibit}
				/>
				<RadioCard.Item
					label="Lock"
					description="This user will be locked out"
					value="lock"
					icon={Lock}
				/>
			</HStack>
		</RadioCard.Root>
	</div>
{/snippet}

{#snippet centeredStory()}
	<div class="max-w-3xl">
		<RadioCard.Root align="center" defaultValue="fixed">
			<RadioCard.Label>Select contract type</RadioCard.Label>
			<HStack align="stretch">
				<RadioCard.Item
					label="Fixed Rate"
					value="fixed"
					icon={CurrencyDollar}
				/>
				<RadioCard.Item
					label="Milestone"
					value="milestone"
					icon={TrendUp}
				/>
				<RadioCard.Item label="Hourly" value="hourly" icon={Clock} />
			</HStack>
		</RadioCard.Root>
	</div>
{/snippet}

{#snippet withAddonStory()}
	<div class="max-w-3xl">
		<RadioCard.Root defaultValue="next">
			<RadioCard.Label>Select framework</RadioCard.Label>
			<HStack align="stretch">
				{#each frameworks as item}
					<RadioCard.Item
						label={item.title}
						description={item.description}
						value={item.value}
						addon="Some addon text"
					/>
				{/each}
			</HStack>
		</RadioCard.Root>
	</div>
{/snippet}

{#snippet verticalStory()}
	<div class="w-64">
		<RadioCard.Root orientation="vertical" defaultValue="next">
			<RadioCard.Label>Select framework</RadioCard.Label>
			<VStack align="stretch">
				{#each frameworks as item}
					<RadioCard.Item
						label={item.title}
						description={item.description}
						value={item.value}
					/>
				{/each}
			</VStack>
		</RadioCard.Root>
	</div>
{/snippet}

{#snippet disabledStory()}
	<div class="max-w-3xl">
		<RadioCard.Root defaultValue="next" disabled>
			<RadioCard.Label>Select framework (disabled)</RadioCard.Label>
			<HStack align="stretch">
				{#each frameworks as item}
					<RadioCard.Item
						label={item.title}
						description={item.description}
						value={item.value}
					/>
				{/each}
			</HStack>
		</RadioCard.Root>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Controlled" template={controlledStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="Colours" template={coloursStory} />
<Story name="With Icon" template={withIconStory} />
<Story name="Centered" template={centeredStory} />
<Story name="With Addon" template={withAddonStory} />
<Story name="Vertical Layout" template={verticalStory} />
<Story name="Disabled" template={disabledStory} />
