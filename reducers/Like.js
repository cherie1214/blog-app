import * as types from '../actions/ActionTypes';

const initialState = {
  likeStatus: {
      isLiked: false,
      likeCount: 0,
  }
};

export default function like(state = initialState, action) {
    switch(action.type) {

        case types.Like_Add:
            return handleLikeAdd(state, action);

        case types.Like_Remove:
            return handleLikeRemove(state, action);

        case types.Like_Toggle:
            return handleLikeToggle(state, action);

        default:
            return state;
    }
}

function handleLikeAdd(state, action) {
  return {
    likeStatus: {
      isLiked: true,
      likeCount: state.likeStatus.likeCount + 1,
    }
  };
}

function handleLikeRemove(state, action) {
  return {
    likeStatus: {
      isLiked: false,
      likeCount: state.likeStatus.likeCount - 1,
    }
  };
}

export function handleLikeToggle(state, action) {
  const { isLiked } = state.likeStatus.isLiked;  

  if(isLiked) {
    return handleLikeRemove(state, action);
  } else if (!isLiked) {
    return handleLikeAdd(state, action);
  }
}