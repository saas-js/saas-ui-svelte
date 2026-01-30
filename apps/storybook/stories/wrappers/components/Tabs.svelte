<script lang="ts" module>
	// Wrapper components for complex Tabs stories
	// These are imported by Tabs.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Tabs } from "$saas/components/tabs";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Button } from "$saas/components/button";
	import { CloseButton } from "$saas/components/close-button";
	import User from "phosphor-svelte/lib/User";
	import Folder from "phosphor-svelte/lib/Folder";
	import CheckSquare from "phosphor-svelte/lib/CheckSquare";
	import Plus from "phosphor-svelte/lib/Plus";
	import { colours, tabsSizes, tabsVariants } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "variants"
			| "sizes"
			| "fitted"
			| "lazyMount"
			| "indicator"
			| "colours"
			| "disabled"
			| "manualActivation"
			| "dynamic";
	}

	let { story }: Props = $props();

	let dynamicTabs = $state([
		{ id: "1", title: "Tab", content: "Tab Content" },
		{ id: "2", title: "Tab", content: "Tab Content" },
		{ id: "3", title: "Tab", content: "Tab Content" },
	]);
	let selectedTab = $state("1");

	const uuid = () => Math.random().toString(36).substring(2, 15);

	function addTab() {
		const id = uuid();
		dynamicTabs = [
			...dynamicTabs,
			{ id, title: "Tab", content: "Tab Content" },
		];
		selectedTab = id;
	}

	function removeTab(id: string) {
		if (dynamicTabs.length > 1) {
			dynamicTabs = dynamicTabs.filter((tab) => tab.id !== id);
			if (selectedTab === id) {
				selectedTab = dynamicTabs[0].id;
			}
		}
	}
</script>

