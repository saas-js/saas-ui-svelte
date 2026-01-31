<script lang="ts">
	import { Centre, Square, AbsoluteCentre } from "$saas/layout/centre";
	import { Circle } from "$saas/layout/circle";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import PhoneIcon from "phosphor-svelte/lib/PhoneIcon";

	interface Props {
		story: "basic" | "square" | "circle" | "absoluteCentre";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<Centre {...args} class="bg-bg-emphasized h-25 w-80">
		<Text>This will be centred</Text>
	</Centre>
{:else if story === "square"}
	<Square size={10} class="text-white bg-purple-700">
		<Icon as={PhoneIcon} />
	</Square>
{:else if story === "circle"}
	<Circle size="md" colour="blue">
		<Icon as={PhoneIcon} />
	</Circle>
{:else if story === "absoluteCentre"}
	<div class="relative h-24 bg-bg-emphasized">
		<AbsoluteCentre class="p-4 text-white bg-accent-solid">
			<Icon as={PhoneIcon} />
		</AbsoluteCentre>
	</div>
{/if}
