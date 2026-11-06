import Alert from 'react-bootstrap/Alert';
import {useSelector} from 'react-redux'
const DisplayErrors = () => {
    const tabErrors = useSelector(state=> state.ErrorsReducer )
  return (
    <>
    {
        tabErrors.map((er,i,t)=> 
         <Alert  variant='danger' key={i} >
         {
            er.msg
         }
        </Alert>)
    }
    </>
  )
}

export default DisplayErrors