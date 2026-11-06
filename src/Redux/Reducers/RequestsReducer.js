import {
  GET_MY_REQUESTS,
  GET_PENDING_REQUESTS,
  GET_ONE_REQUEST,
  ADD_REQUEST,
  UPDATE_REQUEST,
  REQUESTS_LOADING,
  GET_MY_REVIEWS,
  GET_MY_ASSIGNMENTS,
  GET_ALL_REQUESTS
} from '../ActionsTypes/RequestsActionsTypes'

const initialState = {
  myRequests: [],
  pendingRequests: [],
  myReviews: [],
  selectedRequest: null,
  myAssignments: [],
  allRequests: [],
  loading: false,
}

const RequestsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUESTS_LOADING:
      return { ...state, loading: payload }

    case GET_MY_REQUESTS:
      return { ...state, myRequests: payload, loading: false }

    case GET_PENDING_REQUESTS:
      return { ...state, pendingRequests: payload, loading: false }

    case GET_ONE_REQUEST:
      return { ...state, selectedRequest: payload, loading: false }

    case ADD_REQUEST:
      return {
        ...state,
        myRequests: [payload, ...state.myRequests],
        loading: false
      }

    case UPDATE_REQUEST:
      return {
        ...state,
        myRequests: state.myRequests.map(request =>
          request._id === payload._id ? payload : request
        ),
        pendingRequests: state.pendingRequests.map(request =>
          request._id === payload._id ? payload : request
        ),
        selectedRequest: state.selectedRequest?._id === payload._id
          ? payload
          : state.selectedRequest,
        loading: false
      }

    case GET_MY_REVIEWS:
      return {...state,myReviews: payload,loading: false}

      case GET_MY_ASSIGNMENTS:
    return { ...state, myAssignments: payload, loading: false }

    case GET_ALL_REQUESTS:
    return {...state,allRequests: payload}

    default:
      return state
  }
}

export default RequestsReducer