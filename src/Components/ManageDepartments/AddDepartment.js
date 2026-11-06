import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { adddepartment } from '../../Redux/Actions/DepartmentsActions'

const AddDepartment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [department, setDepartment] = useState({
    name: '',
    description: '',
    building: '',
    floor: '',
    contact: ''
  })

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(adddepartment(department))
    navigate('/Departments')
  }

  return (
    <div className="container mt-4 add-department-page">
      <div className="add-department-card">
        <h2 className="add-department-title mb-4">Add Department</h2>

        <Form className="add-department-form" onSubmit={handleSubmit}>
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

          <div className="department-form-actions">
            <Button className="add-department-button" type="submit" variant="primary">Add Department</Button>
            <Button className="cancel-department-button ms-2" type="button" variant="secondary" onClick={() => navigate('/Departments')}>Cancel</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddDepartment