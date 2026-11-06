
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {getallusers } from '../../Redux/Actions/UsersActions'
import { getallequipments } from '../../Redux/Actions/EquipmentsActions'
import { getalldepartments } from '../../Redux/Actions/DepartmentsActions'
import { getpendingrequests, getmyreviews, getmyrequests,getallrequests, getmyassignments } from '../../Redux/Actions/RequestsActions'

const Dashboard = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.UsersReducer.user)
    const users = useSelector(state => state.UsersReducer.users)
    const equipments = useSelector(state => state.EquipmentsReducer.equipments)
    const departments = useSelector(state => state.DepartmentsReducer.departments)
    const requests = useSelector(state => state.RequestsReducer.allRequests)
    const myAssignments = useSelector(state => state.RequestsReducer.myAssignments)

useEffect(() => {
    if (user?.role === 'admin') {
        dispatch(getallusers())
        dispatch(getallequipments())
        dispatch(getalldepartments())
        dispatch(getallrequests())
    }

    if (user?.role === 'technician') {
        dispatch(getmyassignments())
    }

    if (user?.role === 'maintenance_manager') {
        dispatch(getpendingrequests())
        dispatch(getmyreviews())
    }
    if (user?.role === 'department_manager') {
    dispatch(getmyrequests())
}
}, [dispatch, user?.role])

    const getStatusCount = status => {
        return requests.filter(request => request.status === status).length
    }

    const getAssignmentCount = status => {
        return myAssignments.filter(request => request.status === status).length
    }
    const pendingRequests = useSelector(state => state.RequestsReducer.pendingRequests)
    const myReviews = useSelector(state => state.RequestsReducer.myReviews)

    const getReviewCount = status => {
    return myReviews.filter(request => request.status === status).length
}
const myRequests = useSelector(state => state.RequestsReducer.myRequests)

const getMyRequestCount = status => {
    return myRequests.filter(request => request.status === status).length
}
    if (!user?.role) {
        return <div className="dashboard-loading">Loading dashboard...</div>
    }

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <p>Here's an overview of your hospital maintenance activities.</p>
                </div>
                <span className="dashboard-role">
                    {user.role.replaceAll('_', ' ')}
                </span>
            </div>

            {/* ADMIN DASHBOARD */}

            {user.role === 'admin' && (
                <div className="dashboard-content">

                    <div className="dashboard-stats">

                        <div className="dashboard-stat-card">
                            <div className="stat-icon">👥</div>
                            <div>
                                <h3>{users.length}</h3>
                                <p>Total Users</p>
                            </div>
                            <Link to="/Users">Manage users</Link>
                        </div>

                        <div className="dashboard-stat-card">
                            <div className="stat-icon">⚕️</div>
                            <div>
                                <h3>{equipments.length}</h3>
                                <p>Total Equipment</p>
                            </div>
                            <Link to="/Equipments">Manage equipment</Link>
                        </div>

                        <div className="dashboard-stat-card">
                            <div className="stat-icon">🏥</div>
                            <div>
                                <h3>{departments.length}</h3>
                                <p>Total Departments</p>
                            </div>
                            <Link to="/Departments">Manage departments</Link>
                        </div>

                        <div className="dashboard-stat-card">
                            <div className="stat-icon">📋</div>
                            <div>
                                <h3>{requests.length}</h3>
                                <p>Total Requests</p>
                            </div>
                            <Link to="/AllRequests">View requests</Link>
                        </div>

                    </div>

                    <div className="dashboard-section">
                        <h3>Maintenance Requests Overview</h3>

                        <div className="request-status-grid">

                            <div className="request-status-card status-pending">
                                <span>Pending</span>
                                <strong>{getStatusCount('pending')}</strong>
                            </div>

                            <div className="request-status-card status-review">
                                <span>Under Review</span>
                                <strong>{getStatusCount('under_review')}</strong>
                            </div>

                            <div className="request-status-card status-approved">
                                <span>Approved</span>
                                <strong>{getStatusCount('approved')}</strong>
                            </div>

                            <div className="request-status-card status-assigned">
                                <span>Assigned</span>
                                <strong>{getStatusCount('assigned')}</strong>
                            </div>

                            <div className="request-status-card status-progress">
                                <span>In Progress</span>
                                <strong>{getStatusCount('in_progress')}</strong>
                            </div>

                            <div className="request-status-card status-completed">
                                <span>Completed</span>
                                <strong>{getStatusCount('completed')}</strong>
                            </div>

                            <div className="request-status-card status-rejected">
                                <span>Rejected</span>
                                <strong>{getStatusCount('rejected')}</strong>
                            </div>

                        </div>
                    </div>

                    <div className="dashboard-section">
                        <h3>Quick Access</h3>

                        <div className="dashboard-quick-links">

                            <Link to="/Register" className="dashboard-action-card">
                                <span>＋</span>
                                <div>
                                    <h4>Add User</h4>
                                    <p>Create a new staff account</p>
                                </div>
                            </Link>

                            <Link to="/AddEquipment" className="dashboard-action-card">
                                <span>＋</span>
                                <div>
                                    <h4>Add Equipment</h4>
                                    <p>Register new biomedical equipment</p>
                                </div>
                            </Link>

                            <Link to="/AddDepartment" className="dashboard-action-card">
                                <span>＋</span>
                                <div>
                                    <h4>Add Department</h4>
                                    <p>Register a hospital department</p>
                                </div>
                            </Link>

                            <Link to="/AllRequests" className="dashboard-action-card">
                                <span>→</span>
                                <div>
                                    <h4>All Requests</h4>
                                    <p>Inspect maintenance requests</p>
                                </div>
                            </Link>

                        </div>
                    </div>

                </div>
            )}

            {/* TECHNICIAN DASHBOARD */}

            {user.role === 'technician' && (
                <div className="dashboard-content">

                    <p className="technician-welcome">
                        Here's an overview of your assigned maintenance work.
                    </p>

                    <div className="dashboard-stats">

                        <div className="dashboard-stat-card">
                            <div className="stat-icon">📋</div>
                            <div>
                                <h3>{myAssignments.length}</h3>
                                <p>Total Assignments</p>
                            </div>
                            <Link to="/MyAssignments">View assignments</Link>
                        </div>

                        <div className="dashboard-stat-card">
                            <div className="stat-icon">⏳</div>
                            <div>
                                <h3>{getAssignmentCount('assigned')}</h3>
                                <p>Waiting to Start</p>
                            </div>
                        </div>

                        <div className="dashboard-stat-card">
                            <div className="stat-icon">🔧</div>
                            <div>
                                <h3>{getAssignmentCount('in_progress')}</h3>
                                <p>In Progress</p>
                            </div>
                        </div>

                        <div className="dashboard-stat-card">
                            <div className="stat-icon">✓</div>
                            <div>
                                <h3>{getAssignmentCount('completed')}</h3>
                                <p>Completed</p>
                            </div>
                        </div>

                    </div>

                    <div className="dashboard-section">
                        <h3>My Maintenance Work</h3>

                        {myAssignments.length === 0 ? (
                            <p className="dashboard-empty">
                                You don't have any assigned maintenance requests yet.
                            </p>
                        ) : (
                            <div className="technician-assignments">

                                {myAssignments.slice(0, 5).map(request => (
                                    <div className="technician-assignment-card" key={request._id}>

                                        <div>
                                            <h4>
                                                {request.equipment?.name || 'Maintenance Request'}
                                            </h4>

                                            <p>
                                                {request.description}
                                            </p>

                                            <span className={`assignment-status assignment-${request.status}`}>
                                                {request.status?.replaceAll('_', ' ')}
                                            </span>
                                        </div>

                                        <Link to={`/RequestDetails/${request._id}`}>
                                            View Details
                                        </Link>

                                    </div>
                                ))}

                            </div>
                        )}

                        <Link to="/MyAssignments" className="dashboard-view-all">
                            View all my assignments →
                        </Link>
                    </div>

                </div>
            )}

       {/* MAINTENANCE MANAGER DASHBOARD */}

