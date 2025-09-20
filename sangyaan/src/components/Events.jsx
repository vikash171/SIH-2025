import React, { useState, useEffect, useRef } from 'react';
import EventCard from './EventCard';
import eventData from '../data/eventCardData.json';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const expandedCardRef = useRef(null);

  // Load events from JSON data
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(eventData.events);
        setError(null);
      } catch (err) {
        setError('Failed to load events. Please try again.');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Handle outside click to close expanded card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandedCardRef.current && !expandedCardRef.current.contains(event.target)) {
        setExpandedCardId(null);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setExpandedCardId(null);
      }
    };

    if (expandedCardId) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [expandedCardId]);

  const handleCardClick = (eventId) => {
    setExpandedCardId(eventId);
  };

  const handleCloseExpanded = () => {
    setExpandedCardId(null);
  };

  const handleJoinEvent = (eventId) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, isJoined: !event.isJoined }
          : event
      )
    );
  };

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

  if (loading) {
    return (
      <div className="events-container">
        <div className="events-header">
          <h1>STEM Events</h1>
          <p>Discover and join exciting STEM events, competitions, and workshops</p>
        </div>
        <div className="events-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="event-card skeleton">
              <div className="skeleton-header"></div>
              <div className="skeleton-body"></div>
              <div className="skeleton-footer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-container">
        <div className="events-error">
          <div className="error-icon">⚠️</div>
          <h3>Failed to load events</h3>
          <p>{error}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="events-container">
        <div className="events-empty">
          <div className="empty-icon">📅</div>
          <h3>No events available</h3>
          <p>Check back later for exciting STEM events!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>STEM Events</h1>
        <p>Discover and join exciting STEM events, competitions, and workshops</p>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onCardClick={handleCardClick}
            isExpanded={expandedCardId === event.id}
          />
        ))}
      </div>

      {/* Expanded Card Overlay */}
      {expandedCardId && (
        <div className="expanded-overlay">
          <div
            className="expanded-card"
            ref={expandedCardRef}
          >
            <button
              className="close-button"
              onClick={handleCloseExpanded}
              aria-label="Close expanded view"
            >
              ✕
            </button>

            {(() => {
              const event = events.find(e => e.id === expandedCardId);
              if (!event) return null;

              return (
                <div className="expanded-content">
                  <div className="expanded-header">
                    <div
                      className="expanded-type-badge"
                      style={{ backgroundColor: getEventTypeColor(event.type) }}
                    >
                      <span className="event-icon">{getEventTypeIcon(event.type)}</span>
                      <span className="event-type">{event.type}</span>
                    </div>
                    <h2 className="expanded-title">{event.title}</h2>
                    <div className="expanded-date">
                      📅 {formatDate(event.startDate)} - {formatDate(event.endDate)}
                    </div>
                  </div>

                  <div className="expanded-body">
                    <section className="description-section">
                      <h3>About This Event</h3>
                      <p>{event.fullDescription || event.description}</p>
                    </section>

                    <section className="details-section">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <h4>📍 Location</h4>
                          <p>{event.location?.venue || 'TBA'}</p>
                          {event.location?.address && (
                            <p className="address">{event.location.address}</p>
                          )}
                        </div>

                        <div className="detail-item">
                          <h4>👨‍🏫 Organizer</h4>
                          <p>{event.organizer?.name || 'TBA'}</p>
                          {event.organizer?.email && (
                            <p className="contact">{event.organizer.email}</p>
                          )}
                        </div>

                        <div className="detail-item">
                          <h4>📊 Progress</h4>
                          <div className="expanded-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: `${event.progress}%` }}
                              ></div>
                            </div>
                            <span>{event.progress}% complete</span>
                          </div>
                        </div>

                        <div className="detail-item">
                          <h4>🏆 Rewards</h4>
                          <p>{event.rewards}</p>
                          {event.detailedRewards?.badges && (
                            <div className="badges">
                              {event.detailedRewards.badges.map((badge, index) => (
                                <span key={index} className="badge">{badge}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </section>

                    {event.requirements && (
                      <section className="requirements-section">
                        <h3>📋 Requirements</h3>
                        <ul>
                          {event.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {event.schedule && (
                      <section className="schedule-section">
                        <h3>⏰ Schedule</h3>
                        <div className="schedule-list">
                          {event.schedule.map((item, index) => (
                            <div key={index} className="schedule-item">
                              <span className="schedule-time">{item.time}</span>
                              <span className="schedule-activity">{item.activity}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {event.tags && (
                      <section className="tags-section">
                        <h3>🏷️ Tags</h3>
                        <div className="tags">
                          {event.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  <div className="expanded-footer">
                    <div className="expanded-stats">
                      <div className="stat">
                        <span className="stat-icon">👥</span>
                        <span>{event.participants}/{event.maxParticipants || '∞'} participants</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">⏰</span>
                        <span>{event.daysLeft} days left</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">📈</span>
                        <span>{event.difficulty || 'All levels'}</span>
                      </div>
                    </div>
                    <button
                      className={`expanded-action-button ${event.isJoined ? 'joined' : 'join'}`}
                      onClick={() => handleJoinEvent(event.id)}
                    >
                      {event.isJoined ? 'Leave Event' : 'Join Event'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;