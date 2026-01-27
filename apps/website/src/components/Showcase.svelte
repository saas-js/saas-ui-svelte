<script lang="ts">
	import { Tabs } from "@saas-ui/svelte/components/tabs";
	import { Container } from "@saas-ui/svelte/layout/container";
	import { Grid } from "@saas-ui/svelte/layout/grid";
	import { VStack } from "@saas-ui/svelte/layout/stack";

	import ConfirmCard from "./showcase/ConfirmCard.svelte";
	import StatsCard from "./showcase/StatsCard.svelte";
	import DetailsCard from "./showcase/DetailsCard.svelte";
	import LoginCard from "./showcase/LoginCard.svelte";
	import VerifyCard from "./showcase/VerifyCard.svelte";
	import FilesCard from "./showcase/FilesCard.svelte";
	import NotificationsCard from "./showcase/NotificationsCard.svelte";
</script>

<Container maxW="7xl" class="overflow-hidden pb-20">
	<Tabs.Root defaultValue="components">
		<Tabs.List class="mb-4 border-b border-border-default">
			<Tabs.Trigger value="components">Components</Tabs.Trigger>
			<Tabs.Trigger value="crm">CRM</Tabs.Trigger>
			<Tabs.Trigger value="email">Email</Tabs.Trigger>
			<Tabs.Indicator />
		</Tabs.List>

		<Tabs.ContentGroup>
			<Tabs.Content value="components">
				<Grid gap={8} class="lg:grid-cols-3">
					<VStack gap={8} class="min-w-0">
						<ConfirmCard />
						<StatsCard />
						<DetailsCard />
					</VStack>

					<VStack gap={8} class="min-w-0">
						<LoginCard />
						<VerifyCard />
					</VStack>

					<VStack gap={8} class="min-w-0">
						<FilesCard />
						<NotificationsCard />
					</VStack>
				</Grid>
			</Tabs.Content>

			<Tabs.Content value="crm">
				<div
					class="flex items-center justify-center py-20 text-fg-muted"
				>
					CRM dashboard coming soon...
				</div>
			</Tabs.Content>

			<Tabs.Content value="email">
				<div
					class="flex items-center justify-center py-20 text-fg-muted"
				>
					Email client coming soon...
				</div>
			</Tabs.Content>
		</Tabs.ContentGroup>
	</Tabs.Root>
</Container>
