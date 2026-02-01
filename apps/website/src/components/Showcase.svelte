<script lang="ts">
	import { Tabs } from "@saas-ui/svelte/components/tabs";
	import { Container } from "@saas-ui/svelte/layout/container";
	import { Grid } from "@saas-ui/svelte/layout/grid";
	import { VStack } from "@saas-ui/svelte/layout/stack";
	import { Centre } from "@saas-ui/svelte/layout/centre";
	import { Spinner } from "@saas-ui/svelte/components/spinner";
	import { onMount } from "svelte";

	import ConfirmCard from "./showcase/ConfirmCard.svelte";
	import StatsCard from "./showcase/StatsCard.svelte";
	import DetailsCard from "./showcase/DetailsCard.svelte";
	import LoginCard from "./showcase/LoginCard.svelte";
	import VerifyCard from "./showcase/VerifyCard.svelte";
	import FilesCard from "./showcase/FilesCard.svelte";
	import NotificationsCard from "./showcase/NotificationsCard.svelte";

	// Lazy load CRM dashboard (includes Chart.js) only when tab is hovered/focused
	let mounted = $state(false);
	let crmLoading = $state(false);
	let CRMDashboard:
		| typeof import("./showcase/crm/CRMDashboard.svelte").default
		| null = $state(null);

	// Lazy load Email dashboard only when tab is hovered/focused
	let emailLoading = $state(false);
	let EmailDashboard:
		| typeof import("./showcase/email/EmailDashboard.svelte").default
		| null = $state(null);

	onMount(() => {
		mounted = true;
	});

	async function handlePrefetch(value: string) {
		// Only prefetch after component has mounted (avoids hydration issues)
		if (mounted && value === "crm" && !crmLoading && !CRMDashboard) {
			crmLoading = true;
			const module = await import("./showcase/crm/CRMDashboard.svelte");
			CRMDashboard = module.default;
		}
		if (mounted && value === "email" && !emailLoading && !EmailDashboard) {
			emailLoading = true;
			const module =
				await import("./showcase/email/EmailDashboard.svelte");
			EmailDashboard = module.default;
		}
	}
</script>

<Container maxW="7xl" class="overflow-hidden pb-20">
	<Tabs.Root defaultValue="components" onPrefetch={handlePrefetch}>
		<Tabs.List class="border-border-default mb-4 border-b pt-1">
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
				{#if CRMDashboard}
					<CRMDashboard />
				{:else}
					<Centre
						class="py-20"
						aria-busy="true"
						aria-label="Loading CRM dashboard"
					>
						<Spinner size="lg" />
					</Centre>
				{/if}
			</Tabs.Content>

			<Tabs.Content value="email">
				{#if EmailDashboard}
					<EmailDashboard />
				{:else}
					<Centre
						class="py-20"
						aria-busy="true"
						aria-label="Loading email dashboard"
					>
						<Spinner size="lg" />
					</Centre>
				{/if}
			</Tabs.Content>
		</Tabs.ContentGroup>
	</Tabs.Root>
</Container>
