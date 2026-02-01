<script lang="ts" module>
	// Wrapper components for complex Textarea stories
	// These are imported by Textarea.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Textarea } from "$saas/components/textarea";
	import { Field } from "$saas/components/field";
	import { Input } from "$saas/components/input";
	import { Button } from "$saas/components/button";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";

	const inputVariants = ["outline", "subtle", "flushed"] as const;
	const textareaSizes = ["xs", "sm", "md", "lg", "xl"] as const;
	const textareaResizeOptions = [
		"none",
		"vertical",
		"horizontal",
		"both",
	] as const;

	interface Props {
		story:
			| "basic"
			| "variants"
			| "sizes"
			| "helperText"
			| "errorText"
			| "field"
			| "hookForm"
			| "resize"
			| "autoresize";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Textarea placeholder="Comment..." />
{:else if story === "variants"}
	<VStack gap={4} class="w-80">
		{#each inputVariants as variant}
			<VStack gap={2} class="items-center">
				<Text size="xs">{variant}</Text>
				<Textarea {variant} placeholder={variant} />
			</VStack>
		{/each}
	</VStack>
{:else if story === "sizes"}
	<VStack gap={4} class="w-80">
		{#each textareaSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Textarea {size} placeholder="{size} size" />
			</VStack>
		{/each}
	</VStack>
{:else if story === "helperText"}
	<HStack align="center" gap={10} class="w-full">
		<Field.Root required>
			<Field.Label>Comment</Field.Label>
			<Textarea placeholder="Start typing..." variant="subtle" />
			<Field.HelperText>Max 500 characters.</Field.HelperText>
		</Field.Root>
		<Field.Root required>
			<Field.Label>Comment</Field.Label>
			<Textarea placeholder="Start typing..." variant="outline" />
			<Field.HelperText>Max 500 characters.</Field.HelperText>
		</Field.Root>
	</HStack>
{:else if story === "errorText"}
	<HStack align="center" gap={10} class="w-full">
		<Field.Root invalid required>
			<Field.Label>Comment</Field.Label>
			<Textarea invalid placeholder="Start typing..." variant="subtle" />
			<Field.ErrorText>Field is required</Field.ErrorText>
		</Field.Root>
		<Field.Root invalid required>
			<Field.Label>Comment</Field.Label>
			<Textarea invalid placeholder="Start typing..." variant="outline" />
			<Field.ErrorText>Field is required</Field.ErrorText>
		</Field.Root>
	</HStack>
{:else if story === "field"}
	<Field.Root required>
		<Field.Label>Message</Field.Label>
		<Textarea placeholder="Enter your message..." variant="subtle" />
		<Field.HelperText>Your message will be reviewed.</Field.HelperText>
	</Field.Root>
{:else if story === "hookForm"}
	<form>
		<VStack align="start" class="max-w-sm">
			<Field.Root required>
				<Field.Label>Username</Field.Label>
				<Input placeholder="@username" name="username" />
				<Field.HelperText
					>This is your public display name.</Field.HelperText
				>
			</Field.Root>
			<Field.Root required>
				<Field.Label>Profile bio</Field.Label>
				<Textarea placeholder="I am ..." name="bio" />
				<Field.HelperText
					>A short description of yourself</Field.HelperText
				>
			</Field.Root>
			<Button type="submit">Submit</Button>
		</VStack>
	</form>
{:else if story === "resize"}
	<VStack gap={4} class="w-64">
		{#each textareaResizeOptions as resize}
			<VStack gap={2} class="items-center">
				<Text size="xs">{resize}</Text>
				<Textarea {resize} placeholder="Search the docs..." />
			</VStack>
		{/each}
	</VStack>
{:else if story === "autoresize"}
	<Textarea.Autoresize
		placeholder="Start typing..."
		minRows={1}
		maxRows={40}
	/>
{/if}
