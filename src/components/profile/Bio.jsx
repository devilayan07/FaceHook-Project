import React,{useState} from "react";
import { useProfile } from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg"
import CheckIcon from "../../assets/icons/check.svg"
import useAxios from './../../hooks/useAxios';
import { actions } from "../../actions";
function Bio() {
  const { state,dispatch } = useProfile();
  const[bio,setBio]=useState(state?.user?.bio)
  const[editMode,setEditMode]=useState(false)
  const{axiosInstance}=useAxios()

  const handleBioEdit=async()=>{
    dispatch({ type: actions.profile.DATA_FETCHING });

     try {
      const response=await axiosInstance.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,{bio})
      if(response?.status===200){
        dispatch({type:actions.profile["USER-DATA_EDITED"],data:response?.data})
      }
      setEditMode(false)
      
     } catch (error) {
       dispatch({type:actions.profile["DATA_FETCH-ERROR"],error:error?.message})
      
     }
  }
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {editMode ? <textarea value={bio} rows={4} cols={55} className="p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md" onChange={(e)=>setBio(e.target.value)} /> :<p className="leading-[188%] text-gray-400 lg:text-lg">{state?.user?.bio}</p>
}
      </div>
      {
        editMode ? (             <button class="flex-center h-7 w-7 rounded-full" onClick={handleBioEdit}>
              <img src={CheckIcon} alt="Check" />
            </button>
 ) :(<button class="flex-center h-7 w-7 rounded-full">
              <img src={EditIcon} alt="Edit" onClick={()=>setEditMode(true)} />
            </button>
)
      }
            

    </div>
  );
}

export default Bio;
