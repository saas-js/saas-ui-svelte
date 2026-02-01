<script lang="ts">
	import { Select, useSelectContext } from "@ark-ui/svelte/select";
	import type { SelectValueTextProps } from "@ark-ui/svelte/select";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { SELECT_CTX, type SelectContext } from "./select-root.svelte";
	import { Text } from "$saas/typography/text";
	import { Box } from "$saas/layout/box";
	import { Flex } from "$saas/layout/flex";

	interface Props extends SelectValueTextProps {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Placeholder text when no value is selected.
		 * @default "Select an option"
		 */
		placeholder?: string;
		/**
		 * Property key to get the avatar src from the selected item.
		 * @default "avatar"
		 */
		avatarKey?: string;
		/**
		 * Property key to get the name/label from the selected item.
		 * @default "name"
		 */
		nameKey?: string;
		/**
		 * Size of the avatar in pixels.
		 * @default 20
		 */
		avatarSize?: number;
	}

	let {
		class: className,
		placeholder = "Select an option",
		avatarKey = "avatar",
		nameKey = "name",
		avatarSize = 20,
		...rest
	}: Props = $props();

	const ctx = getContext<SelectContext>(SELECT_CTX);
	const selectApi = useSelectContext();

	const selectedItems = $derived(selectApi().selectedItems);
	const firstItem = $derived(selectedItems?.[0]);
	const avatarSrc = $derived(firstItem?.[avatarKey]);
	const displayName = $derived(
		firstItem?.[nameKey] || firstItem?.label || "",
	);

	function getInitials(name: string): string {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	}
</script>

<Select.ValueText
	class={twMerge(ctx?.styles?.valueText() ?? "", className as string)}
	{placeholder}
	{...rest}
>
	{#if firstItem}
		{#if avatarSrc}
			<img
				src={avatarSrc}
				alt=""
				class="shrink-0 rounded-full object-cover"
				style="width: {avatarSize}px; height: {avatarSize}px;"
			/>
		{:else}
			<Flex
				align="center"
				justify="center"
				class={twMerge(
					"bg-bg-muted text-fg-muted shrink-0 rounded-full text-xs font-medium",
				)}
				style="width: {avatarSize}px; height: {avatarSize}px;"
			>
				{getInitials(displayName)}
			</Flex>
		{/if}
		<Text as="span" class="truncate">{displayName}</Text>
	{/if}
</Select.ValueText>
