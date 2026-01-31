<script lang="ts" module>
	// Wrapper components for complex List stories
	// These are imported by List.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { List } from "$saas/components/list";
	import { Icon } from "$saas/components/icon";
	import { Text } from "$saas/typography/text";
	import CheckCircle from "phosphor-svelte/lib/CheckCircle";
	import CircleDashed from "phosphor-svelte/lib/CircleDashed";

	const listVariants = ["marker", "plain"] as const;

	interface Props {
		story: "basic" | "ordered" | "withIcon" | "nested";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<List.Root>
		<List.Item>Lorem ipsum dolor sit amet, consectetur adipisicing elit</List.Item>
		<List.Item>Assumenda, quia temporibus eveniet a libero incidunt suscipit</List.Item>
		<List.Item>Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</List.Item>
	</List.Root>
{:else if story === "ordered"}
	<List.Root as="ol">
		<List.Item>Lorem ipsum dolor sit amet, consectetur adipisicing elit</List.Item>
		<List.Item>Assumenda, quia temporibus eveniet a libero incidunt suscipit</List.Item>
		<List.Item>Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</List.Item>
	</List.Root>
{:else if story === "withIcon"}
	<List.Root variant="plain" align="start">
		<List.Item>
			<List.Indicator colour="green">
				<Icon as={CheckCircle} class="w-full h-full" />
			</List.Indicator>
			<Text as="span">Lorem ipsum dolor sit amet, consectetur adipisicing elit. This is a longer text that wraps to multiple lines to demonstrate alignment.</Text>
		</List.Item>
		<List.Item>
			<List.Indicator colour="green">
				<Icon as={CheckCircle} class="w-full h-full" />
			</List.Indicator>
			<Text as="span">Assumenda, quia temporibus eveniet a libero incidunt suscipit. Another multi-line example to show how icons align.</Text>
		</List.Item>
		<List.Item>
			<List.Indicator colour="green">
				<Icon as={CircleDashed} class="w-full h-full" />
			</List.Indicator>
			<Text as="span">Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</Text>
		</List.Item>
	</List.Root>
{:else if story === "nested"}
	<List.Root>
		<List.Item>First order item</List.Item>
		<List.Item>First order item</List.Item>
		<List.Item>
			First order item with list
			<List.Root class="pl-5">
				<List.Item>Nested item</List.Item>
				<List.Item>Nested item</List.Item>
				<List.Item>Nested item</List.Item>
			</List.Root>
		</List.Item>
		<List.Item>First order item</List.Item>
	</List.Root>
{/if}
