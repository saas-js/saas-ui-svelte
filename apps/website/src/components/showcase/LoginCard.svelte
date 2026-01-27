<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Input } from "@saas-ui/svelte/components/input";
	import { Field } from "@saas-ui/svelte/components/field";
	import { Separator } from "@saas-ui/svelte/components/separator";
	import { Link } from "@saas-ui/svelte/components/link";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Centre } from "@saas-ui/svelte/layout/centre";
	import GoogleLogo from "phosphor-svelte/lib/GoogleLogoIcon";
	import Logo from "./Logo.svelte";
</script>

<Card.Root variant="elevated">
	<Card.Body class="pt-6">
		<Centre class="mb-6">
			<Logo />
		</Centre>
		<h2 class="mb-4 text-center text-base font-semibold">
			Log in to your account
		</h2>
		<div class="flex flex-col gap-2">
			<Button variant="outline" class="w-full">
				<Icon as={GoogleLogo} size="sm" weight="bold" />
				Continue with Google
			</Button>
		</div>
		<div class="my-4 flex items-center gap-2">
			<Separator class="flex-1" />
			<span class="text-sm text-fg-muted">or continue with</span>
			<Separator class="flex-1" />
		</div>
		<form class="flex flex-col gap-4">
			<Field.Root>
				<Field.Label>Email</Field.Label>
				<Input type="email" placeholder="you@example.com" />
			</Field.Root>
			<Button variant="glass" colour="indigo" class="w-full">
				Log in
			</Button>
		</form>
	</Card.Body>
	<Card.Footer class="justify-center bg-bg-subtle">
		<p class="text-sm text-fg-muted">
			Don't have an account yet?
			<Link href="#">Sign up</Link>.
		</p>
	</Card.Footer>
</Card.Root>
