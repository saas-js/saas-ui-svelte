<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { DataList } from "@saas-ui/svelte/components/data-list";
	import { Tag } from "@saas-ui/svelte/components/tag";
	import { Avatar } from "@saas-ui/svelte/components/avatar";
	import { ProgressCircle } from "@saas-ui/svelte/components/progress-circle";
</script>

<Card.Root variant="elevated">
	<Card.Header>
		<Card.Title>Details</Card.Title>
	</Card.Header>
	<Card.Body class="pb-4">
		<DataList.Root>
			<DataList.Item>
				<DataList.ItemLabel>Status</DataList.ItemLabel>
				<DataList.ItemValue>
					<Tag size="sm" colour="amber" variant="subtle">
						In Progress
					</Tag>
				</DataList.ItemValue>
			</DataList.Item>
			<DataList.Item>
				<DataList.ItemLabel>Due date</DataList.ItemLabel>
				<DataList.ItemValue>Jan 27, 2026</DataList.ItemValue>
			</DataList.Item>
			<DataList.Item>
				<DataList.ItemLabel>Assigned to</DataList.ItemLabel>
				<DataList.ItemValue>
					<Avatar.Group size="xs">
						<Avatar name="John Doe" colour="indigo" />
						<Avatar name="Emily Adams" colour="indigo" />
					</Avatar.Group>
				</DataList.ItemValue>
			</DataList.Item>
			<DataList.Item>
				<DataList.ItemLabel>Sentiment</DataList.ItemLabel>
				<DataList.ItemValue class="flex items-center gap-2">
					<ProgressCircle value={85} size="xs" colour="green" />
					<span>Positive</span>
				</DataList.ItemValue>
			</DataList.Item>
		</DataList.Root>
	</Card.Body>
</Card.Root>
