<script lang="ts">
	import {
		Stack,
		HStack,
		VStack,
		Divider,
		DecorativeBox,
	} from "$saas/layout/stack";

	interface Props {
		story: "basic" | "horizontal" | "hStack" | "vStack" | "separator" | "responsive";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<Stack {...args}>
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
	</Stack>
{:else if story === "horizontal"}
	<div class="flex justify-center">
		<Stack direction="row" class="h-20">
			<DecorativeBox class="w-40!" />
			<DecorativeBox class="w-40!" />
			<DecorativeBox class="w-40!" />
		</Stack>
	</div>
{:else if story === "hStack"}
	<div class="flex justify-center">
		<HStack>
			<DecorativeBox class="h-10 w-40!" />
			<DecorativeBox class="h-5 w-40!" />
			<DecorativeBox class="h-20 w-40!" />
		</HStack>
	</div>
{:else if story === "vStack"}
	<VStack>
		<DecorativeBox class="w-1/2 h-20" />
		<DecorativeBox class="w-1/4 h-20" />
		<DecorativeBox class="w-full h-20" />
	</VStack>
{:else if story === "separator"}
	<Stack>
		<DecorativeBox class="h-20" />
		<Divider />
		<DecorativeBox class="h-20" />
		<Divider />
		<DecorativeBox class="h-20" />
	</Stack>
{:else if story === "responsive"}
	<div class="flex justify-center">
		<Stack gap={10} class="flex-col md:flex-row">
			<DecorativeBox class="size-20!" />
			<DecorativeBox class="size-20!" />
			<DecorativeBox class="size-20!" />
		</Stack>
	</div>
{/if}
