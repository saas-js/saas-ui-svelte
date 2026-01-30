<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Button } from "@saas-ui/svelte/components/button";
	import { PinInput } from "@saas-ui/svelte/components/pin-input";
	import { Link } from "@saas-ui/svelte/components/link";
	import { Centre } from "@saas-ui/svelte/layout/centre";
	import { VStack } from "@saas-ui/svelte/layout/stack";
	import { Heading } from "@saas-ui/svelte/typography/heading";
	import { Text } from "@saas-ui/svelte/typography/text";
	import Logo from "./Logo.svelte";
</script>

<Card.Root variant="elevated">
	<Card.Body class="pt-6 pb-6">
		<Centre class="mb-6">
			<Logo />
		</Centre>
		<Heading as="h2" size="sm" class="mb-4 text-center">
			Verify your email
		</Heading>
		<VStack as="form" gap={4} class="items-center">
			<PinInput count={6} placeholder="0" size="md" colour="indigo" />
			<Button variant="glass" colour="indigo" class="w-full" onclick={(e: Event) => e.preventDefault()}>
				Confirm
			</Button>
		</VStack>
	</Card.Body>
	<Card.Footer class="justify-center py-3 bg-bg-subtle">
		<Text size="sm" class="text-fg-muted">
			Didn't receive a code?
			<Link href="#" onclick={(e: Event) => e.preventDefault()}>Resend</Link>.
		</Text>
	</Card.Footer>
</Card.Root>
