import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { register } from './Redux/Actions/UsersActions'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(register({ name, email, password }, navigate))
    }

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-header">
                    <div className="register-icon">
                        <i className="bi bi-person-plus-fill"></i>
                    </div>
                    <h2>Create Account</h2>
                    <p>Register a new MOBIBIOMED user</p>
                </div>

                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" className="register-submit">
                        <i className="bi bi-person-plus me-2"></i>
                        Register User
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Register