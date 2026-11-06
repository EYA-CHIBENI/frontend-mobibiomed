import { CLEARERROR, HANDLEERROR } from "../ActionsTypes/ErrorsTypes"

export const handleerror=(msg)=>async(dispatch)=>{
var id=Math.random()
dispatch({
    type : HANDLEERROR,
    payload : {msg, id}
})
setTimeout(()=>{
dispatch(
    {
        type : CLEARERROR,
        payload : id
    }
)
}, 3000)
}