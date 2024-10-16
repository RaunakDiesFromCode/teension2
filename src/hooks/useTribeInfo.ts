// src/hooks/useTribeInfo.ts

import kyInstance from "@/lib/ky";
import { TribeInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useTribeInfo(userId: string) {
  const query = useQuery({
    queryKey: ["tribe-info", userId],
    queryFn: () => kyInstance.get(`/api/users/${userId}/tribe`).json<TribeInfo>(),
    staleTime: Infinity,
  });

  return query;
}