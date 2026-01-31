<script lang="ts" module>
	// Wrapper components for complex Kbd stories
	// These are imported by Kbd.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Kbd } from "$saas/components/kbd";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import { colours, kbdVariants, kbdSizes } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "combinations"
			| "functionKeys"
			| "variants"
			| "sizes"
			| "withinText"
			| "colours"
			| "modifierKeys";
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
{:else if story === "colours"}
	<VStack gap={2}>
		{#each colours as colour}
			<HStack gap={4} align="center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Kbd {colour} variant="outline">Outline</Kbd>
				<Kbd {colour} variant="subtle">Subtle</Kbd>
				<Kbd {colour} variant="raised">Raised</Kbd>
				<Kbd {colour} variant="plain">Plain</Kbd>
			</HStack>
		{/each}
	</VStack>
{:else if story === "modifierKeys"}
	<VStack gap={4}>
		<HStack gap={2}>
			<Text size="sm" class="w-32">Command + K:</Text>
			<Kbd keys={["command"]}>K</Kbd>
		</HStack>
		<HStack gap={2}>
			<Text size="sm" class="w-32">Ctrl + Shift + P:</Text>
			<Kbd keys={["control", "shift"]}>P</Kbd>
		</HStack>
		<HStack gap={2}>
			<Text size="sm" class="w-32">Option + Enter:</Text>
			<Kbd keys={["option", "enter"]} />
		</HStack>
		<HStack gap={2}>
			<Text size="sm" class="w-32">Shift + Tab:</Text>
			<Kbd keys={["shift", "tab"]} />
		</HStack>
		<HStack gap={2}>
			<Text size="sm" class="w-32">Arrow keys:</Text>
			<Kbd keys={["up"]} />
			<Kbd keys={["down"]} />
			<Kbd keys={["left"]} />
			<Kbd keys={["right"]} />
		</HStack>
	</VStack>
{/if}
