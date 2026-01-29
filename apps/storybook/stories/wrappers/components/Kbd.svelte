<script lang="ts" module>
	// Wrapper components for complex Kbd stories
	// These are imported by Kbd.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Kbd } from "$saas/components/kbd";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";

	const kbdVariants = ["raised", "outline", "subtle", "plain"] as const;
	const kbdSizes = ["sm", "md", "lg"] as const;

	interface Props {
		story:
			| "basic"
			| "combinations"
			| "functionKeys"
			| "variants"
			| "sizes"
			| "withinText";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Kbd>Shift + Tab</Kbd>
{:else if story === "combinations"}
	<HStack gap={1}>
		<Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
	</HStack>
{:else if story === "functionKeys"}
	<HStack gap={2}>
		<Kbd aria-label="Command">⌘</Kbd>
		<Kbd aria-label="Option">⌥</Kbd>
		<Kbd aria-label="Shift">⇧</Kbd>
		<Kbd aria-label="Control">⌃</Kbd>
	</HStack>
{:else if story === "variants"}
	<HStack gap={8} class="flex-wrap">
		{#each kbdVariants as variant}
			<VStack gap={2} class="items-center">
				<Text size="xs">{variant}</Text>
				<Kbd {variant}>Shift + Tab</Kbd>
			</VStack>
		{/each}
	</HStack>
{:else if story === "sizes"}
	<HStack gap={8} class="flex-wrap">
		{#each kbdSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Kbd {size} variant="outline">Shift + Tab</Kbd>
			</VStack>
		{/each}
	</HStack>
{:else if story === "withinText"}
	<Text>
		Press <Kbd>F12</Kbd> to open DevTools
	</Text>
{/if}
