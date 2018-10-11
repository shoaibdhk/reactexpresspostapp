import React, { Component } from 'react';
// import axios from 'axios'
// import logo from './logo.svg';
import './App.css';

import WritePost from './WritePost/WritePost';
import Posts from './Posts/Posts';

class App extends Component {

    baseURL = 'http://localhost:5000';

    constructor(props) {
        super(props);

        this.state = {
            posts: null, 
            newPost: {
                username: '', 
                postBody: ''
            }, 
            edit: ""
        }
    }

    addPost = () => {
        if (this.state.newPost.username !== "" && this.state.newPost.postBody !== "") {
            fetch(this.baseURL + '/posts',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(this.state.newPost)
                })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error();
                    }
                
                if (response.status === 200) {
                    response.json();

                    this.setState({
                        newPost: {
                            username: '',
                            postBody: ''
                        }
                    });
                }
                })
                .then(result => {

                    fetch(this.baseURL + '/posts')
                        .then(response => {
                            return response.json();
                        })
                        .then(posts => {
                            this.setState({ posts: posts.posts });
                        })
                        .catch(err => {
                            console.log(err);
                        });

                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            alert("Please write something to post");
        }
    }

    editPost = (postId, e) => {
        
    }

    deletePost = postId => {
        fetch(this.baseURL + '/posts/' + postId, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error();
                }

                if (response.status === 200) {
                    fetch(this.baseURL + '/posts')
                    .then(response => {
                        return response.json();
                    })
                    .then(posts => {
                        this.setState({ posts: posts.posts });
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    textareaChangeHandler = e => {
        const newPost = this.state.newPost;

        newPost.postBody = e.target.value;
        this.setState({ newPost });
    }

    inputChangeHandler = e => {
        const newPost = this.state.newPost;

        newPost.username = e.target.value;
        this.setState({ newPost });
    }

    componentDidMount() {
        fetch(this.baseURL + '/posts')
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.setState({ posts: result.posts });
            });
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <WritePost
                                clickHandler={ this.addPost.bind(this) }
                                textareaChangeHandler={ this.textareaChangeHandler }
                                inputChangeHandler={ this.inputChangeHandler }
                                newPost={ this.state.newPost }
                            />
                            <Posts
                                posts={ this.state.posts }
                                deleteHandler={ this.deletePost.bind(this) }
                                editHandler={ this.editPost.bind(this) }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
