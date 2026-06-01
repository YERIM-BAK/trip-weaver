"use client";

import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("session", session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          profileImage: session.user.user_metadata?.avatar_url ?? "",
        });
      }
      router.push("/");
    };

    handleCallback();
  }, []);

  return <p>로그인 중</p>;
}
