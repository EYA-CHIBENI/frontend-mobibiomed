
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentuser } from './Redux/Actions/UsersActions'

const Profile = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(currentuser())
  }, [dispatch])
  const user = useSelector(state => state.UsersReducer.user)
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h2>My Profile</h2>
          <p>Your personal account information</p>
        </div>

        <div className="profile-details">
          <div className="profile-info">
            <span className="profile-label">Full Name</span>
            <span className="profile-value">{user.name}</span>
          </div>

          <div className="profile-info">
            <span className="profile-label">Email Address</span>
            <span className="profile-value">{user.email}</span>
          </div>

          <div className="profile-info">
            <span className="profile-label">Role</span>
            <span className="profile-role">
              {user.role?.replaceAll('_', ' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
