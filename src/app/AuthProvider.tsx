"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const setUser = useAuthStore.getState().setUser;
    const setHasHydrated = useAuthStore.getState().setHasHydrated;

    const sync = (session: import("@supabase/supabase-js").Session | null) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          name:
            session.user.user_metadata?.name ??
            session.user.user_metadata?.full_name ??
            "",
          profileImage: session.user.user_metadata?.avatar_url ?? "",
        });
      } else {
        setUser(null);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      sync(session);
      setHasHydrated(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      sync(session),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return <>{children}</>;
}
