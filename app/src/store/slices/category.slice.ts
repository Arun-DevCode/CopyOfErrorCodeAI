import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* -------- Category Type -------- */
export interface Category {
  _id: string;
  name: string;
  isActive: boolean;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
}

/* -------- State Type -------- */
interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  loading: false,
};

/* -------- Slice -------- */
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    /* Set all categories */
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },

    /* Add new category */
    addCategory(state, action: PayloadAction<Category>) {
      state.categories.push(action.payload);
    },

    /* Update existing category */
    updateCategory(state, action: PayloadAction<Category>) {
      const index = state.categories.findIndex(
        (cat) => cat._id === action.payload._id,
      );

      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },

    /* Remove category (soft delete / filter) */
    removeCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (cat) => cat._id !== action.payload,
      );
    },

    /* Select category */
    setSelectedCategory(state, action: PayloadAction<Category | null>) {
      state.selectedCategory = action.payload;
    },

    /* Loading helpers */
    setCategoryLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  removeCategory,
  setSelectedCategory,
  setCategoryLoading,
} = categorySlice.actions;

export default categorySlice.reducer;
