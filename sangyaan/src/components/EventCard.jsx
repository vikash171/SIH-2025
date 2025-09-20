import React from 'react';

const EventCard = ({ event, onJoinEvent, onViewDetails }) => {
  const getTypeConfig = () => {
    switch (event.type) {
      case 'school':
        return {
          bgColor: 'bg-indigo-600',
          icon: 'fas fa-school',
          label: 'School Event'
        };
      case 'open':
        return {
          bgColor: 'bg-emerald-500',
          icon: 'fas fa-globe',
          label: 'Open to All'
        };
      case 'team':
        return {
          bgColor: 'bg-amber-500',
          icon: 'fas fa-users',
          label: 'Team Battle'
        };
      default:
        return {
          bgColor: 'bg-indigo-600',
          icon: 'fas fa-calendar',
          label: 'Event'
        };
    }
  };

  const typeConfig = getTypeConfig();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
      <div className={`${typeConfig.bgColor} text-white p-5 relative`}>
        <div className="absolute top-4 right-4 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <i className={typeConfig.icon}></i>
          <span>{typeConfig.label}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <div className="flex items-center gap-2 text-sm">
          <i className="fas fa-calendar-alt"></i>
          <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <p className="text-gray-600 mb-4 flex-grow">{event.description}</p>
        
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${event.progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 text-right">{event.progress}% complete</div>
        </div>
        
        <div className="flex justify-between mb-5">
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-600">{event.participants}</div>
            <div className="text-xs text-gray-500">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-600">{event.daysLeft}</div>
            <div className="text-xs text-gray-500">Days Left</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-600">{event.teams}</div>
            <div className="text-xs text-gray-500">Teams</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-amber-600 font-medium">
          <i className="fas fa-medal"></i>
          <span>{event.rewards}</span>
        </div>
        {event.isJoined ? (
          <button 
            onClick={() => onViewDetails(event.id)}
            className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-info-circle"></i>
            <span>View Details</span>
          </button>
        ) : (
          <button 
            onClick={() => onJoinEvent(event.id)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-sign-in-alt"></i>
            <span>Join Event</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;