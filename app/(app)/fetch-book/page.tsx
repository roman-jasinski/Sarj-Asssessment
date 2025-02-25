import FetchBook from "@/components/FetchBook/FetchBook";

export default function DashboardPage() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <FetchBook />
      </div>
    </div>
  );
}
