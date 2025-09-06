import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./../../hooks/useAuth";
import { useProfile } from "./../../hooks/useProfile";
import useAxios from "./../../hooks/useAxios";
import { usePost } from "./../../hooks/usePost";
import { useForm } from "react-hook-form";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import Field from "../common/Field";
import { actions } from "../../actions";
function PostEntry({onCreate,postToUpdate}) {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { axiosInstance } = useAxios();
  const { state: profile } = useProfile();
  const user = profile?.user ?? auth?.user;
  const fileUploadRef=useRef(null)
  const[selectedFile,setSelectedFile]=useState(null)
  const handleSelectedImage=(event)=>{
    if(event.target.files && event.target.files[0]){
      setSelectedFile(event.target.files[0])
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  console.log(postToUpdate,"postToUpdate")

  useEffect(()=>{
    if(postToUpdate){
      reset({
        content:postToUpdate.content,
        image:postToUpdate.image
      })

    }      else{
        reset({
          content:""
        })
      }

  },[postToUpdate,reset])
const isPost=!postToUpdate

const handleImageUpload=(e)=>{
  e.preventDefault()
  fileUploadRef.current.click()
}
  const handlePostSubmit = async(data) => {
    console.log(data);
    const formData=new FormData()
    formData.append("content",data?.content)
    if(selectedFile){
          formData.append("image",selectedFile)

    }


    dispatch({type:actions.post.DATA_FETCHING})
    try {
      let response;
      if(postToUpdate){
        response=await axiosInstance.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${postToUpdate?.id}`,formData)
        if(response?.status===200){
          dispatch({
            type:actions.post["DATA_EDITED"],
            data:response?.data
          })
        }

      }else{
         response=await axiosInstance.post(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`,formData)
      if(response?.status===200){
        dispatch({
          type:actions.post.DATA_CREATED,
          data:response?.data
        })
      }


      }
      onCreate?.()         // close this UI


      
    } catch (error) {
      console.log(error)
      dispatch({
        type:actions.post["DATA_FETCH-ERROR"],
        error:error.message
      })
      
    }
  };
  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        {isPost ?"Create Post" :"Edit Post"}  
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avaimport PostAction from './PostAction';
tar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            for="photo"
            onClick={(e)=>handleImageUpload(e)}
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input 
          type="file" 
          name="image" 
          id="image" 
          className="hidden" 
          ref={fileUploadRef} 
          onChange={handleSelectedImage}
          
          />
        </div>
        <Field error={errors.content}>
          <textarea
          {...register("content",{required:"Adding some text is manadatory!"})}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
                  <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
            <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
              type="submit">
              Post
            </button>
          </div>

      </form>
    </div>
  );
}

export default PostEntry;
