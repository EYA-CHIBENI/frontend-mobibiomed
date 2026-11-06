import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Spinner, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getallrequests } from '../../Redux/Actions/RequestsActions'
import RequestCard from './RequestsCard'

const AllRequests = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { allRequests, loading } = useSelector(state => state.RequestsReducer)

    useEffect(() => {
        dispatch(getallrequests())
    }, [dispatch])

    return (
        <Container className="my-4">
            <h2 className="mb-4">All Maintenance Requests</h2>

            {loading && <Spinner animation="border" />}

            {!loading && allRequests.length === 0 && (
                <Alert variant="info">No maintenance requests have been submitted yet.</Alert>
            )}

            {allRequests.map(request => (
                <RequestCard
                    key={request._id}
                    request={request}
                    onView={() => navigate(`/RequestDetails/${request._id}`)}
                />
            ))}
        </Container>
    )
}

export default AllRequests