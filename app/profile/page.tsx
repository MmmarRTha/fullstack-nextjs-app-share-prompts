"use client";

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }
        if(session?.user.id) fetchPosts();
    }, []);

    const handleEdit = async () => {

    }

    const handleDelete = async () => {

    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page!"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile
