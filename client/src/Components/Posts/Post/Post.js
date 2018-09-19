import React from 'react';
import LikeCommentPanel from '../../LikeCommentPanel/LikeCommentPanel';
import Delete from '../../Delete/Delete';
import Edit from '../../Edit/Edit';


const Post = props => {
    return (
        <div className="media mb-3 border-bottom pb-3">
            {/* <img className="mr-3" src=".../64x64" alt="Generic placeholder image" /> */}
            <div className="media-body">
                <h5 className="mt-0">{props.post.username}</h5>
                <p>{ props.post.postBody }</p>
                <div className="d-flex justify-content-between">
                    <LikeCommentPanel />
                    <div>
                        <Edit
                            editHandler={ props.editHandler }
                        />
                        <Delete
                            deleteHandler={ props.deleteHandler }
                        />
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Post;