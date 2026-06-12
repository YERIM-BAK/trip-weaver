export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: "여아" | "남아";
  isRepresentative: boolean;
  image?: string | null;
}
