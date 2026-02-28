"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { formatVND } from "@/lib/mock-data";

interface ApprovalRequest {
    id: string;
    type: string;
    requester: string;
    department: string;
    timeAgo: string;
    title: string;
    description: string;
    amount: number;
    amountDisplay: string;
    attachment: { name: string; size: string; type: string };
    bgImage: string;
    avatar: string;
}

const initialRequests: ApprovalRequest[] = [
    {
        id: "1",
        type: "Yêu cầu thanh toán",
        requester: "Nguyễn Văn A",
        department: "Phòng Marketing",
        timeAgo: "2 giờ trước",
        title: "Thanh toán: Dự án SEO Quý 3 Giai đoạn 1",
        description: "Duyệt ngân sách triển khai SEO Q3 bao gồm viết nội dung và dịch vụ outreach backlink theo hợp đồng số #SEO-2023-09.",
        amount: 5000000,
        amountDisplay: "5.000.000đ",
        attachment: { name: "hoadon_seo_q3.pdf", size: "1.2 MB", type: "Hóa đơn" },
        bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
        id: "2",
        type: "Chi phí sự kiện",
        requester: "Trần Thị B",
        department: "Phòng Nhân sự",
        timeAgo: "4 giờ trước",
        title: "Chi phí tổ chức Team Building Q4",
        description: "Đề xuất chi phí tổ chức hoạt động gắn kết nhân viên cuối năm tại resort Vũng Tàu cho 50 người.",
        amount: 25000000,
        amountDisplay: "25.000.000đ",
        attachment: { name: "baogia_resort.pdf", size: "2.8 MB", type: "Báo giá" },
        bgImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
        avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: "3",
        type: "Mua sắm thiết bị",
        requester: "Lê Văn C",
        department: "Phòng IT",
        timeAgo: "1 ngày trước",
        title: "Mua 10 Macbook Pro cho Dev Team",
        description: "Nâng cấp thiết bị cho đội phát triển phần mềm để đáp ứng yêu cầu dự án mới sử dụng AI.",
        amount: 450000000,
        amountDisplay: "450.000.000đ",
        attachment: { name: "quotation_apple.pdf", size: "3.1 MB", type: "Báo giá" },
        bgImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
        avatar: "https://i.pravatar.cc/150?img=8",
    },
];

const SWIPE_THRESHOLD = 100;
const LOW_BALANCE_THRESHOLD = 50000000;

