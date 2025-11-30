// Test script to verify Firebase connection
// Run with: node test-firebase-connection.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// DevHub Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBnLzlxOvEc6q9TvOdCfusuCTw4A2d00vE",
    authDomain: "app-qa-devhub.firebaseapp.com",
    projectId: "app-qa-devhub",
    storageBucket: "app-qa-devhub.firebasestorage.app",
    messagingSenderId: "758417977322",
    appId: "1:758417977322:web:401f37410a64407f8f4c93",
    measurementId: "G-7EBX1Y2PTH"
};

async function testConnection() {
    try {
        console.log('🔄 Initializing Firebase...');
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        console.log('✅ Firebase initialized successfully!');
        console.log('📊 Project ID:', firebaseConfig.projectId);

        // Test write to users_test collection
        console.log('\n🔄 Testing write to users_test...');
        const testUser = {
            name: 'Test User',
            xp: 0,
            level: 1,
            badges: [],
            createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, 'users_test'), testUser);
        console.log('✅ Test document created with ID:', docRef.id);

        // Test read from users_test collection
        console.log('\n🔄 Testing read from users_test...');
        const querySnapshot = await getDocs(collection(db, 'users_test'));
        console.log('✅ Found', querySnapshot.size, 'documents');

        querySnapshot.forEach((doc) => {
            console.log('  📄', doc.id, '=>', doc.data());
        });

        console.log('\n🎉 All tests passed! Firebase connection is working!');

    } catch (error) {
        console.error('❌ Error:', error.code);
        console.error('   Message:', error.message);

        if (error.code === 'permission-denied') {
            console.log('\n💡 Tip: Check your Firestore Security Rules');
        } else if (error.code === 'invalid-api-key') {
            console.log('\n💡 Tip: Check your API key in firebaseConfig');
        }
    }
}

testConnection();
