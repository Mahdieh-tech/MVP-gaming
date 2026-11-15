import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true, // snapshot used in the browser after hydration
    () => false, // snapshot used on the server and during hydration
  );
}