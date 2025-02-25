"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import FetchBookForm from "./FetchBookForm";
import BookDetailSection from "./BookDetail";
import { BookDetail } from "@/utils/types";

export default function FetchBook() {
  const [bookData, setBookData] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col p-10 gap-10 max-w-4xl">
      <FetchBookForm
        loading={loading}
        setLoading={setLoading}
        setBookData={setBookData}
      />
      {loading && <div className="flex justify-center">Fetching...</div>}
      {!loading && !!bookData && (
        <div className="flex flex-col gap-10">
          <BookDetailSection bookData={bookData} />
          <Button>Save</Button>
        </div>
      )}
    </div>
  );
}
