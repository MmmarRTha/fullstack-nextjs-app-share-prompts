"use client";
import Form from "@components/Form";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({prompt: "", tag: ""});

    useEffect(() => { 
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }

        if(promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert("Prompt ID not found");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            });

            if(response.ok) {
                router.push("/");
                }
        } catch (error: unknown) {
                throw new Error('Failed to update prompt: ${error.message}');
        } finally {
                setSubmitting(false);
        }
    }   
  
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt} 
            />
        </Suspense>
  )
}

export default EditPrompt;