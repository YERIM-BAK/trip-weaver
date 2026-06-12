import { fetchRandomPetSpotsServer } from "@/lib/petTour/petTourApi.server";
import HomePage from "@/views/HomePage";

export default async function Page() {
  const spots = await fetchRandomPetSpotsServer(6);
  return <HomePage initialSpots={spots} />;
}
