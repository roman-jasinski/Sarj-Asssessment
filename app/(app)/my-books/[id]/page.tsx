import MyBookDetail from "@/components/MyBooks/MyBookDetail";

export default function MyBookDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <MyBookDetail id={id} />
      </div>
    </div>
  );
}
