import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.SAMBANOVA_API_KEY;
const sambanovaUrl = process.env.SAMBANOVA_API_URL || "";

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
    const contentUrl = `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.txt`;
    const contentResponse = await fetch(contentUrl);

    if (!contentResponse.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch book conetnt. Status: ${contentResponse.status}`,
        },
        { status: contentResponse.status }
      );
    }

    const content = await contentResponse.text();

    const subContent = content.substring(5000, 1000);
    const analysisRequestBody = JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "Given the text the user should be able to perform text analysis. You are free to choose what analysis you find most interesting but some could be:  - Identify key characters - Language Detection - Sentiment Analysis - Plot Summary  - Something else? Please give the result by json type. Like this, {keyCharacters: string, langauge: string, sentiment: string, plot: string, other: string}",
        },
        { role: "user", content: `${subContent}` },
      ],
      model: "Meta-Llama-3.1-405B-Instruct",
    });

    const analysisResponse = await fetch(sambanovaUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-type": "application/json",
      },
      body: analysisRequestBody,
    });

    const analysisData = await analysisResponse.json();

    if (!analysisResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from API" },
        { status: 500 }
      );
    }

    // const analysisData = await analysisResponse.json();

    return NextResponse.json(analysisData, { status: 200 });
  } catch (error) {
    console.error("Error fetching book analysis:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
