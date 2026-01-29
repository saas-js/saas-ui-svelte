<script lang="ts">
	import { Float } from "$saas/layout/float";
	import { Box } from "$saas/layout/box";
	import { Circle } from "$saas/layout/circle";
	import { Avatar } from "$saas/components/avatar";
	import { Badge } from "$saas/components/badge";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { floatPlacements } from "../../utils";

	const placeholder = "relative size-20 bg-bg-subtle dark:bg-bg-emphasized";

	interface Props {
		story: "basic" | "placements" | "offsets" | "withAvatar";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<Box class={placeholder}>
		<Float {...args}>
			<Circle size="xs" colour="red">3</Circle>
		</Float>
	</Box>
{:else if story === "placements"}
	<HStack gap={8} class="flex-wrap" align="start">
		{#each floatPlacements as placement}
			<VStack gap={2} align="center">
				<Text size="xs">{placement}</Text>
				<Box class={placeholder}>
					<Float {placement}>
						<Circle size="xs" colour="red">3</Circle>
					</Float>
				</Box>
			</VStack>
		{/each}
	</HStack>
{:else if story === "offsets"}
	<HStack gap={8} align="center">
		<VStack gap={2} align="center">
			<Text size="xs">offsetX="-4"</Text>
			<Box class={placeholder}>
				<Float offsetX="-4">
					<Circle size="xs" colour="red">3</Circle>
				</Float>
			</Box>
		</VStack>
		<VStack gap={2} align="center">
			<Text size="xs">offsetY="-4"</Text>
			<Box class={placeholder}>
				<Float offsetY="-4">
					<Circle size="xs" colour="red">3</Circle>
				</Float>
			</Box>
		</VStack>
		<VStack gap={2} align="center">
			<Text size="xs">offset="4"</Text>
			<Box class={placeholder}>
				<Float offset="4">
					<Circle size="xs" colour="red">3</Circle>
				</Float>
			</Box>
		</VStack>
	</HStack>
{:else if story === "withAvatar"}
	<Box class="relative inline-block">
		<Avatar
			size="lg"
			shape="rounded"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			name="David Wilson"
		/>
		<Float placement="bottom-end">
			<Badge size="sm" variant="solid" colour="teal">New</Badge>
		</Float>
	</Box>
{/if}
