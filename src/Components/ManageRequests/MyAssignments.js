import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Spinner, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getmyassignments } from '../../Redux/Actions/RequestsActions'
import RequestCard from './RequestsCard'

const MyAssignments = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { myAssignments, loading } = useSelector(state => state.RequestsReducer)

    useEffect(() => {
        dispatch(getmyassignments())
    }, [dispatch])

    return (
        <Container className="my-4">
            <h2 className="mb-4">My Assigned Tasks</h2>

            {loading && <Spinner animation="border" />}

            {!loading && myAssignments.length === 0 && (
                <Alert variant="info">You don't have any assigned tasks yet.</Alert>
            )}

            {myAssignments.map(request => (
                <RequestCard
                    key={request._id}
                    request={request}
                    onView={() => navigate(`/RequestDetails/${request._id}`)}
                />
            ))}
        </Container>
    )
}

export default MyAssignments