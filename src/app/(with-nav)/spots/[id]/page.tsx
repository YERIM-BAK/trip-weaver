import Skeleton from "@/components/ui/Skeleton/Skeleton";
import {
  getSpotCommonDetailServer,
  getPetTourInfoServer,
  getSpotIntroDetailServer,
} from "@/lib/petTour/petTourApi.server";
import SpotDetailPage from "@/views/spots/SpotDetailPage";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ typeId?: string }>;
}) {
  const { id } = await params;
  const { typeId } = await searchParams;

  const [common, pet, intro] = await Promise.all([
    getSpotCommonDetailServer(id),
    getPetTourInfoServer(id),
    typeId ? getSpotIntroDetailServer(id, typeId) : Promise.resolve(null),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <SpotDetailPage common={common} pet={pet} intro={intro} />;
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="skeletonWrap">
      <Skeleton height={280} />
      <Skeleton height={28} />
      <Skeleton height={20} />
      <Skeleton height={20} />
    </div>
  );
}
