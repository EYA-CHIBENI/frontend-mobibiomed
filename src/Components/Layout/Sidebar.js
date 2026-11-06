
import { useEffect, useState } from 'react'
import { Nav, Offcanvas, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentuser } from '../../Redux/Actions/UsersActions'

const Sidebar = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const user = useSelector(state => state.UsersReducer.user)
    const [show, setShow] = useState(false)

    useEffect(() => {
        dispatch(currentuser())
    }, [dispatch])

    const menus = {
        admin: [
            
                { name: 'Dashboard', path: '/Dashboard' },
                { name: 'Users', path: '/Users' },
                { name: 'Add User', path: '/Register' },
                { name: 'Equipments', path: '/Equipments' },
                { name: 'Add Equipment', path: '/AddEquipment' },
                { name: 'Departments', path: '/Departments' },
                { name: 'Add Department', path: '/AddDepartment' },
                { name: 'Requests', path: '/AllRequests' }
        ],
        medical_staff: [

            { name: 'My Requests', path: '/Requests' },
            { name: 'Create Request', path: '/AddRequest' }
        ],
        department_manager: [
            { name: 'Dashboard', path: '/Dashboard' },
            { name: 'My Requests', path: '/Requests' },
            { name: 'Create Request', path: '/AddRequest' }
        ],
        maintenance_manager: [
            { name: 'Dashboard', path: '/Dashboard' },
            { name: 'Pending Requests', path: '/PendingRequests' },
            { name: 'My Reviews', path: '/MyReviews' }
        ],
        technician: [
            { name: 'Dashboard', path: '/Dashboard' },
            { name: 'My Assignments', path: '/MyAssignments' }
        ]
    }

    const links = menus[user?.role] || []

    const renderLinks = () => links.map(item => (
        <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            onClick={() => setShow(false)}
            className={location.pathname === item.path ? 'sidebar-link active' : 'sidebar-link'}
        >
            {item.name}
        </Nav.Link>
    ))

    return (
        <>
            <Button className="sidebar-toggle d-lg-none" onClick={() => setShow(true)}>
                ☰ Menu
            </Button>

            <div className="sidebar d-none d-lg-block">
                <Nav className="flex-column">{renderLinks()}</Nav>
            </div>

            <Offcanvas show={show} onHide={() => setShow(false)} >
               <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                    <Nav className="flex-column">{renderLinks()}</Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Sidebar
