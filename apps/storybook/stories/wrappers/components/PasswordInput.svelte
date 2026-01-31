<script lang="ts" module>
	// Wrapper components for complex PasswordInput stories
	// These are imported by PasswordInput.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { PasswordInput } from "$saas/components/password-input";
	import { Field } from "$saas/components/field";
	import { Button } from "$saas/components/button";
	import { Input } from "$saas/components/input";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Box } from "$saas/layout/box";
	import { Text } from "$saas/typography/text";
	import { colours, passwordInputSizes } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "controlled"
			| "controlledVisibility"
			| "withField"
			| "disabled"
			| "invalid"
			| "colours";
	}

	let { story }: Props = $props();

	let controlledValue = $state("");
	let controlledVisible = $state(false);
</script>

{#if story === "basic"}
	<Box class="w-72">
		<PasswordInput aria-label="Password" />
	</Box>
{:else if story === "sizes"}
	<Stack gap={4} class="max-w-72">
		{#each passwordInputSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<PasswordInput {size} placeholder={size} aria-label="Password {size}" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{:else if story === "controlled"}
	<Stack gap={4} class="max-w-72">
		<PasswordInput bind:value={controlledValue} placeholder="Enter password" aria-label="Password" />
		<Text size="sm">Value: {controlledValue ? "".repeat(controlledValue.length) : "(empty)"}</Text>
	</Stack>
{:else if story === "controlledVisibility"}
	<Stack gap={4} class="max-w-72">
		<PasswordInput
			defaultValue="secret"
			visible={controlledVisible}
			onVisibleChange={(v) => (controlledVisible = v)}
			aria-label="Password"
		/>
		<Text size="sm">Password is {controlledVisible ? "visible" : "hidden"}</Text>
	</Stack>
{:else if story === "withField"}
	<form
		class="max-w-sm"
		onsubmit={(e) => {
			e.preventDefault();
			console.log("Form submitted");
		}}
	>
		<Stack gap={4} align="start">
			<Field.Root>
				<Field.Label>Username</Field.Label>
				<Input name="username" placeholder="Enter username" />
			</Field.Root>

			<Field.Root>
				<Field.Label>Password</Field.Label>
				<PasswordInput name="password" placeholder="Enter password" />
			</Field.Root>

			<Button type="submit">Submit</Button>
		</Stack>
	</form>
{:else if story === "disabled"}
	<Box class="w-72">
		<PasswordInput disabled placeholder="Disabled password" aria-label="Password" />
	</Box>
{:else if story === "invalid"}
	<Field.Root invalid class="w-72">
		<Field.Label>Password</Field.Label>
		<PasswordInput placeholder="Enter password" />
		<Field.ErrorText>Password must be at least 8 characters</Field.ErrorText>
	</Field.Root>
{:else if story === "colours"}
	<Stack gap={4} class="max-w-md">
		{#each colours as colour}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-16">{colour}</Text>
				<PasswordInput
					{colour}
					placeholder="Focus to see ring"
					aria-label="Password {colour}"
					class="flex-1"
				/>
			</HStack>
		{/each}
	</Stack>
{/if}
