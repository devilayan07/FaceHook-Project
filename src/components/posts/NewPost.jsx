import React,{useEffect, useState} from 'react'
import PostEntry from './PostEntry'
import { useAuth } from '../../hooks/useAuth'

function NewPost({postToUpdate,onDone}) {
    const[showPostEntry,setShowPostEntry]=useState(false)
    const{auth}=useAuth()
    useEffect(()=>{
      if(postToUpdate){
        setShowPostEntry(true)
      }

    },[postToUpdate])

    const handleClose=()=>{
       setShowPostEntry(false)
       onDone?.()
    }
  return (
    <>
           {showPostEntry ? (<PostEntry onCreate={handleClose} postToUpdate={postToUpdate}/>) :( <div className="card">
        <div className="flex-center mb-3 gap-2 lg:gap-4">
          <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`} alt="avatar" />

          <div className="flex-1">
            <textarea className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6" name="post"
              id="post" placeholder="What's on your mind?" onClick={()=>setShowPostEntry(true)}></textarea>
          </div>
        </div>
      </div> )}     

    </>
  )
}

export default NewPost
