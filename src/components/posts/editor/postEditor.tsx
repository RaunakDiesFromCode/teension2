"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "./actions";
import UserAvatar from "@/components/userAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import React from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import "./styles.css";
import { useSubmitPostMutation } from "./mutations";
import LoadingButton from "@/components/LoadingButton";

export default function PostEditor() {
  const { user } = useSession();

  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's cooking?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
    editor?.commands.clearContent();
  }

  return (
    <div className="felx m-1 flex-col gap-5 rounded-2xl bg-card p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user?.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-primary-foreground px-5 py-3 "
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
          variant="ghost"
          loading={mutation.isPending}
          onClick={onSubmit}
          disabled={!input.trim()}
          className="mt-3 flex items-center gap-2"
        >
          Post
          <SendHorizontal />
        </LoadingButton>
      </div>
    </div>
  );
}
