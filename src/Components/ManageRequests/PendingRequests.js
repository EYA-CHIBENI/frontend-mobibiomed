
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Spinner, Alert, Button } from 'react-bootstrap'
import { getpendingrequests, claimrequest } from '../../Redux/Actions/RequestsActions'
import RequestCard from './RequestsCard'

const PendingRequests = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { pendingRequests, loading } = useSelector(state => state.RequestsReducer)

    useEffect(() => {
        dispatch(getpendingrequests())
    }, [dispatch])

    const handleClaim = async (id) => {
        await dispatch(claimrequest(id))
        dispatch(getpendingrequests())
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Pending Maintenance Requests</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : pendingRequests.length === 0 ? (
                <Alert variant="info">There are no pending maintenance requests.</Alert>
            ) : (
                pendingRequests.map(request => (
                    <div key={request._id}>
                        <RequestCard
                            request={request}
                            onView={request => navigate(`/RequestDetails/${request._id}`)}
                        />

                        <Button
                            variant="primary"
                            className="mb-4"
                            onClick={() => handleClaim(request._id)}
                        >
                            Claim Request
                        </Button>
                    </div>
                ))
            )}
        </Container>
    )
}

export default PendingRequests
