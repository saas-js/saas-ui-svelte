<script lang="ts" module>
	// Wrapper components for complex NativeSelect stories
	// These are imported by NativeSelect.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Text } from "$saas/typography/text";
	import { NativeSelect } from "$saas/components/native-select";
	import { Field } from "$saas/components/field";
	import { Button } from "$saas/components/button";
	import { VStack } from "$saas/layout/stack";

	const nativeSelectSizes = ["xs", "sm", "md", "lg", "xl"] as const;
	const nativeSelectVariants = ["outline", "subtle", "plain"] as const;

	interface Props {
		story: "basic" | "sizes" | "variants" | "withValidation";
	}

	let { story }: Props = $props();

	// State for hook form story
	let framework = $state("");
	let submitted = $state(false);
</script>

{#if story === "basic"}
	<NativeSelect class="w-60" value="" aria-label="Select framework">
		<option value="">Select option</option>
		<option value="react">React</option>
		<option value="vue">Vue</option>
		<option value="angular">Angular</option>
		<option value="svelte">Svelte</option>
	</NativeSelect>
{:else if story === "sizes"}
	<VStack gap={4} class="w-60">
		{#each nativeSelectSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<NativeSelect {size} value="" aria-label="Select framework">
					<option value="">Select option</option>
					<option value="react">React</option>
					<option value="vue">Vue</option>
					<option value="angular">Angular</option>
					<option value="svelte">Svelte</option>
				</NativeSelect>
			</VStack>
		{/each}
	</VStack>
{:else if story === "variants"}
	<VStack gap={4} class="w-60">
		{#each nativeSelectVariants as variant}
			<VStack gap={2} class="items-center">
				<Text size="xs">{variant}</Text>
				<NativeSelect {variant} value="" aria-label="Select framework">
					<option value="">Select option</option>
					<option value="react">React</option>
					<option value="vue">Vue</option>
					<option value="angular">Angular</option>
					<option value="svelte">Svelte</option>
				</NativeSelect>
			</VStack>
		{/each}
	</VStack>
{:else if story === "withValidation"}
	<form
		onsubmit={(e) => {
			e.preventDefault();
			submitted = true;
		}}
	>
		<Field.Root invalid={submitted && !framework}>
			<Field.Label>Framework</Field.Label>
			<NativeSelect
				size="sm"
				invalid={submitted && !framework}
				class="w-60"
				name="framework"
				bind:value={framework}
			>
				<option value="">Select framework</option>
				<option value="react">React</option>
				<option value="vue">Vue</option>
				<option value="angular">Angular</option>
				<option value="svelte">Svelte</option>
			</NativeSelect>
			{#if submitted && !framework}
				<Field.ErrorText>Framework is required</Field.ErrorText>
			{/if}
		</Field.Root>

		<Button size="sm" type="submit" class="mt-4">Submit</Button>
	</form>
{/if}
