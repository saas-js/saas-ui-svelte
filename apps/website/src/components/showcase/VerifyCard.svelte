<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Button } from "@saas-ui/svelte/components/button";
	import { PinInput } from "@saas-ui/svelte/components/pin-input";
	import { Link } from "@saas-ui/svelte/components/link";
	import { Centre } from "@saas-ui/svelte/layout/centre";
	import Logo from "./Logo.svelte";
</script>

<Card.Root variant="elevated">
	<Card.Body class="pt-6">
		<Centre class="mb-6">
			<Logo />
		</Centre>
		<h2 class="mb-4 text-center text-base font-semibold">
			Verify your email
		</h2>
		<form class="flex flex-col gap-4">
			<div class="flex w-full flex-col items-center gap-2">
				<PinInput count={6} placeholder="0" size="md" colour="indigo" />
			</div>
			<Button variant="glass" colour="indigo" class="w-full">
				Confirm
			</Button>
		</form>
	</Card.Body>
	<Card.Footer class="justify-center bg-bg-subtle/50">
		<p class="text-sm text-fg-muted">
			Didn't receive a code?
			<Link href="#">Resend</Link>.
		</p>
	</Card.Footer>
</Card.Root>
