// export default PostPage;
import React, { useEffect, useState } from 'react';
import './Styles.css'; // Import your CSS styles
import { createPostRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { useNavigate } from "react-router";
function PostPage() {
  const navigate = useNavigate()
  const formData = new FormData()
  const [post, setPost] = useState({
    title: "",
    desc: "",
    author: "",

  })

  const fetchauthor = async () => {
    if (localStorage.getItem("nayay")) {
      const author = await JSON.parse(localStorage.getItem("nayay")).name
      setPost({ ...post, author: author })
    } else {
      navigate('/community')
    }
  }

  useEffect(() => {
    fetchauthor()
  }, [])

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    formData.set("image", e.target.files[0])
  }

  const submit = async () => {
    try {
      const author = await JSON.parse(localStorage.getItem("nayay")).name
      if (author) {
        formData.set("author", author)
        formData.set("title", post.title)
        formData.set("desc", post.desc)

        const response = await axios.post(createPostRoute, formData)
        if (response) {
          console.log(response.data)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="container">
      <div className="decor-line"></div>
      <h1 className="custom-page-title">
        Create a Post
      </h1>
      <div className="custom-post-container">
        {/* User Profile */}
        <div className="custom-user-profile">
          <img className="custom-user-image" src={require("../images/download.png")} alt="User 1" />
          <span className="custom-user-name">{post.author}</span>
          <span className="custom-user-designation">Nyaymitra User</span>
        </div>

        {/* Post Form */}
        <form className='flex flex-col '>
          <div className="form-group max-w-[300px]">
            <label htmlFor="postTitle">Title of the Post</label>
            <input
              type="text"
              id="postTitle"
              name="title"
              placeholder="Enter the post title"
              required
              className="custom-form-input"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group max-w-[700px]">
            <label htmlFor="postDescription">Description of the Post</label>
            <textarea
              id="postDescription"
              name="desc"
              placeholder="Write your post content here"
              onChange={(e) => handleChange(e)}
              required
              className="form-textarea"
            ></textarea>
          </div>

          <div className="custom-button-container">
            <button className="custom-custom-button" onClick={submit}>
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostPage;
