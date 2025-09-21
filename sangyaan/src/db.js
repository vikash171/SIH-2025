import Dexie from "dexie";

export const db = new Dexie("sangyaanDB");

// Define schema
db.version(1).stores({
  quizzes: "++id, lesson, score, date",
  streaks: "id, count",
  userProfile: "id, name, avatar, level, xp, streak, loginMethod, theme, language, lastActive",
  userSettings: "id, theme, language, notifications, sound, autoSave",
  userProgress: "++id, userId, subjectId, topicId, progress, completedAt, score",
  students: "++id, studentId, name, email, status, lastActive, dataJson", // Store as JSON
  studentData: "id, studentsJson, statisticsJson, lastUpdated", // Complete JSON storage
  contentData: "id, contentListJson, lastUpdated" // Content as JSON
});

// Database utility functions for user profile
export const profileDb = {
  // Get user profile data
  async getUserProfile(userId = 'default') {
    return await db.userProfile.get(userId);
  },

  // Save or update user profile
  async saveUserProfile(profileData) {
    const userId = profileData.id || 'default';
    return await db.userProfile.put({
      id: userId,
      ...profileData,
      lastActive: new Date()
    });
  },

  // Get user settings
  async getUserSettings(userId = 'default') {
    return await db.userSettings.get(userId);
  },

  // Save user settings
  async saveUserSettings(settingsData) {
    const userId = settingsData.id || 'default';
    return await db.userSettings.put({
      id: userId,
      ...settingsData
    });
  },

  // Initialize default profile and settings
  async initializeDefaults(userId = 'default') {
    const existingProfile = await this.getUserProfile(userId);
    if (!existingProfile) {
      await this.saveUserProfile({
        id: userId,
        name: 'Student',
        avatar: '👤',
        level: 'Student Level 1',
        xp: 0,
        streak: 0,
        loginMethod: 'guest',
        theme: 'playful',
        language: 'en'
      });
    }

    const existingSettings = await this.getUserSettings(userId);
    if (!existingSettings) {
      await this.saveUserSettings({
        id: userId,
        theme: 'playful',
        language: 'en',
        notifications: true,
        sound: true,
        autoSave: true
      });
    }
  },

  // Update specific profile fields
  async updateProfile(userId = 'default', updates) {
    const existing = await this.getUserProfile(userId);
    if (existing) {
      return await this.saveUserProfile({
        ...existing,
        ...updates,
        id: userId
      });
    }
  },

  // Update specific setting fields
  async updateSettings(userId = 'default', updates) {
    const existing = await this.getUserSettings(userId);
    if (existing) {
      return await this.saveUserSettings({
        ...existing,
        ...updates,
        id: userId
      });
    }
  }
};

