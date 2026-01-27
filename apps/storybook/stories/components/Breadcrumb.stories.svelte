<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Breadcrumb } from "$saas/components/breadcrumb";
	import { Menu } from "$saas/components/menu";
	import { Text } from "$saas/typography/text";
	import { VStack, HStack } from "$saas/layout/stack";
	import House from "phosphor-svelte/lib/House";
	import TShirt from "phosphor-svelte/lib/TShirt";
	import CaretRight from "phosphor-svelte/lib/CaretRight";
	import {
		commonArgTypes,
		getControls,
		breadcrumbSizes,
		breadcrumbVariants,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Breadcrumb",
		component: Breadcrumb.Root,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: breadcrumbVariants,
				table: { defaultValue: { summary: "plain" } },
			},
			size: {
				...commonArgTypes.size,
				options: breadcrumbSizes,
				table: { defaultValue: { summary: "md" } },
			},
			separator: {
				control: "text",
				description: "The separator between breadcrumb items.",
				table: { defaultValue: { summary: "/" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"separator",
				"children",
				"class",
			]),
		},
		args: {
			variant: "plain",
			size: "md",
			separator: "/",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Breadcrumb.Root {...args}>
		<Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
		<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
		<Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
	</Breadcrumb.Root>
{/snippet}

{#snippet sizesStory()}
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
{/snippet}

{#snippet variantsStory()}
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
{/snippet}

{#snippet separatorStory()}
	<Breadcrumb.Root separator={CaretRight}>
		<Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
		<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
		<Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
	</Breadcrumb.Root>
{/snippet}

{#snippet withIconStory()}
	<Breadcrumb.Root ariaLabel="Breadcrumb with icons">
		<Breadcrumb.Link href="#">
			<House class="h-3.5" weight="regular" aria-hidden="true" />
			Home
		</Breadcrumb.Link>
		<Breadcrumb.Link href="#">
			<TShirt class="h-3.5" weight="regular" aria-hidden="true" />
			Men Wear
		</Breadcrumb.Link>
		<Breadcrumb.CurrentLink>Trousers</Breadcrumb.CurrentLink>
	</Breadcrumb.Root>
{/snippet}

{#snippet ellipsisStory()}
	<Breadcrumb.Root>
		<Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
		<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
		<Breadcrumb.Ellipsis />
		<Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
	</Breadcrumb.Root>
{/snippet}

{#snippet withMenuStory()}
	<div class="p-1">
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
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="With Separator" template={separatorStory} />

<Story name="With Icon" template={withIconStory} />

<Story name="With Ellipsis" template={ellipsisStory} />

<Story name="With Menu" template={withMenuStory} />
