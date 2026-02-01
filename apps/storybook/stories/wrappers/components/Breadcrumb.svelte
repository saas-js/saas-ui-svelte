<script lang="ts" module>
	// Wrapper components for complex Breadcrumb stories
</script>

<script lang="ts">
	import { Breadcrumb } from "$saas/components/breadcrumb";
	import { Menu } from "$saas/components/menu";
	import { Text } from "$saas/typography/text";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Box } from "$saas/layout/box";
	import { Icon } from "$saas/components/icon";
	import House from "phosphor-svelte/lib/House";
	import TShirt from "phosphor-svelte/lib/TShirt";
	import CaretRight from "phosphor-svelte/lib/CaretRight";
	import { breadcrumbSizes, breadcrumbVariants } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "withSeparator"
			| "withIcon"
			| "withEllipsis"
			| "withMenu";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Breadcrumb.Root>
		<Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
		<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
		<Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
	</Breadcrumb.Root>
{:else if story === "sizes"}
	<VStack gap={2}>
		{#each breadcrumbSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-8">{size}</Text>
				<Breadcrumb.Root {size} ariaLabel="Breadcrumb {size}">
					<Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
					<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
					<Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
				</Breadcrumb.Root>
			</HStack>
		{/each}
	</VStack>
{:else if story === "variants"}
	<VStack gap={4}>
		{#each breadcrumbVariants as variant}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-20">{variant}</Text>
				<Breadcrumb.Root {variant} ariaLabel="Breadcrumb {variant}">
					<Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
					<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
					<Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
				</Breadcrumb.Root>
			</HStack>
		{/each}
	</VStack>
{:else if story === "withSeparator"}
	<Breadcrumb.Root separator={CaretRight}>
		<Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
		<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
		<Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
	</Breadcrumb.Root>
{:else if story === "withIcon"}
	<Breadcrumb.Root ariaLabel="Breadcrumb with icons">
		<Breadcrumb.Link href="#">
			<Icon as={House} size="xs" weight="regular" />
			Home
		</Breadcrumb.Link>
		<Breadcrumb.Link href="#">
			<Icon as={TShirt} size="xs" weight="regular" />
			Men Wear
		</Breadcrumb.Link>
		<Breadcrumb.CurrentLink>Trousers</Breadcrumb.CurrentLink>
	</Breadcrumb.Root>
{:else if story === "withEllipsis"}
	<Breadcrumb.Root>
		<Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
		<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
		<Breadcrumb.Ellipsis />
		<Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
	</Breadcrumb.Root>
{:else if story === "withMenu"}
	<Box class="p-1">
		<Breadcrumb.Root separatorGap={4} ariaLabel="Breadcrumb with menu">
			<Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
			<Breadcrumb.Menu>
				<Menu.Root size="sm">
					<Menu.Button variant="breadcrumb">Components</Menu.Button>
					<Menu.Content>
						<Menu.Item value="theme">Theme</Menu.Item>
						<Menu.Item value="props">Props</Menu.Item>
						<Menu.Item value="custom">Customization</Menu.Item>
					</Menu.Content>
				</Menu.Root>
			</Breadcrumb.Menu>
			<Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
		</Breadcrumb.Root>
	</Box>
{/if}
