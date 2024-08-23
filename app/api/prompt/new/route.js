import  connectToDB  from "@utils/database"
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId,prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    

    const data= await newPrompt.save();


    return new Response(JSON.stringify(newPrompt),{success:true,'message':'Prompt created successfully'})

  } catch (e) {
    return new Response({ success: false, message: "Failed to create a new prompt",status:500 },);
  }
};
