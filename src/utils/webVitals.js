import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import { trackEvent } from '../lib/firebase';

/**
 * Reports Web Vitals to Firebase Analytics
 * @param {Object} metric - Web Vital metric object
 */
function sendToAnalytics(metric) {
    const { name, value, rating, id } = metric;
    
    // Log to console in development
    if (import.meta.env.DEV) {
        console.log(`[Web Vitals] ${name}:`, {
            value: Math.round(value),
            rating,
            id
        });
    }

    // Send to Firebase Analytics
    trackEvent('web_vitals', {
        metric_name: name,
        metric_value: Math.round(value),
        metric_rating: rating,
        metric_id: id,
    });
}

/**
 * Initialize Web Vitals monitoring
 */
export function initWebVitals() {
    // Core Web Vitals
    onCLS(sendToAnalytics); // Cumulative Layout Shift
    onINP(sendToAnalytics); // Interaction to Next Paint (replaces FID)
    onLCP(sendToAnalytics); // Largest Contentful Paint

    // Other important metrics
    onFCP(sendToAnalytics); // First Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte
}

/**
 * Track custom performance metrics
 */
export function trackCustomMetric(name, value, unit = 'ms') {
    trackEvent('custom_metric', {
        metric_name: name,
        metric_value: Math.round(value),
        metric_unit: unit,
    });
}

/**
 * Measure and track a function execution time
 */
export async function measurePerformance(name, fn) {
    const startTime = performance.now();
    
    try {
        const result = await fn();
        const duration = performance.now() - startTime;
        trackCustomMetric(name, duration);
        return result;
    } catch (error) {
        const duration = performance.now() - startTime;
        trackCustomMetric(`${name}_error`, duration);
        throw error;
    }
}

