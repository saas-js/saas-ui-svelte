<script lang="ts" module>
	// Wrapper components for complex Field stories
	// These are imported by Field.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Field } from "$saas/components/field";
	import { Input } from "$saas/components/input";
	import { Textarea } from "$saas/components/textarea";
	import { NativeSelect } from "$saas/components/native-select";

	interface Props {
		story: "basic" | "helperText" | "errorText" | "disabled" | "textarea" | "nativeSelect";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Field.Root>
		<Field.Label>Email</Field.Label>
		<Input placeholder="me@example.com" />
	</Field.Root>
{:else if story === "helperText"}
	<Field.Root>
		<Field.Label>Email</Field.Label>
		<Input placeholder="me@example.com" />
		<Field.HelperText>This is a helper text</Field.HelperText>
	</Field.Root>
{:else if story === "errorText"}
	<Field.Root invalid>
		<Field.Label>Email</Field.Label>
		<Input invalid placeholder="me@example.com" />
		<Field.ErrorText>This is an error text</Field.ErrorText>
	</Field.Root>
{:else if story === "disabled"}
	<Field.Root disabled>
		<Field.Label>Email</Field.Label>
		<Input disabled placeholder="me@example.com" />
	</Field.Root>
{:else if story === "textarea"}
	<Field.Root>
		<Field.Label>Message</Field.Label>
		<Textarea placeholder="Enter your message here" />
	</Field.Root>
{:else if story === "nativeSelect"}
	<Field.Root>
		<Field.Label>Native Select</Field.Label>
		<NativeSelect>
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
		</NativeSelect>
	</Field.Root>
{/if}