// Database utility functions for student management (JSON-based)
export const studentDb = {
  // Get all students from JSON storage
  async getAllStudents() {
    try {
      const studentData = await db.studentData.get('main');
      if (studentData && studentData.studentsJson) {
        return JSON.parse(studentData.studentsJson);
      }
      return [];
    } catch (error) {
      console.error('Error getting students:', error);
      return [];
    }
  },

  // Save all students as JSON
  async saveAllStudents(studentsArray) {
    try {
      const studentData = {
        id: 'main',
        studentsJson: JSON.stringify(studentsArray),
        lastUpdated: new Date().toISOString()
      };
      return await db.studentData.put(studentData);
    } catch (error) {
      console.error('Error saving students:', error);
      throw error;
    }
  },

  // Get student by ID
  async getStudent(studentId) {
    const students = await this.getAllStudents();
    return students.find(student => student.studentId === studentId);
  },

  // Add new student
  async addStudent(studentData) {
    const students = await this.getAllStudents();
    const newStudent = {
      ...studentData,
      joinDate: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
    students.push(newStudent);
    await this.saveAllStudents(students);
    return newStudent;
  },

  // Update student
  async updateStudent(studentId, updates) {
    const students = await this.getAllStudents();
    const studentIndex = students.findIndex(student => student.studentId === studentId);
    if (studentIndex !== -1) {
      students[studentIndex] = { ...students[studentIndex], ...updates };
      await this.saveAllStudents(students);
      return students[studentIndex];
    }
    return null;
  },

  // Delete student
  async deleteStudent(studentId) {
    const students = await this.getAllStudents();
    const filteredStudents = students.filter(student => student.studentId !== studentId);
    await this.saveAllStudents(filteredStudents);
    return filteredStudents.length < students.length;
  },

  // Search students by name
  async searchStudents(searchTerm) {
    const students = await this.getAllStudents();
    return students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  // Get students by status
  async getStudentsByStatus(status) {
    const students = await this.getAllStudents();
    return students.filter(student => student.status === status);
  },

  // Initialize mock data
  async initializeMockData() {
    const existingStudents = await this.getAllStudents();
    if (existingStudents.length === 0) {
      const mockStudents = generateMockStudents();
      await this.saveAllStudents(mockStudents);
      console.log('Mock student data initialized with JSON storage');
    }
  },

  // Get student statistics (cached in JSON)
  async getStudentStats() {
    try {
      const studentData = await db.studentData.get('main');
      if (studentData && studentData.statisticsJson) {
        const cachedStats = JSON.parse(studentData.statisticsJson);
        // Check if stats are recent (less than 1 hour old)
        const lastUpdated = new Date(studentData.lastUpdated);
        const now = new Date();
        if ((now - lastUpdated) < 3600000) { // 1 hour in milliseconds
          return cachedStats;
        }
      }

      // Calculate fresh statistics
      const allStudents = await this.getAllStudents();
      const activeStudents = allStudents.filter(s => s.status === 'Active');
      const totalProgress = allStudents.reduce((sum, s) => sum + s.progress, 0);
      const averageProgress = allStudents.length > 0 ? totalProgress / allStudents.length : 0;
      const totalStudyTime = allStudents.reduce((sum, s) => sum + (s.weeklyStudyTime || 0), 0);
      const averageStudyTime = allStudents.length > 0 ? totalStudyTime / allStudents.length : 0;
      const needAttention = allStudents.filter(s => s.progress < 50 || s.status === 'Inactive').length;

      const stats = {
        totalStudents: allStudents.length,
        activeStudents: activeStudents.length,
        averageProgress: Math.round(averageProgress),
        averageStudyTime: (averageStudyTime / 60).toFixed(1), // Convert to hours
        needAttention,
        lastCalculated: new Date().toISOString()
      };

      // Cache the statistics
      await this.saveStudentStats(stats);
      return stats;
    } catch (error) {
      console.error('Error calculating student stats:', error);
      return {
        totalStudents: 0,
        activeStudents: 0,
        averageProgress: 0,
        averageStudyTime: '0.0',
        needAttention: 0
      };
    }
  },

  // Save student statistics
  async saveStudentStats(stats) {
    try {
      const studentData = await db.studentData.get('main') || { id: 'main' };
      studentData.statisticsJson = JSON.stringify(stats);
      studentData.lastUpdated = new Date().toISOString();
      await db.studentData.put(studentData);
    } catch (error) {
      console.error('Error saving student stats:', error);
    }
  },

  // Export all data as JSON
  async exportDataAsJson() {
    const students = await this.getAllStudents();
    const stats = await this.getStudentStats();
    return {
      students,
      statistics: stats,
      exportDate: new Date().toISOString(),
      totalRecords: students.length
    };
  },

  // Import data from JSON
  async importDataFromJson(jsonData) {
    try {
      if (jsonData.students && Array.isArray(jsonData.students)) {
        await this.saveAllStudents(jsonData.students);
        if (jsonData.statistics) {
          await this.saveStudentStats(jsonData.statistics);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing JSON data:', error);
      return false;
    }
  }
};

// Database utility functions for content management (JSON-based)
export const contentDb = {
  // Get all content from JSON storage
  async getAllContent() {
    try {
      const contentData = await db.contentData.get('main');
      if (contentData && contentData.contentListJson) {
        return JSON.parse(contentData.contentListJson);
      }
      return [];
    } catch (error) {
      console.error('Error getting content:', error);
      return [];
    }
  },

  // Save all content as JSON
  async saveAllContent(contentArray) {
    try {
      const contentData = {
        id: 'main',
        contentListJson: JSON.stringify(contentArray),
        lastUpdated: new Date().toISOString()
      };
      return await db.contentData.put(contentData);
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    }
  },

  // Add new content
  async addContent(contentItem) {
    const contentList = await this.getAllContent();
    const newContent = {
      ...contentItem,
      id: Date.now(), // Simple ID generation
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      status: "Sent",
      createdAt: new Date().toISOString()
    };
    contentList.unshift(newContent); // Add to beginning
    await this.saveAllContent(contentList);
    return newContent;
  },

  // Delete content
  async deleteContent(contentId) {
    const contentList = await this.getAllContent();
    const filteredContent = contentList.filter(item => item.id !== contentId);
    await this.saveAllContent(filteredContent);
    return filteredContent.length < contentList.length;
  },

  // Initialize default content
  async initializeDefaultContent() {
    const existingContent = await this.getAllContent();
    if (existingContent.length === 0) {
      const defaultContent = [
        {
          id: 1,
          title: "Weekly Challenge Announcement",
          type: "announcement",
          message: "Don't forget about our weekly vocabulary challenge! Complete all lessons this week to earn bonus gems and unlock special rewards.",
          audience: "All Students",
          date: "Oct 15, 2023",
          status: "Sent",
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Grammar Workshop Event",
          type: "event",
          message: "Join us for a special grammar workshop this Friday at 3 PM. We'll cover advanced tenses and sentence structures. Limited spots available!",
          audience: "Intermediate Students",
          date: "Oct 10, 2023",
          status: "Sent",
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: "Assignment: Food & Drinks Vocabulary",
          type: "assignment",
          message: "Complete the \"Food and Drinks\" unit by next Monday. Make sure to practice all vocabulary words at least three times.",
          audience: "Beginners",
          date: "Oct 5, 2023",
          status: "Sent",
          createdAt: new Date().toISOString()
        }
      ];
      await this.saveAllContent(defaultContent);
      console.log('Default content data initialized with JSON storage');
    }
  }
};

// Generate mock student data (enhanced for JSON storage)
function generateMockStudents() {
  const names = [
    "Emma Johnson", "Michael Smith", "Sophia Williams", "James Brown", "Olivia Davis",
    "William Wilson", "Isabella Miller", "Benjamin Jones", "Mia Garcia", "Lucas Rodriguez",
    "Amelia Martinez", "Alexander Anderson", "Harper Taylor", "Ethan Thomas", "Evelyn Jackson",
    "Sebastian White", "Abigail Harris", "Owen Clark", "Emily Lewis", "Matthew Walker"
  ];

  const avatars = [
    "👩‍🎓", "👨‍🎓", "👩‍💼", "👨‍💼", "👩‍🔬", "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍💻", "👨‍💻",
    "👩‍🏫", "👨‍🏫", "👩‍⚕️", "👨‍⚕️", "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", "👩‍🎤", "👨‍🎤"
  ];

  const subjects = [
    ["Mathematics", "Science", "English"],
    ["Physics", "Chemistry", "Biology"],
    ["Literature", "History", "Geography"],
    ["Computer Science", "Mathematics", "Physics"],
    ["Art", "Music", "Drama"]
  ];

  const lastActiveOptions = [
    "Today", "Yesterday", "2 days ago", "3 days ago", "1 week ago", "2 weeks ago"
  ];

  const grades = ["8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"];

  return names.map((name, index) => {
    const progress = Math.floor(Math.random() * 100);
    const level = Math.floor(Math.random() * 15) + 1;
    const xp = Math.floor(Math.random() * 1000) + 100;
    const gems = Math.floor(Math.random() * 500) + 50;
    const streak = Math.floor(Math.random() * 30);
    const weeklyStudyTime = Math.floor(Math.random() * 300) + 60;
    const status = Math.random() > 0.2 ? 'Active' : 'Inactive';
    
    return {
      studentId: `STU${String(index + 1).padStart(3, '0')}`,
      name: name,
      avatar: avatars[index],
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@school.edu`,
      grade: grades[Math.floor(Math.random() * grades.length)],
      level: level,
      xp: xp,
      gems: gems,
      progress: progress,
      streak: streak,
      weeklyStudyTime: weeklyStudyTime,
      lastActive: lastActiveOptions[Math.floor(Math.random() * lastActiveOptions.length)],
      status: status,
      subjects: subjects[Math.floor(Math.random() * subjects.length)],
      joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      performance: {
        quizzesCompleted: Math.floor(Math.random() * 50),
        averageScore: Math.floor(Math.random() * 40) + 60,
        lessonsCompleted: Math.floor(Math.random() * 100),
        assignmentsSubmitted: Math.floor(Math.random() * 20),
        totalStudyTime: weeklyStudyTime * 4, // Total in minutes
        strongSubjects: subjects[Math.floor(Math.random() * subjects.length)].slice(0, 2),
        weakSubjects: subjects[Math.floor(Math.random() * subjects.length)].slice(2, 3)
      },
      personalInfo: {
        parentEmail: `parent.${name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
        phoneNumber: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        address: `${Math.floor(Math.random() * 999) + 1} Main St, City, State ${Math.floor(Math.random() * 99999) + 10000}`,
        emergencyContact: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        parentName: `${name.split(' ')[0]} Parent`,
        birthDate: new Date(2006 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
      },
      preferences: {
        theme: ['light', 'dark', 'auto'][Math.floor(Math.random() * 3)],
        language: ['en', 'es', 'fr'][Math.floor(Math.random() * 3)],
        notifications: Math.random() > 0.3,
        difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)]
      },
      badges: generateRandomBadges(),
      recentActivity: generateRecentActivity(),
      // JSON-friendly metadata
      metadata: {
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        version: "1.0",
        source: "mock_data_generator"
      }
    };
  });
}

// Helper function to generate random badges
function generateRandomBadges() {
  const allBadges = [
    { name: "First Quiz", icon: "🎯", earned: true },
    { name: "Week Streak", icon: "🔥", earned: Math.random() > 0.5 },
    { name: "Perfect Score", icon: "⭐", earned: Math.random() > 0.7 },
    { name: "Quick Learner", icon: "⚡", earned: Math.random() > 0.6 },
    { name: "Helping Hand", icon: "🤝", earned: Math.random() > 0.8 },
    { name: "Explorer", icon: "🧭", earned: Math.random() > 0.4 }
  ];
  return allBadges.filter(badge => badge.earned);
}

// Helper function to generate recent activity
function generateRecentActivity() {
  const activities = [
    "Completed Mathematics Quiz #5",
    "Finished Science Lab Assignment",
    "Participated in Class Discussion",
    "Submitted English Essay",
    "Achieved 7-day learning streak",
    "Earned 'Quick Learner' badge"
  ];
  
  const recentActivity = [];
  const numActivities = Math.floor(Math.random() * 5) + 1;
  
  for (let i = 0; i < numActivities; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    recentActivity.push({
      action: activities[Math.floor(Math.random() * activities.length)],
      timestamp: date.toISOString(),
      points: Math.floor(Math.random() * 50) + 10
    });
  }
  
  return recentActivity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}
