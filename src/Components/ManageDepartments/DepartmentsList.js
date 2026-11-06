import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getalldepartments } from '../../Redux/Actions/DepartmentsActions'
import DepartmentCard from './DepartmentsCard'

const DepartmentsList = () => {
  const dispatch = useDispatch()

  const departments = useSelector(state => state.DepartmentsReducer.departments)

  useEffect(() => {
    dispatch(getalldepartments())
  }, [dispatch])

  return (
    <div className="container mt-4 departments-page">
      <h2 className="departments-page-title mb-4">Manage Departments</h2>

      <div className="row departments-grid">
        {departments && departments.length > 0 ? (
          departments.map(department => (
            <div className="col-md-6 col-lg-4 mb-3" key={department._id}>
              <DepartmentCard department={department} />
            </div>
          ))
        ) : (
          <p className="departments-empty">No departments found.</p>
        )}
      </div>
    </div>
  )
}

export default DepartmentsList
