<script lang="ts">
	import { Button } from "@saas-ui/svelte/components/button";
	import { Menu } from "@saas-ui/svelte/components/menu";
	import { Field } from "@saas-ui/svelte/components/field";
	import { Input } from "@saas-ui/svelte/components/input";
	import { Accordion } from "@saas-ui/svelte/components/accordion";
	import { Switch } from "@saas-ui/svelte/components/switch";
	import { HStack } from "@saas-ui/svelte/layout/stack";
	import PreviewCard from "./PreviewCard.svelte";
</script>

<section aria-label="Component previews">
	<HStack gap={2} class="flex-nowrap overflow-x-auto py-4">
		<PreviewCard>
			<Button variant="solid" colour="indigo">Button</Button>
		</PreviewCard>

		<PreviewCard>
			<Menu.Root>
				<Menu.Button variant="outline">Menu</Menu.Button>
				<Menu.Content>
					<Menu.Item value="profile">Profile</Menu.Item>
					<Menu.Item value="settings">Settings</Menu.Item>
					<Menu.Separator />
					<Menu.Item value="logout">Logout</Menu.Item>
				</Menu.Content>
			</Menu.Root>
		</PreviewCard>

		<PreviewCard>
			<Field.Root id="preview-email" class="w-full">
				<Field.Label for="preview-email">Email</Field.Label>
				<Input
					id="preview-email"
					name="preview-email"
					placeholder="john@doe.com"
				/>
			</Field.Root>
		</PreviewCard>

		<PreviewCard>
			<Accordion.Root
				id="preview-accordion"
				defaultValue={["item-1"]}
				collapsible
				class="w-full"
			>
				<Accordion.Item value="item-1">
					<Accordion.ItemTrigger>Item 1</Accordion.ItemTrigger>
					<Accordion.ItemContent
						>Content for item 1</Accordion.ItemContent
					>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.ItemTrigger>Item 2</Accordion.ItemTrigger>
					<Accordion.ItemContent
						>Content for item 2</Accordion.ItemContent
					>
				</Accordion.Item>
			</Accordion.Root>
		</PreviewCard>

		<PreviewCard>
			<Switch colour="indigo" checked aria-label="Toggle switch" />
		</PreviewCard>
	</HStack>
</section>
