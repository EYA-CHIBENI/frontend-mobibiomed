import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from './Redux/Actions/UsersActions';
const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>

            <Button onClick={(e)=>{e.preventDefault(); dispatch(login({email,password}, navigate))}} variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default Login