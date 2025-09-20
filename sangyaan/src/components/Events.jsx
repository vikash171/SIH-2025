import React, { useState } from 'react';
import EventCard from './EventCard';

const Events = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Science Fair 2023',
      description: 'Showcase your innovative science projects and compete with fellow students. Top projects get featured in the school magazine!',
      type: 'school',
      startDate: '2023-11-15',
      endDate: '2023-11-30',
      participants: 42,
      daysLeft: 15,
      teams: 3,
      progress: 65,

      rewards: '200 XP + Badge',
      isJoined: false
    },
    {
      id: '2',
      title: 'National Coding Challenge',
      description: 'Test your coding skills in this nationwide competition. Solve algorithmic challenges and climb the leaderboard!',
      type: 'open',
      startDate: '2023-12-01',
      endDate: '2023-12-15',
      participants: 1250,
      daysLeft: 30,
      teams: 125,
      progress: 30,
      rewards: '500 XP + Certificate',
      isJoined: true
    },
    {
      id: '3',
      title: 'Robotics Team Challenge',
      description: 'Form a team and build a robot to complete specific tasks. Battle against other teams in this exciting challenge!',
      type: 'team',
      startDate: '2023-11-20',
      endDate: '2023-12-10',
      participants: 86,
      daysLeft: 20,
      teams: 12,
      progress: 45,
      rewards: '350 XP + Trophy',
      isJoined: false
    }
  ]);

  const handleJoinEvent = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, isJoined: true } : event
    ));
    // Show success notification
    console.log(`Joined event ${eventId}`);
  };

  const handleViewDetails = (eventId) => {
    // Navigate to event details page
    console.log(`Viewing details for event ${eventId}`);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Filter events based on active tab
  const filteredEvents = events.filter(event => {
    if (activeTab === 'all') return true;
    return event.type === activeTab;
  });

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600 mb-3">STEM Events Hub</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover exciting STEM events, challenges, and competitions. Join events from your school or open to all participants!
        </p>
      </div>

      <div className="flex justify-center mb-8 gap-3 flex-wrap">
        <div 
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium cursor-pointer transition-all duration-200 ${
            activeTab === 'all' 
              ? 'bg-indigo-600 text-white shadow-lg transform scale-105' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
          }`}
          onClick={() => handleTabChange('all')}
        >
          <i className="fas fa-globe"></i>
          <span>All Events</span>
        </div>
        <div 
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium cursor-pointer transition-all duration-200 ${
            activeTab === 'school' 
              ? 'bg-indigo-600 text-white shadow-lg transform scale-105' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
          }`}
          onClick={() => handleTabChange('school')}
        >
          <i className="fas fa-school"></i>
          <span>My School</span>
        </div>
        <div 
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium cursor-pointer transition-all duration-200 ${
            activeTab === 'open' 
              ? 'bg-indigo-600 text-white shadow-lg transform scale-105' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
          }`}
          onClick={() => handleTabChange('open')}
        >
          <i className="fas fa-users"></i>
          <span>Open to All</span>
        </div>
        <div 
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium cursor-pointer transition-all duration-200 ${
            activeTab === 'team' 
              ? 'bg-indigo-600 text-white shadow-lg transform scale-105' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
          }`}
          onClick={() => handleTabChange('team')}
        >
          <i className="fas fa-trophy"></i>
          <span>Team Battles</span>
        </div>
      </div>
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onJoinEvent={handleJoinEvent}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 mb-10">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
          <p className="text-gray-500">
            There are no events available for the selected category. Try switching to a different tab!
          </p>
        </div>
      )}

      {/* My Active Projects Section */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
          <i className="fas fa-project-diagram text-indigo-600"></i>
          <span>My Active Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-rocket text-lg"></i>
            </div>
            <div className="flex-grow">
              <div className="font-semibold text-gray-800">Solar System Model</div>
              <div className="text-sm text-gray-500">Due in 5 days</div>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              75%
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-flask text-lg"></i>
            </div>
            <div className="flex-grow">
              <div className="font-semibold text-gray-800">Chemical Reactions Lab</div>
              <div className="text-sm text-gray-500">Due in 12 days</div>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              40%
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-calculator text-lg"></i>
            </div>
            <div className="flex-grow">
              <div className="font-semibold text-gray-800">Math Puzzles Collection</div>
              <div className="text-sm text-gray-500">Due in 20 days</div>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              25%
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Teams */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
            <i className="fas fa-users-cog text-indigo-600"></i>
            <span>My Teams</span>
          </h2>
          <p className="text-gray-600 mb-4">You're part of 2 active teams working on STEM projects</p>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-2 relative z-30">
              RJ
            </div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm -ml-2 relative z-20">
              AK
            </div>
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm -ml-2 relative z-10">
              SP
            </div>
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-sm -ml-2">
              +3
            </div>
          </div>
          <button className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
            <i className="fas fa-user-friends"></i>
            <span>View All Teams</span>
          </button>
        </div>

        {/* Join a Team */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
            <i className="fas fa-user-plus text-indigo-600"></i>
            <span>Join a Team</span>
          </h2>
          <p className="text-gray-600 mb-6">Looking for team members for your project? Or want to join an existing team?</p>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
            <i className="fas fa-search"></i>
            <span>Browse Teams</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;