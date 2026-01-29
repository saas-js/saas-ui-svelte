<script lang="ts" module>
	// Wrapper components for complex GridList stories
	// These are imported by GridList.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { GridList } from "$saas/components/grid-list";
	import { Checkbox } from "$saas/components/checkbox";
	import { Tag } from "$saas/components/tag";
	import { Text } from "$saas/typography/text";

	interface Props {
		story: "basic" | "withHeader";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<GridList.Root interactive>
		<GridList.Item>
			<GridList.Cell width="8">
				<Checkbox.Root aria-label="Select Sarah Johnson" />
			</GridList.Cell>
			<GridList.Cell flex="1">
				<Text class="font-medium">Sarah Johnson</Text>
				<Text size="sm" class="text-fg-muted">sarah@company.com</Text>
			</GridList.Cell>
			<GridList.Cell shrink>
				<Tag>Admin</Tag>
			</GridList.Cell>
		</GridList.Item>
		<GridList.Item>
			<GridList.Cell width="8">
				<Checkbox.Root aria-label="Select Michael Chen" />
			</GridList.Cell>
			<GridList.Cell flex="1">
				<Text class="font-medium">Michael Chen</Text>
				<Text size="sm" class="text-fg-muted">michael@company.com</Text>
			</GridList.Cell>
			<GridList.Cell shrink>
				<Tag>Member</Tag>
			</GridList.Cell>
		</GridList.Item>
		<GridList.Item>
			<GridList.Cell width="8">
				<Checkbox.Root aria-label="Select Emma Rodriguez" />
			</GridList.Cell>
			<GridList.Cell flex="1">
				<Text class="font-medium">Emma Rodriguez</Text>
				<Text size="sm" class="text-fg-muted">emma@company.com</Text>
			</GridList.Cell>
			<GridList.Cell shrink>
				<Tag>Member</Tag>
			</GridList.Cell>
		</GridList.Item>
	</GridList.Root>
{:else if story === "withHeader"}
	<GridList.Root interactive>
		<GridList.Header>Users</GridList.Header>
		<GridList.Item>
			<GridList.Cell width="8">
				<Checkbox.Root aria-label="Select Sarah Johnson" />
			</GridList.Cell>
			<GridList.Cell flex="1">
				<Text class="font-medium">Sarah Johnson</Text>
				<Text size="sm" class="text-fg-muted">sarah@company.com</Text>
			</GridList.Cell>
			<GridList.Cell shrink>
				<Tag>Admin</Tag>
			</GridList.Cell>
		</GridList.Item>
		<GridList.Item>
			<GridList.Cell width="8">
				<Checkbox.Root aria-label="Select Michael Chen" />
			</GridList.Cell>
			<GridList.Cell flex="1">
				<Text class="font-medium">Michael Chen</Text>
				<Text size="sm" class="text-fg-muted">michael@company.com</Text>
			</GridList.Cell>
			<GridList.Cell shrink>
				<Tag>Member</Tag>
			</GridList.Cell>
		</GridList.Item>
		<GridList.Item>
			<GridList.Cell width="8">
				<Checkbox.Root aria-label="Select Emma Rodriguez" />
			</GridList.Cell>
			<GridList.Cell flex="1">
				<Text class="font-medium">Emma Rodriguez</Text>
				<Text size="sm" class="text-fg-muted">emma@company.com</Text>
			</GridList.Cell>
			<GridList.Cell shrink>
				<Tag>Member</Tag>
			</GridList.Cell>
		</GridList.Item>
	</GridList.Root>
{/if}
