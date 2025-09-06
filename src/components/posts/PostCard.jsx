import React from 'react'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostAction from './PostAction'
import PostComments from './PostComments'

function PostCard({post,onEdit}) {
  return (
        <article className="card mt-6 lg:mt-8">
    <PostHeader post={post} onEdit={onEdit}/>
    <PostBody poster={post?.image} content={post?.content}/>
    <PostAction post={post} commentCount={post?.comments?.length}/>
    <PostComments post={post}/>
    </article>
  )
}

export default PostCard
