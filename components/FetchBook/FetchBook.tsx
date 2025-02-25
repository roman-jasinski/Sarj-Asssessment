"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import FetchBookForm from "./FetchBookForm";
import BookDetailSection from "./BookDetail";
import { auth } from "@/config/firebaseConfig";
import { addUserBook } from "@/services";
import { BookDetail } from "@/utils/types";

export default function FetchBook() {
  const [bookId, setBookId] = useState<string>("");
  const [userBookIds, setUserBookIds] = useState<string[]>([]);
  const [bookData, setBookData] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      await addUserBook(user?.uid ?? "", bookId);
      setSaved(true);
    } catch (error) {
      console.error("Error saving user book:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col p-10 gap-10 max-w-4xl">
      <FetchBookForm
        loading={loading}
        setBookId={setBookId}
        setUserBookIds={setUserBookIds}
        setLoading={setLoading}
        setBookData={setBookData}
      />
      {loading && <div className="flex justify-center">Fetching...</div>}
      {!loading && !!bookData && (
        <div className="flex flex-col gap-10">
          <BookDetailSection bookData={bookData} />
          {userBookIds.includes(bookId) ? (
            <div className="flex justify-center w-full">Already saved!</div>
          ) : saved ? (
            <div className="flex justify-center w-full">Saved!</div>
          ) : (
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="animate-spin" />}
              Save
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
