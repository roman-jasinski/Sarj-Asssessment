"use client";

import BookDetailSection from "../FetchBook/BookDetail";
import Loading from "../common/Loading";
import { useBookById } from "@/hooks";

interface MyBookDetailProps {
  id: string;
}

export default function MyBookDetail({ id }: MyBookDetailProps) {
  const { data: bookData, loading } = useBookById(id);

  if (loading) {
    return <Loading />;
  }

  if (!bookData) return <div>Not Found</div>;

  return <BookDetailSection bookData={bookData} />;
}
