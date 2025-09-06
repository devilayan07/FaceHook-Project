import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { actions } from '../actions'
import PostList from '../components/posts/PostList'
import { usePost } from '../hooks/usePost'
import NewPost from '../components/posts/NewPost'
import PostEntry from './../components/posts/PostEntry'

function HomePage() {
  const {state,dispatch}=usePost()
  const{axiosInstance}=useAxios()
  const[postToUpdate,setPostToUpdate]=useState(null)

  useEffect(()=>{
    const fetchPosts=async()=>{
      dispatch({
        type:actions.post.DATA_FETCHING
      })
      try {
        const response=await axiosInstance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`)
        if(response?.status===200){

          dispatch({
            type:actions.post['DATA-FETCHED'],
            data:response?.data
          })

        }
        
        
      } catch (error) {
        console.error(error)
        dispatch({
          type:actions.post['DATA_FETCH-ERROR'],
          error:error.message
        })
        
      }
    }

    fetchPosts()

  },[])

  const handleEditPost=(post)=>{
    setPostToUpdate(post)


  }

  if(state?.loading){
    return <div>We are working...</div>
  }
  if(state?.error){
    return <div>Error in fetching posts {state?.error?.message}</div>
  }
  return (
    <div>
      <NewPost postToUpdate={postToUpdate} onDone={()=>setPostToUpdate(null)}/>
        <PostList posts={state?.post} onEdit={handleEditPost}/>
    </div>
  )
}

export default HomePage
