import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getallusers } from '../../Redux/Actions/UsersActions'
import UsersCard from './UsersCard'

const UsersList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.UsersReducer.users)

    useEffect(() => {
        dispatch(getallusers())
    }, [dispatch])

    return (
        <div className="users-page">
            <div className="users-page-header">
                <div>
                    <h2>Manage Users</h2>
                    <p>View and manage MOBIBIOMED users.</p>
                </div>
                <span className="users-count">
                    {users?.length || 0} Users
                </span>
            </div>

            <div className="users-grid">
                {users?.length > 0 ? (
                    users.map(user => (
                        <UsersCard key={user._id} user={user} />
                    ))
                ) : (
                    <div className="users-empty">
                        <h5>No users found</h5>
                        <p>There are currently no users to display.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UsersList