import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { deletedepartment } from '../../Redux/Actions/DepartmentsActions'

const DepartmentCard = ({ department }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      dispatch(deletedepartment(department._id))
    }
  }

  return (
    <Card className="department-card h-100">
      <Card.Body className="department-card-body">
        <Card.Title className="department-card-title">{department.name}</Card.Title>
        <Card.Text className="department-card-text">
          <strong>Description:</strong> {department.description || 'N/A'}<br />
          <strong>Building:</strong> {department.building || 'N/A'}<br />
          <strong>Floor:</strong> {department.floor || 'N/A'}<br />
          <strong>Manager:</strong> {department.manager?.name || 'Not assigned'}<br />
          <strong>Contact:</strong> {department.contact || 'N/A'}
        </Card.Text>

        <div className="department-card-actions">
          <Button variant="primary" className="department-edit-button me-2" onClick={() => navigate(`/EditDepartment/${department._id}`)}>
            <FaEdit /> Edit
          </Button>

          <Button variant="danger" className="department-delete-button" onClick={handleDelete}>
            <FaTrash /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default DepartmentCard