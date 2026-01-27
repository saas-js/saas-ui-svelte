<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { GridList } from "$saas/components/grid-list";
	import { Checkbox } from "$saas/components/checkbox";
	import { Tag } from "$saas/components/tag";
	import { Text } from "$saas/typography/text";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Grid List",
		component: GridList.Root,
		argTypes: {
			interactive: {
				control: "boolean",
				description: "Whether the grid list items are interactive.",
				table: { defaultValue: { summary: "false" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["interactive", "class"]),
		},
		args: {
			interactive: true,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<GridList.Root {...args}>
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
{/snippet}

{#snippet withHeaderStory()}
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
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="With Header" template={withHeaderStory} />
