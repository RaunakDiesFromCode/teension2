"use client"
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const { data } = useFollowerInfo(userId, initialState);
  return (
    <span>
      <span className="">
        {data.followers == 0
          ? `Nobody touched yet`
          : `Touched by ${formatNumber(data.followers)} people`}
      </span>
    </span>
  );
}
