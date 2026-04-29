"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/lib/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  return (
    <form action={formAction} className="grid gap-4">
      {state.error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">
          {state.error}
        </div>
      ) : null}
      <label>
        <span className="label">Email</span>
        <input name="email" type="email" required className="field" />
      </label>
      <label>
        <span className="label">Password</span>
        <input name="password" type="password" required className="field" />
      </label>
      <button className="btn-primary" disabled={pending}>
        <LogIn size={17} />
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
