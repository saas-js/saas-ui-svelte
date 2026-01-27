<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Menu } from "$saas/components/menu";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import Scissors from "phosphor-svelte/lib/Scissors";
	import Copy from "phosphor-svelte/lib/Copy";
	import ClipboardText from "phosphor-svelte/lib/ClipboardText";
	import SortAscending from "phosphor-svelte/lib/SortAscending";
	import Funnel from "phosphor-svelte/lib/Funnel";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import Translate from "phosphor-svelte/lib/Translate";
	import ShareNetwork from "phosphor-svelte/lib/ShareNetwork";
	import { colours, commonArgTypes, getControls, menuSizes } from "../utils";

	const { Story } = defineMeta({
		title: "components/Menu",
		component: Menu.Root,
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: menuSizes,
				table: { defaultValue: { summary: "md" } },
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
				table: { defaultValue: { summary: "indigo" } },
			},
			open: {
				control: "boolean",
				description: "Whether the menu is open.",
			},
			closeOnSelect: {
				control: "boolean",
				description:
					"Whether to close the menu when an option is selected.",
				table: { defaultValue: { summary: "true" } },
			},
			loopFocus: {
				control: "boolean",
				description: "Whether to loop the keyboard navigation.",
				table: { defaultValue: { summary: "false" } },
			},
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"size",
				"colour",
				"open",
				"closeOnSelect",
				"loopFocus",
				"children",
			]),
		},
		args: {
			size: "md",
			colour: "indigo",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<div>
		<Menu.Root {...args}>
			<Menu.Button>Open</Menu.Button>
			<Menu.Content>
				<Menu.Item value="new-txt">New Text File</Menu.Item>
				<Menu.Item value="new-file">New File...</Menu.Item>
				<Menu.Item value="new-win">New Window</Menu.Item>
				<Menu.Item value="open-file">Open File...</Menu.Item>
				<Menu.Item value="export">Export</Menu.Item>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet sizesStory()}
	<div>
		<HStack align="start" gap={8}>
			{#each menuSizes as size}
				<VStack gap={2} class="items-center">
					<Text size="xs">{size}</Text>
					<Menu.Root {size}>
						<Menu.Button>Open</Menu.Button>
						<Menu.Content>
							<Menu.Item value="new-txt">New Text File</Menu.Item>
							<Menu.Item value="new-file">New File...</Menu.Item>
							<Menu.Item value="new-win">New Window</Menu.Item>
							<Menu.Item value="open-file">Open File...</Menu.Item
							>
							<Menu.Item value="export">Export</Menu.Item>
						</Menu.Content>
					</Menu.Root>
				</VStack>
			{/each}
		</HStack>
	</div>
{/snippet}

{#snippet commandStory()}
	<div>
		<Menu.Root>
			<Menu.Button>Open</Menu.Button>
			<Menu.Content>
				<Menu.Item value="new-txt">
					New Text File <Menu.ItemCommand>⌘E</Menu.ItemCommand>
				</Menu.Item>
				<Menu.Item value="new-file">
					New File... <Menu.ItemCommand>⌘N</Menu.ItemCommand>
				</Menu.Item>
				<Menu.Item value="new-win">
					New Window <Menu.ItemCommand>⌘⇧N</Menu.ItemCommand>
				</Menu.Item>
				<Menu.Item value="open-file">
					Open File... <Menu.ItemCommand>⌘O</Menu.ItemCommand>
				</Menu.Item>
				<Menu.Item value="export">
					Export <Menu.ItemCommand>⌘S</Menu.ItemCommand>
				</Menu.Item>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet contextMenuStory()}
	<div>
		<Menu.Root>
			<Menu.ContextTrigger>
				<div
					class="flex items-center justify-center w-64 h-32 border-2 border-dashed border-border-default rounded-(--radii-l2) text-fg-muted select-none"
				>
					Right click here
				</div>
			</Menu.ContextTrigger>
			<Menu.Content>
				<Menu.Item value="new-txt">New Text File</Menu.Item>
				<Menu.Item value="new-file">New File...</Menu.Item>
				<Menu.Item value="new-win">New Window</Menu.Item>
				<Menu.Item value="open-file">Open File...</Menu.Item>
				<Menu.Item value="export">Export</Menu.Item>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet groupStory()}
	<div>
		<Menu.Root>
			<Menu.Button>Edit</Menu.Button>
			<Menu.Content>
				<Menu.ItemGroup title="Styles">
					<Menu.Item value="bold">Bold</Menu.Item>
					<Menu.Item value="underline">Underline</Menu.Item>
				</Menu.ItemGroup>
				<Menu.Separator />
				<Menu.ItemGroup title="Align">
					<Menu.Item value="left">Left</Menu.Item>
					<Menu.Item value="middle">Middle</Menu.Item>
					<Menu.Item value="right">Right</Menu.Item>
				</Menu.ItemGroup>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet submenuStory()}
	<div>
		<Menu.Root>
			<Menu.Button>Open</Menu.Button>
			<Menu.Content>
				<Menu.Item value="new-txt">New Text File</Menu.Item>
				<Menu.Item value="new-file">New File...</Menu.Item>
				<Menu.Root
					positioning={{ placement: "right-start", gutter: -4 }}
				>
					<Menu.TriggerItem value="open-recent"
						>Open Recent</Menu.TriggerItem
					>
					<Menu.Content>
						<Menu.Item value="panda">Panda</Menu.Item>
						<Menu.Item value="ark">Ark UI</Menu.Item>
						<Menu.Item value="chakra">Chakra v3</Menu.Item>
					</Menu.Content>
				</Menu.Root>
				<Menu.Item value="open-file">Open File...</Menu.Item>
				<Menu.Item value="export">Export</Menu.Item>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet linksStory()}
	<div>
		<Menu.Root>
			<Menu.Button>Select Anime</Menu.Button>
			<Menu.Content>
				<Menu.ItemLink
					value="naruto"
					href="https://www.crunchyroll.com/naruto"
					target="_blank"
					rel="noreferrer"
				>
					Naruto
				</Menu.ItemLink>
				<Menu.ItemLink
					value="one-piece"
					href="https://www.crunchyroll.com/one-piece"
					target="_blank"
					rel="noreferrer"
				>
					One Piece
				</Menu.ItemLink>
				<Menu.ItemLink
					value="attack-on-titan"
					href="https://www.crunchyroll.com/attack-on-titan"
					target="_blank"
					rel="noreferrer"
				>
					Attack on Titan
				</Menu.ItemLink>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet radioStory()}
	<div>
		<Menu.Root>
			<Menu.Button>
				<Icon as={SortAscending} size="sm" /> Sort
			</Menu.Button>
			<Menu.Content>
				<Menu.RadioItemGroup value="asc">
					<Menu.RadioItem value="asc">Ascending</Menu.RadioItem>
					<Menu.RadioItem value="desc">Descending</Menu.RadioItem>
				</Menu.RadioItemGroup>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet checkboxStory()}
	<div>
		<Menu.Root closeOnSelect={false}>
			<Menu.Button>
				<Icon as={Funnel} size="sm" /> Status
			</Menu.Button>
			<Menu.Content>
				<Menu.CheckboxItem checked={false} value="open"
					>Open</Menu.CheckboxItem
				>
				<Menu.CheckboxItem checked={true} value="closed"
					>Closed</Menu.CheckboxItem
				>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet iconAndCommandStory()}
	<div>
		<Menu.Root>
			<Menu.Button>Edit</Menu.Button>
			<Menu.Content>
				<Menu.Item value="cut" valueText="cut">
					<Icon as={Scissors} size="xs" />
					<span class="flex-1">Cut</span>
					<Menu.ItemCommand>⌘X</Menu.ItemCommand>
				</Menu.Item>
				<Menu.Item value="copy" valueText="copy">
					<Icon as={Copy} size="xs" />
					<span class="flex-1">Copy</span>
					<Menu.ItemCommand>⌘C</Menu.ItemCommand>
				</Menu.Item>
				<Menu.Item value="paste" valueText="paste">
					<Icon as={ClipboardText} size="xs" />
					<span class="flex-1">Paste</span>
					<Menu.ItemCommand>⌘V</Menu.ItemCommand>
				</Menu.Item>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet placementStory()}
	<div>
		<Menu.Root positioning={{ placement: "right-start" }}>
			<Menu.Button>Open</Menu.Button>
			<Menu.Content>
				<Menu.Item value="new-txt">New Text File</Menu.Item>
				<Menu.Item value="new-file">New File...</Menu.Item>
				<Menu.Item value="new-win">New Window</Menu.Item>
				<Menu.Item value="open-file">Open File...</Menu.Item>
				<Menu.Item value="export">Export</Menu.Item>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet mixedLayoutStory()}
	<div>
		<Menu.Root>
			<Menu.Button>Open</Menu.Button>
			<Menu.Content>
				<div class="flex grow gap-0">
					<Menu.Item
						value="cut"
						class="w-14 gap-1 flex-col justify-center"
					>
						<Icon as={Scissors} size="xs" />
						Cut
					</Menu.Item>
					<Menu.Item
						value="copy"
						class="w-14 gap-1 flex-col justify-center"
					>
						<Icon as={Copy} size="xs" />
						Copy
					</Menu.Item>
					<Menu.Item
						value="paste"
						class="w-14 gap-1 flex-col justify-center"
					>
						<Icon as={ClipboardText} size="xs" />
						Paste
					</Menu.Item>
				</div>
				<Menu.Item value="look-up">
					<span class="flex-1">Look Up</span>
					<Icon as={MagnifyingGlass} size="xs" />
				</Menu.Item>
				<Menu.Item value="translate">
					<span class="flex-1">Translate</span>
					<Icon as={Translate} size="xs" />
				</Menu.Item>
				<Menu.Item value="share">
					<span class="flex-1">Share</span>
					<Icon as={ShareNetwork} size="xs" />
				</Menu.Item>
			</Menu.Content>
		</Menu.Root>
	</div>
{/snippet}

{#snippet coloursStory()}
	<HStack align="start" gap={4} class="flex-wrap">
		{#each colours as colour}
			<VStack gap={2} class="items-center">
				<Text size="xs">{colour}</Text>
				<Menu.Root {colour}>
					<Menu.Button>Open</Menu.Button>
					<Menu.Content>
						<Menu.Item value="item-1">Item 1</Menu.Item>
						<Menu.Item value="item-2">Item 2</Menu.Item>
						<Menu.Item value="item-3">Item 3</Menu.Item>
					</Menu.Content>
				</Menu.Root>
			</VStack>
		{/each}
	</HStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Command" template={commandStory} />

<Story name="ContextMenu" template={contextMenuStory} />

<Story name="Group" template={groupStory} />

<Story name="Submenu" template={submenuStory} />

<Story name="Links" template={linksStory} />

<Story name="Radio" template={radioStory} />

<Story name="Checkbox" template={checkboxStory} />

<Story name="Icon And Command" template={iconAndCommandStory} />

<Story name="Placement" template={placementStory} />

<Story name="Mixed Layout" template={mixedLayoutStory} />

<Story name="Colours" template={coloursStory} />
