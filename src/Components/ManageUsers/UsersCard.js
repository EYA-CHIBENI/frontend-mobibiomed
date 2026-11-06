import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import { deleteuser } from '../../Redux/Actions/UsersActions'

const UsersCard = ({ user }) => {
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?')
        if (confirmDelete) dispatch(deleteuser(id))
    }

    return (
        <div className="user-card">
            <div className="user-card-header">
                <div className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className={`user-role role-${user.role}`}>
                    {user.role?.replace('_', ' ')}
                </span>
            </div>

            <div className="user-card-body">
                <h5>{user.name}</h5>
                <p className="user-email">{user.email}</p>
            </div>

            <div className="user-card-actions">
                <Link to={`/EditUser/${user._id}`} className="btn btn-primary">
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit
                </Link>

                <Button variant="danger" onClick={() => handleDelete(user._id)}>
                    <i className="bi bi-trash-fill me-2"></i>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default UsersCard