import {
  getSpotCommonDetailServer,
  getPetTourInfoServer,
  getSpotIntroDetailServer,
} from "@/lib/petTour/petTourApi.server";
import SpotDetailPage from "@/views/spots/SpotDetailPage";

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

  return <SpotDetailPage common={common} pet={pet} intro={intro} />;
}
