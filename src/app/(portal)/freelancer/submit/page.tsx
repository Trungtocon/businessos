"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SubmitWorkPage() {
    return (
        <div className="bg-gray-100 font-sans text-slate-900 overflow-hidden">
            {/* Mock Background */}
            <div aria-hidden="true" className="fixed inset-0 z-0 opacity-20 pointer-events-none blur-[2px]">
                <div className="flex h-screen w-full flex-col">
                    <header className="h-16 w-full border-b border-slate-200 bg-white"></header>
                    <div className="flex flex-1">
                        <aside className="w-64 border-r border-slate-200 bg-white hidden md:block"></aside>
                        <main className="flex-1 bg-gray-100 p-8">
                            <div className="h-32 w-full bg-slate-200 rounded mb-4"></div>
                            <div className="h-64 w-full bg-slate-200 rounded"></div>
                        </main>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            <div className="relative z-50 flex min-h-screen w-full items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                <div className="flex flex-col w-full max-w-[640px] bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                        <h3 className="text-slate-900 tracking-tight text-xl font-bold leading-tight">Nộp sản phẩm công việc</h3>
                        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500" onClick={() => {}}><span className="material-symbols-outlined text-2xl">close</span></button>
                    </div>

                    {/* Modal Body */}
                    <div className="flex flex-col p-6 gap-6 overflow-y-auto max-h-[80vh]">
                        {/* File Upload Zone */}
                        <div className="flex flex-col">
                            <label className="text-slate-900 text-sm font-semibold mb-2">Tệp đính kèm</label>
                            <div className="group flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-slate-50 transition-all px-6 py-10 cursor-pointer relative" onClick={() => {}}>
                                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-blue-500 text-4xl">cloud_upload</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <p className="text-slate-900 text-base font-bold leading-tight">Kéo thả file kết quả vào đây</p>
                                    <p className="text-slate-500 text-sm font-normal">Hỗ trợ định dạng: JPG, PDF, ZIP. Tối đa 50MB.</p>
                                </div>
                                <button className="mt-2 flex items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors" onClick={() => {}}>
                                    <span className="truncate">Hoặc chọn file từ máy tính</span>
                                </button>
                                <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-200 flex-1"></div>
                            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Hoặc</span>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>

                        {/* External Link Input */}
                        <div className="flex flex-col gap-2">
                            <label className="flex flex-col w-full">
                                <p className="text-slate-900 text-sm font-semibold leading-normal pb-2">Liên kết ngoài (Google Drive, Figma...)</p>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-[20px]">link</span>
                                    </div>
                                    <Input className="w-full h-12 pl-10 pr-4 text-base border border-slate-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500" placeholder="https://..." type="url" />
                                </div>
                            </label>
                        </div>

                        {/* Deadline Notice */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                            <span className="material-symbols-outlined text-blue-500 text-[20px] mt-0.5">schedule</span>
                            <div className="flex flex-col gap-1">
                                <p className="text-slate-900 text-sm font-medium">Hạn chót: 17:00 hôm nay</p>
                                <p className="text-slate-600 text-sm font-normal">Lưu ý: Bạn còn <span className="text-blue-500 font-semibold">2 giờ</span> để nộp bài trước deadline.</p>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                        <Button variant="secondary" className="min-w-[84px] h-11 px-5 border border-slate-300 text-slate-700 text-sm font-semibold" onClick={() => alert('Hủy bỏ')}>Hủy bỏ</Button>
                        <Button variant="primary" className="min-w-[84px] h-11 px-6 text-sm font-bold shadow-sm" onClick={() => alert('Xác nhận nộp bài')}>Xác nhận nộp bài</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
