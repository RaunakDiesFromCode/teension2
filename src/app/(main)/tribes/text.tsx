"use client";

import React from "react";
import useTribeInfo from "@/hooks/useTribeInfo";

const UserTribe = ({ userId }: { userId: string }) => {
  const { data, isLoading, error } = useTribeInfo(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Safeguard against undefined `data.tribe`:
  return (
    <div>
      <h1>User Tribe</h1>
      <p>{data?.tribe ? data.tribe : "No tribe information available"}</p>
    </div>
  );
};

export default UserTribe;
