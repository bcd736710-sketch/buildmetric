"use client";

import { useActionState } from "react";

import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="admin-login-form">
      <label htmlFor="username">Username</label>
      <input id="username" name="username" autoComplete="username" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required />
      {state.error ? <p className="admin-login-error" role="alert">{state.error}</p> : null}
      <button type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign In"}</button>
    </form>
  );
}
