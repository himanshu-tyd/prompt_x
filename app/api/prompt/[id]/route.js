import connectToDB from "@utils/database";
import Prompts from "@models/prompt";

//GET TO READ DATA
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const user = await Prompts.findOne({ _id: params.id });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (e) {
    console.log("ERROR IN GET", e);
    return new Response("Failed to GET Data", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const updatePrompt = await Prompts.findById(params.id);

    if (!updatePrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    (updatePrompt.prompt = prompt), (updatePrompt.tag = tag);

    await updatePrompt.save();

    return new Response(JSON.stringify(updatePrompt), { status: 200 });
  } catch (e) {
    console.log("ERROR IN PATCH", e);
    return new Response("Failed to UPDATE Data", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompts.findByIdAndDelete(params.id);

    return new Response("Prompt Deleted Succesfully", { status: 200 });
  } catch (e) {
    console.log("ERROR IN DELETE", e);
    return new Response("Failed to DELETE Data", { status: 500 });
  }
};
