"use client";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "../store";
import { ConceptNote, Field, PageIntro } from "../ui";

export function Auth({ signup = false }: { signup?: boolean }) {
  const { profile } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <>
      <PageIntro
        kicker="Your VELT / Demo profile"
        title={
          signup ? "Make a little room for yourself." : "Good to have you here."
        }
      >
        <p>
          This profile lives on your device. Use a fictional name and email. No
          password, email verification, or real account is created.
        </p>
      </PageIntro>
      <div className="auth-layout">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const errs: Record<string, string> = {};
            if (!name.trim()) errs.name = "Enter a name for your demo profile.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
              errs.email = "Enter a valid email format.";
            setErrors(errs);
            if (Object.keys(errs).length) return;
            profile(name.trim(), email.trim());
            router.push("/account");
          }}
        >
          <Field
            name="profile-name"
            label="Your demo name"
            value={name}
            onChange={setName}
            error={errors.name}
            autoComplete="off"
            placeholder="Alex Sample"
          />
          <Field
            name="profile-email"
            label="Demo email address"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            autoComplete="off"
            placeholder="alex@example.com"
          />
          <button className="button">
            {signup ? "Create local profile" : "Open local profile"}
            <ArrowUpRight size={16} />
          </button>
        </form>
        <Link className="underlink" href={signup ? "/login" : "/signup"}>
          {signup ? "Already explored the demo?" : "Start a demo profile"}
          <ArrowRight size={15} />
        </Link>
        <ConceptNote>
          Local profiles are for interface demonstration and provide no access
          control. Site data can be reset in your browser settings.
        </ConceptNote>
      </div>
    </>
  );
}
