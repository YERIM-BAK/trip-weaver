import { useRouter } from "next/navigation";

interface UseBackOptions {
  fallback?: string;
}

export function useBack({ fallback = "/" }: UseBackOptions = {}) {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return { goBack };
}
