<script lang="ts" module>
	// Wrapper components for complex PinInput stories
	// These are imported by PinInput.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { PinInput } from "$saas/components/pin-input";
	import { Field } from "$saas/components/field";
	import { Button } from "$saas/components/button";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { colours, pinInputSizes, inputVariants } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "oneTimeCode"
			| "mask"
			| "placeholder"
			| "withField"
			| "controlled"
			| "attached"
			| "alphanumeric"
			| "disabled"
			| "invalid"
			| "colours"
			| "count";
	}

	let { story }: Props = $props();

	let controlledValue = $state(["", "", "", ""]);
</script>

{#if story === "basic"}
	<PinInput />
{:else if story === "sizes"}
	<Stack gap={4}>
		{#each pinInputSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<PinInput {size} />
			</HStack>
		{/each}
	</Stack>
{:else if story === "variants"}
	<Stack gap={4}>
		{#each inputVariants as variant}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-16">{variant}</Text>
				<PinInput {variant} />
			</HStack>
		{/each}
	</Stack>
{:else if story === "oneTimeCode"}
	<PinInput otp />
{:else if story === "mask"}
	<PinInput mask />
{:else if story === "placeholder"}
	<PinInput placeholder="-" />
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
				<Field.Label>Enter OTP</Field.Label>
				<PinInput otp />
			</Field.Root>

			<Button type="submit">Verify</Button>
		</Stack>
	</form>
{:else if story === "controlled"}
	<Stack gap={4}>
		<PinInput
			bind:value={controlledValue}
			onValueComplete={(details) => console.log("Complete:", details.valueAsString)}
		/>
		<Text size="sm">Value: {controlledValue.join("") || "(empty)"}</Text>
	</Stack>
{:else if story === "attached"}
	<PinInput attached />
{:else if story === "alphanumeric"}
	<Stack gap={4}>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-24">numeric</Text>
			<PinInput type="numeric" />
		</HStack>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-24">alphabetic</Text>
			<PinInput type="alphabetic" />
		</HStack>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-24">alphanumeric</Text>
			<PinInput type="alphanumeric" />
		</HStack>
	</Stack>
{:else if story === "disabled"}
	<PinInput disabled />
{:else if story === "invalid"}
	<Field.Root invalid>
		<Field.Label>Verification Code</Field.Label>
		<PinInput />
		<Field.ErrorText>Invalid verification code</Field.ErrorText>
	</Field.Root>
{:else if story === "colours"}
	<Stack gap={4}>
		{#each colours as colour}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-16">{colour}</Text>
				<PinInput {colour} />
			</HStack>
		{/each}
	</Stack>
{:else if story === "count"}
	<Stack gap={4}>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-16">4 digits</Text>
			<PinInput count={4} />
		</HStack>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-16">6 digits</Text>
			<PinInput count={6} />
		</HStack>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-16">8 digits</Text>
			<PinInput count={8} />
		</HStack>
	</Stack>
{/if}
