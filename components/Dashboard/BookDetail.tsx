import React from "react";
import BookDetailTable from "./BookDetailTable";
import { BookDetail } from "@/utils/types";

interface BookDetailProps {
  bookData: BookDetail;
}

export default function BookDetailSection({ bookData }: BookDetailProps) {
  const { metadata, analysis } = bookData;
  return (
    <React.Fragment>
      <BookDetailTable title="Metadata" data={metadata} />
      <BookDetailTable title="Analysis" data={analysis} />
    </React.Fragment>
  );
}
