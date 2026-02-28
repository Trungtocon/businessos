"use client";

import { useState, useCallback, DragEvent } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { toast, Toaster } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";

// Workflow step types
interface WorkflowStep {
    id: string;
    type: string;
    name: string;
    icon: string;
    color: string;
    description: string;
}

// Available step templates in toolbox
const TOOLBOX_STEPS: Omit<WorkflowStep, "id">[] = [
    {
        type: "brief",
        name: "Step: Brief",
        icon: "description",
        color: "blue",
        description: "Thu thập yêu cầu từ khách hàng",
    },
    {
        type: "design",
        name: "Step: Design",
        icon: "palette",
        color: "purple",
        description: "Thiết kế giao diện và prototype",
    },
    {
        type: "development",
        name: "Step: Development",
        icon: "code",
        color: "emerald",
        description: "Phát triển và coding",
    },
    {
        type: "review",
        name: "Step: Review",
        icon: "rate_review",
        color: "orange",
        description: "Đánh giá và feedback",
    },
    {
        type: "payment",
        name: "Step: Payment",
        icon: "payments",
        color: "green",
        description: "Xử lý thanh toán",
    },
    {
        type: "approval",
        name: "Step: Approval",
        icon: "verified",
        color: "cyan",
        description: "Phê duyệt và nghiệm thu",
    },
];

// Color mappings
const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    blue: { bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-400", icon: "bg-blue-600" },
    purple: { bg: "bg-purple-500/20", border: "border-purple-500/30", text: "text-purple-400", icon: "bg-purple-600" },
    emerald: { bg: "bg-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-400", icon: "bg-emerald-600" },
    orange: { bg: "bg-orange-500/20", border: "border-orange-500/30", text: "text-orange-400", icon: "bg-orange-600" },
    green: { bg: "bg-green-500/20", border: "border-green-500/30", text: "text-green-400", icon: "bg-green-600" },
    cyan: { bg: "bg-cyan-500/20", border: "border-cyan-500/30", text: "text-cyan-400", icon: "bg-cyan-600" },
};

// Toolbox Item Component
function ToolboxItem({ step, onDragStart }: { step: Omit<WorkflowStep, "id">; onDragStart: (e: DragEvent, step: Omit<WorkflowStep, "id">) => void }) {
    const colors = colorClasses[step.color];

    return (
        <motion.div
            draggable
            onDragStart={(e) => onDragStart(e as unknown as DragEvent, step)}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl ${colors.bg} border ${colors.border} cursor-grab active:cursor-grabbing transition-all hover:shadow-lg`}
        >
            <div className="flex items-center gap-3">
                <div className={`size-10 rounded-lg ${colors.icon} flex items-center justify-center shadow-lg`}>
                    <span className="material-symbols-outlined text-white text-xl">{step.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm">{step.name}</p>
                    <p className="text-white/50 text-xs truncate">{step.description}</p>
                </div>
                <span className="material-symbols-outlined text-white/30 text-lg">drag_indicator</span>
            </div>
        </motion.div>
    );
}

// Canvas Step Component
function CanvasStep({
    step,
    index,
    total,
    onRemove,
}: {
    step: WorkflowStep;
    index: number;
    total: number;
    onRemove: (id: string) => void;
}) {
    const colors = colorClasses[step.color];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="relative"
        >
            {/* Connector Line */}
            {index < total - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-purple-500 to-transparent z-0" />
            )}

            {/* Step Card */}
            <div className={`relative p-5 rounded-2xl ${colors.bg} border ${colors.border} backdrop-blur-sm group`}>
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 size-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {index + 1}
                </div>

                {/* Remove Button */}
                <button
                    onClick={() => onRemove(step.id)}
                    className="absolute -top-2 -right-2 size-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-400"
                >
                    <span className="material-symbols-outlined text-sm">close</span>
                </button>

                <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-xl ${colors.icon} flex items-center justify-center shadow-lg`}>
                        <span className="material-symbols-outlined text-white text-2xl">{step.icon}</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-white">{step.name}</p>
                        <p className="text-white/60 text-sm">{step.description}</p>
                    </div>
                </div>
            </div>

            {/* Arrow */}
            {index < total - 1 && (
                <div className="flex justify-center my-2">
                    <span className="material-symbols-outlined text-purple-500/50 text-2xl">arrow_downward</span>
                </div>
            )}
        </motion.div>
    );
}

