"use client";

import React, { useState, ChangeEvent } from 'react';
import { fetchBookByID } from '@/services';

export const FetchBook = () => {

  const [bookID, setBookID] = useState<string>("");

  const handleBookID = (e: ChangeEvent<HTMLInputElement>) => {
    setBookID(e.target.value);
  };

  const handleFetchButton = () => {
    fetchBookByID(bookID);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <input placeholder="please input the book ID" value={bookID} onChange={handleBookID} />
      <button onClick={handleFetchButton}>Fetch</button>
    </div>
  );
}
