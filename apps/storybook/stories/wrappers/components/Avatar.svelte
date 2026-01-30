<script lang="ts" module>
	// Wrapper components for complex Avatar stories
</script>

<script lang="ts">
	import { Stack, VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Avatar } from "$saas/components/avatar";
	import {
		avatarSizes,
		avatarShapes,
		avatarVariants,
		colours,
	} from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "shape"
			| "fallback"
			| "withRing"
			| "group"
			| "stacking"
			| "variants"
			| "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Avatar
		size="md"
		name="David Wilson"
		src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
	/>
{:else if story === "sizes"}
	<Stack gap={6} class="flex-row items-start">
		{#each avatarSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Avatar
					{size}
					name="David Wilson"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
				/>
			</VStack>
		{/each}
	</Stack>
{:else if story === "shape"}
	<Stack gap={8} class="flex-row items-start">
		{#each avatarShapes as shape}
			<VStack gap={2} class="items-center">
				<Text size="xs">{shape}</Text>
				<Avatar
					{shape}
					size="lg"
					name="David Wilson"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
				/>
			</VStack>
		{/each}
	</Stack>
{:else if story === "fallback"}
	<Stack gap={4} class="flex-row items-center">
		<Avatar name="Oshigaki Kisame" />
		<Avatar name="Sasuke Uchiha" colour="teal" />
		<Avatar colour="red" />
	</Stack>
{:else if story === "withRing"}
	<Stack gap={4} class="flex-row items-center">
		<Avatar
			name="David Wilson"
			colour="pink"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			ring
		/>
		<Avatar
			name="Marcus Chen"
			colour="green"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
			ring
		/>
		<Avatar
			name="Sarah Johnson"
			colour="blue"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
			ring
		/>
	</Stack>
{:else if story === "group"}
	<Avatar.Group size="lg">
		<Avatar
			name="David Wilson"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
		/>
		<Avatar
			name="Marcus Chen"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
		/>
		<Avatar
			name="Sarah Johnson"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
		/>
		<Avatar fallback="+3" variant="solid" />
	</Avatar.Group>
{:else if story === "stacking"}
	<Stack gap={8}>
		<Avatar.Group size="lg" stacking="last-on-top">
			<Avatar
				name="David Wilson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			/>
			<Avatar
				name="Marcus Chen"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
			/>
			<Avatar
				name="Sarah Johnson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
			/>
			<Avatar fallback="+3" />
		</Avatar.Group>

		<Avatar.Group size="lg" stacking="first-on-top">
			<Avatar
				name="David Wilson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			/>
			<Avatar
				name="Marcus Chen"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
			/>
			<Avatar
				name="Sarah Johnson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
			/>
			<Avatar fallback="+3" />
		</Avatar.Group>

		<Avatar.Group size="lg" spaceX="1" borderless>
			<Avatar
				name="David Wilson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			/>
			<Avatar
				name="Marcus Chen"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
			/>
			<Avatar
				name="Sarah Johnson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
			/>
			<Avatar fallback="+3" />
		</Avatar.Group>
	</Stack>
{:else if story === "variants"}
	<HStack align="start" gap={4} class="flex-wrap p-4">
		{#each avatarVariants as variant}
			<VStack gap={2} class="items-center">
				<Text size="xs">{variant}</Text>
				<Avatar {variant} name="David Wilson" size="lg" />
			</VStack>
		{/each}
	</HStack>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4}>
				<Text size="xs" class="w-16">{colour}</Text>
				<Avatar variant="solid" {colour} name="DW" />
				<Avatar variant="subtle" {colour} name="DW" />
				<Avatar variant="outline" {colour} name="DW" />
			</HStack>
		{/each}
	</VStack>
{/if}
