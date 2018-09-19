import React from 'react';
// import uniqid from 'uniqid';
import Post from './Post/Post';

const Posts = props => {

    if (!props.posts) {
        return "Loading...";
    }

    const posts = props.posts.map(post => {

        return <Post
                    key={ post._id }
                    post={ post }
                    deleteHandler={ () => props.deleteHandler(post._id) }
                    editHandler={ (e) => props.editHandler(post._id, e) }
                />
    });

    return (
        <div className="row">
            <div className="col-lg-12">
                { posts }
            </div>
        </div>
    )
}

export default Posts;