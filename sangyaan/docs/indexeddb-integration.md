# IndexedDB Integration with Dexie.js

## Overview
The application now uses IndexedDB for persistent local storage of user data, powered by Dexie.js. This provides offline capabilities and faster data access.

## Database Schema

### Tables:
1. **userProfile** - Stores user profile information
   - `id`: User identifier (default: 'default')
   - `name`: User's display name
   - `avatar`: User's avatar emoji
   - `level`: User's current level
   - `xp`: Experience points
   - `streak`: Daily streak count
   - `loginMethod`: How user logged in
   - `theme`: Current theme preference
   - `language`: Preferred language
   - `lastActive`: Last activity timestamp

2. **userSettings** - Stores user preferences
   - `id`: User identifier
   - `theme`: UI theme (playful/calm/contrast)
   - `language`: Language preference (en/hi/or)
   - `notifications`: Notification settings
   - `sound`: Sound preferences
   - `autoSave`: Auto-save preferences

3. **userProgress** - Tracks learning progress
   - `id`: Auto-increment ID
   - `userId`: User identifier
   - `subjectId`: Subject identifier
   - `topicId`: Topic identifier
   - `progress`: Progress percentage
   - `completedAt`: Completion timestamp
   - `score`: Achievement score

## Profile Component Integration

### Features Added:
- **Persistent User Data**: Profile information persists across sessions
- **Settings Persistence**: Theme and language preferences are saved
- **Loading States**: Shows loading spinner while data loads
- **Real-time Updates**: Data is saved immediately when changed
- **Offline Support**: Works without internet connection

### Key Functions:
- `profileDb.initializeDefaults()` - Sets up default data
- `profileDb.getUserProfile()` - Retrieves user profile
- `profileDb.saveUserProfile()` - Saves profile data
- `profileDb.updateProfile()` - Updates specific profile fields
- `profileDb.getUserSettings()` - Gets user settings
- `profileDb.updateSettings()` - Updates settings

## Usage Examples

### Saving Profile Data:
```javascript
await profileDb.updateProfile('default', {
    name: 'John Doe',
    xp: 2450,
    streak: 7
});
```

### Updating Theme:
```javascript
await profileDb.updateSettings('default', {
    theme: 'calm'
});
```

### Getting User Data:
```javascript
const profile = await profileDb.getUserProfile();
console.log(profile.name, profile.xp);
```

## Benefits
1. **Offline Functionality**: Data persists without internet
2. **Fast Access**: No network requests needed
3. **User Experience**: Settings and progress are remembered
4. **Privacy**: Data stays on user's device
5. **Performance**: Instant data loading

## Testing
- Use `test-db.js` to test database functionality
- Check browser DevTools > Application > Storage > IndexedDB
- Verify data persistence across page reloads

## Browser Support
Dexie.js supports all modern browsers with IndexedDB:
- Chrome 24+
- Firefox 16+
- Safari 8+
- Edge 12+
- iOS Safari 8+
- Android Browser 4.4+