import React, { useState } from 'react'
import PostCommentsList from './PostCommentsList'
import useAxios from '../../hooks/useAxios'
import { useAuth } from '../../hooks/useAuth'
function PostComments({post}) {
  const{auth}=useAuth()
  const[showComments,setShowComments]=useState(false)
  const[comments,setComments]=useState(post?.comments)
  const[comment,setComment]=useState("")
  const{axiosInstance}=useAxios()

  const handleComments=()=>{
    setShowComments(!showComments)
  }

  const addComment=async(event)=>{
    const keyCode=event.keyCode
    if(keyCode===13){
          try {
            const response=await axiosInstance.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,{comment})
            if(response?.status===200){
              setComments([...response.data.comments])
            }
      
    } catch (error) {
      console.log(error)
    }


    }
  }
  return (
    <div>
                  <div className="flex-center mb-3 gap-2 lg:gap-4">
              <img
                className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
                alt="avatar"
              />

              <div className="flex-1">
                <input
                  type="text"
                  className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
                  name="post"
                  id="post"
                  placeholder="What's on your mind?"
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                  onKeyDown={(e)=>addComment(e)}
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="text-gray-300 max-md:text-sm" onClick={handleComments}>
                All Comment ▾
              </button>
            </div>
            {
              showComments &&  <PostCommentsList comments={comments}/>

            }

    </div>
  )
}

export default PostComments
