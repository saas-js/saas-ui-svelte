<script lang="ts" module>
	// Wrapper component for ActionBar stories
</script>

<script lang="ts">
	import {
		ActionBar,
		ActionBarSelectionTrigger,
		ActionBarSeparator,
		ActionBarCloseButton,
	} from "$saas/components/action-bar";
	import { Button } from "$saas/components/button";
	import { Checkbox } from "$saas/components/checkbox";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import Trash from "phosphor-svelte/lib/Trash";
	import ShareNetwork from "phosphor-svelte/lib/ShareNetwork";
	import FolderPlus from "phosphor-svelte/lib/FolderPlus";
	import { Icon } from "$saas/components/icon";

	interface Props {
		story: "basic" | "closable" | "multipleActions" | "interactive";
	}

	let { story }: Props = $props();

	let basicOpen = $state(true);
	let closableOpen = $state(false);
	let multipleActionsOpen = $state(false);
	let selectedCount = $state(0);
</script>

{#if story === "basic"}
	<div>
		<Checkbox.Root
			label="Show Action Bar"
			checked={basicOpen}
			onCheckedChange={(e) => (basicOpen = !!e.checked)}
		/>

		<ActionBar open={basicOpen} onOpenChange={(e) => (basicOpen = e.open)}>
			<ActionBarSelectionTrigger>2 selected</ActionBarSelectionTrigger>
			<ActionBarSeparator />
			<Button variant="outline" size="sm">
				<Icon as={Trash} size="sm" />
				Delete
			</Button>
			<Button variant="outline" size="sm">
				<Icon as={ShareNetwork} size="sm" />
				Share
			</Button>
		</ActionBar>
	</div>
{:else if story === "closable"}
	<div>
		<Checkbox.Root
			label="Show Action Bar"
			checked={closableOpen}
			onCheckedChange={(e) => (closableOpen = !!e.checked)}
		/>

		<ActionBar
			open={closableOpen}
			onOpenChange={(e) => (closableOpen = e.open)}
		>
			<ActionBarSelectionTrigger>2 selected</ActionBarSelectionTrigger>
			<ActionBarSeparator />
			<Button variant="outline" size="sm">
				<Icon as={Trash} size="sm" />
				Delete
			</Button>
			<Button variant="outline" size="sm">
				<Icon as={ShareNetwork} size="sm" />
				Share
			</Button>
			<ActionBarCloseButton onclick={() => (closableOpen = false)} />
		</ActionBar>
	</div>
{:else if story === "multipleActions"}
	<div>
		<Checkbox.Root
			label="Show Action Bar"
			checked={multipleActionsOpen}
			onCheckedChange={(e) => (multipleActionsOpen = !!e.checked)}
		/>

		<ActionBar open={multipleActionsOpen}>
			<ActionBarSelectionTrigger>4 selected</ActionBarSelectionTrigger>
			<ActionBarSeparator />
			<Button variant="outline" size="sm">
				<Icon as={FolderPlus} size="sm" />
				Add to collection
			</Button>
			<Button variant="surface" size="sm" colour="red">
				<Icon as={Trash} size="sm" />
				Delete projects
			</Button>
		</ActionBar>
	</div>
{:else if story === "interactive"}
	<div>
		<VStack gap={3}>
			<Text size="sm" class="text-fg-muted"
				>Selected: {selectedCount} items</Text
			>
			<HStack gap={2} class="flex-wrap">
				{#each Array(5) as _, i}
					<Checkbox.Root
						label="Item {i + 1}"
						onCheckedChange={(e) => {
							selectedCount += e.checked ? 1 : -1;
						}}
					/>
				{/each}
			</HStack>
		</VStack>

		<ActionBar
			open={selectedCount > 0}
			onOpenChange={(e) => !e.open && (selectedCount = 0)}
		>
			<ActionBarSelectionTrigger
				>{selectedCount} selected</ActionBarSelectionTrigger
			>
			<ActionBarSeparator />
			<Button variant="outline" size="sm">
				<Icon as={Trash} size="sm" />
				Delete
			</Button>
			<Button variant="outline" size="sm">
				<Icon as={ShareNetwork} size="sm" />
				Share
			</Button>
			<ActionBarCloseButton onclick={() => (selectedCount = 0)} />
		</ActionBar>
	</div>
{/if}
