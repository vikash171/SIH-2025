import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onCardClick, isExpanded }) => {
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'school': return '🏫';
      case 'open': return '🌍';
      case 'team': return '👥';
      default: return '📅';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'school': return '#4F46E5';
      case 'open': return '#10B981';
      case 'team': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleJoinClick = (e) => {
    e.stopPropagation();
    // Handle join/leave logic here
    console.log(`${event.isJoined ? 'Leaving' : 'Joining'} event: ${event.title}`);
  };

  return (
    <div
      className={`event-card ${isExpanded ? 'expanded' : ''}`}
      onClick={() => onCardClick(event.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onCardClick(event.id)}
    >
      <div className="event-header">
        <div
          className="event-type-badge"
          style={{ backgroundColor: getEventTypeColor(event.type) }}
        >
          <span className="event-icon">{getEventTypeIcon(event.type)}</span>
          <span className="event-type">{event.type}</span>
        </div>
        <h3 className="event-title">{event.title}</h3>
        <div className="event-date">
          📅 {formatDate(event.startDate)} - {formatDate(event.endDate)}
        </div>
      </div>

      <div className="event-body">
        <p className="event-description">{event.description}</p>
        <div className="event-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${event.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{event.progress}% complete</span>
        </div>
        <div className="event-stats">
          <div className="stat">
            <span className="stat-icon">👥</span>
            <span>{event.participants}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">⏰</span>
            <span>{event.daysLeft} days</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🏆</span>
            <span>{event.teams} teams</span>
          </div>
        </div>
      </div>

      <div className="event-footer">
        <div className="event-rewards">
          🏅 {event.rewards}
        </div>
        <button
          className={`action-button ${event.isJoined ? 'joined' : 'join'}`}
          onClick={handleJoinClick}
        >
          {event.isJoined ? 'View Details' : 'Join Event'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;