export default function WorkflowBuilderPage() {
    const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [workflowName, setWorkflowName] = useState("Quy trình mới");

    // Generate unique ID
    const generateId = () => `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Drag handlers
    const handleDragStart = useCallback((e: DragEvent, step: Omit<WorkflowStep, "id">) => {
        e.dataTransfer.setData("application/json", JSON.stringify(step));
        e.dataTransfer.effectAllowed = "copy";
    }, []);

    const handleDragOver = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        try {
            const stepData = JSON.parse(e.dataTransfer.getData("application/json"));
            const newStep: WorkflowStep = {
                ...stepData,
                id: generateId(),
            };
            setWorkflowSteps((prev) => [...prev, newStep]);
            toast.success(`Đã thêm: ${stepData.name}`);
        } catch (error) {
            console.error("Drop error:", error);
        }
    }, []);

    // Remove step
    const handleRemoveStep = useCallback((id: string) => {
        setWorkflowSteps((prev) => prev.filter((s) => s.id !== id));
        toast.info("Đã xóa bước");
    }, []);

    // Clear all
    const handleClearAll = useCallback(() => {
        setWorkflowSteps([]);
        toast.info("Đã xóa toàn bộ quy trình");
    }, []);

    // Save workflow
    const handleSaveWorkflow = useCallback(() => {
        const workflowData = {
            id: generateId(),
            name: workflowName,
            createdAt: new Date().toISOString(),
            steps: workflowSteps.map((s, i) => ({
                order: i + 1,
                type: s.type,
                name: s.name,
                description: s.description,
            })),
        };

        console.log("=== WORKFLOW SAVED ===");
        console.log(JSON.stringify(workflowData, null, 2));
        console.log("======================");

        toast.success("Đã lưu quy trình!", {
            description: `${workflowSteps.length} bước đã được lưu. Xem Console để kiểm tra JSON.`,
        });
    }, [workflowName, workflowSteps]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#16082a] to-[#0d0415] text-white">
            <Toaster richColors position="top-right" />

            {/* Admin Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-purple-950/80 to-purple-900/60 backdrop-blur-xl border-r border-purple-500/20 z-40 hidden lg:flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-purple-500/20">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <span className="material-symbols-outlined text-white text-xl">account_tree</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-white tracking-wide">Workflow Builder</h1>
                            <p className="text-purple-300/60 text-xs">Xây dựng quy trình</p>
                        </div>
                    </div>
                </div>

                {/* Toolbox */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-purple-500/20">
                        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">construction</span>
                            Toolbox
                        </h3>
                        <p className="text-xs text-white/40 mt-1">Kéo thả các bước vào canvas</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {TOOLBOX_STEPS.map((step, i) => (
                            <ToolboxItem key={i} step={step} onDragStart={handleDragStart} />
                        ))}
                    </div>
                </div>

                {/* Back Navigation */}
                <div className="p-4 border-t border-purple-500/20">
                    <a
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-purple-500/10 hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">arrow_back</span>
                        <span className="font-medium">Quay lại Dashboard</span>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-72">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-[#1a0a2e]/80 backdrop-blur-xl border-b border-purple-500/20 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                value={workflowName}
                                onChange={(e) => setWorkflowName(e.target.value)}
                                className="bg-transparent border-b border-transparent hover:border-purple-500/30 focus:border-purple-500 outline-none text-2xl font-bold text-white transition-colors px-1"
                            />
                            <span className="text-white/40 text-sm">
                                {workflowSteps.length} bước
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                onClick={handleClearAll}
                                disabled={workflowSteps.length === 0}
                                className="text-white/60 hover:text-white border-white/10"
                            >
                                <span className="material-symbols-outlined mr-2">delete</span>
                                Xóa tất cả
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSaveWorkflow}
                                disabled={workflowSteps.length === 0}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 border-none shadow-lg shadow-purple-500/30"
                            >
                                <span className="material-symbols-outlined mr-2">save</span>
                                Lưu Workflow
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Canvas Area */}
                <div className="p-6 min-h-[calc(100vh-80px)]">
                    <Card
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`min-h-[600px] rounded-3xl border-2 border-dashed transition-all duration-300 ${isDragOver
                                ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                                : "border-white/10 bg-white/5"
                            }`}
                    >
                        {workflowSteps.length === 0 ? (
                            <div className="h-full min-h-[600px] flex flex-col items-center justify-center p-8">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <div className={`size-24 mx-auto mb-6 rounded-3xl flex items-center justify-center ${isDragOver ? "bg-purple-500/30" : "bg-white/5"} transition-colors`}>
                                        <span className={`material-symbols-outlined text-5xl ${isDragOver ? "text-purple-400" : "text-white/30"}`}>
                                            {isDragOver ? "add_circle" : "drag_pan"}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white/60 mb-2">
                                        {isDragOver ? "Thả để thêm bước mới" : "Kéo thả bước từ Toolbox"}
                                    </h3>
                                    <p className="text-white/40 text-sm max-w-md mx-auto">
                                        Bắt đầu xây dựng quy trình bằng cách kéo các bước từ thanh công cụ bên trái vào đây.
                                    </p>
                                </motion.div>
                            </div>
                        ) : (
                            <div className="p-8">
                                {/* Workflow Title */}
                                <div className="text-center mb-8">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm">
                                        <span className="material-symbols-outlined text-lg">play_arrow</span>
                                        Bắt đầu quy trình
                                    </span>
                                </div>

                                {/* Steps */}
                                <div className="max-w-lg mx-auto space-y-0">
                                    <Reorder.Group
                                        axis="y"
                                        values={workflowSteps}
                                        onReorder={setWorkflowSteps}
                                        className="space-y-0"
                                    >
                                        <AnimatePresence>
                                            {workflowSteps.map((step, index) => (
                                                <Reorder.Item key={step.id} value={step}>
                                                    <CanvasStep
                                                        step={step}
                                                        index={index}
                                                        total={workflowSteps.length}
                                                        onRemove={handleRemoveStep}
                                                    />
                                                </Reorder.Item>
                                            ))}
                                        </AnimatePresence>
                                    </Reorder.Group>
                                </div>

                                {/* End */}
                                <div className="text-center mt-8">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                                        <span className="material-symbols-outlined text-lg">check_circle</span>
                                        Kết thúc quy trình
                                    </span>
                                </div>

                                {/* Drop zone hint */}
                                <div
                                    className={`mt-8 p-4 rounded-xl border-2 border-dashed text-center transition-all ${isDragOver
                                            ? "border-purple-500 bg-purple-500/10"
                                            : "border-white/10 bg-white/5"
                                        }`}
                                >
                                    <p className="text-white/40 text-sm">
                                        <span className="material-symbols-outlined text-lg align-middle mr-2">add</span>
                                        Thả thêm bước vào đây
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* JSON Preview (for debugging) */}
                    {workflowSteps.length > 0 && (
                        <Card className="mt-6 bg-slate-900/50 border-white/10 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-semibold text-white/70 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">data_object</span>
                                    JSON Preview
                                </h4>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(JSON.stringify(workflowSteps, null, 2));
                                        toast.success("Đã copy JSON vào clipboard");
                                    }}
                                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">content_copy</span>
                                    Copy
                                </button>
                            </div>
                            <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto text-xs text-green-400 font-mono">
                                {JSON.stringify(
                                    workflowSteps.map((s, i) => ({
                                        order: i + 1,
                                        type: s.type,
                                        name: s.name,
                                    })),
                                    null,
                                    2
                                )}
                            </pre>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
