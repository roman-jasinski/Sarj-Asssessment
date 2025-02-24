import { FetchData } from "@/utils/types";

export async function fetchBookByID(bookId: string): Promise<FetchData | null> {
  try {
    const response = await fetch(`/api/book?bookId=${bookId}`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data: FetchData = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
}
