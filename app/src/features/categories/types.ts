export interface Category {
  _id: string; // MongoDB style ID
  name: string;
  slug: string;
  description: string; // Based on your JSON, this exists
  isActive: boolean; // To handle the "Active" status badge logic
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  questionCount: number; // The count shown in the card footer
}
