import Root from "./avatar.svelte";
import Group from "./avatar-group.svelte";

export { default as AvatarGroup } from "./avatar-group.svelte";

export { avatar, type AvatarVariants } from "./avatar.svelte";

export {
    AVATAR_GROUP_CTX,
    type AvatarGroupContext,
} from "./avatar-group.svelte";

export type {
    AvatarRootProps,
    AvatarImageProps,
    AvatarFallbackProps,
} from "@ark-ui/svelte/avatar";

export const Avatar = Object.assign(Root, {
    Root,
    Group,
});
