"use client";

import { useState, useRef, useCallback, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// Message types
interface Message {
    id: string;
    sender: "user" | "alex" | "sarah" | "max" | "leo" | "system";
    content: string;
    timestamp: string;
    data?: {
        runway?: string;
        impact?: string;
    };
}

// AI Agent info
const AI_AGENTS = {
    alex: {
        name: "Alex",
        role: "Chiến Lược",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuClcHNEtXAQ3HmaT1BAx6MhhwF73RbPjMtVosXsiclYCCj8VvdPla4fRNKvDcqE8Tg0YsIsZqY6T9LeNSwRD9oM-my3QxEECNDvCtJhmkfviKlRby5syL-oRS9CCrxWPrT4BvNNuqqvnUDVwG5E88-U5d39HHQbZJnywUCU8was636BdQJPvFQBqUChGSGzcf01TLwOkpqd6S8Cc4gVpKO39G7gaNNPXT50qdoeVsaJhTygr7aCrqhgx8On0qeLYcJe3a0y9UlKzQg",
        icon: "bolt",
    },
    sarah: {
        name: "Sarah",
        role: "Tài Chính",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVXFU95WCqJ_4935_OhxawJRp9V3MMnSsYoA6I8ft-AKFKTdtap8EPDEnUW_gUNIRni6NxVKXPoqlczBY6Udj8vK0CAVJBfG7-ggp5s-l9HsouGLDsJ5BFgNY6hcTqc0iB2HtCyxwBg-rVgVBwVdaPhwi5qsrNK1eKXSOjIuFAlOsXtl1lBZXp78qo0FQzJtcwWqkC15dxCiYgJxEkduFgJUA9qyJkmkJtfAtfAcVdN1JdXEPlcosFv8Dvm8js5XOAbsHk_2eqZKg",
        icon: "account_balance",
    },
    max: {
        name: "Max",
        role: "Nhân Sự",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4btv7z2FGlJ0xmWGbs5MJrZ5tc0XYaasIPAm5ennP8KXnutyXDM1SGSGHbbf385M4zJ8yFp0TelMI9ie7uMXNCvitS-6rwpGsNgzH00kU1Lr6EKmpNxJXSvqLUoGIV0Yer6wpFzwmWOHR2u07Jp-Sa2axE7-OjCa4QRmVA7Z_6zH0I8cb7Hv5eNIPDc4RqiCxxQiOjnnsTuoQtyncKNYqOdbT2_F6EbzBzxmf3fbJFWwUUmUCDfM73WZpFY9JcG7DKWxZ5_ZBm94",
        icon: "groups",
    },
    leo: {
        name: "Leo",
        role: "Thị Trường",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNglPLMppBNxTkFyyB078eW9i0iJt5M_rFFDl3zfO0AzRDeh3vraZIk09UnSo3QNhOHu_sigWVH7U88N1lkHweX1dsvBk6w8qt3zDV4qkKIIFx06Stoz6G384KRQlIGx-iI-vViFNe4TwOIuzxJR3DDaxXCTiXTm1DqP-Wf2S8o24_3FLyOFlogRU0m2Vc7UXunB6u0zUYlaacTtebrOgkmOBUmKS4CxSlQky6CFznnWQcpqS6aszB-nU4XyLEbk4YNt1zij8u37A",
        icon: "public",
    },
};

// Initial messages
const initialMessages: Message[] = [
    {
        id: "system-1",
        sender: "system",
        content: "Phòng hội chẩn đã sẵn sàng",
        timestamp: "10:00",
    },
];

// Mock AI responses based on keywords
const AI_RESPONSES: { keywords: string[]; agent: keyof typeof AI_AGENTS; response: string; data?: Message["data"] }[] = [
    {
        keywords: ["tài chính", "doanh thu", "chi phí", "ngân sách", "q1", "quý"],
        agent: "sarah",
        response: "Tôi đã phân tích dữ liệu tài chính Q1. Bạn có muốn xem báo cáo chi tiết không?",
        data: { runway: "18 Tháng", impact: "-1.2 Tháng" },
    },
    {
        keywords: ["nhân sự", "tuyển dụng", "nhân viên", "team"],
        agent: "max",
        response: "Theo phân tích của tôi, đội ngũ hiện tại đang thiếu 2 vị trí senior developer. Tôi đề xuất mở đợt tuyển dụng trong tháng tới.",
    },
    {
        keywords: ["thị trường", "đối thủ", "cạnh tranh", "xu hướng"],
        agent: "leo",
        response: "Dựa trên dữ liệu thị trường, đối thủ chính đang tập trung vào AI. Tôi khuyến nghị tăng đầu tư R&D trong Q2.",
    },
    {
        keywords: ["chiến lược", "kế hoạch", "mục tiêu", "tăng trưởng"],
        agent: "alex",
        response: "Quỹ đạo tăng trưởng hiện tại ủng hộ việc mở rộng. Tuy nhiên, tôi đề xuất tập trung vào 3 thị trường trọng điểm trước.",
    },
];

// Default response
const DEFAULT_RESPONSE: { agent: keyof typeof AI_AGENTS; response: string; data?: Message["data"] } = {
    agent: "sarah" as keyof typeof AI_AGENTS,
    response: "Tôi đã phân tích dữ liệu tài chính Q1. Bạn có muốn xem báo cáo chi tiết không?",
    data: undefined,
};

// Typing indicator component
function TypingIndicator({ agent }: { agent: keyof typeof AI_AGENTS }) {
    const agentInfo = AI_AGENTS[agent];
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-end gap-3"
        >
            <div className="size-9 rounded-full border border-blue-600/30 p-0.5 bg-white shadow-sm shrink-0 overflow-hidden">
                <img className="w-full h-full rounded-full object-cover" src={agentInfo.avatar} alt={agentInfo.name} />
            </div>
            <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-bold text-blue-600 tracking-wide">{agentInfo.name} đang nhập...</span>
                <div className="bg-white border border-slate-100 px-4 py-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-1">
                    <motion.div
                        className="size-2 rounded-full bg-blue-600"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                        className="size-2 rounded-full bg-blue-600"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                        className="size-2 rounded-full bg-blue-600"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default function WarRoomPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [typingAgent, setTypingAgent] = useState<keyof typeof AI_AGENTS>("sarah");
    const [sessionTime, setSessionTime] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Session timer
    useEffect(() => {
        const interval = setInterval(() => {
            setSessionTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatSessionTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    // Auto-scroll to bottom
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    // Find matching AI response
    const findAIResponse = useCallback((userMessage: string) => {
        const lowerMessage = userMessage.toLowerCase();
        const match = AI_RESPONSES.find((r) => r.keywords.some((k) => lowerMessage.includes(k)));
        return match || DEFAULT_RESPONSE;
    }, []);

    // Send message
    const handleSendMessage = useCallback(() => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            sender: "user",
            content: inputValue.trim(),
            timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");

        // Find appropriate AI response
        const aiResponse = findAIResponse(inputValue);
        setTypingAgent(aiResponse.agent);
        setIsTyping(true);

        // Simulate typing delay (1.5-2.5 seconds)
        const typingDelay = 1500 + Math.random() * 1000;

        setTimeout(() => {
            const aiMessage: Message = {
                id: `${aiResponse.agent}-${Date.now()}`,
                sender: aiResponse.agent,
                content: aiResponse.response,
                timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                data: aiResponse.data,
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, typingDelay);
    }, [inputValue, isTyping, findAIResponse]);

    // Handle key press
    const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    // Quick action handlers
    const handleQuickAction = useCallback((action: string) => {
        setInputValue(action);
        inputRef.current?.focus();
    }, []);

    return (
        <div className="bg-white text-slate-800 font-sans h-screen flex flex-col overflow-hidden selection:bg-blue-200 selection:text-blue-600">
            {/* Background Mesh */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{
                backgroundColor: '#ffffff',
                backgroundImage: `
          radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.05) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(37, 99, 235, 0.05) 0px, transparent 50%)
        `
            }}></div>

            {/* Header */}
            <header className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                        <span className="material-symbols-outlined text-2xl">hub</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-wide text-slate-800">BusinessOS <span className="text-slate-300 mx-1">/</span> <span className="text-blue-600">Phòng Hội Chẩn AI</span></h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex space-x-1">
                            <div className="size-1.5 rounded-full bg-green-500 animate-bounce"></div>
                            <div className="size-1.5 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="size-1.5 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase ml-1">Trực tuyến • {formatSessionTime(sessionTime)}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="size-10 rounded-lg bg-white shadow-[4px_4px_10px_#e2e8f0,-4px_-4px_10px_#ffffff] border border-slate-100 text-slate-400 hover:text-blue-600" onClick={() => alert('settings')}>
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                    </Button>
                    <div className="size-10 rounded-lg ring-1 ring-slate-200 p-0.5">
                        <div className="w-full h-full rounded-md bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDp4WFWLNR_qKoMkj8U8Qz1RR9boA79buOBA2nDP4oPwkC4Wqf8EJDfecRTSvVdnIj_uHdmKNDW9lNcRji0Himb5gblceL6VyKX7QjiyB5IiAXaeJ55dZptZFQIAotmodqsUDaMpPOmnuRfdAzOuDAE3KWuMVzFEaBA8cb4tv7FEeLHg0ag1np7b2Pl0iI3oq5xW8a2uRrxwa2JeowyQuOeZMY6vcnFxYnxwhwR5h5STFmVFeXLnem9x6PYz4ReltnUrCEEuLwDIY4')" }}></div>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="relative z-10 flex-1 flex items-center justify-center w-full h-full p-6 overflow-hidden">
                {/* AI Avatars - Top Left */}
                <div className="absolute top-12 left-12 hidden xl:flex flex-col items-center gap-3 group">
                    <div className="relative">
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-blue-600/30"
                            animate={typingAgent === "alex" && isTyping ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <div className="size-20 rounded-full border border-blue-600 bg-white flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(37,99,235,0.3)] z-10 relative">
                            <img alt="Alex AI Avatar" className="w-full h-full object-cover" src={AI_AGENTS.alex.avatar} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-blue-600 shadow-sm z-20">
                            <span className="material-symbols-outlined text-xs text-blue-600">{AI_AGENTS.alex.icon}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-800 tracking-wider uppercase">{AI_AGENTS.alex.name}</p>
                        <p className="text-[10px] text-blue-600 font-medium tracking-wide border border-blue-200 px-2 py-0.5 rounded-lg bg-blue-50 mt-1">{AI_AGENTS.alex.role.toUpperCase()}</p>
                    </div>
                </div>

                {/* AI Avatars - Top Right */}
                <div className="absolute top-12 right-12 hidden xl:flex flex-col items-center gap-3 group">
                    <div className="relative">
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-blue-600/30"
                            animate={typingAgent === "sarah" && isTyping ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <div className="size-20 rounded-full border border-blue-600 bg-white flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(37,99,235,0.3)] z-10 relative">
                            <img alt="Sarah AI Avatar" className="w-full h-full object-cover" src={AI_AGENTS.sarah.avatar} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-blue-600 shadow-sm z-20">
                            <span className="material-symbols-outlined text-xs text-blue-600">{AI_AGENTS.sarah.icon}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-800 tracking-wider uppercase">{AI_AGENTS.sarah.name}</p>
                        <div className="flex flex-col items-center mt-1">
                            <p className="text-[10px] text-blue-600 font-medium tracking-wide border border-blue-200 px-2 py-0.5 rounded-lg bg-blue-50">{AI_AGENTS.sarah.role.toUpperCase()}</p>
                            {typingAgent === "sarah" && isTyping && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[10px] text-blue-600/70 animate-pulse mt-1"
                                >
                                    Đang nói...
                                </motion.p>
                            )}
                        </div>
                    </div>
                </div>

                {/* AI Avatars - Bottom Left */}
                <div className="absolute bottom-12 left-12 hidden xl:flex flex-col-reverse items-center gap-3 group">
                    <div className="relative">
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-blue-600/30"
                            animate={typingAgent === "max" && isTyping ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <div className="size-20 rounded-full border border-blue-600 bg-white flex items-center justify-center overflow-hidden shadow-md relative">
                            <img alt="Max AI Avatar" className="w-full h-full object-cover" src={AI_AGENTS.max.avatar} />
                        </div>
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 border border-blue-600 shadow-sm">
                            <span className="material-symbols-outlined text-xs text-blue-600">{AI_AGENTS.max.icon}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-800 tracking-wider uppercase">{AI_AGENTS.max.name}</p>
                        <p className="text-[10px] text-blue-600 font-medium tracking-wide border border-blue-200 px-2 py-0.5 rounded-lg bg-blue-50 mt-1">{AI_AGENTS.max.role.toUpperCase()}</p>
                    </div>
                </div>

                {/* AI Avatars - Bottom Right */}
                <div className="absolute bottom-12 right-12 hidden xl:flex flex-col-reverse items-center gap-3 group">
                    <div className="relative">
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-blue-600/30"
                            animate={typingAgent === "leo" && isTyping ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <div className="size-20 rounded-full border border-blue-600 bg-white flex items-center justify-center overflow-hidden shadow-md relative">
                            <img alt="Leo AI Avatar" className="w-full h-full object-cover" src={AI_AGENTS.leo.avatar} />
                        </div>
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 border border-blue-600 shadow-sm">
                            <span className="material-symbols-outlined text-xs text-blue-600">{AI_AGENTS.leo.icon}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-800 tracking-wider uppercase">{AI_AGENTS.leo.name}</p>
                        <p className="text-[10px] text-blue-600 font-medium tracking-wide border border-blue-200 px-2 py-0.5 rounded-lg bg-blue-50 mt-1">{AI_AGENTS.leo.role.toUpperCase()}</p>
                    </div>
                </div>

                {/* Main Chat Panel */}
                <div className="w-full max-w-4xl h-full max-h-[85vh] rounded-lg flex flex-col relative z-20 bg-white/65 backdrop-blur-[20px] border border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                    {/* Panel Header */}
                    <div className="p-6 border-b border-slate-200 flex flex-col items-center justify-center shrink-0 bg-white/50 rounded-t-lg">
                        <h2 className="text-lg font-bold text-slate-800 tracking-wide uppercase">Trung Tâm Điều Hành</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <p className="text-slate-500 text-xs font-mono">4 AI Agents đang hoạt động</p>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-white/30">
                        <AnimatePresence>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {msg.sender === "system" ? (
                                        <div className="flex justify-center my-4">
                                            <div className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 flex items-center gap-2 shadow-sm">
                                                <span className="material-symbols-outlined text-sm text-green-600">verified</span>
                                                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">{msg.content}</span>
                                            </div>
                                        </div>
                                    ) : msg.sender === "user" ? (
                                        <div className="flex flex-row-reverse items-end gap-3 group">
                                            <div className="size-9 rounded-md bg-blue-600 flex items-center justify-center shadow-sm shrink-0">
                                                <span className="material-symbols-outlined text-white text-lg">person</span>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 max-w-[80%]">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                                                    <span className="text-xs font-bold text-slate-700">Bạn (CEO)</span>
                                                </div>
                                                <div className="bg-gray-100 border border-slate-200 p-4 rounded-lg rounded-tr-none text-slate-700 shadow-sm">
                                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-end gap-3">
                                            <div className="size-9 rounded-full border border-blue-600/30 p-0.5 bg-white shadow-sm shrink-0 overflow-hidden">
                                                <img className="w-full h-full rounded-full object-cover" src={AI_AGENTS[msg.sender].avatar} alt={AI_AGENTS[msg.sender].name} />
                                            </div>
                                            <div className="flex flex-col items-start gap-1 max-w-[85%]">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-blue-600 tracking-wide">{AI_AGENTS[msg.sender].name} ({AI_AGENTS[msg.sender].role})</span>
                                                    <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                                                </div>
                                                <div className="bg-white border border-slate-100 p-4 rounded-lg rounded-tl-none text-slate-600 shadow-sm border-l-4 border-l-blue-600">
                                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                                    {msg.data && (
                                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                                            {msg.data.runway && (
                                                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Runway Hiện tại</p>
                                                                    <p className="text-lg font-bold text-slate-800 font-mono">{msg.data.runway}</p>
                                                                </div>
                                                            )}
                                                            {msg.data.impact && (
                                                                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                                                                    <p className="text-[10px] uppercase tracking-widest text-red-400 mb-1">Tác động</p>
                                                                    <p className="text-lg font-bold text-red-500 font-mono">{msg.data.impact}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Typing Indicator */}
                        <AnimatePresence>
                            {isTyping && <TypingIndicator agent={typingAgent} />}
                        </AnimatePresence>

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-5 bg-white border-t border-slate-200 shrink-0 z-30 rounded-b-lg">
                        <div className="relative mb-5 group">
                            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-lg focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600/20 transition-all shadow-inner">
                                <button className="p-4 text-slate-400 hover:text-blue-600 transition-colors" onClick={() => {}}>
                                    <span className="material-symbols-outlined">mic</span>
                                </button>
                                <Input
                                    ref={inputRef}
                                    className="w-full bg-transparent border-none placeholder-slate-400 focus:ring-0 text-sm py-4 px-2"
                                    placeholder="Hỏi các trợ lý AI về dữ liệu, chiến lược hoặc phê duyệt..."
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    disabled={isTyping}
                                />
                                <Button
                                    variant="primary"
                                    size="icon"
                                    className="mr-2 rounded-lg shadow-lg shadow-blue-200"
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim() || isTyping}
                                >
                                    <span className="material-symbols-outlined text-xl">arrow_upward</span>
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={() => handleQuickAction("Tạo việc làm mới cho team Marketing")}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wide bg-white shadow-[4px_4px_10px_#e2e8f0,-4px_-4px_10px_#ffffff] border border-slate-100 text-slate-500 hover:text-blue-600 hover:-translate-y-0.5 transition-all group"
                            >
                                <span className="material-symbols-outlined text-xl text-blue-600 group-hover:scale-110 transition-transform">add_circle</span>
                                Tạo việc làm
                            </button>
                            <button
                                onClick={() => handleQuickAction("Duyệt ngân sách Q2 cho phòng IT")}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wide bg-white shadow-[4px_4px_10px_#e2e8f0,-4px_-4px_10px_#ffffff] border border-slate-100 text-slate-500 hover:text-blue-600 hover:-translate-y-0.5 transition-all group"
                            >
                                <span className="material-symbols-outlined text-xl text-green-500 group-hover:scale-110 transition-transform">check_circle</span>
                                Duyệt ngân sách
                            </button>
                            <button
                                onClick={() => handleQuickAction("Xem báo cáo tài chính Q1")}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wide bg-white shadow-[4px_4px_10px_#e2e8f0,-4px_-4px_10px_#ffffff] border border-slate-100 text-slate-500 hover:text-blue-600 hover:-translate-y-0.5 transition-all group"
                            >
                                <span className="material-symbols-outlined text-xl text-purple-500 group-hover:scale-110 transition-transform">description</span>
                                Xem báo cáo
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
