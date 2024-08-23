import connectToDB from "@utils/database";
import Prompts from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const getProfilePrompts = await Prompts.find({
      creator: params.id,
    }).populate("creator");


    return new Response(JSON.stringify(getProfilePrompts), { status: 200 });
  } catch (e) {
    return new Response("Failed to get profile", { status: 500 });
  }
};
