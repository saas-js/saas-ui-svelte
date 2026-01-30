import PersonaRoot from "./persona.svelte";
import PersonaAvatar from "./persona-avatar.svelte";
import PersonaPresenceBadge from "./persona-presence-badge.svelte";
import PersonaDetails from "./persona-details.svelte";
import PersonaLabel from "./persona-label.svelte";
import PersonaSecondaryLabel from "./persona-secondary-label.svelte";
import PersonaTertiaryLabel from "./persona-tertiary-label.svelte";

export {
	PersonaRoot,
	PersonaAvatar,
	PersonaPresenceBadge,
	PersonaDetails,
	PersonaLabel,
	PersonaSecondaryLabel,
	PersonaTertiaryLabel,
};

export {
	persona,
	PERSONA_CTX,
	type PersonaContext,
	type PersonaVariants,
	type PersonaPresence,
} from "./persona.svelte";

export {
	presenceBadge,
	presenceBadgeOutOfOffice,
	type PresenceBadgeVariants,
	type PresenceStatus,
} from "./persona-presence-badge.svelte";

export const Persona = {
	Root: PersonaRoot,
	Avatar: PersonaAvatar,
	PresenceBadge: PersonaPresenceBadge,
	Details: PersonaDetails,
	Label: PersonaLabel,
	SecondaryLabel: PersonaSecondaryLabel,
	TertiaryLabel: PersonaTertiaryLabel,
} as const;
