import{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { getonedepartment,updatedepartment} from '../../Redux/Actions/DepartmentsActions'

const EditDepartment = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedDepartment = useSelector(state => state.DepartmentsReducer.selectedDepartment)

  const [department, setDepartment] = useState({
    name: '',
    description: '',
    building: '',
    floor: '',
    contact: ''
  })

  useEffect(() => {
    dispatch(getonedepartment(id))
  }, [dispatch, id])

  useEffect(() => {
    if (selectedDepartment?._id) {
      setDepartment({
        name: selectedDepartment.name || '',
        description: selectedDepartment.description || '',
        building: selectedDepartment.building || '',
        floor: selectedDepartment.floor || '',
        contact: selectedDepartment.contact || ''
      })
    }
  }, [selectedDepartment])

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updatedepartment(id, department))
    navigate('/Departments')
  }

  return (
<div className="container mt-4 edit-department-page">
  <div className="edit-department-card">
    <h2 className="edit-department-title mb-4">Edit Department</h2>

    <Form className="edit-department-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Department Name</Form.Label>
        <Form.Control className="department-input" type="text" name="name" value={department.name} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control className="department-input" as="textarea" rows={3} name="description" value={department.description} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Building</Form.Label>
        <Form.Control className="department-input" type="text" name="building" value={department.building} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Floor</Form.Label>
        <Form.Control className="department-input" type="text" name="floor" value={department.floor} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contact</Form.Label>
        <Form.Control className="department-input" type="text" name="contact" value={department.contact} onChange={handleChange} />
      </Form.Group>

      <div className="edit-form-actions">
        <Button className="save-edit-button" type="submit" variant="primary">Save Changes</Button>
        <Button className="cancel-edit-button ms-2" type="button" variant="secondary" onClick={() => navigate('/Departments')}>Cancel</Button>
      </div>
    </Form>
  </div>
</div>
  )
}

export default EditDepartment