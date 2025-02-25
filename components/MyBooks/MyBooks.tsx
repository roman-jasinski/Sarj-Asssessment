"use client";

import React from "react";

import MyBookItem from "./MyBookItem";
import Loading from "../common/Loading";
import { useBooks } from "@/hooks";

export default function MyBooks() {
  const { data: bookDetails, loading } = useBooks();

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl font-bold">My Books</div>
      {bookDetails.map((book) => (
        <MyBookItem key={book.id} data={book} />
      ))}
    </div>
  );
}
