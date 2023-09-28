"use client";

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            console.log("response", response);
            const { data } = await response.json();

            setMyPosts(data);
    }
    if(session?.user.id) fetchPosts();
    }, []);

    const handleEdit = () => {
        console.log("edit")
    }

    const handleDelete = async () => {
        console.log("delete")
    }
  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete} 
    />
  )
}

export default MyProfile;