import { actions } from "../actions"

const initialState={
    loading:false,
    post:[],
    error:null
}
const PostReducer=(state,action)=>{

switch(action.type){
    case actions.post.DATA_FETCHING:{
         return {
            ...state,
            loading:true
         }
    };
    case actions.post["DATA-FETCHED"]:{
        return{
            ...state,
           loading:false,
           post:action.data
        }
    };
    case actions.post["DATA_FETCH-ERROR"]:{
        return{
            ...state,
            loading:false,
            error:action.error
        }
    };
    case actions.post["DATA_CREATED"]:{
        return{
            ...state,
            loading:false,
            post:[
                ...state.post,
                action.data
                

            ]

        }
    };
        case actions.post["POST_DELETED"]:{
        return{
            ...state,
            loading:false,
            post:state.post.filter((item)=>item.id!==action.data)

        }
    };
            case actions.post["DATA_EDITED"]:{
                console.log("Edited Data",action.data)
        return{
            ...state,
            loading:false,
            post:state.post.map((item)=>item.id===action.data.id ? {...item,...action.data} : item)

        }
    };


    default:{
        return state
    }

}


}

export {initialState,PostReducer}