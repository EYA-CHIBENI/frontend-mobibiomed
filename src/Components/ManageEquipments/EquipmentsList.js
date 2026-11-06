import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getallequipments } from '../../Redux/Actions/EquipmentsActions'
import EquipmentCard from './EquipmentsCard'

const EquipmentsList = () => {
    const dispatch = useDispatch()
    const equipments = useSelector(state => state.EquipmentsReducer.equipments)

    useEffect(() => {
        dispatch(getallequipments())
    }, [dispatch])

    return (
        <div className="equipments-page">
            <div className="equipments-page-header">
                <div>
                    <h2>Manage Equipment</h2>
                    <p>View and manage hospital biomedical equipment.</p>
                </div>
                <span className="equipments-count">
                    {equipments?.length || 0} Equipment
                </span>
            </div>

            <div className="equipments-grid">
                {equipments?.length > 0 ? (
                    equipments.map(equipment => (
                        <EquipmentCard key={equipment._id} equipment={equipment} />
                    ))
                ) : (
                    <div className="equipments-empty">
                        <h5>No equipment found</h5>
                        <p>There is currently no equipment to display.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EquipmentsList