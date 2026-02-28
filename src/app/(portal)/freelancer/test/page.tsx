"use client";

import { Button } from "@/components/ui/Button";

const questionNumbers = Array.from({ length: 20 }, (_, i) => i + 1);

export default function TakingTestPage() {
    return (
        <div className="bg-white text-slate-900 font-sans min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-100 shadow-sm">
                <div className="px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center size-10 rounded-lg bg-blue-50 text-blue-500"><span className="material-symbols-outlined text-2xl">code</span></div>
                        <div><h1 className="text-base font-bold leading-tight">Bài đánh giá ReactJS Nâng cao</h1><p className="text-xs text-slate-500">Năng lực Freelancer • Phần 1 / 3</p></div>
                    </div>
                    <div className="flex flex-col items-center flex-1 max-w-xl mx-8">
                        <div className="flex items-center gap-2 mb-2 w-full justify-between">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg shadow-sm"><span className="material-symbols-outlined text-red-500 text-lg">timer</span><span className="text-xs font-bold text-red-500">14:59 Còn lại</span></div>
                            <span className="text-xs font-medium text-slate-500">Câu hỏi 5 / 40</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: "12.5%" }}></div></div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-gray-50 hover:bg-gray-100 rounded-lg" onClick={() => {}}><span className="material-symbols-outlined text-[20px]">logout</span><span className="hidden sm:inline">Thoát bài thi</span></button>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex w-full max-w-[1600px] mx-auto overflow-hidden h-[calc(100vh-64px)]">
                {/* Question Area */}
                <div className="flex-1 flex flex-col overflow-y-auto p-6 lg:p-10 bg-white">
                    <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 pb-20">
                        <div className="bg-white rounded-xl p-0 md:p-4">
                            <div className="flex items-start justify-between mb-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-500 border border-blue-100">Chọn một đáp án</span>
                                <button className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-sm font-medium" onClick={() => {}}><span className="material-symbols-outlined text-[20px]">flag</span>Đánh dấu xem lại</button>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed mb-8">Hook nào bạn sẽ sử dụng để tối ưu hóa hiệu suất cho các tính toán tốn kém mà chỉ nên chạy lại khi các phụ thuộc thay đổi?</h2>
                            <div className="mb-8 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 p-4 font-mono text-sm text-slate-700">
                                <pre><code>{`const expensiveValue = useSomeHook(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);`}</code></pre>
                            </div>
                            <div className="flex flex-col gap-3">
                                {["useEffect", "useMemo", "useCallback", "useRef"].map((opt, i) => (
                                    <label key={i} className={`group relative flex items-center gap-4 rounded-lg border ${i === 1 ? "border-blue-500 bg-blue-50/10 shadow-sm ring-1 ring-blue-500/5" : "border-gray-200 bg-white hover:border-blue-500 hover:shadow-sm"} p-4 cursor-pointer transition-all`}>
                                        <input className="peer h-5 w-5 border-gray-300 text-blue-500" name="question_5" type="radio" defaultChecked={i === 1} />
                                        <div className="flex-1">
                                            <span className={`text-sm font-bold ${i === 1 ? "text-blue-500" : "text-slate-400 group-hover:text-blue-500"} mr-2`}>{String.fromCharCode(65 + i)}.</span>
                                            <span className={`text-base ${i === 1 ? "font-semibold text-slate-900" : "font-medium text-slate-700 group-hover:text-slate-900"}`}>{opt}</span>
                                        </div>
                                        {i === 1 && <span className="material-symbols-outlined text-blue-500">check_circle</span>}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                            <Button variant="secondary" className="flex items-center gap-2 px-6 py-3 border border-gray-200" onClick={() => alert('arrow_backCâu trước')}><span className="material-symbols-outlined text-lg">arrow_back</span>Câu trước</Button>
                            <Button variant="primary" className="flex items-center gap-2 px-8 py-3 shadow-md shadow-blue-200" onClick={() => alert('Câu tiếp theoarrow_forward')}>Câu tiếp theo<span className="material-symbols-outlined text-lg">arrow_forward</span></Button>
                        </div>
                    </div>
                </div>

                {/* Question Navigator */}
                <aside className="w-80 border-l border-gray-200 bg-white flex flex-col shadow-sm z-20 hidden lg:flex">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Danh sách câu hỏi</h3>
                        <div className="flex flex-wrap gap-y-3 gap-x-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span>Đã làm</span></div>
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-white"></div><span>Đang xem</span></div>
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-gray-200"></div><span>Chưa xem</span></div>
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-400"></div><span>Đánh dấu</span></div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 bg-white">
                        <div className="grid grid-cols-5 gap-3">
                            {questionNumbers.map((n) => {
                                const done = n <= 4 || n === 8;
                                const current = n === 5;
                                const flagged = n === 8;
                                return (
                                    <div key={n} className="relative">
                                        <button className={`h-10 w-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${current ? "border-2 border-blue-500 text-blue-500 bg-white ring-2 ring-blue-100" : done ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-50 text-slate-600 hover:bg-gray-100"}`} onClick={() => {}}>{n}</button>
                                        {flagged && <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-white"></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-white">
                        <Button variant="primary" className="w-full py-4 font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2" onClick={() => alert('check_circleNộp bài')}><span className="material-symbols-outlined text-[20px]">check_circle</span>Nộp bài</Button>
                        <p className="text-xs text-center text-slate-400 mt-3">Vui lòng kiểm tra kỹ các câu trả lời trước khi nộp bài.</p>
                    </div>
                </aside>
            </main>
        </div>
    );
}
