import { createContext, useContext, useState, useCallback } from 'react';

const DevToolsContext = createContext();

export function useDevTools() {
    return useContext(DevToolsContext);
}

export function DevToolsProvider({ children }) {
    const [logs, setLogs] = useState([]);
    const [requests, setRequests] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('console'); // 'console' or 'network'

    const addLog = useCallback((type, message, details = null) => {
        const newLog = {
            id: Date.now() + Math.random(),
            timestamp: new Date().toLocaleTimeString(),
            type, // 'error', 'warn', 'info', 'log'
            message,
            details
        };
        setLogs(prev => [...prev, newLog]);
    }, []);

    const addRequest = useCallback((method, url, status, duration, response = null) => {
        const newRequest = {
            id: Date.now() + Math.random(),
            timestamp: new Date().toLocaleTimeString(),
            method,
            url,
            status,
            duration,
            response
        };
        setRequests(prev => [...prev, newRequest]);
    }, []);

    const clearLogs = useCallback(() => setLogs([]), []);
    const clearRequests = useCallback(() => setRequests([]), []);

    const value = {
        logs,
        requests,
        addLog,
        addRequest,
        clearLogs,
        clearRequests,
        isOpen,
        setIsOpen,
        activeTab,
        setActiveTab
    };

    return (
        <DevToolsContext.Provider value={value}>
            {children}
        </DevToolsContext.Provider>
    );
}
