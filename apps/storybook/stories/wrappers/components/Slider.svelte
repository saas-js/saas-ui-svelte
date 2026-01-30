<script lang="ts" module>
	// Wrapper components for complex Slider stories
	// These are imported by Slider.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Slider } from "$saas/components/slider";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Code } from "$saas/typography/code";
	import { colours, sliderSizes, sliderVariants } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "colours"
			| "label"
			| "range"
			| "disabled"
			| "marks"
			| "vertical"
			| "controlled"
			| "steps"
			| "changeEnd";
	}

	let { story }: Props = $props();

	let controlledValue = $state([40]);
	let changeValue = $state([50]);
	let changeEndValue = $state([50]);
</script>

{#if story === "basic"}
	<Slider.Root defaultValue={[40]} class="w-[200px]" aria-label="Slider">
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{:else if story === "sizes"}
	<Stack gap={6} class="w-[200px]">
		{#each sliderSizes as size}
			<Slider.Root defaultValue={[40]} {size}>
				<Slider.Label>slider - {size}</Slider.Label>
				<Slider.Control>
					<Slider.Track>
						<Slider.Range />
					</Slider.Track>
					<Slider.Thumb index={0} />
				</Slider.Control>
			</Slider.Root>
		{/each}
	</Stack>
{:else if story === "variants"}
	<Stack gap={6} class="w-[200px]">
		{#each sliderVariants as variant}
			<Slider.Root defaultValue={[40]} {variant}>
				<Slider.Label>slider - {variant}</Slider.Label>
				<Slider.Control>
					<Slider.Track>
						<Slider.Range />
					</Slider.Track>
					<Slider.Thumb index={0} />
				</Slider.Control>
			</Slider.Root>
		{/each}
	</Stack>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} class="items-center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Slider.Root
					defaultValue={[40]}
					{colour}
					variant="outline"
					class="w-[160px]"
					aria-label="Slider {colour} outline"
				>
					<Slider.Control>
						<Slider.Track>
							<Slider.Range />
						</Slider.Track>
						<Slider.Thumb index={0} />
					</Slider.Control>
				</Slider.Root>
				<Slider.Root
					defaultValue={[40]}
					{colour}
					variant="solid"
					class="w-[160px]"
					aria-label="Slider {colour} solid"
				>
					<Slider.Control>
						<Slider.Track>
							<Slider.Range />
						</Slider.Track>
						<Slider.Thumb index={0} />
					</Slider.Control>
				</Slider.Root>
			</HStack>
		{/each}
	</VStack>
{:else if story === "label"}
	<Slider.Root defaultValue={[40]} class="w-[200px]">
		<Slider.Label>Quantity</Slider.Label>
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{:else if story === "range"}
	<Slider.Root defaultValue={[30, 60]} class="w-[200px]" aria-label="Range slider">
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
			<Slider.Thumb index={1} />
		</Slider.Control>
	</Slider.Root>
{:else if story === "disabled"}
	<Slider.Root defaultValue={[40]} disabled class="w-[200px]" aria-label="Disabled slider">
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{:else if story === "marks"}
	<Stack gap={4}>
		{#each sliderSizes as size}
			<Stack gap={2} class="items-start">
				<Slider.Root
					defaultValue={[40]}
					{size}
					colour="pink"
					class="w-[200px]"
					aria-label="Slider {size}"
				>
					<Slider.Control>
						<Slider.Track>
							<Slider.Range />
						</Slider.Track>
						<Slider.Thumb index={0} />
					</Slider.Control>
					<Slider.MarkerGroup>
						<Slider.Marker value={0} />
						<Slider.Marker value={50} />
						<Slider.Marker value={100} />
					</Slider.MarkerGroup>
				</Slider.Root>
				<Text>size = {size}</Text>
			</Stack>
		{/each}
	</Stack>
{:else if story === "vertical"}
	<Slider.Root defaultValue={[40]} orientation="vertical" class="h-[200px]" aria-label="Vertical slider">
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{:else if story === "controlled"}
	<Stack gap={4} class="items-start">
		<Slider.Root
			bind:value={controlledValue}
			onValueChange={(details) => (controlledValue = details.value)}
			class="w-[200px]"
		>
			<Slider.Label>Value: {controlledValue[0]}</Slider.Label>
			<Slider.Control>
				<Slider.Track>
					<Slider.Range />
				</Slider.Track>
				<Slider.Thumb index={0} />
			</Slider.Control>
		</Slider.Root>
		<Text size="sm" class="text-fg-muted"
			>Current value: {controlledValue[0]}</Text
		>
	</Stack>
{:else if story === "steps"}
	<Slider.Root defaultValue={[40]} step={10} class="w-[200px]">
		<Slider.Label>Step: 10</Slider.Label>
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{:else if story === "changeEnd"}
	<Stack gap={3} class="w-[240px]">
		<Slider.Root
			value={changeValue}
			onValueChange={(details) => (changeValue = details.value)}
			onValueChangeEnd={(details) => (changeEndValue = details.value)}
			aria-label="Slider"
		>
			<Slider.Control>
				<Slider.Track>
					<Slider.Range />
				</Slider.Track>
				<Slider.Thumb index={0} />
			</Slider.Control>
		</Slider.Root>
		<Stack gap={1}>
			<Code size="sm">onChange: <strong>{changeValue[0]}</strong></Code>
			<Code size="sm"
				>onChangeEnd: <strong>{changeEndValue[0]}</strong></Code
			>
		</Stack>
	</Stack>
{/if}
