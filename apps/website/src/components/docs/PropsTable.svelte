<script lang="ts">
import { Table } from "@saas-ui/svelte/components/table";
import { Code } from "@saas-ui/svelte/typography/code";

interface PropDef {
	type?: string;
	default?: string;
	description?: string;
	options?: string[];
	control?: string;
	table?: {
		defaultValue?: { summary: string };
		type?: { summary: string };
	};
}

interface Props {
	props: Record<string, PropDef>;
	/** Whether this is from argTypes (storybook meta) or subComponent props */
	isArgTypes?: boolean;
}

let { props, isArgTypes = false }: Props = $props();

function getType(propDef: PropDef): string {
	if (isArgTypes) {
		return propDef.options
			? propDef.options.join(" | ")
			: propDef.control || "any";
	}
	return propDef.type || "any";
}

function getDefault(propDef: PropDef): string | null {
	if (isArgTypes) {
		return propDef.table?.defaultValue?.summary || null;
	}
	return propDef.default || null;
}
</script>

<Table.Root size="sm">
	<Table.Header>
		<Table.Row>
			<Table.ColumnHeader>Prop</Table.ColumnHeader>
			<Table.ColumnHeader>Type</Table.ColumnHeader>
			<Table.ColumnHeader>Default</Table.ColumnHeader>
			<Table.ColumnHeader>Description</Table.ColumnHeader>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each Object.entries(props) as [prop, propDef]}
			<Table.Row>
				<Table.Cell>
					<Code size="xs" colour="indigo">{prop}</Code>
				</Table.Cell>
				<Table.Cell>
					<Code size="xs" colour="gray">{getType(propDef)}</Code>
				</Table.Cell>
				<Table.Cell>
					{#if getDefault(propDef)}
						<Code size="xs" colour="gray"
							>{getDefault(propDef)}</Code
						>
					{:else}
						-
					{/if}
				</Table.Cell>
				<Table.Cell class="text-fg-muted">
					{propDef.description || "-"}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
