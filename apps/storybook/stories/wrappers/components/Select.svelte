<script lang="ts" module>
	// Wrapper components for complex Select stories
	// These are imported by Select.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Select } from "$saas/components/select";
	import { Field } from "$saas/components/field";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Box } from "$saas/layout/box";
	import { Text } from "$saas/typography/text";
	import { Avatar } from "$saas/components/avatar";
	import { Button } from "$saas/components/button";
	import { Popover } from "$saas/components/popover";
	import { createListCollection } from "@ark-ui/svelte/select";
	import { colours, selectSizes, selectVariants } from "../../utils";

	const frameworks = createListCollection({
		items: [
			{ label: "React.js", value: "react" },
			{ label: "Vue.js", value: "vue" },
			{ label: "Angular", value: "angular" },
			{ label: "Svelte", value: "svelte" },
		],
	});

	const animeMovies = createListCollection({
		items: [
			{ label: "Spirited Away", value: "spirited_away" },
			{ label: "My Neighbor Totoro", value: "my_neighbor_totoro" },
			{ label: "Akira", value: "akira" },
			{ label: "Princess Mononoke", value: "princess_mononoke" },
			{ label: "Grave of the Fireflies", value: "grave_of_the_fireflies" },
			{ label: "Howl's Moving Castle", value: "howls_moving_castle" },
			{ label: "Ghost in the Shell", value: "ghost_in_the_shell" },
			{ label: "Naruto", value: "naruto" },
			{ label: "Hunter x Hunter", value: "hunter_x_hunter" },
			{ label: "The Wind Rises", value: "the_wind_rises" },
			{ label: "Kiki's Delivery Service", value: "kikis_delivery_service" },
			{ label: "Perfect Blue", value: "perfect_blue" },
			{ label: "The Girl Who Leapt Through Time", value: "the_girl_who_leapt_through_time" },
			{ label: "Weathering with You", value: "weathering_with_you" },
			{ label: "Ponyo", value: "ponyo" },
			{ label: "5 Centimeters per Second", value: "5_centimeters_per_second" },
			{ label: "A Silent Voice", value: "a_silent_voice" },
			{ label: "Paprika", value: "paprika" },
			{ label: "Wolf Children", value: "wolf_children" },
			{ label: "Redline", value: "redline" },
			{ label: "The Tale of the Princess Kaguya", value: "the_tale_of_the_princess_kaguya" },
		],
	});

	const groupedItems = createListCollection({
		items: [
			{ label: "Naruto", value: "naruto", group: "Anime" },
			{ label: "One Piece", value: "one-piece", group: "Anime" },
			{ label: "Dragon Ball", value: "dragon-ball", group: "Anime" },
			{ label: "The Shawshank Redemption", value: "shawshank", group: "Movies" },
			{ label: "The Godfather", value: "godfather", group: "Movies" },
			{ label: "The Dark Knight", value: "dark-knight", group: "Movies" },
		],
	});

	const members = createListCollection({
		items: [
			{
				name: "Jessica Jones",
				id: "jessica_jones",
				avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=jessica",
			},
			{
				name: "Kenneth Johnson",
				id: "kenneth_johnson",
				avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=kenneth",
			},
			{
				name: "Kate Wilson",
				id: "kate_wilson",
				avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=kate",
			},
		],
		itemToString: (item) => item.name,
		itemToValue: (item) => item.id,
	});

	function getCategories(items: typeof groupedItems) {
		return items.items.reduce(
			(acc, item) => {
				const group = acc.find((g) => g.group === item.group);
				if (group) {
					group.items.push(item);
				} else {
					acc.push({ group: item.group, items: [item] });
				}
				return acc;
			},
			[] as { group: string; items: typeof items.items }[],
		);
	}

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "optionGroup"
			| "disabled"
			| "invalid"
			| "avatarSelect"
			| "clearTrigger"
			| "overflow"
			| "positioning"
			| "inPopover"
			| "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Box class="w-80">
		<Select.Root collection={frameworks} size="sm">
			<Select.Label>Select framework</Select.Label>
			<Select.Trigger>
				<Select.Value placeholder="Select movie" />
			</Select.Trigger>
			<Select.Content>
				{#each frameworks.items as item}
					<Select.Item {item}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</Box>
{:else if story === "sizes"}
	<VStack gap={5} class="w-80">
		{#each selectSizes as size}
			<Select.Root collection={frameworks} {size}>
				<Select.Label>size = {size}</Select.Label>
				<Select.Trigger>
					<Select.Value placeholder="Select movie" />
				</Select.Trigger>
				<Select.Content>
					{#each frameworks.items as item}
						<Select.Item {item}>
							{item.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		{/each}
	</VStack>
{:else if story === "variants"}
	<VStack gap={5} class="w-80">
		{#each selectVariants as variant}
			<Select.Root collection={frameworks} {variant}>
				<Select.Label>Select framework - {variant}</Select.Label>
				<Select.Trigger>
					<Select.Value placeholder="Select movie" />
				</Select.Trigger>
				<Select.Content>
					{#each frameworks.items as item}
						<Select.Item {item}>
							{item.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		{/each}
	</VStack>
{:else if story === "optionGroup"}
	<Box class="w-80">
		<Select.Root collection={groupedItems} size="sm">
			<Select.Label>Select framework</Select.Label>
			<Select.Trigger>
				<Select.Value placeholder="Select movie" />
			</Select.Trigger>
			<Select.Content>
				{#each getCategories(groupedItems) as category}
					<Select.ItemGroup label={category.group}>
						{#each category.items as item}
							<Select.Item {item}>
								{item.label}
							</Select.Item>
						{/each}
					</Select.ItemGroup>
				{/each}
			</Select.Content>
		</Select.Root>
	</Box>
{:else if story === "disabled"}
	<Box class="w-80">
		<Select.Root collection={frameworks} disabled size="sm">
			<Select.Label>Select framework</Select.Label>
			<Select.Trigger>
				<Select.Value placeholder="Select movie" />
			</Select.Trigger>
			<Select.Content>
				{#each frameworks.items as item}
					<Select.Item {item}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</Box>
{:else if story === "invalid"}
	<Box class="w-80">
		<Field.Root invalid>
			<Select.Root collection={frameworks} size="sm">
				<Select.Label>Select framework</Select.Label>
				<Select.Trigger>
					<Select.Value placeholder="Select movie" />
				</Select.Trigger>
				<Select.Content>
					{#each frameworks.items as item}
						<Select.Item {item}>
							{item.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Field.ErrorText>This is an error</Field.ErrorText>
		</Field.Root>
	</Box>
{:else if story === "avatarSelect"}
	<Box class="w-60">
		<Select.Root
			collection={members}
			defaultValue={["jessica_jones"]}
			size="sm"
			positioning={{ sameWidth: true }}
		>
			<Select.Label>Select member</Select.Label>
			<Select.Trigger>
				<Select.AvatarValue placeholder="Select member" />
			</Select.Trigger>
			<Select.Content>
				{#each members.items as item}
					<Select.Item {item} class="justify-start">
						<Avatar name={item.name} src={item.avatar} size="xs" />
						{item.name}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</Box>
{:else if story === "clearTrigger"}
	<Box class="w-80">
		<Select.Root
			collection={animeMovies}
			defaultValue={["spirited_away"]}
			size="sm"
		>
			<Select.Label>Select fav. anime</Select.Label>
			<Select.Trigger clearable>
				<Select.Value placeholder="Select movie" />
			</Select.Trigger>
			<Select.Content>
				{#each animeMovies.items as item}
					<Select.Item {item}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</Box>
{:else if story === "overflow"}
	<Box class="w-60">
		<Select.Root collection={animeMovies} size="sm">
			<Select.Label>Select anime</Select.Label>
			<Select.Trigger>
				<Select.Value placeholder="Select movie" />
			</Select.Trigger>
			<Select.Content>
				{#each animeMovies.items as item}
					<Select.Item {item}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</Box>
{:else if story === "positioning"}
	<Box class="w-80">
		<Select.Root
			collection={frameworks}
			size="sm"
			positioning={{ placement: "top", flip: false }}
		>
			<Select.Label>Select framework</Select.Label>
			<Select.Trigger>
				<Select.Value placeholder="Select movie" />
			</Select.Trigger>
			<Select.Content>
				{#each frameworks.items as item}
					<Select.Item {item}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</Box>
{:else if story === "inPopover"}
	<Popover.Root size="xs">
		<Popover.Trigger>
			{#snippet children({ props })}
				<Button variant="outline" size="sm" {...props()}>
					Select in Popover
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content>
			<Popover.Header>Select in Popover</Popover.Header>
			<Popover.Body>
				<Select.Root
					collection={frameworks}
					size="sm"
					positioning={{ sameWidth: true, placement: "bottom" }}
				>
					<Select.Trigger aria-label="Select framework">
						<Select.Value placeholder="Select" />
					</Select.Trigger>
					<Select.Content portal={false} class="w-full">
						{#each frameworks.items as item}
							<Select.Item {item}>
								{item.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</Popover.Body>
		</Popover.Content>
	</Popover.Root>
{:else if story === "colours"}
	<HStack align="start" gap={4} class="flex-wrap">
		{#each colours as colour}
			<VStack gap={2} class="items-center">
				<Text size="xs">{colour}</Text>
				<Select.Root collection={frameworks} {colour} class="w-40">
					<Select.Trigger aria-label="Select framework">
						<Select.Value placeholder="Select" />
					</Select.Trigger>
					<Select.Content>
						{#each frameworks.items as item}
							<Select.Item {item}>
								{item.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</VStack>
		{/each}
	</HStack>
{/if}
