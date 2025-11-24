import { useState, useEffect, useRef } from 'react';
import { useDevTools } from '../context/DevToolsContext';
import { Terminal, Network, X, Trash2, ChevronUp, ChevronDown, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DevToolsPanel() {
    const {
        logs,
        requests,
        isOpen,
        setIsOpen,
        activeTab,
        setActiveTab,
        clearLogs,
        clearRequests
    } = useDevTools();

    const scrollRef = useRef(null);

    // Auto-scroll to bottom when new logs/requests arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs, requests, activeTab, isOpen]);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-colors z-50 flex items-center gap-2"
            >
                <Terminal size={20} />
                <span className="text-xs font-bold">DevTools</span>
            </button>
        );
    }

    return (
        <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            className="fixed bottom-0 left-0 right-0 h-80 bg-slate-900 text-slate-300 shadow-2xl z-50 flex flex-col border-t border-slate-700 font-mono text-sm"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setActiveTab('console')}
                        className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${activeTab === 'console' ? 'bg-slate-700 text-white' : 'hover:bg-slate-700/50'
                            }`}
                    >
                        <Terminal size={14} />
                        Console
                        {logs.filter(l => l.type === 'error').length > 0 && (
                            <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                                {logs.filter(l => l.type === 'error').length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('network')}
                        className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${activeTab === 'network' ? 'bg-slate-700 text-white' : 'hover:bg-slate-700/50'
                            }`}
                    >
                        <Network size={14} />
                        Network
                        {requests.filter(r => r.status >= 400).length > 0 && (
                            <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                                {requests.filter(r => r.status >= 400).length}
                            </span>
                        )}
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={activeTab === 'console' ? clearLogs : clearRequests}
                        className="p-1.5 hover:bg-slate-700 rounded-md text-slate-400 hover:text-white transition-colors"
                        title="Clear"
                    >
                        <Trash2 size={16} />
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 hover:bg-slate-700 rounded-md text-slate-400 hover:text-white transition-colors"
                    >
                        <ChevronDown size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-2" ref={scrollRef}>
                {activeTab === 'console' ? (
                    <div className="space-y-1">
                        {logs.length === 0 && (
                            <div className="text-slate-500 italic p-2">No logs yet...</div>
                        )}
                        {logs.map((log) => (
                            <div
                                key={log.id}
                                className={`flex items-start gap-2 p-1.5 rounded hover:bg-white/5 ${log.type === 'error' ? 'text-red-400 bg-red-900/10' :
                                        log.type === 'warn' ? 'text-yellow-400 bg-yellow-900/10' :
                                            'text-slate-300'
                                    }`}
                            >
                                <span className="text-slate-500 text-xs mt-0.5 min-w-[60px]">{log.timestamp}</span>
                                <div className="mt-0.5">
                                    {log.type === 'error' && <AlertCircle size={14} />}
                                    {log.type === 'warn' && <AlertTriangle size={14} />}
                                    {log.type === 'info' && <Info size={14} />}
                                </div>
                                <div className="flex-1 break-all">
                                    <span className="font-bold mr-2">[{log.type.toUpperCase()}]</span>
                                    {log.message}
                                    {log.details && (
                                        <pre className="mt-1 text-xs opacity-70 overflow-x-auto">
                                            {JSON.stringify(log.details, null, 2)}
                                        </pre>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="table w-full text-left border-collapse">
                        <div className="table-header-group">
                            <div className="table-row text-slate-500 text-xs border-b border-slate-700">
                                <div className="table-cell p-2">Status</div>
                                <div className="table-cell p-2">Method</div>
                                <div className="table-cell p-2 w-full">Name</div>
                                <div className="table-cell p-2">Time</div>
                            </div>
                        </div>
                        <div className="table-row-group">
                            {requests.length === 0 && (
                                <div className="table-row">
                                    <div className="table-cell p-4 text-slate-500 italic" colSpan={4}>No requests recorded...</div>
                                </div>
                            )}
                            {requests.map((req) => (
                                <div
                                    key={req.id}
                                    className={`table-row hover:bg-white/5 ${req.status >= 400 ? 'text-red-400' : 'text-green-400'
                                        }`}
                                >
                                    <div className="table-cell p-2 font-bold">{req.status}</div>
                                    <div className="table-cell p-2 text-slate-300">{req.method}</div>
                                    <div className="table-cell p-2 text-slate-300 break-all">{req.url}</div>
                                    <div className="table-cell p-2 text-slate-500">{req.duration}ms</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
