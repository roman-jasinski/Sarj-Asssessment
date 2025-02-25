"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchBookByID } from "@/services";
import { bookFormSchema } from "@/utils/validations";
import { BookDetail } from "@/utils/types";

export interface FetchBookFormProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setBookData: React.Dispatch<React.SetStateAction<BookDetail | null>>;
}

export default function FetchBookForm({
  loading,
  setLoading,
  setBookData,
}: FetchBookFormProps) {
  // Initialize useForm with validation schema
  const form = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      bookID: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: { bookID: string }) => {
    setLoading(true);
    try {
      const bookData = await fetchBookByID(data.bookID);
      console.log("#bookData", bookData);
      setBookData(bookData);
    } catch (error) {
      console.error("Error fetching book data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="flex flex-row gap-4"
        >
          <div className="mb-4">
            <FormField
              control={form.control}
              name="bookID"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Book ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Fetching..." : "Fetch"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
