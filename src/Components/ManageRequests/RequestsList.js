
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Spinner, Alert } from 'react-bootstrap'
import { getmyrequests } from '../../Redux/Actions/RequestsActions'
import RequestCard from './RequestsCard'

const RequestsList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { myRequests, loading } = useSelector(state => state.RequestsReducer)

  useEffect(() => {
    dispatch(getmyrequests())
  }, [dispatch])

  return (
    <Container className="requests-list-page">
      <div className="requests-list-header">
        <div>
          <h2>My Maintenance Requests</h2>
          <p>Track and manage your submitted maintenance requests.</p>
        </div>
      </div>

      {loading ? (
        <div className="requests-list-loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : myRequests.length === 0 ? (
        <Alert variant="info" className="requests-empty">
          You haven't submitted any maintenance requests yet.
        </Alert>
      ) : (
        <div className="requests-list-content">
          {myRequests.map(request => (
            <RequestCard
              key={request._id}
              request={request}
              onView={request => navigate(`/RequestDetails/${request._id}`)}
            />
          ))}
        </div>
      )}
    </Container>
  )
}

export default RequestsList
