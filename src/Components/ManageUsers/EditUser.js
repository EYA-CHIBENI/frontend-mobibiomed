
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getoneuser, edituser } from '../../Redux/Actions/UsersActions';

const EditUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.UsersReducer.selectedUser)



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        dispatch(getoneuser(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setRole(user.role || '');
        }
    }, [user]);

    const handleEdit = async (e) => {
        e.preventDefault();

        await dispatch(edituser(id, { name, email, role }));
        navigate('/Users');
    };

    return (
        <div className="container mt-4 edit-user-page">
            <div className="edit-user-card">
                <h2 className="edit-user-title">Edit User</h2>

                <Form className="edit-user-form" onSubmit={handleEdit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            className="user-edit-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className="user-edit-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            className="user-edit-input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            type="text"
                        />
                    </Form.Group>

                    <Button className="save-edit-button" variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default EditUser
