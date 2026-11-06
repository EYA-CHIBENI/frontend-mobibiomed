
import  { useEffect, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getoneequipment,
  updateequipment
} from '../../Redux/Actions/EquipmentsActions'

const EditEquipment = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedEquipment = useSelector(
    state => state.EquipmentsReducer.selectedEquipment
  )

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

  useEffect(() => {
    dispatch(getoneequipment(id))
  }, [dispatch, id])

  useEffect(() => {
    if (selectedEquipment && selectedEquipment._id === id) {
      setEquipment({
        name: selectedEquipment.name || '',
        brand: selectedEquipment.brand || '',
        model: selectedEquipment.model || '',
        serialNumber: selectedEquipment.serialNumber || '',
        category: selectedEquipment.category || '',
        department: selectedEquipment.department || '',
        status: selectedEquipment.status || 'operational',
        purchaseDate: selectedEquipment.purchaseDate
          ? new Date(selectedEquipment.purchaseDate).toISOString().split('T')[0]
          : ''
      })
    }
  }, [selectedEquipment, id])

  const handleChange = (e) => {
    setEquipment({
      ...equipment,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateequipment(id, equipment))
    navigate('/Equipments')
  }

  if (!selectedEquipment || selectedEquipment._id !== id) {
    return <p className="container mt-4">Loading equipment...</p>
  }

  return (
   <div className="container mt-4 edit-equipment-page">
  <Card className="edit-equipment-card shadow-sm">
    <Card.Body className="edit-equipment-body">
      <h2 className="edit-equipment-title mb-4">Edit Equipment</h2>

      <Form className="edit-equipment-form" onSubmit={handleSubmit}>
        {[
          { name: 'name', label: 'Equipment Name' },
          { name: 'brand', label: 'Brand' },
          { name: 'model', label: 'Model' },
          { name: 'serialNumber', label: 'Serial Number' },
          { name: 'category', label: 'Category' },
          { name: 'department', label: 'Department' }
        ].map(field => (
          <Form.Group className="mb-3" key={field.name}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              className="equipment-input"
              type="text"
              name={field.name}
              value={equipment[field.name]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            className="equipment-input"
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
          <Form.Control
            className="equipment-input"
            type="date"
            name="purchaseDate"
            value={equipment.purchaseDate}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="edit-form-actions">
          <Button className="save-edit-button" type="submit" variant="primary">
            Save Changes
          </Button>

          <Button
            className="cancel-edit-button ms-2"
            type="button"
            variant="secondary"
            onClick={() => navigate('/Equipments')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Card.Body>
  </Card>
</div>
  )
}

export default EditEquipment
