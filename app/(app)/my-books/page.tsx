import MyBooks from "@/components/MyBooks/MyBooks";

export default function MyBooksPage() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <MyBooks />
      </div>
    </div>
  );
}
