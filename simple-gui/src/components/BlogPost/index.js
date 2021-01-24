import React, { useState, useEffect } from 'react';
import Card from '../Ui/Card';
import './style.css';
import pediatricSpecial from "../../blogPostImages/pediatrics-special-needs.jpg"
import blogPost from "../../data/blog.json";

const BlogPost = (props) => {

  const [post, setPost] = useState({
    id: "",
    blogCategory: "",
    blogTitle: "",
    slug: "",
    postedOn: "",
    author: "",
    blogImage: "",
    blogText: ""
  });
  const [slug, setSlug] = useState('');

  const [postId, setPostId] = useState("");

  useEffect(() => {
    const postId = props.match.params.postId;
    const post = blogPost.data.find(post => post.id == postId);
    setPost(post);
    setPostId(postId)
  }, [post, props.match.params.postId]);

  if (post.blogImage == "") {
    return null;
  }

  return (
    <div className="blogPostContainer">
      <Card>
        <div className="blogHeader">
          <span className="blogCategory">{post.blogCategory}</span>
          <h1 className="postTime">{post.blogTitle}</h1>
          <span className="postedBy">posted on {post.postedOn} by {post.author}</span>
        </div>
        <div className="postImageContainer">
          <img src={pediatricSpecial} alt="Pediatric appointment" />
          <img src={post.blogImage} alt="Post Image" />
          {/* <img src={require('../../blogPostImages/' + post.blogImage)} alt="Post Image" /> */}

        </div>
        <div className="postContent">
          <h3>{post.blogTitle}</h3>
          <p>{post.blogText}</p>
        </div>
      </Card>
    </div>
  )
}

export default BlogPost