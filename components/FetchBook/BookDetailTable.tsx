"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { BookDetailItem } from "@/utils/types";

interface BookDetailTableProps {
  title: string;
  data?: BookDetailItem[];
}

export default function BookDetailTable({ title, data }: BookDetailTableProps) {
  if (!data || !data.length) return null;

  return (
    <div className="w-full space-y-4">
      <p className="text-3xl font-bold">{title}</p>
      <Table className="w-full border-collapse">
        <TableBody>
          {data.map(({ index: label, content }, index) => (
            <TableRow key={`${title}-${index}`} className="border">
              <TableCell className="w-1/3 text-left font-semibold">
                {label}
              </TableCell>
              <TableCell className="w-2/3">{content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
