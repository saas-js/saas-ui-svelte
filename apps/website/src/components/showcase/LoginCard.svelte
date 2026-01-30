<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Input } from "@saas-ui/svelte/components/input";
	import { Field } from "@saas-ui/svelte/components/field";
	import { Separator } from "@saas-ui/svelte/components/separator";
	import { Link } from "@saas-ui/svelte/components/link";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Centre } from "@saas-ui/svelte/layout/centre";
	import { VStack, HStack } from "@saas-ui/svelte/layout/stack";
	import { Heading } from "@saas-ui/svelte/typography/heading";
	import { Text } from "@saas-ui/svelte/typography/text";
	import GoogleLogo from "phosphor-svelte/lib/GoogleLogoIcon";
	import Logo from "./Logo.svelte";
</script>

<Card.Root variant="elevated">
	<Card.Body class="pt-6 pb-6">
		<Centre class="mb-6">
			<Logo />
		</Centre>
		<Heading as="h2" size="sm" class="mb-4 text-center">
			Log in to your account
		</Heading>
		<VStack gap={2}>
			<Button variant="outline" class="w-full" onclick={(e: Event) => e.preventDefault()}>
				<Icon as={GoogleLogo} size="sm" weight="bold" />
				Continue with Google
			</Button>
		</VStack>
		<HStack gap={2} class="my-4 items-center">
			<Separator class="flex-1" />
			<Text size="sm" class="text-fg-muted">or continue with</Text>
			<Separator class="flex-1" />
		</HStack>
		<form class="flex flex-col gap-4">
			<Field.Root>
				<Field.Label>Email</Field.Label>
				<Input type="email" placeholder="you@example.com" />
			</Field.Root>
			<Button variant="glass" colour="indigo" class="w-full" onclick={(e: Event) => e.preventDefault()}>
				Log in
			</Button>
		</form>
	</Card.Body>
	<Card.Footer class="justify-center bg-bg-subtle py-3">
		<Text size="sm" class="text-fg-muted">
			Don't have an account yet?
			<Link href="#" onclick={(e: Event) => e.preventDefault()}>Sign up</Link>.
		</Text>
	</Card.Footer>
</Card.Root>
