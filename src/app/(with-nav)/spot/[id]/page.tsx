import SpotDetailPage from "@/views/SpotDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SpotDetailPage contentId={id} />;
}
