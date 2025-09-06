import { actions } from "./../actions/index";
const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
};
function ProfileReducer(state, action) {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.profile["DATA-FETCHED"]: {
      return {
        ...state,
        loading: false,
        user: action.data.user,
        posts: action.data.posts,
      };
    }

    case actions.profile["DATA_FETCH-ERROR"]: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.profile["USER-DATA_EDITED"]: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }

    case actions.profile["IMAGE_UPDATED"]: {
      return {
        ...state,
        loading: false,
        user: {
            ...state.user,
            avatar:action.data.avatar
        }
      };
    }

    default: {
      return state;
    }
  }
}

export { ProfileReducer, initialState };
