import { db } from "@/config/firebaseConfig";
import { BookDetail, BookDetailItem } from "@/utils/types";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "@/config/firebaseConfig";
import { BookData } from "@/utils/types";
import { analysisLabels } from "@/utils/constants/book";

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

    const data: BookDetail = { metadata: [], analysis: [] };

    if (bookDoc.exists()) {
      const bookData: BookData = bookDoc.data() as BookData;
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

      data.metadata = metadataTable;
      data.analysis = Object.entries(cleanData).map(
        ([index, content]) =>
          ({
            index: analysisLabels[index as keyof typeof analysisLabels],
            content,
          } as BookDetailItem)
      );

      if (user) {
        const userId = user.uid;

        await setDoc(bookRef, {
          ...data,
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
