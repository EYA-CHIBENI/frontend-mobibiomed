
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { getallequipments } from '../../Redux/Actions/EquipmentsActions'
import { getalldepartments } from '../../Redux/Actions/DepartmentsActions'
import { addrequest } from '../../Redux/Actions/RequestsActions'

const AddRequest = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { equipments } = useSelector(state => state.EquipmentsReducer)
  const { departments } = useSelector(state => state.DepartmentsReducer)

  const [request, setRequest] = useState({
    title: '',
    description: '',
    requestType: 'corrective',
    equipment: '',
    department: '',
    priority: 'medium',
    impact: 'moderate',
    equipmentAvailable: true,
    preferredInterventionDate: ''
  })

  useEffect(() => {
    dispatch(getallequipments())
    dispatch(getalldepartments())
  }, [dispatch])

  const handleChange = e => {
    const { name, value, type, checked } = e.target

    if (name === 'equipment') {
      const selectedEquipment = equipments.find(item => item._id === value)

      const matchingDepartment = departments.find(
        department => department.name.trim().toLowerCase() ===
          selectedEquipment?.department?.trim().toLowerCase()
      )

      setRequest({
        ...request,
        equipment: value,
        department: matchingDepartment?._id || ''
      })

      return
    }

    setRequest({
      ...request,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const success = await dispatch(addrequest(request))

    if (success) navigate('/Requests')
  }

  return (
    <Container className="add-request-page">
      <div className="add-request-header">
        <h2>Create Maintenance Request</h2>
        <p>Provide the equipment details and describe the maintenance issue.</p>
      </div>

      <div className="add-request-card">
        <Form onSubmit={handleSubmit}>
          <div className="form-section">
            <h5>Request Information</h5>

            <Form.Group className="mb-3">
              <Form.Label>Request Title</Form.Label>
              <Form.Control
                className="request-form-control"
                name="title"
                value={request.title}
                onChange={handleChange}
                placeholder="Enter a short title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                className="request-form-control"
                as="textarea"
                rows={4}
                name="description"
                value={request.description}
                onChange={handleChange}
                placeholder="Describe the problem or maintenance need..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Request Type</Form.Label>
              <Form.Select
                className="request-form-control"
                name="requestType"
                value={request.requestType}
                onChange={handleChange}
              >
                <option value="corrective">Corrective</option>
                <option value="inspection">Inspection</option>
                <option value="preventive">Preventive</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="form-section">
            <h5>Equipment Information</h5>

            <Form.Group className="mb-3">
              <Form.Label>Equipment</Form.Label>
              <Form.Select
                className="request-form-control"
                name="equipment"
                value={request.equipment}
                onChange={handleChange}
                required
              >
                <option value="">Select equipment</option>
                {equipments.map(item => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                className="request-form-control"
                name="department"
                value={request.department}
                disabled={!request.equipment}
                required
              >
                <option value="">Select equipment first</option>
                {departments.map(item => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div className="form-section">
            <h5>Priority and Impact</h5>

            <div className="form-row">
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  className="request-form-control"
                  name="priority"
                  value={request.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Impact</Form.Label>
                <Form.Select
                  className="request-form-control"
                  name="impact"
                  value={request.impact}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </Form.Select>
              </Form.Group>
            </div>

            <Form.Check
              className="equipment-availability-check"
              type="checkbox"
              label="Equipment is currently available"
              name="equipmentAvailable"
              checked={request.equipmentAvailable}
              onChange={handleChange}
            />

            <Form.Group className="mb-3">
              <Form.Label>Preferred Intervention Date</Form.Label>
              <Form.Control
                className="request-form-control"
                type="datetime-local"
                name="preferredInterventionDate"
                value={request.preferredInterventionDate}
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          <div className="add-request-footer">
            <Button className="submit-request-btn" type="submit">
              Submit Request
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default AddRequest
