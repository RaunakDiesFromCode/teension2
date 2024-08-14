"use client"
import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import EditProfileDialogue from "./EditProfileDialogue";

interface EditProfileButtonProps {
  user: UserData;
}

export default function EditProfileButton({ user }: EditProfileButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowDialog(true)}
        className="rounded-full p-[0.6rem]"
      >
        <Pencil size={20}/>
      </Button>
      <EditProfileDialogue user={user} open={showDialog} onOpenChange={setShowDialog}/>
    </>
  );
}