import { useState, useEffect } from "react";

import { auth } from "@/config/firebaseConfig";
import { getBookDetails, getUserBookList } from "@/services";
import { BookDetail } from "@/utils/types";

interface BookListData {
  data: BookDetail[];
  loading: boolean;
}

export const useBooks = (): BookListData => {
  const [bookDetails, setBookDetails] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const user = auth.currentUser;
      try {
        const bookIds = await getUserBookList(user?.uid ?? "");

        const bookDetails = await Promise.all(
          bookIds.map(async (id) => {
            const bookDetail = await getBookDetails(id);
            return bookDetail;
          })
        );
        const filteredBooks = bookDetails.filter((book) => book !== null);
        setBookDetails(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { data: bookDetails, loading };
};
