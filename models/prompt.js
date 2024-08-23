import { Schema, model, models } from "mongoose";

const promptSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    prompt: {
      type: String,
      required: [true, "prompt is required"],
    },
    tag: {
      type: String,
      required: [true, "tag is required"],
    },
  },
  { timestamps: true }
);

const Prompts = models.Prompts || model("Prompts", promptSchema);

export default Prompts;
