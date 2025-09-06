import React from 'react'
import PostCard from './PostCard'
function PostList({posts,onEdit}) {
  return (
    <>
    {
        Array.isArray(posts) && posts?.map((item)=>  <PostCard key={item.id} post={item} onEdit={onEdit}/>  )
    }
    
    
    </>
  )
}

export default PostList
