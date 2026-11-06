import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteequipment } from '../../Redux/Actions/EquipmentsActions'
import { FaEdit, FaTrash, FaTools } from 'react-icons/fa'

const EquipmentCard = ({ equipment }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this equipment?')
        if (confirmDelete) dispatch(deleteequipment(equipment._id))
    }

    const statusClass = equipment.status?.toLowerCase().replaceAll('_', '-')

    return (
        <div className="equipment-card">
            <div className="equipment-card-header">
                <div className="equipment-icon">
                    <FaTools />
                </div>
                <span className={`equipment-status status-${statusClass}`}>
                    {equipment.status?.replaceAll('_', ' ')}
                </span>
            </div>

            <div className="equipment-card-body">
                <h5>{equipment.name}</h5>
                <p><strong>Brand:</strong> {equipment.brand}</p>
                <p><strong>Model:</strong> {equipment.model}</p>
                <p><strong>Serial Number:</strong> {equipment.serialNumber}</p>
                <p><strong>Category:</strong> {equipment.category}</p>
                <p><strong>Department:</strong> {equipment.department}</p>
                <p>
                    <strong>Purchase Date:</strong>{' '}
                    {equipment.purchaseDate
                        ? new Date(equipment.purchaseDate).toLocaleDateString()
                        : 'Not specified'}
                </p>
            </div>

            <div className="equipment-card-actions">
                <Button variant="primary" onClick={() => navigate(`/EditEquipment/${equipment._id}`)}>
                    <FaEdit className="me-2" /> Edit
                </Button>

                <Button variant="danger" onClick={handleDelete}>
                    <FaTrash className="me-2" /> Delete
                </Button>
            </div>
        </div>
    )
}

export default EquipmentCard