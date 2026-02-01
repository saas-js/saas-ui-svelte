<script lang="ts">
	import { Group } from "$saas/layout/group";
	import { Button } from "$saas/components/button";
	import { Badge } from "$saas/components/badge";
	import { VStack, DecorativeBox } from "$saas/layout/stack";

	interface Props {
		story: "basic" | "withButtons" | "attached" | "grow";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<div class="flex justify-center">
		<Group {...args}>
			<DecorativeBox class="h-20 w-40!">1</DecorativeBox>
			<DecorativeBox class="h-20 w-40!">2</DecorativeBox>
		</Group>
	</div>
{:else if story === "withButtons"}
	<div class="flex justify-center">
		<Group>
			<Button variant="outline">Item 1</Button>
			<Button variant="outline">Item 2</Button>
		</Group>
	</div>
{:else if story === "attached"}
	<div class="flex justify-center">
		<VStack gap={4}>
			<Group attached>
				<Button variant="outline">Item 1</Button>
				<Button variant="outline">Item 2</Button>
			</Group>

			<Group attached>
				<Badge variant="solid" colour="purple">Commit status</Badge>
				<Badge variant="solid" colour="green">90+</Badge>
			</Group>
		</VStack>
	</div>
{:else if story === "grow"}
	<div class="flex w-full justify-center">
		<div class="w-full max-w-(--sizes-md)">
			<Group grow>
				<Button variant="outline">First</Button>
				<Button variant="outline">Second</Button>
				<Button variant="outline">Third</Button>
			</Group>
		</div>
	</div>
{/if}
