
import { Card, Badge } from 'react-bootstrap'

const RequestHistory = ({ history }) => {
  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <h5 className="mb-3">Request History</h5>

        {history?.length ? (
          [...history].reverse().map((item, index) => (
            <div key={item._id || index} className="border-bottom py-3">
              <div className="d-flex justify-content-between align-items-center">
                <strong>{item.action?.replaceAll('_', ' ')}</strong>
                <Badge bg="secondary">
                  {item.performedBy?.role || 'System'}
                </Badge>
              </div>

              <p className="mb-1">
                By: {item.performedBy?.name || 'Unknown user'}
              </p>

              {item.note && <p className="text-muted mb-1">{item.note}</p>}

              <small className="text-muted">
                {item.date ? new Date(item.date).toLocaleString() : ''}
              </small>
            </div>
          ))
        ) : (
          <p className="text-muted">No history available.</p>
        )}
      </Card.Body>
    </Card>
  )
}

export default RequestHistory