export default function SwipeApprovalPage() {
    const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests);
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

    // Use stable selectors - get the value directly, not action hooks
    const walletBalance = useStore((state) => state.wallet.balance);
    const isLowBalance = walletBalance < LOW_BALANCE_THRESHOLD;

    // Use refs for the current request to avoid stale closures
    const requestsRef = useRef(requests);
    requestsRef.current = requests;

    const handleSwipe = useCallback((direction: "left" | "right", request: ApprovalRequest) => {
        // Get store methods directly from store
        const store = useStore.getState();

        setSwipeDirection(direction);

        if (direction === "right") {
            const success = store.deduct(request.amount);

            if (success) {
                const newBalance = useStore.getState().wallet.balance;
                toast.success(
                    `Đã duyệt chi phí ${request.department}!`,
                    {
                        description: `Số dư còn lại: ${formatVND(newBalance)}`,
                        icon: "✅",
                    }
                );

                store.addNotification({
                    type: "payment",
                    title: `Đã duyệt: ${request.title}`,
                    description: `Thanh toán ${request.amountDisplay} cho ${request.requester}`,
                    timestamp: new Date().toISOString(),
                    read: false,
                });
            } else {
                toast.error("Số dư không đủ!", {
                    description: `Cần ${request.amountDisplay} nhưng chỉ còn ${formatVND(store.wallet.balance)}`,
                    icon: "❌",
                });
                setSwipeDirection(null);
                return;
            }
        } else {
            toast.info(`Đã từ chối đề xuất`, {
                description: `${request.title} - ${request.requester}`,
                icon: "🚫",
            });

            store.addNotification({
                type: "system",
                title: `Đã từ chối: ${request.title}`,
                description: `Yêu cầu của ${request.requester} đã bị từ chối`,
                timestamp: new Date().toISOString(),
                read: false,
            });
        }

        setTimeout(() => {
            setRequests((prev) => prev.slice(1));
            setSwipeDirection(null);
        }, 300);
    }, []);

    const handleApprove = useCallback(() => {
        if (requestsRef.current[0]) {
            handleSwipe("right", requestsRef.current[0]);
        }
    }, [handleSwipe]);

    const handleReject = useCallback(() => {
        if (requestsRef.current[0]) {
            handleSwipe("left", requestsRef.current[0]);
        }
    }, [handleSwipe]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (requestsRef.current.length === 0) return;
            if (e.key === "ArrowLeft") handleReject();
            if (e.key === "ArrowRight") handleApprove();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleApprove, handleReject]);

    const currentRequest = requests[0];
    const progress = initialRequests.length - requests.length + 1;
    const total = initialRequests.length;

    return (
        <div className="bg-white font-sans text-slate-800 overflow-hidden h-screen flex flex-col selection:bg-blue-200 selection:text-white">
            <Toaster richColors position="top-center" />

            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-100 px-10 py-3 bg-white z-50 relative shrink-0 shadow-sm">
                <div className="flex items-center gap-4 text-slate-900">
                    <div className="size-6 text-blue-500">
                        <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>grid_view</span>
                    </div>
                    <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">BusinessOS · Chế độ Virtual</h2>
                </div>

                {/* Wallet Balance Display */}
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isLowBalance ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                        <span className={`material-symbols-outlined ${isLowBalance ? 'text-red-500' : 'text-green-600'}`} style={{ fontSize: "20px" }}>
                            account_balance_wallet
                        </span>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500">Số dư</span>
                            <span className={`text-sm font-bold ${isLowBalance ? 'text-red-600' : 'text-green-700'}`}>
                                {formatVND(walletBalance)}
                            </span>
                        </div>
                        {isLowBalance && (
                            <span className="material-symbols-outlined text-red-500 animate-pulse" style={{ fontSize: "18px" }}>
                                warning
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="flex items-center px-3 py-1 bg-green-50 rounded-full border border-green-100 gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-green-700">Kết nối trực tuyến</span>
                    </div>
                    <Button variant="secondary" onClick={() => alert('Thoát chế độ')}><span className="truncate">Thoát chế độ</span></Button>
                    <Button variant="ghost" size="icon" className="size-10 border border-slate-200" onClick={() => alert('settings')}>
                        <span className="material-symbols-outlined text-slate-500" style={{ fontSize: "20px" }}>settings</span>
                    </Button>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 relative flex flex-col items-center justify-center w-full overflow-hidden bg-white">
                {/* Background Blobs */}
                <div className={`absolute w-[600px] h-[600px] ${isLowBalance ? 'bg-red-500' : 'bg-blue-500'} top-[-10%] left-[-10%] rounded-full blur-[80px] opacity-[0.15] z-0 transition-colors duration-500`}></div>
                <div className={`absolute w-[500px] h-[500px] ${isLowBalance ? 'bg-orange-400' : 'bg-purple-400'} bottom-[-10%] right-[-5%] rounded-full blur-[80px] opacity-[0.15] z-0 transition-colors duration-500`}></div>

                {/* Swipe Glow Effects */}
                <AnimatePresence>
                    {swipeDirection === "right" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-green-500/20 z-5 pointer-events-none"
                        />
                    )}
                    {swipeDirection === "left" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-red-500/20 z-5 pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                {/* Progress */}
                <div className="absolute top-8 z-20 w-full max-w-[360px]">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-6 justify-between items-end px-2">
                            <p className="text-slate-500 text-sm font-medium leading-normal tracking-wide uppercase">CẦN PHÊ DUYỆT</p>
                            <p className="text-blue-500 text-xs font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                {requests.length > 0 ? progress : total} / {total}
                            </p>
                        </div>
                        <div className="rounded-full bg-slate-100 h-1.5 overflow-hidden">
                            <motion.div
                                className="h-full rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(progress / total) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Card Stack */}
                <div className="relative w-full max-w-[400px] aspect-[3/4] z-10 flex flex-col items-center justify-center">
                    {requests.length > 2 && (
                        <div className="absolute top-4 w-[90%] h-full bg-white rounded-lg border border-slate-200 shadow-sm scale-[0.92] translate-y-4 opacity-60"></div>
                    )}
                    {requests.length > 1 && (
                        <div className="absolute top-2 w-[95%] h-full bg-white rounded-lg border border-slate-200 shadow-md scale-[0.96] translate-y-2 opacity-80"></div>
                    )}

                    <AnimatePresence mode="popLayout">
                        {currentRequest && (
                            <SwipeCard
                                key={currentRequest.id}
                                request={currentRequest}
                                walletBalance={walletBalance}
                                onSwipeLeft={handleReject}
                                onSwipeRight={handleApprove}
                            />
                        )}
                    </AnimatePresence>

                    {requests.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center p-8"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-green-600" style={{ fontSize: "40px" }}>check_circle</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Hoàn thành!</h3>
                            <p className="text-slate-500 mb-4">Bạn đã xử lý hết các yêu cầu phê duyệt.</p>
                            <p className="text-sm text-slate-600">
                                Số dư cuối: <span className="font-bold text-green-600">{formatVND(walletBalance)}</span>
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Action Buttons */}
                {requests.length > 0 && (
                    <div className="flex items-center justify-center gap-10 mt-8 z-20">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleReject}
                            className="group flex items-center justify-center w-20 h-20 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-200 hover:bg-red-50 hover:border-red-200 hover:shadow-red-100 transition-all duration-300"
                        >
                            <span className="material-symbols-outlined text-red-500 transition-colors" style={{ fontSize: "36px", fontVariationSettings: "'wght' 600" }}>close</span>
                        </motion.button>
                        <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-50 hover:scale-105 transition-all text-slate-400 hover:text-slate-900" onClick={() => {}}>
                            <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>history</span>
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleApprove}
                            className="group flex items-center justify-center w-20 h-20 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-200 hover:bg-green-50 hover:border-green-200 hover:shadow-green-100 transition-all duration-300"
                        >
                            <span className="material-symbols-outlined text-green-600 transition-colors" style={{ fontSize: "36px", fontVariationSettings: "'wght' 600" }}>check</span>
                        </motion.button>
                    </div>
                )}

                {/* Keyboard Hints */}
                <div className="mt-8 flex gap-8 opacity-40">
                    <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded bg-slate-100 border border-slate-300 text-xs font-mono text-slate-500">←</kbd>
                        <span className="text-xs text-slate-500 font-medium">Từ chối</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">Đồng ý</span>
                        <kbd className="px-2 py-1 rounded bg-slate-100 border border-slate-300 text-xs font-mono text-slate-500">→</kbd>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Swipeable Card Component
function SwipeCard({
    request,
    walletBalance,
    onSwipeLeft,
    onSwipeRight,
}: {
    request: ApprovalRequest;
    walletBalance: number;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

    const approveOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
    const rejectOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

    const canAfford = walletBalance >= request.amount;

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > SWIPE_THRESHOLD) {
            onSwipeRight();
        } else if (info.offset.x < -SWIPE_THRESHOLD) {
            onSwipeLeft();
        }
    };

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            style={{ x, rotate, opacity }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: x.get() > 0 ? 300 : -300, opacity: 0, transition: { duration: 0.2 } }}
            className="w-full h-full rounded-lg flex flex-col overflow-hidden relative cursor-grab active:cursor-grabbing bg-white/70 backdrop-blur-[16px] border border-blue-500 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)]"
        >
            {/* Approve Indicator */}
            <motion.div
                style={{ opacity: approveOpacity }}
                className="absolute inset-0 border-4 border-green-500 rounded-lg z-30 pointer-events-none"
            >
                <div className="absolute top-6 left-6 px-4 py-2 bg-green-500 text-white font-bold rounded-lg rotate-[-15deg]">
                    ĐỒNG Ý
                </div>
            </motion.div>

            {/* Reject Indicator */}
            <motion.div
                style={{ opacity: rejectOpacity }}
                className="absolute inset-0 border-4 border-red-500 rounded-lg z-30 pointer-events-none"
            >
                <div className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white font-bold rounded-lg rotate-[15deg]">
                    TỪ CHỐI
                </div>
            </motion.div>

            {/* Card Header Image */}
            <div className="h-[45%] w-full relative bg-slate-100">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${request.bgImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-wide uppercase">
                        {request.type}
                    </span>
                </div>

                {!canAfford && (
                    <div className="absolute top-6 right-6">
                        <span className="px-3 py-1 rounded-lg bg-red-500/90 backdrop-blur-md text-xs font-bold text-white">
                            ⚠️ Không đủ số dư
                        </span>
                    </div>
                )}

                <div className="absolute -bottom-8 left-6">
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-slate-200 shadow-md">
                        <img className="w-full h-full object-cover" alt={`Portrait of ${request.requester}`} src={request.avatar} />
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="flex-1 px-6 pt-10 pb-6 flex flex-col justify-between items-start bg-white/80">
                <div className="w-full">
                    <div className="flex justify-between items-start w-full mb-1">
                        <div>
                            <h3 className="text-slate-900 text-sm font-semibold">{request.requester} · {request.department}</h3>
                            <p className="text-slate-500 text-xs">{request.timeAgo}</p>
                        </div>
                        <button className="text-slate-400 hover:text-blue-500 transition-colors" onClick={() => {}}>
                            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>info</span>
                        </button>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 leading-tight mt-4 mb-2">{request.title}</h1>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">{request.description}</p>
                </div>
                <div className="w-full mt-6">
                    <div className={`p-4 rounded-lg border flex items-center justify-between ${canAfford ? 'bg-slate-50 border-slate-100' : 'bg-red-50 border-red-200'}`}>
                        <span className="text-slate-500 text-sm font-medium">Tổng cộng</span>
                        <span className={`text-2xl font-bold tracking-tight ${canAfford ? 'text-slate-900' : 'text-red-600'}`}>{request.amountDisplay}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-4 cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors group/file" onClick={() => {}}>
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-500 border border-blue-100 group-hover/file:bg-blue-100 transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>description</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-900 font-medium">{request.attachment.name}</p>
                            <p className="text-xs text-slate-500">{request.attachment.size} · {request.attachment.type}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
