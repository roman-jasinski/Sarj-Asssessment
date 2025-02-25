import { doc, setDoc, getDoc } from "firebase/firestore";

import { db, auth } from "@/config/firebaseConfig";
import { analysisLabels } from "@/utils/constants/book";
import { BookDetail, BookDetailItem, BookData, UserBook } from "@/utils/types";

export async function fetchBookByID(
  bookId: string
): Promise<BookDetail | null> {
  if (!bookId || typeof bookId !== "string") {
    throw new Error("Invalid bookId: Must be a non-empty string.");
  }

  try {
    const user = auth.currentUser;
    const bookRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookRef);

    const data: BookDetail = { id: "", metadata: [], analysis: [] };

    if (bookDoc.exists()) {
      const bookData: BookData = bookDoc.data() as BookData;
      data.id = bookId;
      data.metadata = bookData.metadata;
      data.analysis = bookData.analysis;
    } else {
      const metadataResponse = await fetch(`/api/metadata?bookId=${bookId}`);
      if (!metadataResponse.ok) throw new Error("Failed to fetch");
      const { metadataTable } = await metadataResponse.json();

      const analysisResponse = await fetch(`/api/analysis?bookId=${bookId}`);
      if (!analysisResponse.ok) throw new Error("Failed to fetch");
      const analysisData = await analysisResponse.json();

      const rawContent = analysisData.choices?.[0]?.message?.content || "";
      const jsonMatch = rawContent.match(/\{\s*?"keyCharacters":[\s\S]*?\}/);
      const parsedContent = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
      if (parsedContent.other) {
        parsedContent.other =
          parsedContent.other.split(", indicating")[0] + ".";
      }
      const cleanData = JSON.parse(JSON.stringify(parsedContent));

      data.id = bookId;
      data.metadata = metadataTable;
      data.analysis = Object.entries(cleanData).map(
        ([index, content]) =>
          ({
            index: analysisLabels[index as keyof typeof analysisLabels],
            content,
          } as BookDetailItem)
      );

      if (user) {
        const { metadata, analysis } = data;
        const userId = user.uid;

        await setDoc(bookRef, {
          metadata,
          analysis,
          userId: userId,
          createdAt: new Date(),
        });
      }
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching or saving book data:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return null;
  }
}

export const getUserBookList = async (userId: string): Promise<string[]> => {
  try {
    if (!userId) {
      console.warn(`Unauthenticated user!`);
      return [];
    }

    const bookRef = doc(db, "user_books", userId);
    const bookDoc = await getDoc(bookRef);

    if (!bookDoc.exists()) {
      console.warn(`No book data found for user: ${userId}`);
      return [];
    }

    const data = bookDoc.data() as UserBook;
    return data.bookIds;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user book list:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return [];
  }
};

export const addUserBook = async (
  userId: string,
  bookId: string
): Promise<void> => {
  try {
    if (!userId) {
      console.warn(`Unauthenticated user!`);
      return;
    }

    const bookRef = doc(db, "user_books", userId);
    const bookDoc = await getDoc(bookRef);

    const data = bookDoc.data() as UserBook;
    const bookIds = data?.bookIds ?? [];
    const newBookList = bookIds.includes(bookId)
      ? bookIds
      : [...bookIds, bookId];

    setDoc(bookRef, { bookIds: newBookList }, { merge: true });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user book list:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
};

export const getBookDetails = async (
  bookId: string
): Promise<BookDetail | null> => {
  try {
    const bookRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookRef);

    if (!bookDoc.exists()) {
      console.warn(`No book data found for user: ${bookId}`);
      return null;
    }

    const data = { id: bookDoc.id, ...bookDoc.data() } as BookDetail;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user book list:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return null;
  }
};
