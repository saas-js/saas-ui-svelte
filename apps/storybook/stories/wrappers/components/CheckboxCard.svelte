<script lang="ts" module>
	// Wrapper components for complex CheckboxCard stories
</script>

<script lang="ts">
	import { CheckboxCard } from "$saas/components/checkbox-card";
	import { Badge } from "$saas/components/badge";
	import { Text } from "$saas/typography/text";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Box } from "$saas/layout/box";
	import { Icon } from "$saas/components/icon";
	import ShieldCheck from "phosphor-svelte/lib/ShieldCheck";
	import User from "phosphor-svelte/lib/User";
	import Globe from "phosphor-svelte/lib/Globe";
	import Lock from "phosphor-svelte/lib/Lock";
	import {
		checkboxCardVariants,
		checkboxCardSizes,
	} from "../../utils";

	interface Props {
		story:
			| "basic"
			| "group"
			| "sizes"
			| "variants"
			| "disabled"
			| "withAddon"
			| "withIcon";
	}

	let { story }: Props = $props();

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

	let groupValue = $state(["next"]);
	let roleValue = $state<string[]>([]);
</script>

{#if story === "basic"}
	<CheckboxCard.Root aria-label="Next.js" class="max-w-60">
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
{:else if story === "group"}
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
{:else if story === "sizes"}
	<Box class="w-64">
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
	</Box>
{:else if story === "variants"}
	<Box class="w-64">
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
	</Box>
{:else if story === "disabled"}
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
{:else if story === "withAddon"}
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
{:else if story === "withIcon"}
	<HStack gap={1.5} class="flex-wrap items-stretch">
		{#each roleItems as item}
			<CheckboxCard.Root
				aria-label={item.label}
				class="w-50 flex-none"
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
{/if}
