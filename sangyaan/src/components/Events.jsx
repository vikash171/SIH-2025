import React, { useState, useEffect, useRef } from 'react';
import MemeRegistration from './MemeRegistration';
import EventCard from './EventCard';
import eventData from '../data/eventCardData.json';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [expandedTeamSection, setExpandedTeamSection] = useState(null);
  const [showMemeForm, setShowMemeForm] = useState(false);
  const expandedCardRef = useRef(null);

  // Mock data for projects and teams
  const [projects] = useState([
    {
      id: 'proj1',
      title: 'Solar System Model',
      description: 'Build an interactive 3D model of our solar system',
      dueDate: '2025-11-20',
      progress: 75,
      difficulty: 'Intermediate',
      subject: 'Physics',
      icon: '🚀',
      requirements: ['3D modeling skills', 'Basic astronomy knowledge'],
      collaborators: ['Alex Chen', 'Sarah Wilson'],
      status: 'active',
      timeSpent: '12 hours',
      estimatedCompletion: '5 days'
    },
    {
      id: 'proj2',
      title: 'Chemical Reactions Lab',
      description: 'Explore acid-base reactions and pH indicators',
      dueDate: '2025-12-05',
      progress: 40,
      difficulty: 'Advanced',
      subject: 'Chemistry',
      icon: '🧪',
      requirements: ['Safety protocols', 'Lab equipment access'],
      collaborators: ['Michael Brown'],
      status: 'active',
      timeSpent: '8 hours',
      estimatedCompletion: '12 days'
    },
    {
      id: 'proj3',
      title: 'Math Puzzles Collection',
      description: 'Create and solve complex mathematical puzzles',
      dueDate: '2025-12-15',
      progress: 25,
      difficulty: 'Expert',
      subject: 'Mathematics',
      icon: '🧮',
      requirements: ['Advanced mathematics', 'Problem-solving skills'],
      collaborators: ['Emma Davis', 'John Smith', 'Lisa Park'],
      status: 'active',
      timeSpent: '6 hours',
      estimatedCompletion: '20 days'
    }
  ]);

  const [teamSections] = useState([
    {
      id: 'myteams',
      title: 'My Teams',
      description: "You're part of 2 active teams working on STEM projects",
      icon: '👥',
      teams: [
        { name: 'RJ', avatar: '🧑‍🔬' },
        { name: 'AK', avatar: '👩‍💻' },
        { name: 'SP', avatar: '🧑‍🎓' },
        { count: 3, additional: true }
      ],
      totalProjects: 5,
      completedProjects: 2,
      activeCollaborations: 3
    },
    {
      id: 'jointeam',
      title: 'Join a Team',
      description: 'Looking for team members for your project? Or want to join an existing team?',
      icon: '🔍',
      availableTeams: [
        { name: 'Quantum Computing Research', members: 4, openSpots: 2, difficulty: 'Expert' },
        { name: 'Robotics Competition Team', members: 6, openSpots: 1, difficulty: 'Advanced' },
        { name: 'Environmental Science Project', members: 3, openSpots: 3, difficulty: 'Intermediate' }
      ],
      skillsNeeded: ['Programming', 'Research', 'Presentation', 'Teamwork']
    }
  ]);

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
        setExpandedProjectId(null);
        setExpandedTeamSection(null);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setExpandedCardId(null);
        setExpandedProjectId(null);
        setExpandedTeamSection(null);
      }
    };

    if (expandedCardId || expandedProjectId || expandedTeamSection) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [expandedCardId, expandedProjectId, expandedTeamSection]);

  const handleCardClick = (eventId) => {
    setExpandedCardId(eventId);
  };

  const handleCloseExpanded = () => {
    setExpandedCardId(null);
    setExpandedProjectId(null);
    setExpandedTeamSection(null);
  };

  const handleProjectClick = (projectId) => {
    setExpandedProjectId(projectId);
    setExpandedCardId(null);
    setExpandedTeamSection(null);
  };

  const handleTeamSectionClick = (sectionId) => {
    setExpandedTeamSection(sectionId);
    setExpandedCardId(null);
    setExpandedProjectId(null);
  };

  const handleJoinEvent = (eventId) => {
    // If Meme event, open registration instead of toggling immediately
    const event = events.find(e => e.id === eventId);
    if (event && event.id === 'meme001') {
      setShowMemeForm(true);
      setExpandedCardId(null);
      return;
    }
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, isJoined: !event.isJoined }
          : event
      )
    );
  };

  const handleMemeSubmit = (payload) => {
    console.log('Meme submitted:', payload);
    setShowMemeForm(false);
    // Mark event as joined
    setEvents(prev => prev.map(e => e.id === 'meme001' ? { ...e, isJoined: true, participants: (e.participants || 0) + 1 } : e));
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

      {/* My Active Projects Section */}
      <div className="my-projects-section">
        <h2 className="section-title">
          <span className="section-icon">🚀</span>
          My Active Projects
        </h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="project-icon">{project.icon}</div>
              <div className="project-info">
                <div className="project-title">{project.title}</div>
                <div className="project-status">Due in {Math.ceil((new Date(project.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days</div>
                <div className="project-progress-container">
                  <div className="project-progress-bar">
                    <div 
                      className="project-progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="project-progress-text">{project.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2 className="section-title">
          <span className="section-icon">👥</span>
          Team Collaboration
        </h2>
        <div className="team-cards-grid">
          {teamSections.map((section) => (
            <div
              key={section.id}
              className="team-card"
              onClick={() => handleTeamSectionClick(section.id)}
            >
              <h3 className="team-card-title">
                <span className="team-card-icon">{section.icon}</span>
                {section.title}
              </h3>
              <p className="team-card-description">{section.description}</p>
              
              {section.id === 'myteams' && section.teams && (
                <div className="team-members-preview">
                  {section.teams.map((member, index) => (
                    member.additional ? (
                      <div key={index} className="team-member additional">+{member.count}</div>
                    ) : (
                      <div key={index} className="team-member" title={member.name}>
                        {member.avatar}
                      </div>
                    )
                  ))}
                </div>
              )}
              
              <button className={`team-action-btn ${section.id === 'myteams' ? 'secondary' : 'primary'}`}>
                {section.id === 'myteams' ? 'View All Teams' : 'Browse Teams'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Card Overlay */}
      {(expandedCardId || expandedProjectId || expandedTeamSection || showMemeForm) && (
        <div className="expanded-overlay">
          <div
            className="expanded-card"
            ref={expandedCardRef}
          >
            <button
              className="close-button"
              onClick={() => { setShowMemeForm(false); handleCloseExpanded(); }}
              aria-label="Close expanded view"
            >
              ✕
            </button>

            {(() => {
              if (showMemeForm) {
                return (
                  <MemeRegistration onClose={() => setShowMemeForm(false)} onSubmit={handleMemeSubmit} />
                );
              }
              // Event Card Expansion
              if (expandedCardId) {
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
              }

              // Project Expansion
              if (expandedProjectId) {
                const project = projects.find(p => p.id === expandedProjectId);
                if (!project) return null;

                return (
                  <div className="expanded-content">
                    <div className="expanded-header">
                      <div className="expanded-type-badge" style={{ backgroundColor: '#4F46E5' }}>
                        <span className="event-icon">{project.icon}</span>
                        <span className="event-type">{project.subject}</span>
                      </div>
                      <h2 className="expanded-title">{project.title}</h2>
                      <div className="expanded-date">
                        📅 Due: {formatDate(project.dueDate)}
                      </div>
                    </div>

                    <div className="expanded-body">
                      <section className="description-section">
                        <h3>Project Description</h3>
                        <p>{project.description}</p>
                      </section>

                      <section className="details-section">
                        <div className="detail-grid">
                          <div className="detail-item">
                            <h4>📊 Progress</h4>
                            <div className="expanded-progress">
                              <div className="progress-bar">
                                <div
                                  className="progress-fill"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <span>{project.progress}% complete</span>
                            </div>
                          </div>

                          <div className="detail-item">
                            <h4>⏱️ Time Spent</h4>
                            <p>{project.timeSpent}</p>
                          </div>

                          <div className="detail-item">
                            <h4>🎯 Difficulty</h4>
                            <p>{project.difficulty}</p>
                          </div>

                          <div className="detail-item">
                            <h4>📈 Estimated Completion</h4>
                            <p>{project.estimatedCompletion}</p>
                          </div>
                        </div>
                      </section>

                      <section className="requirements-section">
                        <h3>📋 Requirements</h3>
                        <ul>
                          {project.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </section>

                      <section className="collaborators-section">
                        <h3>👥 Collaborators</h3>
                        <div className="collaborators-list">
                          {project.collaborators.map((collaborator, index) => (
                            <div key={index} className="collaborator-item">
                              <span className="collaborator-avatar">👤</span>
                              <span className="collaborator-name">{collaborator}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    <div className="expanded-footer">
                      <div className="expanded-stats">
                        <div className="stat">
                          <span className="stat-icon">📚</span>
                          <span>{project.subject}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-icon">🎯</span>
                          <span>{project.difficulty}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-icon">👥</span>
                          <span>{project.collaborators.length} collaborators</span>
                        </div>
                      </div>
                      <button className="expanded-action-button join">
                        Continue Project
                      </button>
                    </div>
                  </div>
                );
              }

              // Team Section Expansion
              if (expandedTeamSection) {
                const section = teamSections.find(s => s.id === expandedTeamSection);
                if (!section) return null;

                return (
                  <div className="expanded-content">
                    <div className="expanded-header">
                      <div className="expanded-type-badge" style={{ backgroundColor: '#10B981' }}>
                        <span className="event-icon">{section.icon}</span>
                        <span className="event-type">Teams</span>
                      </div>
                      <h2 className="expanded-title">{section.title}</h2>
                      <div className="expanded-date">
                        {section.description}
                      </div>
                    </div>

                    <div className="expanded-body">
                      {section.id === 'myteams' ? (
                        <>
                          <section className="description-section">
                            <h3>Team Overview</h3>
                            <p>You're actively collaborating with talented individuals across multiple STEM projects.</p>
                          </section>

                          <section className="details-section">
                            <div className="detail-grid">
                              <div className="detail-item">
                                <h4>🎯 Active Projects</h4>
                                <p>{section.totalProjects} total projects</p>
                              </div>

                              <div className="detail-item">
                                <h4>✅ Completed</h4>
                                <p>{section.completedProjects} projects finished</p>
                              </div>

                              <div className="detail-item">
                                <h4>🤝 Collaborations</h4>
                                <p>{section.activeCollaborations} active partnerships</p>
                              </div>

                              <div className="detail-item">
                                <h4>👥 Team Members</h4>
                                <div className="team-members-expanded">
                                  {section.teams.filter(t => !t.additional).map((member, index) => (
                                    <div key={index} className="team-member-expanded">
                                      <span className="member-avatar">{member.avatar}</span>
                                      <span className="member-name">{member.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </section>
                        </>
                      ) : (
                        <>
                          <section className="description-section">
                            <h3>Find Your Perfect Team</h3>
                            <p>Connect with like-minded individuals and join exciting STEM projects that match your interests and skills.</p>
                          </section>

                          <section className="available-teams-section">
                            <h3>🔍 Available Teams</h3>
                            <div className="teams-list">
                              {section.availableTeams.map((team, index) => (
                                <div key={index} className="team-item">
                                  <div className="team-info">
                                    <h4>{team.name}</h4>
                                    <p>{team.members} members • {team.openSpots} open spots</p>
                                    <span className="difficulty-badge">{team.difficulty}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>

                          <section className="skills-section">
                            <h3>🎯 Skills in Demand</h3>
                            <div className="skills-tags">
                              {section.skillsNeeded.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                              ))}
                            </div>
                          </section>
                        </>
                      )}
                    </div>

                    <div className="expanded-footer">
                      <div className="expanded-stats">
                        <div className="stat">
                          <span className="stat-icon">👥</span>
                          <span>{section.id === 'myteams' ? 'My Teams' : 'Join Teams'}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-icon">🎯</span>
                          <span>STEM Collaboration</span>
                        </div>
                        <div className="stat">
                          <span className="stat-icon">🚀</span>
                          <span>Active Projects</span>
                        </div>
                      </div>
                      <button className="expanded-action-button join">
                        {section.id === 'myteams' ? 'Manage Teams' : 'Browse All Teams'}
                      </button>
                    </div>
                  </div>
                );
              }

              return null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;