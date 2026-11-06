import React from 'react'
import { CLEARERROR, HANDLEERROR } from '../ActionsTypes/ErrorsTypes'
const initialState = []
const ErrorsReducer = (state= initialState , action) => {

        switch (action.type) {
            case HANDLEERROR: return [...state, action.payload]
            case CLEARERROR: return state.filter((el,i,t)=> el.id != action.payload)   
                
        
            default: return state
               
        }
  

}

export default ErrorsReducer