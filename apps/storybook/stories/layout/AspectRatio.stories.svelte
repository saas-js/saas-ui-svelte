<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { AspectRatio } from "$saas/layout/aspect-ratio";
	import { DecorativeBox } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Aspect Ratio",
		component: AspectRatio,
		argTypes: {
			ratio: {
				control: "number",
				description:
					"The aspect ratio of the container. Common values are: 21/9, 16/9, 9/16, 4/3, 1.85/1, 1",
				table: { defaultValue: { summary: "4/3" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["ratio", "children", "class"]),
		},
		args: {
			ratio: 2,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<AspectRatio {...args} class="bg-bg-muted">
		<Text size="lg">{args.ratio} / 1</Text>
	</AspectRatio>
{/snippet}

{#snippet imageStory()}
	<AspectRatio ratio={4 / 3} class="max-w-[400px]">
		<img
			src="https://picsum.photos/seed/saas/800/600"
			alt="Sample landscape"
			class="w-full h-full object-cover"
		/>
	</AspectRatio>
{/snippet}

{#snippet videoStory()}
	<AspectRatio ratio={16 / 9} class="max-w-[560px]">
		<iframe
			title="Video embed"
			src="https://www.youtube.com/embed/EHfx9LXzxpw"
			allowfullscreen
			class="w-full h-full border-none"
		></iframe>
	</AspectRatio>
{/snippet}

{#snippet mapStory()}
	<AspectRatio ratio={16 / 9}>
		<iframe
			title="Google Map"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
			class="w-full h-full border-none"
		></iframe>
	</AspectRatio>
{/snippet}

{#snippet responsiveStory()}
	<div class="max-w-72">
		<AspectRatio ratio={1} class="md:[aspect-ratio:16/9]!">
			<DecorativeBox class="w-full h-full">Box</DecorativeBox>
		</AspectRatio>
	</div>
{/snippet}

{#snippet ratiosStory()}
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<div>
			<Text size="sm" class="mb-2 text-fg-muted">16:9</Text>
			<AspectRatio ratio={16 / 9} class="bg-bg-muted">
				<Text size="lg">16 / 9</Text>
			</AspectRatio>
		</div>
		<div>
			<Text size="sm" class="mb-2 text-fg-muted">4:3</Text>
			<AspectRatio ratio={4 / 3} class="bg-bg-muted">
				<Text size="lg">4 / 3</Text>
			</AspectRatio>
		</div>
		<div>
			<Text size="sm" class="mb-2 text-fg-muted">1:1</Text>
			<AspectRatio ratio={1} class="bg-bg-muted">
				<Text size="lg">1 / 1</Text>
			</AspectRatio>
		</div>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Image" template={imageStory} />

<Story name="Video" template={videoStory} />

<Story name="GoogleMap" template={mapStory} />

<Story name="Responsive" template={responsiveStory} />

<Story name="CommonRatios" template={ratiosStory} />
