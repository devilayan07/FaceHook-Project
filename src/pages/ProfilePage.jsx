import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import {useProfile} from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPosts from "../components/profile/MyPosts";
function ProfilePage() {
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();
  const { axiosInstance } = useAxios();

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({ type: actions.profile.DATA_FETCHING });
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        if (response?.status === 200) {
          dispatch({
            type: actions.profile["DATA-FETCHED"],
            data: response?.data,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile["DATA_FETCH-ERROR"],
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div>Fetching your Profile data...</div>;
  }
  return (
    <>
    <ProfileInfo/>
    <MyPosts/>
    
    </>
  );
}

export default ProfilePage;
