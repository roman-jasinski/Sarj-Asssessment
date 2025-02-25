import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { BookDetailItem } from "@/utils/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("bookId");

  if (!bookId) {
    return NextResponse.json(
      { error: "Missing bookId parameter" },
      { status: 400 }
    );
  }

  try {
    const metadataUrl = `https://www.gutenberg.org/ebooks/${encodeURIComponent(
      bookId
    )}`;
    const metadataResponse = await fetch(metadataUrl);

    if (!metadataResponse.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch book metadata. Status: ${metadataResponse.status}`,
        },
        { status: metadataResponse.status }
      );
    }

    const metadata = await metadataResponse.text();

    const $ = cheerio.load(metadata);
    const bibrecTable = $(".bibrec");

    if (bibrecTable.length === 0) {
      return NextResponse.json(
        { error: "Table with class 'bibrec' not found" },
        { status: 404 }
      );
    }

    const metadataTable: BookDetailItem[] = [];
    bibrecTable.find("tr").each((index, element) => {
      const row: BookDetailItem = { index: "", content: "" };
      const thContent = $(element).find("th").text().trim();
      if (thContent) {
        row.index = thContent; // Use the <th> content as the index (or row identifier)

        $(element)
          .find("td")
          .each((i, cell) => {
            row.content = $(cell).text().trim();
          });
        metadataTable.push(row);
      }
    });

    return NextResponse.json({ metadataTable }, { status: 200 });
  } catch (error) {
    console.error("Error fetching book metadata:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
