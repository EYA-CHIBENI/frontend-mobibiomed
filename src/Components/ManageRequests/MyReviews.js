import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { getmyreviews } from '../../Redux/Actions/RequestsActions'
import RequestCard from './RequestsCard'

const MyReviews = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { myReviews, loading } = useSelector(state => state.RequestsReducer)

  useEffect(() => {
    dispatch(getmyreviews())
  }, [dispatch])

  return (
    <Container className="mt-4">
      <h2>My Reviews</h2>
      <p className="text-muted">Requests assigned to you for review and follow-up.</p>

      {loading ? (
        <p>Loading reviews...</p>
      ) : myReviews.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        myReviews.map(request => (
          <RequestCard
            key={request._id}
            request={request}
            onView={request => navigate(`/RequestDetails/${request._id}`)}
          />
        ))
      )}
    </Container>
  )
}

export default MyReviews