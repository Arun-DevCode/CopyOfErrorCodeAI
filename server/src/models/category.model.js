import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      default: "General",
    },

    description: {
      type: String,
      default: "",
      maxlength: 200,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// /* Generate slug safely */
// categorySchema.pre("validate", function (next) {
//   if (this.isModified("name") || this.isNew) {
//     this.slug = this.name
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "-");
//   }
//   next();
// });

export default mongoose.model("Category", categorySchema);
