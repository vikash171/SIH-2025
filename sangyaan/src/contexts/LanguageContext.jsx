/* eslint-disable react-refresh/only-export-components */
/**
 * Language Context
 * 
 * Purpose: Provides language functionality across the entire application
 * Features:
 * - Multi-language support (English, Hindi, Odia)
 * - Translation management
 * - Language persistence
 * - Excludes math symbols and numbers from translation
 */

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Translation data
const translations = {
    en: {
        // Generic
        loading: "Loading...",
        excellentWork: "Excellent work!",
        keepItUp: "Keep it up!",
        // Navigation
        home: "Home",
        learn: "Learn",
        labs: "Labs",
        ranks: "Ranks",
        class: "Class",
        events: "Events",

        // Common
        backToDashboard: "Back to Dashboard",
        settings: "Settings",
        signOut: "Sign Out",
        language: "Language",
        theme: "Theme",

        // Homepage
        welcomeBack: "Welcome Back",
        readyForAdventure: "Ready for your next STEM adventure?",
        continueJourney: "Continue Journey",
        newAdventure: "New Adventure",
        exploreNewSubjects: "Explore new subjects",
        resume: "Resume",
        startNew: "Start New",
        games: "Games",
        score: "Score",
        dayStreak: "Day Streak",
        totalXP: "Total XP",

        // Learn
        learningAdventure: "Learning Adventure",
        levelOf: "Level {current} of {total}",
        complete: "Complete",
        continue: "Continue",
        start: "Start",

        // Classroom
        myClassroom: "My Classroom",
        activeClass: "Active Class",
        assignments: "Assignments",
        classRank: "Class Rank",
        currentClass: "Current Class",
        quickActions: "Quick Actions",
        classDiscussion: "Class Discussion",
        viewGrades: "View Grades",

        // Virtual Lab
        virtualLabs: "Virtual Labs",
        availableLab: "Available Lab",
        completed: "Completed",
        totalStars: "Total Stars",
        featuredLab: "Featured Lab",
        labCategories: "Lab Categories",
        physicsLabs: "Physics Labs",
        chemistryLabs: "Chemistry Labs",
        experimentAvailable: "experiment available",
        comingSoon: "Coming soon",

        // Leaderboard
        leaderboard: "Leaderboard",
        personalRank: "Personal Rank",
        schoolRank: "School Rank",
        globalRank: "Global Rank",
        yourBestRank: "Your Best Rank",
        achievements: "Achievements",

        // Subjects
        physics: "Physics",
        chemistry: "Chemistry",
        mathematics: "Mathematics",
        biology: "Biology",

        // Levels and Topics
        waveMechanics: "Wave Mechanics",
        waveBasics: "Wave Basics",
        waveMotion: "Wave Motion",
        waveInterference: "Wave Interference",
        standingWaves: "Standing Waves",
        waveApplications: "Wave Applications",

        // Teacher Dashboard
        teacher: {
            headerTitle: "Teacher Dashboard",
            totalStudents: "Total Students",
            avgProgress: "Average Progress",
            avgWeeklyStudy: "Avg. Weekly Study",
            needAttention: "Need Attention",
            classPerformance: "Class Performance Overview",
            classAverage: "Class Average",
            highestScore: "Highest Score",
            activeToday: "Active Today",
            highPerformers: "High Performers",
            recentActivity: "Recent Student Activity",
            progress: "Progress",
            level: "Level",
            studentsNeedingAttention: "Students Needing Attention",
            contact: "Contact",
            topPerformers: "Top Performers",
            gems: "gems",
            excellent: "Excellent (90%+)",
            good: "Good (70-89%)",
            improving: "Improving (50-69%)",
            studentManagement: "Student Management",
            searchStudents: "Search students...",
            student: "Student",
            gemsLabel: "Gems",
            lastActive: "Last Active",
            status: "Status",
            actions: "Actions",
            view: "View",
            message: "Message",
            classesManagement: "Class Management",
            createNewClass: "Create New Class",
            edit: "Edit"
        },

        // Parents Dashboard
        parent: {
            headerLastActive: "Last Active",
            tabsOverview: "Overview",
            tabsSubjects: "Subjects",
            tabsAchievements: "Achievements",
            tabsStudyTime: "Study Time",
            tabsClassRank: "Class Rank",
            overallProgress: "Overall Progress",
            currentLevel: "Current Level",
            thisWeek: "This Week",
            studyTime: "Study time",
            recentTestScores: "Recent Test Scores",
            subjectPerformance: "Subject Performance",
            teacherLabel: "Teacher",
            completeWord: "Complete",
            recentAchievements: "Recent Achievements",
            earnedOn: "Earned on {date}",
            earnedCount: "Your child has earned {count} achievements this month!",
            weeklyStudyTime: "Weekly Study Time",
            totalThisWeek: "Total this week: {minutes} minutes",
            consistencyMsg: "Great consistency in studying!",
            classPositionTitle: "Your Child's Class Position",
            rankOutOf: "Rank {rank} out of {total} students",
            topPercent: "Top {percent}% of the class!",
            subjectWiseRankings: "Subject-wise Rankings",
            doingExcellent: "Your child is doing excellent!",
            veryGoodPerformance: "Very good performance",
            goodProgress: "Good progress, keep going!",
            roomForImprovement: "Room for improvement",
            progressTrends: "Progress Trends",
            plusPositions: "+{count} Positions",
            thisMonth: "This Month",
            consistent: "Consistent",
            studyPattern: "Study Pattern",
            encouragementTitle: "Your child is performing excellently!",
            encouragementBody: "{name} is in the top 10% of the class and showing consistent improvement. Keep encouraging this wonderful progress!",
            needHelp: "Need Help?",
            contactTeacher: "Contact Teacher",
            outOfTotal: "out of {total}"
        }
    },

    hi: {
        // Generic
        loading: "लोड हो रहा है...",
        excellentWork: "शानदार काम!",
        keepItUp: "इसे जारी रखें!",
        // Navigation
        home: "होम",
        learn: "सीखें",
        labs: "लैब्स",
        ranks: "रैंक",
        class: "क्लास",
        events: "इवेंट्स",

        // Common
        backToDashboard: "डैशबोर्ड पर वापस",
        settings: "सेटिंग्स",
        signOut: "साइन आउट",
        language: "भाषा",
        theme: "थीम",

        // Homepage
        welcomeBack: "वापस स्वागत है",
        readyForAdventure: "अपने अगले STEM एडवेंचर के लिए तैयार हैं?",
        continueJourney: "यात्रा जारी रखें",
        newAdventure: "नया एडवेंचर",
        exploreNewSubjects: "नए विषयों का अन्वेषण करें",
        resume: "जारी रखें",
        startNew: "नया शुरू करें",
        games: "गेम्स",
        score: "स्कोर",
        dayStreak: "दिन की लकीर",
        totalXP: "कुल XP",

        // Learn
        learningAdventure: "सीखने का साहसिक कार्य",
        levelOf: "स्तर {current} का {total}",
        complete: "पूर्ण",
        continue: "जारी रखें",
        start: "शुरू करें",

        // Classroom
        myClassroom: "मेरी कक्षा",
        activeClass: "सक्रिय कक्षा",
        assignments: "असाइनमेंट्स",
        classRank: "कक्षा रैंक",
        currentClass: "वर्तमान कक्षा",
        quickActions: "त्वरित कार्य",
        classDiscussion: "कक्षा चर्चा",
        viewGrades: "ग्रेड देखें",

        // Virtual Lab
        virtualLabs: "वर्चुअल लैब्स",
        availableLab: "उपलब्ध लैब",
        completed: "पूर्ण",
        totalStars: "कुल स्टार्स",
        featuredLab: "फीचर्ड लैब",
        labCategories: "लैब श्रेणियां",
        physicsLabs: "भौतिकी लैब्स",
        chemistryLabs: "रसायन लैब्स",
        experimentAvailable: "प्रयोग उपलब्ध",
        comingSoon: "जल्द आ रहा है",

        // Leaderboard
        leaderboard: "लीडरबोर्ड",
        personalRank: "व्यक्तिगत रैंक",
        schoolRank: "स्कूल रैंक",
        globalRank: "वैश्विक रैंक",
        yourBestRank: "आपकी सर्वश्रेष्ठ रैंक",
        achievements: "उपलब्धियां",

        // Subjects
        physics: "भौतिकी",
        chemistry: "रसायन विज्ञान",
        mathematics: "गणित",
        biology: "जीव विज्ञान",

        // Levels and Topics
        waveMechanics: "तरंग यांत्रिकी",
        waveBasics: "तरंग मूल बातें",
        waveMotion: "तरंग गति",
        waveInterference: "तरंग हस्तक्षेप",
        standingWaves: "स्थिर तरंगें",
        waveApplications: "तरंग अनुप्रयोग",

        // Teacher Dashboard
        teacher: {
            headerTitle: "टीचर डैशबोर्ड",
            totalStudents: "कुल छात्र",
            avgProgress: "औसत प्रगति",
            avgWeeklyStudy: "औसत साप्ताहिक अध्ययन",
            needAttention: "ध्यान की आवश्यकता",
            classPerformance: "कक्षा प्रदर्शन अवलोकन",
            classAverage: "कक्षा औसत",
            highestScore: "सर्वोच्च स्कोर",
            activeToday: "आज सक्रिय",
            highPerformers: "उच्च प्रदर्शनकर्ता",
            recentActivity: "हालिया छात्र गतिविधि",
            progress: "प्रगति",
            level: "स्तर",
            studentsNeedingAttention: "ध्यान की आवश्यकता वाले छात्र",
            contact: "संपर्क करें",
            topPerformers: "शीर्ष प्रदर्शनकर्ता",
            gems: "रत्न",
            excellent: "उत्कृष्ट (90%+)",
            good: "अच्छा (70-89%)",
            improving: "सुधार कर रहे (50-69%)",
            studentManagement: "छात्र प्रबंधन",
            searchStudents: "छात्र खोजें...",
            student: "छात्र",
            gemsLabel: "रत्न",
            lastActive: "अंतिम गतिविधि",
            status: "स्थिति",
            actions: "क्रियाएँ",
            view: "देखें",
            message: "संदेश",
            classesManagement: "कक्षा प्रबंधन",
            createNewClass: "नई कक्षा बनाएं",
            edit: "संपादित करें"
        },

        // Parents Dashboard
        parent: {
            headerLastActive: "अंतिम गतिविधि",
            tabsOverview: "सारांश",
            tabsSubjects: "विषय",
            tabsAchievements: "उपलब्धियां",
            tabsStudyTime: "अध्ययन समय",
            tabsClassRank: "कक्षा रैंक",
            overallProgress: "कुल प्रगति",
            currentLevel: "वर्तमान स्तर",
            thisWeek: "इस सप्ताह",
            studyTime: "अध्ययन समय",
            recentTestScores: "हालिया टेस्ट स्कोर",
            subjectPerformance: "विषय प्रदर्शन",
            teacherLabel: "शिक्षक",
            completeWord: "पूर्ण",
            recentAchievements: "हालिया उपलब्धियां",
            earnedOn: "प्राप्त किया {date}",
            earnedCount: "आपके बच्चे ने इस महीने {count} उपलब्धियां अर्जित की हैं!",
            weeklyStudyTime: "साप्ताहिक अध्ययन समय",
            totalThisWeek: "इस सप्ताह कुल: {minutes} मिनट",
            consistencyMsg: "पढ़ाई में शानदार निरंतरता!",
            classPositionTitle: "आपके बच्चे की कक्षा में स्थिति",
            rankOutOf: "रैंक {rank} कुल {total} छात्रों में",
            topPercent: "कक्षा के शीर्ष {percent}% में!",
            subjectWiseRankings: "विषयवार रैंकिंग",
            doingExcellent: "आपका बच्चा शानदार कर रहा है!",
            veryGoodPerformance: "बहुत अच्छा प्रदर्शन",
            goodProgress: "अच्छी प्रगति, जारी रखें!",
            roomForImprovement: "सुधार की गुंजाइश",
            progressTrends: "प्रगति रुझान",
            plusPositions: "+{count} स्थान",
            thisMonth: "इस महीने",
            consistent: "निरंतर",
            studyPattern: "अध्ययन पैटर्न",
            encouragementTitle: "आपका बच्चा उत्कृष्ट प्रदर्शन कर रहा है!",
            encouragementBody: "{name} कक्षा के शीर्ष 10% में है और निरंतर सुधार दिखा रहा/रही है। इस शानदार प्रगति को प्रोत्साहित करते रहें!",
            needHelp: "मदद चाहिए?",
            contactTeacher: "शिक्षक से संपर्क करें",
            outOfTotal: "कुल {total} में"
        }
    },

    or: {
        // Navigation
        home: "ଘର",
        learn: "ଶିଖନ୍ତୁ",
        labs: "ଲ୍ୟାବ୍ସ",
        ranks: "ର୍ୟାଙ୍କ",
        class: "କ୍ଲାସ",
        events: "ଇଭେଣ୍ଟସ୍",

        // Common
        backToDashboard: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
        settings: "ସେଟିଂସ",
        signOut: "ସାଇନ ଆଉଟ",
        language: "ଭାଷା",
        theme: "ଥିମ",

        // Homepage
        welcomeBack: "ସ୍ୱାଗତ ଫେରିବା",
        readyForAdventure: "ଆପଣଙ୍କର ପରବର୍ତ୍ତୀ STEM ଦୁଃସାହସିକ କାର୍ଯ୍ୟ ପାଇଁ ପ୍ରସ୍ତୁତ?",
        continueJourney: "ଯାତ୍ରା ଜାରି ରଖନ୍ତୁ",
        newAdventure: "ନୂତନ ଦୁଃସାହସିକ କାର୍ଯ୍ୟ",
        exploreNewSubjects: "ନୂତନ ବିଷୟଗୁଡ଼ିକ ଅନୁସନ୍ଧାନ କରନ୍ତୁ",
        resume: "ଜାରି ରଖନ୍ତୁ",
        startNew: "ନୂତନ ଆରମ୍ଭ କରନ୍ତୁ",
        games: "ଖେଳ",
        score: "ସ୍କୋର",
        dayStreak: "ଦିନ ଧାରା",
        totalXP: "ମୋଟ XP",

        // Learn
        learningAdventure: "ଶିକ୍ଷଣ ଦୁଃସାହସିକ କାର୍ଯ୍ୟ",
        levelOf: "ସ୍ତର {current} ର {total}",
        complete: "ସମ୍ପୂର୍ଣ୍ଣ",
        continue: "ଜାରି ରଖନ୍ତୁ",
        start: "ଆରମ୍ଭ କରନ୍ତୁ",

        // Classroom
        myClassroom: "ମୋର କ୍ଲାସରୁମ",
        activeClass: "ସକ୍ରିୟ କ୍ଲାସ",
        assignments: "ଆସାଇନମେଣ୍ଟ",
        classRank: "କ୍ଲାସ ର୍ୟାଙ୍କ",
        currentClass: "ବର୍ତ୍ତମାନ କ୍ଲାସ",
        quickActions: "ଦ୍ରୁତ କାର୍ଯ୍ୟ",
        classDiscussion: "କ୍ଲାସ ଆଲୋଚନା",
        viewGrades: "ଗ୍ରେଡ ଦେଖନ୍ତୁ",

        // Virtual Lab
        virtualLabs: "ଭର୍ଚୁଆଲ ଲ୍ୟାବ",
        availableLab: "ଉପଲବ୍ଧ ଲ୍ୟାବ",
        completed: "ସମ୍ପୂର୍ଣ୍ଣ",
        totalStars: "ମୋଟ ତାରକା",
        featuredLab: "ବିଶେଷ ଲ୍ୟାବ",
        labCategories: "ଲ୍ୟାବ ବର୍ଗ",
        physicsLabs: "ପଦାର୍ଥ ବିଜ୍ଞାନ ଲ୍ୟାବ",
        chemistryLabs: "ରସାୟନ ଲ୍ୟାବ",
        experimentAvailable: "ପରୀକ୍ଷଣ ଉପଲବ୍ଧ",
        comingSoon: "ଶୀଘ୍ର ଆସୁଛି",

        // Leaderboard
        leaderboard: "ଲିଡରବୋର୍ଡ",
        personalRank: "ବ୍ୟକ୍ତିଗତ ର୍ୟାଙ୍କ",
        schoolRank: "ବିଦ୍ୟାଳୟ ର୍ୟାଙ୍କ",
        globalRank: "ବିଶ୍ୱବ୍ୟାପୀ ର୍ୟାଙ୍କ",
        yourBestRank: "ଆପଣଙ୍କର ସର୍ବୋତ୍ତମ ର୍ୟାଙ୍କ",
        achievements: "ସଫଳତା",

        // Subjects
        physics: "ପଦାର୍ଥ ବିଜ୍ଞାନ",
        chemistry: "ରସାୟନ ବିଜ୍ଞାନ",
        mathematics: "ଗଣିତ",
        biology: "ଜୀବ ବିଜ୍ଞାନ",

        // Levels and Topics
        waveMechanics: "ତରଙ୍ଗ ଯାନ୍ତ୍ରିକ",
        waveBasics: "ତରଙ୍ଗ ମୂଳ ବିଷୟ",
        waveMotion: "ତରଙ୍ଗ ଗତି",
        waveInterference: "ତରଙ୍ଗ ହସ୍ତକ୍ଷେପ",
        standingWaves: "ସ୍ଥିର ତରଙ୍ଗ",
        waveApplications: "ତରଙ୍ଗ ପ୍ରୟୋଗ"
    }
};

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    // Load saved language from localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem('stemquest-language');
        if (savedLanguage && translations[savedLanguage]) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    // Save language to localStorage when changed
    useEffect(() => {
        localStorage.setItem('stemquest-language', currentLanguage);
    }, [currentLanguage]);

    const changeLanguage = (languageCode) => {
        if (translations[languageCode]) {
            setCurrentLanguage(languageCode);
        }
    };

    const t = (key, params = {}) => {
        // Helper to resolve nested keys like 'parent.headerLastActive'
        const resolve = (obj, path) => {
            try {
                return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj);
            } catch {
                return undefined;
            }
        };

        let translation = resolve(translations[currentLanguage], key);
        if (translation === undefined) {
            translation = resolve(translations.en, key);
        }
        if (translation === undefined) {
            translation = key; // fallback to key
        }

        if (typeof translation !== 'string') {
            return translation;
        }

        // Replace parameters in translation (e.g., {current}, {total})
        return translation.replace(/\{(\w+)\}/g, (match, param) => {
            return params[param] !== undefined ? params[param] : match;
        });
    };

    const value = {
        currentLanguage,
        changeLanguage,
        t,
        availableLanguages: {
            en: { flag: '🇺🇸', name: 'English' },
            hi: { flag: '🇮🇳', name: 'हिंदी' },
            or: { flag: '🇮🇳', name: 'ଓଡ଼ିଆ' }
        }
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};