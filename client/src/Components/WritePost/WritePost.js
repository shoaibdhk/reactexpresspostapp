import React from 'react';
import Textarea from '../Textarea/Textarea';
import Button from '../Button/Button';
import Input from '../Input/Input';

const WritePost = props => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <Input
                        labelName="Username"
                        inputId="username"
                        inputChangeHandler={ e => props.inputChangeHandler(e) }
                        value={ props.newPost.username }
                        inputplaceholder="Please Write your username here"
                    />
                </div>
                <div className="col-lg-12">
                    <Textarea
                        value={ props.newPost.postBody }
                        textareaChangeHandler={ e => props.textareaChangeHandler(e) }
                        placeholder="Write your story here"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 justify-content-end">
                    <Button
                        clickHandler={ props.clickHandler }
                        buttonType="success">
                        post
                    </Button>
                </div>
            </div>
            <hr />
        </React.Fragment>
    );
}

export default WritePost;