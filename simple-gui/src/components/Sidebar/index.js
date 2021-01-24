import React, { useEffect, useState } from 'react';
import Card from '../Ui/Card';
import './style.css';
import blogPost from "../../data/blog.json"
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = blogPost.data;
    setPosts(posts);
  }, [posts]);

  return (
    <div className="sidebarContainer" style={{
      width: props.width
    }}>
      <Card style={{ marginBottom: "20px", padding: "20px", boxSizing: "border-box" }}>
        <div className="cardHeader">
          <span>About us</span>
        </div>
        <div className="profileImageContainer">
          <img src="https://scontent.fotp3-2.fna.fbcdn.net/v/t1.0-9/74911765_3109812712367494_1990000150877044736_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=17ZCkdL2BJIAX8B_-G2&_nc_ht=scontent.fotp3-2.fna&oh=147f37079a6d1b9c82cccc5d83079205&oe=60327D99" alt="Costin Lungu" />
        </div>
        <div className="cardBody">
          <p className="personalBio">My name is Lungu Costin and this is my web technology project</p>
        </div>
      </Card>

      <Card>
        <div className="cardHeader">
          <span>Social Network</span>
        </div>
      </Card>

      <Card style={{ marginBottom: "20px", padding: "20px", boxSizing: "border-box" }}>
        <div className="cardHeader">
          <span>Recent Posts</span>
        </div>
        <div className="recentPosts">

          {posts.map(post => {
            return (
              <NavLink key={post.id} to={`/posts/${post.id}`}>
                <div className="recentPost">
                  <h3>{post.blogTitle}</h3>
                  <span>{post.postedOn}</span>
                </div>
              </NavLink>
            );
          })
          }
        </div>
      </Card>
    </div>
  )
}

export default Sidebar