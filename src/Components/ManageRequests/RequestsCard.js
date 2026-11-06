
import { Card, Badge, Button } from 'react-bootstrap'

const RequestCard = ({ request, onView }) => {
  return (
    <Card className="request-card shadow-sm">
      <Card.Body>
        <div className="request-card-header">
          <div>
            <Card.Title className="request-card-title">
              {request.title}
            </Card.Title>

            <Card.Subtitle className="request-card-equipment">
              {request.equipment?.name}
            </Card.Subtitle>
          </div>

          <Badge className={`request-status-badge request-status-${request.status}`} bg={
            request.status === 'completed' ? 'success' :
            request.status === 'rejected' ? 'danger' :
            request.status === 'pending' ? 'warning' : 'primary'
          }>
            {request.status?.replace('_', ' ')}
          </Badge>
        </div>

        <Card.Text className="request-card-description">
          {request.description}
        </Card.Text>

        <div className="request-info">
          <div className="request-info-item">
            <span>Priority</span>
            <strong>{request.priority}</strong>
          </div>

          <div className="request-info-item">
            <span>Department</span>
            <strong>{request.department?.name}</strong>
          </div>

          <div className="request-info-item">
            <span>Type</span>
            <strong>{request.requestType}</strong>
          </div>
        </div>

        <div className="request-card-footer">
          <Button
            className="request-view-btn"
            variant="outline-primary"
            size="sm"
            onClick={() => onView(request)}
          >
            View details
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default RequestCard
