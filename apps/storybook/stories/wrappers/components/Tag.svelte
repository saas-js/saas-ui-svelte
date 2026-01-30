<script lang="ts" module>
	// Wrapper components for complex Tag stories
	// These are imported by Tag.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Tag } from "$saas/components/tag";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import Plus from "phosphor-svelte/lib/Plus";
	import Check from "phosphor-svelte/lib/Check";
	import { colours, tagVariants, tagSizes } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "variants"
			| "sizes"
			| "colours"
			| "closable"
			| "overflow"
			| "avatar"
			| "asButton";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Tag>Tag</Tag>
{:else if story === "variants"}
	<VStack gap={4}>
		{#each tagVariants as variant}
			<HStack gap={2}>
				<Tag {variant}>Gray</Tag>
				<Tag {variant} closable>Gray</Tag>
			</HStack>
		{/each}
	</VStack>
{:else if story === "sizes"}
	<VStack gap={2}>
		{#each tagSizes as size}
			<HStack gap={10} align="center" class="px-4">
				<Text class="min-w-[8ch]">{size}</Text>
				<Tag {size}>Gray</Tag>
				<Tag {size} closable>Gray</Tag>
				<Tag {size} endIcon={Check}>Gray</Tag>
			</HStack>
		{/each}
	</VStack>
{:else if story === "colours"}
	<VStack gap={2}>
		{#each colours as colour}
			<HStack gap={10} align="center" class="px-4">
				<Text class="min-w-[8ch]">{colour}</Text>
				<Tag {colour} size="sm">Content</Tag>
				<Tag {colour} size="sm" startIcon={Plus}>Content</Tag>
				<Tag {colour} size="sm" variant="solid" closable>Content</Tag>
			</HStack>
		{/each}
	</VStack>
{:else if story === "closable"}
	<HStack gap={2}>
		<Tag closable onClose={() => console.log("Close Tag 1")}>Tag 1</Tag>
		<Tag closable onClose={() => console.log("Close Tag 2")}>Tag 2</Tag>
	</HStack>
{:else if story === "overflow"}
	<Tag colour="blue" size="sm" maxWidth="200px" closable>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
		molestias, laboriosam, quod, quia quidem quae voluptatem natus
		exercitationem autem quibusdam
	</Tag>
{:else if story === "avatar"}
	<HStack gap={2} align="center">
		<Tag
			size="sm"
			startAvatar={{
				src: "https://api.dicebear.com/9.x/shapes/svg?seed=emily",
				name: "Emily",
			}}
		>
			Emily (sm)
		</Tag>
		<Tag
			size="md"
			startAvatar={{
				src: "https://api.dicebear.com/9.x/shapes/svg?seed=emily",
				name: "Emily",
			}}
		>
			Emily (md)
		</Tag>
		<Tag
			size="lg"
			startAvatar={{
				src: "https://api.dicebear.com/9.x/shapes/svg?seed=emily",
				name: "Emily",
			}}
		>
			Emily (lg)
		</Tag>
		<Tag
			size="xl"
			startAvatar={{
				src: "https://api.dicebear.com/9.x/shapes/svg?seed=emily",
				name: "Emily",
			}}
		>
			Emily (xl)
		</Tag>
	</HStack>
{:else if story === "asButton"}
	<button class="contents">
		<Tag variant="solid" endIcon={Check}>Fish</Tag>
	</button>
{/if}
