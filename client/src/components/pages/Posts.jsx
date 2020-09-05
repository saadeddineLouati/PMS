import React, { useState, useEffect } from 'react'
import Post from './Post';
import api from '../../api';
import { Grid, Typography, Divider } from '@material-ui/core';
import AddPost from './AddPost';
function Posts() {
    const [posts, setPosts] = useState([])
    const { isLoading, setIsloading } = useState(true)

    const loadPosts = () => {
        api
            .getPosts()
            .then(p => {
                setPosts(p)
                setIsloading(false)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        loadPosts()
    }, []);

    if (isLoading) {
        return 'Loading ...'
    }
    return (
        <div>
            {api.isLoggedIn() && <div>
                <AddPost loadPosts={loadPosts} />
            </div>}
            <Divider />
            <Typography variant="h4">
                Posts
            </Typography>
            {posts.length === 0 && <Typography>
                Be the first to post
                </Typography>}
            <Grid
                container
                spacing={3}
                alignItems="center"
                justify="center">
                {posts.map(p =>
                    <Grid item key={p._id}>
                        <Post post={p} />
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default Posts
