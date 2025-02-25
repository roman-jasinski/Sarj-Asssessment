import Link from "next/link";

import { BookDetail } from "@/utils/types";

interface MyBookItemProps {
  data: BookDetail;
}

export default function MyBookItem({ data }: MyBookItemProps) {
  const { id, metadata } = data;
  const metadataObj: Record<string, string> = metadata.reduce(
    (acc, { index, content }) => ({ ...acc, [index]: content }),
    {}
  );

  const title = metadataObj?.Title ?? "";
  const subject = metadataObj?.Subject ?? "";
  const author = metadataObj?.Author ?? "";

  return (
    <Link href={`/my-books/${id}`}>
      <div className="w-full rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform hover:scale-105 duration-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <h3 className="text-md text-gray-600 mb-4">{subject}</h3>
          <p className="text-gray-700 text-sm line-clamp-3">{author}</p>
        </div>
      </div>
    </Link>
  );
}
