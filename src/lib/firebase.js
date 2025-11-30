import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

// DevHub Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnLzlxOvEc6q9TvOdCfusuCTw4A2d00vE",
  authDomain: "app-qa-devhub.firebaseapp.com",
  projectId: "app-qa-devhub",
  storageBucket: "app-qa-devhub.firebasestorage.app",
  messagingSenderId: "758417977322",
  appId: "1:758417977322:web:401f37410a64407f8f4c93",
  measurementId: "G-7EBX1Y2PTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser and if supported)
let analytics = null;
let performance = null;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      performance = getPerformance(app);
    }
  });
}

// Analytics Helper Functions
export const trackEvent = (eventName, params = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

export const trackPageView = (pageName) => {
  trackEvent('page_view', { page_name: pageName });
};

export const trackUserAction = (action, category, label, value) => {
  trackEvent('user_action', {
    action,
    category,
    label,
    value
  });
};

export { analytics, performance };
