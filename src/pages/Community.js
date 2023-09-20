import './Styles.css'
import './Style.css'
import { useEffect, useState } from 'react'
import { createPostRoute, getAllPostRoute } from '../utils/APIRoutes'
import axios from 'axios'
import { useNavigate } from "react-router";

function Community() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState(null)


  const fetchallPost = async () => {
    try {

      const response = await axios.get(getAllPostRoute)
      if (response) {
        console.log(response.data)
        setPosts(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchallPost()
  }, [])

  return (
    <div className="community-page">
      <div className="decor-line"></div>
      <h2 className="page-title">
        Community<br />
        Building Trust Together
      </h2>
      <div className='flex flex-col items-center justify-between'>
        <div className="community-grid">


          {posts?.map(post => (
            <div className="post-container">
              {/* Post content */}
              <h3 className="post-title font-bold">{post.title}</h3>
              <p className="post-content">{post.desc}</p>
              <div className="user-profile">
                <img className="user-image" src={require("../images/download.png")} alt="User 2" />
                <span className="user-name">{post.author}</span>
                {/* <span className="user-designation">Website User</span> */}
              </div>
            </div>
          ))}







        </div>
        <div className="button-container">
          <button className="custom-button" onClick={() => navigate("/post")}>Post</button>
          <button className="custom-button">Update Feed</button>
        </div>
      </div>
    </div>
  );
}

export default Community;
