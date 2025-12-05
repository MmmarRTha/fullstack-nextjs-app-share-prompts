import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}
