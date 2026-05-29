import { fetchRandomPetSpotsServer } from "@/lib/petTour/petTourApi";
import HomePage from "@/pages/HomePage";

export default async function Page() {
  const spots = await fetchRandomPetSpotsServer(6);
  return <HomePage initialSpots={spots} />;
}
