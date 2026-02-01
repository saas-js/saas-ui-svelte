<script lang="ts">
	import EmailSidebar from "./EmailSidebar.svelte";
	import EmailList from "./EmailList.svelte";
	import EmailView from "./EmailView.svelte";
	import { Flex } from "@saas-ui/svelte/layout/flex";

	let sidebarOpen = $state(true);
	let selectedEmailId = $state<string | null>("1");
	let mobileShowEmail = $state(false);

	function handleSelectEmail(id: string) {
		selectedEmailId = id;
		mobileShowEmail = true;
	}

	function handleBackToList() {
		mobileShowEmail = false;
	}
</script>

<Flex
	class="border-border-default bg-bg-muted h-100 w-full max-w-360 overflow-hidden rounded-md border md:h-150 xl:max-w-400"
>
	<!-- Sidebar - hidden on mobile -->
	<div class="hidden lg:flex">
		<EmailSidebar
			open={sidebarOpen}
			onToggle={() => (sidebarOpen = !sidebarOpen)}
		/>
	</div>

	<!-- Email List - hidden on mobile when viewing email -->
	<Flex
		class="border-border-default w-full flex-1 shrink-0 overflow-hidden lg:w-64 lg:border-r {mobileShowEmail
			? 'hidden lg:flex'
			: 'flex'}"
	>
		<EmailList
			selectedId={selectedEmailId}
			onSelect={handleSelectEmail}
			{sidebarOpen}
			onToggleSidebar={() => (sidebarOpen = !sidebarOpen)}
		/>
	</Flex>

	<!-- Email View - full width on mobile when selected -->
	<div class="{mobileShowEmail ? 'flex' : 'hidden'} flex-1 lg:flex">
		<EmailView emailId={selectedEmailId} onBack={handleBackToList} />
	</div>
</Flex>
