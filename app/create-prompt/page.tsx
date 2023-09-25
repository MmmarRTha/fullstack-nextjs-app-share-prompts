"use client";
import Form from "@components/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({prompt: "", tag: ""});

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                })
            });

            if(res.ok) {
                router.push("/");
            }
        } catch (error: unknown) {
            throw new Error('Failed to create prompt: ${error.message}');
        }
    }
  
    return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt} 
    />
  )
}

export default CreatePrompt;