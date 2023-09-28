"use client";

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const { data } = await response.json();

            setPosts(data);
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
        name="My Profile"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete} 
    />
  )
}

export default MyProfile;