import React from 'react';
import './TeacherSidebar.css';

const TeacherSidebar = ({ activeTab, onTabChange, isCollapsed, onToggle }) => {
    const sidebarItems = [
        {
            id: 'overview',
            name: 'Overview',
            icon: '📊',
            description: 'Dashboard overview'
        },
        {
            id: 'students',
            name: 'Students',
            icon: '👥',
            description: 'Student management'
        },
        {
            id: 'analytics',
            name: 'Analytics',
            icon: '📈',
            description: 'Performance analytics'
        },
        {
            id: 'content',
            name: 'Content',
            icon: '📚',
            description: 'Manage content',
            children: [
                { id: 'quizzes', name: 'Quizzes', icon: '❓' },
                { id: 'lessons', name: 'Lessons', icon: '📖' },
                { id: 'assignments', name: 'Assignments', icon: '📝' }
            ]
        },
        {
            id: 'reports',
            name: 'Reports',
            icon: '📋',
            description: 'Generate reports'
        },
        {
            id: 'settings',
            name: 'Settings',
            icon: '⚙️',
            description: 'Dashboard settings'
        }
    ];

    const [expandedGroups, setExpandedGroups] = React.useState(['content']);

    const handleGroupToggle = (groupId) => {
        setExpandedGroups(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId)
                : [...prev, groupId]
        );
    };

    return (
        <div className={`teacher-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="brand">
                    <span className="brand-icon">🎓</span>
                    {!isCollapsed && <span className="brand-text">Teacher Portal</span>}
                </div>
                <button className="toggle-btn" onClick={onToggle}>
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="sidebar-nav">
                {sidebarItems.map((item) => (
                    <div key={item.id} className="nav-item-container">
                        {item.children ? (
                            <>
                                <button
                                    className={`nav-item group-item ${expandedGroups.includes(item.id) ? 'expanded' : ''}`}
                                    onClick={() => handleGroupToggle(item.id)}
                                    title={isCollapsed ? item.name : ''}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    {!isCollapsed && (
                                        <>
                                            <span className="nav-text">{item.name}</span>
                                            <span className="expand-icon">
                                                {expandedGroups.includes(item.id) ? '▼' : '▶'}
                                            </span>
                                        </>
                                    )}
                                </button>
                                {expandedGroups.includes(item.id) && !isCollapsed && (
                                    <div className="nav-children">
                                        {item.children.map((child) => (
                                            <button
                                                key={child.id}
                                                className={`nav-item child-item ${activeTab === child.id ? 'active' : ''}`}
                                                onClick={() => onTabChange(child.id)}
                                            >
                                                <span className="nav-icon">{child.icon}</span>
                                                <span className="nav-text">{child.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <button
                                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => onTabChange(item.id)}
                                title={isCollapsed ? item.name : ''}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {!isCollapsed && <span className="nav-text">{item.name}</span>}
                            </button>
                        )}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">👨‍🏫</div>
                    {!isCollapsed && (
                        <div className="user-details">
                            <span className="user-name">Dr. Smith</span>
                            <span className="user-role">Teacher</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherSidebar; 