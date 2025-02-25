"use client";

import React, { useState } from "react";

import FetchBookForm from "@/components/Dashboard/FetchBookForm";
import SaveBookData from "@/components/Dashboard/SaveBookData";
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
          <SaveBookData />
        </div>
      )}
    </div>
  );
}
