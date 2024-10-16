// src/hooks/useTribeInfo.ts

import kyInstance from "@/lib/ky";
import { TribeInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query"; // or 'react-query' if using v3

export default function useTribeInfo(userId: string) {
  const query = useQuery({
    queryKey: ["tribe-info", userId],
    queryFn: () => kyInstance.get(`/api/users/${userId}/tribe`).json<TribeInfo>(),
    staleTime: Infinity, // Keep it if needed for performance, but it won't force re-fetching
  });

  return query;
}