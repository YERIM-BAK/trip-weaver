import { CONTENT_TYPE_MAP } from "@/constants/tour";
import { PetSpot } from "./petTour.types";
import { Spot } from "@/features/course/course.types";

export const mapPetSpot = (spot: PetSpot): Spot => ({
  id: spot.contentid,
  name: spot.title,
  address: spot.addr1,
  category: CONTENT_TYPE_MAP[spot.contenttypeid] ?? "",
  image: spot.firstimage || spot.firstimage2 || null,
});
