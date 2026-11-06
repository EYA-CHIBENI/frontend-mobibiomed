
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import { addcomment, getonerequest } from '../../Redux/Actions/RequestsActions'

const RequestComments = ({ requestId, comments }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    if (!message.trim()) return

    setSending(true)
    await dispatch(addcomment(requestId, message))
    await dispatch(getonerequest(requestId))
    setMessage('')
    setSending(false)
  }

  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <h5 className="mb-3">Comments</h5>

        {comments?.length ? comments.map((comment, index) => (
          <div key={comment._id || index} className="border-bottom py-2">
            <strong>{comment.user?.name || 'User'}</strong>
            <p className="mb-1">{comment.message}</p>
            <small className="text-muted">
              {comment.date ? new Date(comment.date).toLocaleString() : ''}
            </small>
          </div>
        )) : <p className="text-muted">No comments yet.</p>}

        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write a comment..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" disabled={sending || !message.trim()}>
            {sending ? 'Sending...' : 'Add Comment'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default RequestComments
