import React from 'react'

function PostCommentsList({comments}) {
  return (
            <div class="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
             
             {Array.isArray(comments) && comments?.map((item)=> <div class="flex items-center gap-3 pt-4" key={item?.id}>
                <img
                  class="max-w-6 max-h-6 rounded-full"
                  src={`${import.meta.env.VITE_SERVER_BASE_URL}/${item?.author?.avatar}`}
                  alt="avatar"
                />
                <div>
                  <div class="flex gap-1 text-xs lg:text-sm">
                    <span>{item?.author?.name} </span>
                    <span>{item?.comment}</span>
                  </div>
                </div>
              </div> )}

            </div>  )
}

export default PostCommentsList
