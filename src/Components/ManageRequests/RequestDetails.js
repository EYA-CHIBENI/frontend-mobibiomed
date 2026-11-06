

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Card, Badge, Spinner, Alert, Button, Form, Modal } from 'react-bootstrap'
import { approverequest, assigntechnician, completeintervention, getonerequest, rejectrequest, schedulerequest, startintervention } from '../../Redux/Actions/RequestsActions'
import RequestComments from './RequestComments'
import RequestHistory from './RequestsHistory'
import { getallusers } from '../../Redux/Actions/UsersActions'

const RequestDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { selectedRequest, loading } = useSelector(state => state.RequestsReducer)
    const user = useSelector(state => state.UsersReducer.user)

    useEffect(() => {
        dispatch(getonerequest(id))
    }, [dispatch, id])

    const [showReject, setShowReject] = useState(false)
    const [rejectionReason, setRejectionReason] = useState('')

    const handleReject = async () => {
        if (!rejectionReason.trim()) return

        const success = await dispatch(rejectrequest(selectedRequest._id, rejectionReason))

        if (success) {
            setShowReject(false)
            setRejectionReason('')
            dispatch(getonerequest(id))
        }
    }

    const [showSchedule, setShowSchedule] = useState(false)
    const [expectedStartDate, setExpectedStartDate] = useState('')
    const [expectedDuration, setExpectedDuration] = useState('')

    const handleSchedule = async () => {
        if (!expectedStartDate || Number(expectedDuration) <= 0) return

        const success = await dispatch(schedulerequest(selectedRequest._id, {
            expectedStartDate,
            expectedDuration: Number(expectedDuration)
        }))

        if (success) {
            setShowSchedule(false)
            setExpectedStartDate('')
            setExpectedDuration('')
            dispatch(getonerequest(id))
        }
    }

    const users = useSelector(state => state.UsersReducer.users)

    const technicians = users.filter(
        user => user.role === 'technician' && user.isActive
    )

    useEffect(() => {
        if (user?.role === 'maintenance_manager') {
            dispatch(getallusers())
        }
    }, [dispatch, user?.role])

    const [selectedTechnician, setSelectedTechnician] = useState('')
    const [showAssign, setShowAssign] = useState(false)

    const handleAssign = async () => {
        const success = await dispatch(assigntechnician(selectedRequest._id, selectedTechnician))

        if (success) {
            setShowAssign(false)
            setSelectedTechnician('')
            dispatch(getonerequest(id))
        }
    }

    const handleStart = async () => {
        const success = await dispatch(startintervention(selectedRequest._id))

        if (success) {
            dispatch(getonerequest(id))
        }
    }

    const [showComplete, setShowComplete] = useState(false)
    const [interventionReport, setInterventionReport] = useState('')

    const handleComplete = async () => {
        const success = await dispatch(completeintervention(selectedRequest._id, interventionReport))

        if (success) {
            setShowComplete(false)
            setInterventionReport('')
            dispatch(getonerequest(id))
        }
    }

    const getLocalDateTime = () => {
        const date = new Date()
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
        return date.toISOString().slice(0, 16)
    }

    const minDateTime = getLocalDateTime()

    if (loading) {
        return <div className="request-details-loading"><Spinner animation="border" /></div>
    }

    if (!selectedRequest || selectedRequest._id !== id) {
        return (
            <Container className="request-details-page">
                <Alert variant="info">Request not found or unavailable.</Alert>
            </Container>
        )
    }

    return (
        <Container className="request-details-page">
            <Card className="request-details-main-card">
                <Card.Body>
                    <div className="request-details-header">
                        <div>
                            <span className="request-details-label">MAINTENANCE REQUEST</span>
                            <Card.Title className="request-details-title">
                                {selectedRequest.title}
                            </Card.Title>
                            <p className="request-details-subtitle">
                                Equipment: {selectedRequest.equipment?.name}
                            </p>
                        </div>

                        <Badge className={`request-details-status status-${selectedRequest.status}`} bg="primary">
                            {selectedRequest.status?.replace('_', ' ')}
                        </Badge>
                    </div>

                    <div className="request-details-section">
                        <h5>Request Information</h5>

                        <div className="request-details-grid">
                            <div className="request-detail-item request-detail-full">
                                <span>Description</span>
                                <p>{selectedRequest.description}</p>
                            </div>

                            <div className="request-detail-item">
                                <span>Request Type</span>
                                <p>{selectedRequest.requestType}</p>
                            </div>

                            <div className="request-detail-item">
                                <span>Priority</span>
                                <p>{selectedRequest.priority}</p>
                            </div>

                            <div className="request-detail-item">
                                <span>Impact</span>
                                <p>{selectedRequest.impact}</p>
                            </div>

                            <div className="request-detail-item">
                                <span>Equipment Available</span>
                                <p>{selectedRequest.equipmentAvailable ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="request-details-section">
                        <h5>Equipment & Department</h5>

                        <div className="request-details-grid">
                            <div className="request-detail-item">
                                <span>Equipment</span>
                                <p>{selectedRequest.equipment?.name}</p>
                            </div>

                            <div className="request-detail-item">
                                <span>Department</span>
                                <p>{selectedRequest.department?.name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="request-details-section">
                        <h5>People Involved</h5>

                        <div className="request-details-grid">
                            <div className="request-detail-item">
                                <span>Requested By</span>
                                <p>{selectedRequest.createdBy?.name}</p>
                            </div>

                            <div className="request-detail-item">
                                <span>Reviewed By</span>
                                <p>{selectedRequest.reviewedBy?.name || 'Not assigned yet'}</p>
                            </div>

                            <div className="request-detail-item">
                                <span>Technician</span>
                                <p>{selectedRequest.assignedTo?.name || 'Not assigned yet'}</p>
                            </div>
                        </div>
                    </div>

                    {selectedRequest.rejectionReason && (
                        <Alert variant="danger" className="request-details-alert">
                            <strong>Rejection Reason:</strong> {selectedRequest.rejectionReason}
                        </Alert>
                    )}

                    {selectedRequest.interventionReport && (
                        <div className="request-details-section">
                            <h5>Intervention Report</h5>
                            <div className="request-intervention-report">
                                {selectedRequest.interventionReport}
                            </div>
                        </div>
                    )}

                    <div className="request-details-actions">
                        <h5>Available Actions</h5>

                        <div className="request-action-buttons">
                            {user?.role === 'maintenance_manager' &&
                                selectedRequest.status === 'under_review' &&
                                selectedRequest.reviewedBy?._id === user._id && (
                                    <Button
                                        variant="success"
                                        onClick={() => dispatch(approverequest(selectedRequest._id))}
                                    >
                                        Approve Request
                                    </Button>
                                )}

                            {user?.role === 'maintenance_manager' &&
                                selectedRequest.status === 'under_review' &&
                                selectedRequest.reviewedBy?._id === user._id && (
                                    <Button variant="danger" onClick={() => setShowReject(true)}>
                                        Reject Request
                                    </Button>
                                )}

                            {user?.role === 'maintenance_manager' &&
                                selectedRequest.status === 'approved' &&
                                selectedRequest.reviewedBy?._id === user._id &&
                                !selectedRequest.expectedStartDate && (
                                    <Button variant="primary" onClick={() => setShowSchedule(true)}>
                                        Schedule Request
                                    </Button>
                                )}

                            {user?.role === 'maintenance_manager' &&
                                selectedRequest.status === 'approved' &&
                                selectedRequest.reviewedBy?._id === user._id &&
                                selectedRequest.expectedStartDate && (
                                    <Button variant="success" onClick={() => setShowAssign(true)}>
                                        Assign Technician
                                    </Button>
                                )}

                            {user?.role === 'technician' &&
                                selectedRequest.status === 'assigned' &&
                                selectedRequest.assignedTo?._id === user._id && (
                                    <Button variant="success" onClick={handleStart}>
                                        Start Intervention
                                    </Button>
                                )}

                            {user?.role === 'technician' &&
                                selectedRequest.status === 'in_progress' &&
                                selectedRequest.assignedTo?._id === user._id && (
                                    <Button variant="primary" onClick={() => setShowComplete(true)}>
                                        Complete Intervention
                                    </Button>
                                )}
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showReject} onHide={() => setShowReject(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Reject Maintenance Request</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Reason for rejection</Form.Label>
                        <Form.Control
                            className="request-modal-control"
                            as="textarea"
                            rows={4}
                            value={rejectionReason}
                            onChange={e => setRejectionReason(e.target.value)}
                            placeholder="Explain why this request is being rejected..."
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReject(false)}>
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={handleReject}
                        disabled={!rejectionReason.trim()}
                    >
                        Confirm Rejection
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSchedule} onHide={() => setShowSchedule(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Schedule Maintenance</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Expected Start Date</Form.Label>
                        <Form.Control
                            className="request-modal-control"
                            type="datetime-local"
                            value={expectedStartDate}
                            onChange={e => setExpectedStartDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Expected Duration (hours)</Form.Label>
                        <Form.Control
                            className="request-modal-control"
                            type="datetime-local"
                            min={minDateTime}
                            step="0.5"
                            value={expectedDuration}
                            onChange={e => setExpectedDuration(e.target.value)}
                            placeholder="Enter estimated hours"
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSchedule(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSchedule}
                        disabled={!expectedStartDate || !expectedDuration || Number(expectedDuration) <= 0}
                    >
                        Confirm Schedule
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAssign} onHide={() => setShowAssign(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Technician</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Technician</Form.Label>
                        <Form.Select
                            className="request-modal-control"
                            value={selectedTechnician}
                            onChange={e => setSelectedTechnician(e.target.value)}
                        >
                            <option value="">Choose a technician</option>

                            {technicians.map(technician => (
                                <option key={technician._id} value={technician._id}>
                                    {technician.name} - {technician.email}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {technicians.length === 0 && (
                        <Alert variant="warning" className="mt-3">
                            No active technicians available.
                        </Alert>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAssign(false)}>
                        Cancel
                    </Button>

                    <Button variant="success" disabled={!selectedTechnician} onClick={handleAssign}>
                        Confirm Assignment
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showComplete} onHide={() => setShowComplete(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Complete Intervention</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Intervention Report</Form.Label>
                        <Form.Control
                            className="request-modal-control"
                            as="textarea"
                            rows={5}
                            value={interventionReport}
                            onChange={e => setInterventionReport(e.target.value)}
                            placeholder="Describe the maintenance work performed..."
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowComplete(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" disabled={!interventionReport.trim()} onClick={handleComplete}>
                        Submit Report
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="request-details-extra">
                <RequestComments
                    requestId={selectedRequest._id}
                    comments={selectedRequest.comments}
                />

                <RequestHistory history={selectedRequest.history} />
            </div>
        </Container>
    )
}

export default RequestDetails
