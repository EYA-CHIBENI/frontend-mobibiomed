import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './Redux/Actions/UsersActions'

const NavAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = localStorage.getItem('token')
    const user = useSelector(state => state.UsersReducer.user)

    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar-container">
            <Container fluid>
                <Link to="/" className="mobibiomed-brand">
                    <img src="/mobibiomed-icon.png" alt="MOBIBIOMED" />
                    <span>MOBIBIOMED</span>
                </Link>

                <Nav className="ms-auto align-items-center">
                    <Nav.Link as={Link} to="/" className="home-link">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-label="Home"
                        >
                            <path d="m3 10 9-7 9 7" />
                            <path d="M5 9v12h14V9" />
                            <path d="M9 21v-8h6v8" />
                        </svg>
                    </Nav.Link>

                    {token && user ? (
                        <>
                            <Nav.Link as={Link} to="/Profile">
                                Profile
                            </Nav.Link>

                            <Nav.Link onClick={() => {
                                dispatch(logout())
                                navigate('/')
                            }}>
                                Logout
                            </Nav.Link>
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/Login" className="nav-login">
                            Login
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavAuth
