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
import { auth } from "@/config/firebaseConfig";
import { fetchBookByID, getUserBookList } from "@/services";
import { bookFormSchema, BookFormFieldValues } from "@/utils/validations";
import { BookDetail } from "@/utils/types";

export interface FetchBookFormProps {
  loading: boolean;
  setBookId: React.Dispatch<React.SetStateAction<string>>;
  setUserBookIds: React.Dispatch<React.SetStateAction<string[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setBookData: React.Dispatch<React.SetStateAction<BookDetail | null>>;
}

export default function FetchBookForm({
  loading,
  setBookId,
  setUserBookIds,
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
  const onSubmit = async (data: BookFormFieldValues) => {
    const { bookID } = data;

    setLoading(true);
    try {
      const user = auth.currentUser;
      const bookData = await fetchBookByID(bookID);
      const bookIds = await getUserBookList(user?.uid ?? "");
      setBookData(bookData);
      setBookId(bookID);
      setUserBookIds(bookIds);
    } catch (error) {
      console.error("Error fetching book data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
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
