<script lang="ts">
import EmailSidebar from "./EmailSidebar.svelte";
import EmailList from "./EmailList.svelte";
import EmailView from "./EmailView.svelte";
import { Flex } from "@saas-ui/svelte/layout/flex";

let sidebarOpen = $state(true);
let selectedEmailId = $state<string | null>("1");
</script>

<Flex
	class="border-border-default bg-bg-muted h-150 w-full max-w-360 overflow-hidden rounded-md border xl:max-w-400"
>
	<EmailSidebar
		open={sidebarOpen}
		onToggle={() => (sidebarOpen = !sidebarOpen)}
	/>

	<Flex
		class="border-border-default w-64 flex-1 shrink-0 overflow-hidden border-r"
	>
		<EmailList
			selectedId={selectedEmailId}
			onSelect={(id) => (selectedEmailId = id)}
			sidebarOpen={sidebarOpen}
			onToggleSidebar={() => (sidebarOpen = !sidebarOpen)}
		/>
	</Flex>

	<EmailView emailId={selectedEmailId} />
</Flex>