{user.role === 'maintenance_manager' && (
    <div className="dashboard-content">

        <p className="technician-welcome">
            Monitor maintenance requests, manage reviews and follow intervention progress.
        </p>

        <div className="dashboard-stats">

            <div className="dashboard-stat-card">
                <div className="stat-icon">📥</div>
                <div>
                    <h3>{pendingRequests.length}</h3>
                    <p>Pending Requests</p>
                </div>
                <Link to="/PendingRequests">View pending</Link>
            </div>

            <div className="dashboard-stat-card">
                <div className="stat-icon">📋</div>
                <div>
                    <h3>{myReviews.length}</h3>
                    <p>My Reviews</p>
                </div>
                <Link to="/MyReviews">View reviews</Link>
            </div>

            <div className="dashboard-stat-card">
                <div className="stat-icon">✓</div>
                <div>
                    <h3>{getReviewCount('approved')}</h3>
                    <p>Approved Requests</p>
                </div>
            </div>

            <div className="dashboard-stat-card">
                <div className="stat-icon">✕</div>
                <div>
                    <h3>{getReviewCount('rejected')}</h3>
                    <p>Rejected Requests</p>
                </div>
            </div>

        </div>

        <div className="dashboard-section">
            <h3>My Maintenance Reviews</h3>

            {myReviews.length === 0 ? (
                <p className="dashboard-empty">
                    You don't have any requests under your review yet.
                </p>
            ) : (
                <div className="technician-assignments">

                    {myReviews.slice(0, 5).map(request => (
                        <div className="technician-assignment-card" key={request._id}>

                            <div>
                                <h4>
                                    {request.equipment?.name || 'Maintenance Request'}
                                </h4>

                                <p>{request.description}</p>

                                <span className={`assignment-status assignment-${request.status}`}>
                                    {request.status?.replaceAll('_', ' ')}
                                </span>
                            </div>

                            <Link to={`/RequestDetails/${request._id}`}>
                                View Details
                            </Link>

                        </div>
                    ))}

                </div>
            )}

            <Link to="/MyReviews" className="dashboard-view-all">
                View all my reviews →
            </Link>
        </div>

        <div className="dashboard-section">
            <h3>Pending Requests</h3>

            {pendingRequests.length === 0 ? (
                <p className="dashboard-empty">
                    There are no pending requests at the moment.
                </p>
            ) : (
                <div className="technician-assignments">

                    {pendingRequests.slice(0, 5).map(request => (
                        <div className="technician-assignment-card" key={request._id}>

                            <div>
                                <h4>
                                    {request.equipment?.name || 'Maintenance Request'}
                                </h4>

                                <p>{request.description}</p>

                                <span className="assignment-status">
                                    Pending
                                </span>
                            </div>

                            <Link to={`/RequestDetails/${request._id}`}>
                                View Details
                            </Link>

                        </div>
                    ))}

                </div>
            )}

            <Link to="/PendingRequests" className="dashboard-view-all">
                View all pending requests →
            </Link>
        </div>

    </div>
)}
{/* DEPARTMENT MANAGER DASHBOARD */}

{user.role === 'department_manager' && (
    <div className="dashboard-content">

        <p className="technician-welcome">
            Monitor maintenance requests and follow the maintenance activities of your department.
        </p>

        <div className="dashboard-stats">

            <div className="dashboard-stat-card">
                <div className="stat-icon">📋</div>
                <div>
                    <h3>{myRequests.length}</h3>
                    <p>Total My Requests</p>
                </div>
                <Link to="/MyRequests">View requests</Link>
            </div>

            <div className="dashboard-stat-card">
                <div className="stat-icon">⏳</div>
                <div>
                    <h3>{getMyRequestCount('pending')}</h3>
                    <p>Pending Requests</p>
                </div>
            </div>

            <div className="dashboard-stat-card">
                <div className="stat-icon">🔍</div>
                <div>
                    <h3>{getMyRequestCount('under_review')}</h3>
                    <p>Under Review</p>
                </div>
            </div>

            <div className="dashboard-stat-card">
                <div className="stat-icon">✓</div>
                <div>
                    <h3>{getMyRequestCount('completed')}</h3>
                    <p>Completed Requests</p>
                </div>
            </div>

        </div>

        <div className="dashboard-section">
            <h3>My Recent Maintenance Requests</h3>

            {myRequests.length === 0 ? (
                <p className="dashboard-empty">
                    You haven't created any maintenance requests yet.
                </p>
            ) : (
                <div className="technician-assignments">

                    {myRequests.slice(0, 5).map(request => (
                        <div className="technician-assignment-card" key={request._id}>

                            <div>
                                <h4>
                                    {request.equipment?.name || 'Maintenance Request'}
                                </h4>

                                <p>{request.description}</p>

                                <span className={`assignment-status assignment-${request.status}`}>
                                    {request.status?.replaceAll('_', ' ')}
                                </span>
                            </div>

                            <Link to={`/RequestDetails/${request._id}`}>
                                View Details
                            </Link>

                        </div>
                    ))}

                </div>
            )}

            <Link to="/MyRequests" className="dashboard-view-all">
                View all my requests →
            </Link>
        </div>

        <div className="dashboard-section">
            <h3>Create a Maintenance Request</h3>

            <p className="dashboard-empty">
                Report biomedical equipment problems in your department.
            </p>

            <Link to="/AddRequest" className="dashboard-action-card">
                <span>＋</span>
                <div>
                    <h4>Create New Request</h4>
                    <p>Submit a maintenance request</p>
                </div>
            </Link>
        </div>

    </div>
)}

        </div>
    )
}

export default Dashboard
