<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { CheckboxCard } from "$saas/components/checkbox-card";
	import { Badge } from "$saas/components/badge";
	import { Text } from "$saas/typography/text";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Icon } from "$saas/components/icon";
	import ShieldCheck from "phosphor-svelte/lib/ShieldCheck";
	import User from "phosphor-svelte/lib/User";
	import Globe from "phosphor-svelte/lib/Globe";
	import Lock from "phosphor-svelte/lib/Lock";

	import {
		commonArgTypes,
		getControls,
		checkboxCardVariants,
		checkboxCardSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Checkbox Card",
		component: CheckboxCard.Root,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: checkboxCardVariants,
				table: { defaultValue: { summary: "outline" } },
			},
			size: {
				...commonArgTypes.size,
				options: checkboxCardSizes,
				table: { defaultValue: { summary: "md" } },
			},
			colour: commonArgTypes.colour,
			disabled: commonArgTypes.disabled,
			checked: {
				control: "boolean",
				description: "Whether the checkbox card is checked.",
				table: { defaultValue: { summary: "false" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"colour",
				"disabled",
				"checked",
				"children",
				"class",
			]),
		},
		args: {
			variant: "outline",
			size: "md",
			colour: "indigo",
			disabled: false,
			checked: false,
		},
	});

	const items = [
		{ value: "next", title: "Next.js", description: "Best for apps" },
		{ value: "vite", title: "Vite", description: "Best for SPAs" },
		{
			value: "astro",
			title: "Astro",
			description: "Best for static sites",
		},
	];

	const roleItems = [
		{ icon: ShieldCheck, label: "Admin", description: "Give full access" },
		{ icon: User, label: "User", description: "Give limited access" },
		{ icon: Globe, label: "Guest", description: "Give read-only access" },
		{ icon: Lock, label: "Blocked", description: "No access" },
	];
</script>

<script lang="ts">
	let groupValue = $state(["next"]);
	let roleValue = $state<string[]>([]);
</script>

{#snippet basicStory(args: any)}
	<CheckboxCard.Root aria-label="Next.js" {...args} class="max-w-60">
		<CheckboxCard.Control>
			<CheckboxCard.Content>
				<CheckboxCard.Label>Next.js</CheckboxCard.Label>
				<CheckboxCard.Description
					>Best for apps</CheckboxCard.Description
				>
			</CheckboxCard.Content>
			<CheckboxCard.Indicator />
		</CheckboxCard.Control>
	</CheckboxCard.Root>
{/snippet}

{#snippet groupStory()}
	<VStack gap={1.5}>
		<Text size="sm" class="font-medium">Select framework(s)</Text>
		<HStack gap={2} class="items-stretch">
			{#each items as item}
				<CheckboxCard.Root
					aria-label={item.title}
					checked={groupValue.includes(item.value)}
					onCheckedChange={({ checked }) => {
						if (checked) {
							groupValue = [...groupValue, item.value];
						} else {
							groupValue = groupValue.filter(
								(v) => v !== item.value,
							);
						}
					}}
				>
					<CheckboxCard.Control>
						<CheckboxCard.Content>
							<CheckboxCard.Label>{item.title}</CheckboxCard.Label
							>
							<CheckboxCard.Description
								>{item.description}</CheckboxCard.Description
							>
						</CheckboxCard.Content>
						<CheckboxCard.Indicator />
					</CheckboxCard.Control>
				</CheckboxCard.Root>
			{/each}
		</HStack>
	</VStack>
{/snippet}

{#snippet sizesStory()}
	<div class="w-64">
		<VStack gap={2}>
			{#each checkboxCardSizes as size}
				<CheckboxCard.Root aria-label="Checkbox {size}" {size}>
					<CheckboxCard.Control>
						<CheckboxCard.Content>
							<CheckboxCard.Label
								>Checkbox ({size})</CheckboxCard.Label
							>
						</CheckboxCard.Content>
						<CheckboxCard.Indicator />
					</CheckboxCard.Control>
				</CheckboxCard.Root>
			{/each}
		</VStack>
	</div>
{/snippet}

{#snippet variantsStory()}
	<div class="w-64">
		<VStack gap={2}>
			{#each checkboxCardVariants as variant}
				<CheckboxCard.Root
					aria-label="Checkbox {variant}"
					{variant}
					checked
					colour="teal"
				>
					<CheckboxCard.Control>
						<CheckboxCard.Content>
							<CheckboxCard.Label
								>Checkbox ({variant})</CheckboxCard.Label
							>
						</CheckboxCard.Content>
						<CheckboxCard.Indicator />
					</CheckboxCard.Control>
				</CheckboxCard.Root>
			{/each}
		</VStack>
	</div>
{/snippet}

{#snippet disabledStory()}
	<CheckboxCard.Root aria-label="Disabled" disabled class="max-w-xs">
		<CheckboxCard.Control>
			<CheckboxCard.Content>
				<CheckboxCard.Label>Disabled</CheckboxCard.Label>
				<CheckboxCard.Description
					>This is a disabled checkbox</CheckboxCard.Description
				>
			</CheckboxCard.Content>
			<CheckboxCard.Indicator />
		</CheckboxCard.Control>
	</CheckboxCard.Root>
{/snippet}

{#snippet withAddonStory()}
	<CheckboxCard.Root aria-label="With Addon" class="max-w-72">
		<CheckboxCard.Control>
			<CheckboxCard.Content>
				<CheckboxCard.Label>With Addon</CheckboxCard.Label>
				<CheckboxCard.Description
					>Some description</CheckboxCard.Description
				>
			</CheckboxCard.Content>
			<CheckboxCard.Indicator />
		</CheckboxCard.Control>
		<CheckboxCard.Addon>
			<HStack gap={2}>
				<Text size="sm">Some supporting text</Text>
				<Badge variant="solid" colour="indigo">New</Badge>
			</HStack>
		</CheckboxCard.Addon>
	</CheckboxCard.Root>
{/snippet}

{#snippet withIconStory()}
	<HStack gap={1.5} class="flex-wrap items-stretch">
		{#each roleItems as item}
			<CheckboxCard.Root
				aria-label={item.label}
				class="w-[200px] flex-none"
				checked={roleValue.includes(item.label)}
				onCheckedChange={({ checked }) => {
					if (checked) {
						roleValue = [...roleValue, item.label];
					} else {
						roleValue = roleValue.filter((v) => v !== item.label);
					}
				}}
			>
				<CheckboxCard.Control align="center">
					<CheckboxCard.Content align="center">
						<Icon
							as={item.icon}
							size="md"
							weight="fill"
							class="mb-2"
						/>
						<CheckboxCard.Label>{item.label}</CheckboxCard.Label>
						<CheckboxCard.Description
							>{item.description}</CheckboxCard.Description
						>
					</CheckboxCard.Content>
					<CheckboxCard.Indicator />
				</CheckboxCard.Control>
			</CheckboxCard.Root>
		{/each}
	</HStack>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Group" template={groupStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="Variants" template={variantsStory} />
<Story name="Disabled" template={disabledStory} />
<Story name="With Addon" template={withAddonStory} />
<Story name="With Icon" template={withIconStory} />
