<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Slider } from "$saas/components/slider";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		colours,
		sliderSizes,
		sliderVariants,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Slider",
		component: Slider.Root,
		argTypes: {
			size: {
				control: "select",
				options: sliderSizes,
				description: "The size of the slider.",
				table: { defaultValue: { summary: "md" } },
			},
			variant: {
				control: "select",
				options: sliderVariants,
				description: "The visual variant of the slider.",
				table: { defaultValue: { summary: "outline" } },
			},
			colour: {
				control: "select",
				options: colours,
				description: "The colour theme of the slider.",
				table: { defaultValue: { summary: "gray" } },
			},
			disabled: {
				control: "boolean",
				description: "Whether the slider is disabled.",
				table: { defaultValue: { summary: "false" } },
			},
			min: {
				control: "number",
				description: "The minimum value of the slider.",
				table: { defaultValue: { summary: "0" } },
			},
			max: {
				control: "number",
				description: "The maximum value of the slider.",
				table: { defaultValue: { summary: "100" } },
			},
			step: {
				control: "number",
				description: "The step value of the slider.",
				table: { defaultValue: { summary: "1" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"size",
				"variant",
				"colour",
				"disabled",
				"min",
				"max",
				"step",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "outline",
			colour: "gray",
			disabled: false,
		},
	});
</script>

<script lang="ts">
	import { Code } from "$saas/typography/code";

	let controlledValue = $state([40]);
	let changeValue = $state([50]);
	let changeEndValue = $state([50]);
</script>

{#snippet basicStory(args: any)}
	<Slider.Root defaultValue={[40]} class="w-[200px]" aria-label="Slider" {...args}>
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{/snippet}

{#snippet sizesStory()}
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
{/snippet}

{#snippet variantsStory()}
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
{/snippet}

{#snippet coloursStory()}
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
{/snippet}

{#snippet labelStory()}
	<Slider.Root defaultValue={[40]} class="w-[200px]">
		<Slider.Label>Quantity</Slider.Label>
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{/snippet}

{#snippet rangeStory()}
	<Slider.Root defaultValue={[30, 60]} class="w-[200px]" aria-label="Range slider">
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
			<Slider.Thumb index={1} />
		</Slider.Control>
	</Slider.Root>
{/snippet}

{#snippet disabledStory()}
	<Slider.Root defaultValue={[40]} disabled class="w-[200px]" aria-label="Disabled slider">
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{/snippet}

{#snippet marksStory()}
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
{/snippet}

{#snippet verticalStory()}
	<Slider.Root defaultValue={[40]} orientation="vertical" class="h-[200px]" aria-label="Vertical slider">
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{/snippet}

{#snippet controlledStory()}
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
{/snippet}

{#snippet stepsStory()}
	<Slider.Root defaultValue={[40]} step={10} class="w-[200px]">
		<Slider.Label>Step: 10</Slider.Label>
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0} />
		</Slider.Control>
	</Slider.Root>
{/snippet}

{#snippet changeEndStory()}
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
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Label" template={labelStory} />

<Story name="Range" template={rangeStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Marks" template={marksStory} />

<Story name="Vertical" template={verticalStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="Steps" template={stepsStory} />

<Story name="ChangeEnd" template={changeEndStory} />
