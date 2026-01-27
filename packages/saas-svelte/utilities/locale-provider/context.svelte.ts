import { getContext, setContext } from "svelte";

const LOCALE_CONTEXT_KEY = Symbol("locale-context");

export interface LocaleContext {
    locale: string;
    dir: "ltr" | "rtl";
}

export function setLocaleContext(context: LocaleContext) {
    setContext(LOCALE_CONTEXT_KEY, context);
}

export function getLocaleContext(): LocaleContext | undefined {
    return getContext<LocaleContext>(LOCALE_CONTEXT_KEY);
}
