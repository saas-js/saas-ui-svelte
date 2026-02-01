<script lang="ts">
	import { AspectRatio } from "$saas/layout/aspect-ratio";
	import { DecorativeBox } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";

	interface Props {
		story:
			| "basic"
			| "image"
			| "video"
			| "googleMap"
			| "responsive"
			| "commonRatios";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<AspectRatio {...args} class="bg-bg-muted">
		<Text size="lg">{args.ratio} / 1</Text>
	</AspectRatio>
{:else if story === "image"}
	<AspectRatio ratio={4 / 3} class="max-w-[400px]">
		<img
			src="https://picsum.photos/seed/saas/800/600"
			alt="Sample landscape"
			class="h-full w-full object-cover"
		/>
	</AspectRatio>
{:else if story === "video"}
	<AspectRatio ratio={16 / 9} class="max-w-[560px]">
		<iframe
			title="Video embed"
			src="https://www.youtube.com/embed/EHfx9LXzxpw"
			allowfullscreen
			class="h-full w-full border-none"
		></iframe>
	</AspectRatio>
{:else if story === "googleMap"}
	<AspectRatio ratio={16 / 9}>
		<iframe
			title="Google Map"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
			class="h-full w-full border-none"
		></iframe>
	</AspectRatio>
{:else if story === "responsive"}
	<div class="max-w-72">
		<AspectRatio ratio={1} class="md:[aspect-ratio:16/9]!">
			<DecorativeBox class="h-full w-full">Box</DecorativeBox>
		</AspectRatio>
	</div>
{:else if story === "commonRatios"}
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<div>
			<Text size="sm" class="text-fg-muted mb-2">16:9</Text>
			<AspectRatio ratio={16 / 9} class="bg-bg-muted">
				<Text size="lg">16 / 9</Text>
			</AspectRatio>
		</div>
		<div>
			<Text size="sm" class="text-fg-muted mb-2">4:3</Text>
			<AspectRatio ratio={4 / 3} class="bg-bg-muted">
				<Text size="lg">4 / 3</Text>
			</AspectRatio>
		</div>
		<div>
			<Text size="sm" class="text-fg-muted mb-2">1:1</Text>
			<AspectRatio ratio={1} class="bg-bg-muted">
				<Text size="lg">1 / 1</Text>
			</AspectRatio>
		</div>
	</div>
{/if}
