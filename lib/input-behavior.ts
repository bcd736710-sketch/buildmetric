import type { FocusEvent } from "react";

export function selectNumberOnFocus(event: FocusEvent<HTMLInputElement>) {
  event.currentTarget.select();
}
