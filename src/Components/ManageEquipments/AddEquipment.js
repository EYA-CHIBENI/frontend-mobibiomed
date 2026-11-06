import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addequipment } from '../../Redux/Actions/EquipmentsActions'

const AddEquipment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [equipment, setEquipment] = useState({
    name: '',
    brand: '',
    model: '',
    serialNumber: '',
    category: '',
    department: '',
    status: 'operational',
    purchaseDate: ''
  })

  const handleChange = (e) => {
    setEquipment({
      ...equipment,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addequipment(equipment))
    navigate('/Equipments')
  }

  return (
    <div className="container mt-4 add-equipment-page">
      <Card className="add-equipment-card shadow-sm">
        <Card.Body className="add-equipment-body">
          <h2 className="add-equipment-title mb-4">Add New Equipment</h2>

          <Form className="add-equipment-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Equipment Name</Form.Label>
              <Form.Control className="equipment-input"
                type="text"
                name="name"
                value={equipment.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control className="equipment-input"
                type="text"
                name="brand"
                value={equipment.brand}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control className="equipment-input"
                type="text"
                name="model"
                value={equipment.model}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control className="equipment-input"
                type="text"
                name="serialNumber"
                value={equipment.serialNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control className="equipment-input"
                type="text"
                name="category"
                value={equipment.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control className="equipment-input"
                type="text"
                name="department"
                value={equipment.department}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select className="equipment-input"
                name="status"
                value={equipment.status}
                onChange={handleChange}
              >
                <option value="operational">Operational</option>
                <option value="under_maintenance">Under Maintenance</option>
                <option value="out_of_service">Out of Service</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control className="equipment-input"
                type="date"
                name="purchaseDate"
                value={equipment.purchaseDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Button className="add-equipment-button" type="submit" variant="primary">
              Add Equipment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AddEquipment