{#if story === "basic"}
	<Tabs.Root defaultValue="members">
		<Tabs.List>
			<Tabs.Trigger value="members">
				<User class="size-3.5" aria-hidden="true" />
				Members
			</Tabs.Trigger>
			<Tabs.Trigger value="projects">
				<Folder class="size-3.5" aria-hidden="true" />
				Projects
			</Tabs.Trigger>
			<Tabs.Trigger value="settings">
				<CheckSquare class="size-3.5" aria-hidden="true" />
				Settings
			</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="members">Manage your team members</Tabs.Content>
		<Tabs.Content value="projects">Manage your projects</Tabs.Content>
		<Tabs.Content value="settings">Manage your settings</Tabs.Content>
	</Tabs.Root>
{:else if story === "variants"}
	<VStack gap={10} class="w-full">
		{#each tabsVariants as variant}
			<VStack gap={2}>
				<Text size="xs" class="text-fg-muted capitalize">{variant}</Text>
				<Tabs.Root {variant} defaultValue="members">
					<Tabs.List>
						<Tabs.Trigger value="members">
							<User class="size-3.5" aria-hidden="true" />
							Members
						</Tabs.Trigger>
						<Tabs.Trigger value="projects">
							<Folder class="size-3.5" aria-hidden="true" />
							Projects
						</Tabs.Trigger>
						<Tabs.Trigger value="settings">
							<CheckSquare class="size-3.5" aria-hidden="true" />
							Settings
						</Tabs.Trigger>
						{#if variant === "outline"}
							<Tabs.Indicator />
						{/if}
					</Tabs.List>
					<Tabs.Content value="members">Manage your team members</Tabs.Content>
					<Tabs.Content value="projects">Manage your projects</Tabs.Content>
					<Tabs.Content value="settings">Manage your settings</Tabs.Content>
				</Tabs.Root>
			</VStack>
		{/each}
	</VStack>
{:else if story === "sizes"}
	<VStack gap={10} class="w-full">
		{#each tabsSizes as size}
			<VStack gap={2}>
				<Text size="xs" class="text-fg-muted capitalize">{size}</Text>
				<Tabs.Root {size} defaultValue="members">
					<Tabs.List>
						<Tabs.Trigger value="members">Members</Tabs.Trigger>
						<Tabs.Trigger value="projects">Projects</Tabs.Trigger>
						<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="members">Manage your team members</Tabs.Content>
					<Tabs.Content value="projects">Manage your projects</Tabs.Content>
					<Tabs.Content value="settings">Manage your settings</Tabs.Content>
				</Tabs.Root>
			</VStack>
		{/each}
	</VStack>
{:else if story === "fitted"}
	<Tabs.Root variant="outline" fitted defaultValue="tab-1" class="max-w-md">
		<Tabs.List>
			<Tabs.Trigger value="tab-1" class="whitespace-nowrap">Tab 1</Tabs.Trigger>
			<Tabs.Trigger value="tab-2" class="whitespace-nowrap">Tab 2</Tabs.Trigger>
			<Tabs.Trigger value="tab-3" class="whitespace-nowrap">Tab 3</Tabs.Trigger>
			<Tabs.Indicator />
		</Tabs.List>
		<Tabs.Content value="tab-1">Tab 1 content</Tabs.Content>
		<Tabs.Content value="tab-2">Tab 2 content</Tabs.Content>
		<Tabs.Content value="tab-3">Tab 3 content</Tabs.Content>
	</Tabs.Root>
{:else if story === "lazyMount"}
	<Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
		<Tabs.List>
			<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
			<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
			<Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="tab-1">Tab 1: Content (lazy mounted)</Tabs.Content>
		<Tabs.Content value="tab-2">Tab 2: Content (lazy mounted)</Tabs.Content>
		<Tabs.Content value="tab-3">Tab 3: Content (lazy mounted)</Tabs.Content>
	</Tabs.Root>
{:else if story === "indicator"}
	<Tabs.Root defaultValue="members" variant="plain">
		<Tabs.List class="bg-bg-muted rounded-lg p-1">
			<Tabs.Trigger value="members">
				<User class="size-3.5" aria-hidden="true" />
				Members
			</Tabs.Trigger>
			<Tabs.Trigger value="projects">
				<Folder class="size-3.5" aria-hidden="true" />
				Projects
			</Tabs.Trigger>
			<Tabs.Trigger value="settings">
				<CheckSquare class="size-3.5" aria-hidden="true" />
				Settings
			</Tabs.Trigger>
			<Tabs.Indicator class="bg-bg-default rounded-md shadow" />
		</Tabs.List>
		<Tabs.Content value="members">Manage your team members</Tabs.Content>
		<Tabs.Content value="projects">Manage your projects</Tabs.Content>
		<Tabs.Content value="settings">Manage your settings</Tabs.Content>
	</Tabs.Root>
{:else if story === "colours"}
	<VStack gap={6}>
		{#each colours as colour}
			<HStack gap={4} class="items-start">
				<Text size="xs" class="w-16 pt-2 capitalize">{colour}</Text>
				<VStack gap={2}>
					<Text size="xs" class="text-fg-muted">line</Text>
					<Tabs.Root defaultValue="tab-1" variant="line" {colour} size="sm">
						<Tabs.List>
							<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
							<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
							<Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="tab-1" class="sr-only">Tab 1</Tabs.Content>
						<Tabs.Content value="tab-2" class="sr-only">Tab 2</Tabs.Content>
						<Tabs.Content value="tab-3" class="sr-only">Tab 3</Tabs.Content>
					</Tabs.Root>
				</VStack>
				<VStack gap={2}>
					<Text size="xs" class="text-fg-muted">subtle</Text>
					<Tabs.Root defaultValue="tab-1" variant="subtle" {colour} size="sm">
						<Tabs.List>
							<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
							<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
							<Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="tab-1" class="sr-only">Tab 1</Tabs.Content>
						<Tabs.Content value="tab-2" class="sr-only">Tab 2</Tabs.Content>
						<Tabs.Content value="tab-3" class="sr-only">Tab 3</Tabs.Content>
					</Tabs.Root>
				</VStack>
				<VStack gap={2}>
					<Text size="xs" class="text-fg-muted">outline</Text>
					<Tabs.Root defaultValue="tab-1" variant="outline" {colour} size="sm">
						<Tabs.List>
							<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
							<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
							<Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
							<Tabs.Indicator />
						</Tabs.List>
						<Tabs.Content value="tab-1" class="sr-only">Tab 1</Tabs.Content>
						<Tabs.Content value="tab-2" class="sr-only">Tab 2</Tabs.Content>
						<Tabs.Content value="tab-3" class="sr-only">Tab 3</Tabs.Content>
					</Tabs.Root>
				</VStack>
			</HStack>
		{/each}
	</VStack>
{:else if story === "disabled"}
	<Tabs.Root defaultValue="members">
		<Tabs.List>
			<Tabs.Trigger value="members">
				<User class="size-3.5" aria-hidden="true" />
				Members
			</Tabs.Trigger>
			<Tabs.Trigger value="projects" disabled>
				<Folder class="size-3.5" aria-hidden="true" />
				Projects
			</Tabs.Trigger>
			<Tabs.Trigger value="settings">
				<CheckSquare class="size-3.5" aria-hidden="true" />
				Settings
			</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="members">Manage your team members</Tabs.Content>
		<Tabs.Content value="projects">Manage your projects</Tabs.Content>
		<Tabs.Content value="settings">Manage your settings</Tabs.Content>
	</Tabs.Root>
{:else if story === "manualActivation"}
	<Tabs.Root defaultValue="members" activationMode="manual">
		<Tabs.List>
			<Tabs.Trigger value="members">Members</Tabs.Trigger>
			<Tabs.Trigger value="projects">Projects</Tabs.Trigger>
			<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="members">
			Manage your team members (click or press Enter to activate)
		</Tabs.Content>
		<Tabs.Content value="projects">
			Manage your projects (click or press Enter to activate)
		</Tabs.Content>
		<Tabs.Content value="settings">
			Manage your settings (click or press Enter to activate)
		</Tabs.Content>
	</Tabs.Root>
{:else if story === "dynamic"}
	<Tabs.Root
		value={selectedTab}
		variant="enclosed"
		size="sm"
		onValueChange={(e) => (selectedTab = e.value)}
	>
		<HStack gap={2} class="items-center">
			<Tabs.List class="flex-1">
				{#each dynamicTabs as tab (tab.id)}
					<Tabs.Trigger value={tab.id}>
						{tab.title}
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
			<Button size="2xs" variant="ghost" onclick={addTab}>
				<Plus class="size-3.5" aria-hidden="true" />
				Add Tab
			</Button>
		</HStack>
		<Tabs.ContentGroup>
			{#each dynamicTabs as tab (tab.id)}
				<Tabs.Content value={tab.id}>
					<HStack class="justify-between items-start">
						<Text size="lg" class="font-semibold my-4">
							{tab.content}
							{tab.id}
						</Text>
						{#if dynamicTabs.length > 1}
							<CloseButton
								size="xs"
								aria-label="Close tab {tab.id}"
								onclick={() => removeTab(tab.id)}
							/>
						{/if}
					</HStack>
					<Text>
						Dolore ex esse laboris elit magna esse sunt. Pariatur in
						veniam Lorem est occaecat do magna nisi mollit ipsum sit
						adipisicing fugiat ex.
					</Text>
				</Tabs.Content>
			{/each}
		</Tabs.ContentGroup>
	</Tabs.Root>
{/if}
