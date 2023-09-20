import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { allLawyersRoute, allUsersRoute, createPostRoute, getAllPostRoute, photoRoute } from '../utils/APIRoutes'

const Post = () => {
   const formData = new FormData()
   const [post, setPost] = useState({
      title: "",
      desc: "",
      author: "",

   })
   const [posts, setPosts] = useState(null)

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
               fetchallPost()
            }
         }
      } catch (err) {
         console.log(err)
      }
   }

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
      <>
         <div>Post</div>
         <div>
            <input type='text' name="title" value={post.title} onChange={(e) => handleChange(e)} />
            <textarea name="desc" value={post.desc} onChange={(e) => handleChange(e)} />
            <input type='file' accept='image/*' onChange={(e) => handleImage(e)} />

            <button className="h-10 bg-violet-800 rounded-lg" onClick={submit}>Create Post</button>
         </div>
         <div>
            {posts?.map(post => (
               <div>
                  <div>{post.title}</div>
                  <div>{post.author}</div>
                  <div>{post.desc}</div>
                  <img className='w-10 h-10' src={`${photoRoute}/${post._id}`} alt='post' />
               </div>
            ))}
         </div>
      </>
   )
}

export default Post