import { useState, useEffect } from "react";

import { getBookDetails } from "@/services";
import { BookDetail } from "@/utils/types";

interface SingleBookData {
  data: BookDetail | null;
  loading: boolean;
}

export const useBookById = (id: string): SingleBookData => {
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookById = async () => {
      setLoading(true);
      try {
        const bookDetail = await getBookDetails(id);
        setBookDetail(bookDetail);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookById();
  }, [id]);

  return { data: bookDetail, loading };
};
