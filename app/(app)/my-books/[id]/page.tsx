import MyBookDetail from "@/components/MyBooks/MyBookDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <MyBookDetail id={id} />
      </div>
    </div>
  );
}
