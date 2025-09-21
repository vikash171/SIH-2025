// Test script for IndexedDB integration
import { profileDb } from './src/db.js';

async function testDatabase() {
    console.log('Testing IndexedDB integration...');
    
    try {
        // Test 1: Initialize defaults
        console.log('1. Initializing defaults...');
        await profileDb.initializeDefaults();
        console.log('✓ Defaults initialized');
        
        // Test 2: Get profile data
        console.log('2. Getting profile data...');
        const profile = await profileDb.getUserProfile();
        console.log('✓ Profile data:', profile);
        
        // Test 3: Update profile
        console.log('3. Updating profile...');
        await profileDb.updateProfile('default', {
            name: 'Test User',
            xp: 1500,
            streak: 5
        });
        console.log('✓ Profile updated');
        
        // Test 4: Get updated profile
        console.log('4. Getting updated profile...');
        const updatedProfile = await profileDb.getUserProfile();
        console.log('✓ Updated profile:', updatedProfile);
        
        // Test 5: Test settings
        console.log('5. Testing settings...');
        await profileDb.updateSettings('default', {
            theme: 'calm',
            language: 'hi'
        });
        const settings = await profileDb.getUserSettings();
        console.log('✓ Settings:', settings);
        
        console.log('\n✅ All database tests passed!');
        
    } catch (error) {
        console.error('❌ Database test failed:', error);
    }
}

// Run tests if this script is executed directly
if (typeof window !== 'undefined') {
    window.testDatabase = testDatabase;
    console.log('Database test function loaded. Run testDatabase() in console to test.');
} else {
    testDatabase();
}