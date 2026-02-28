"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ChatListPage() {
    return (
        <div className="font-sans text-slate-900 h-screen flex overflow-hidden bg-white">
            {/* Side Navigation */}
            <aside className="w-20 bg-white flex flex-col items-center py-6 shrink-0 z-20 border-r border-slate-200">
                <div className="mb-8 size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors" onClick={() => window.location.href = '/dashboard'}>
                    <span className="material-symbols-outlined text-3xl">grid_view</span>
                </div>
                <nav className="flex flex-col gap-4 w-full items-center flex-1">
                    <Button variant="ghost" size="icon" className="group relative size-10" onClick={() => window.location.href = '/dashboard'}>
                        <span className="material-symbols-outlined">home</span>
                        <span className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Tổng quan</span>
                    </Button>
                    <Button variant="primary" size="icon" className="group relative size-10 shadow-md shadow-primary/20" onClick={() => window.location.href = '/chat'}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                        <span className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Tin nhắn</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="group relative size-10" onClick={() => window.location.href = '/classic/projects'}>
                        <span className="material-symbols-outlined">work</span>
                        <span className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Dự án</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="group relative size-10" onClick={() => window.location.href = '/classic/reports'}>
                        <span className="material-symbols-outlined">pie_chart</span>
                        <span className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Báo cáo</span>
                    </Button>
                    <div className="h-px w-8 bg-gray-200 my-2"></div>
                    <Button variant="ghost" size="icon" className="group relative size-10" onClick={() => window.location.href = '/settings'}>
                        <span className="material-symbols-outlined">settings</span>
                        <span className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Cài đặt</span>
                    </Button>
                </nav>
                <div className="mt-auto flex flex-col gap-4 items-center w-full">
                    <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-gray-100 cursor-pointer hover:ring-primary transition-all" onClick={() => window.location.href = '/settings'} style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTVF2_lBofXBeQ9FiH07iLLc4h8OHpupTpHH1YZBD3omZRMK_h0pyw1TP33R1nb6TM0vuLS54852owkpEzX7RS9_G-FqLxW4rddCBaSkYlq-kf9aKs2hsuwnCv3lflNB7pPRuvJRFTUfFpRkQTY4jSKUkZ0z5NlE0CP0sZ_Cryh-O3czZsv0PmeGDkf7b7EKD1I22aKH8ddXgG4dhX2fkFCFm7rrFDdApVXtvVIBZ6P1VPR5EIlBscnr3V3NwdjQQmbFt9lvVYiD0')" }}></div>
                </div>
            </aside>

            {/* Chat List Panel */}
            <div className="w-80 md:w-96 flex flex-col bg-white border-r border-slate-200 shrink-0 h-full">
                <div className="px-5 pt-6 pb-2 flex justify-between items-center">
                    <h1 className="text-[22px] font-bold tracking-tight text-slate-900">Tin nhắn</h1>
                    <Button variant="ghost" size="icon" className="size-9 bg-gray-50 hover:bg-primary hover:text-white" title="Soạn tin mới" onClick={() => alert('Soạn tin mới')}>
                        <span className="material-symbols-outlined text-[20px]">edit_square</span>
                    </Button>
                </div>
                <div className="px-5 py-4">
                    <div className="flex w-full items-center rounded-lg bg-gray-50 border border-gray-100 h-10 px-3 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
                        <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                        <Input className="w-full bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder:text-slate-400" placeholder="Tìm kiếm liên hệ..." />
                    </div>
                </div>
                <div className="px-5 pb-0 flex gap-6 text-sm font-medium text-slate-500 border-b border-slate-200">
                    <button className="pb-3 border-b-2 border-primary text-primary font-semibold" onClick={() => { }}>Tất cả</button>
                    <button className="pb-3 border-b-2 border-transparent hover:text-slate-900 transition-colors" onClick={() => alert('Lọc: Chưa đọc')}>Chưa đọc</button>
                    <button className="pb-3 border-b-2 border-transparent hover:text-slate-900 transition-colors" onClick={() => alert('Lọc: Nhóm')}>Nhóm</button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {/* Chat Item 1 - Unread */}
                    <div className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 hover:border-gray-100 transition-colors group relative" onClick={() => window.location.href = '/chat/1'}>
                        <div className="relative shrink-0">
                            <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2sLTGglWtCknb_0vomkpyKFG3OjG3n42RWW13Hfn-v7rODaVJSoYuUgBdUWQX2FqFKZRnXwxuJmTYTlJR5GsXN9yP_3dXyOS0sTKcGNb1z1SM4S0shu_OiUaCTf4SEwyVVqfTMB3LdgpPdi9rq3MR8YBT_9c_PpuDlSTkwaSiNRWogBBSXxSpWsjt-d7-Uce2dXX3diHwHvrlKw4RAaMr4cWj1LtQlzKYko1lF-AiuAPV7A-SBm4K2s39l3F29HqfZTnB13WeKpM')" }}></div>
                            <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="text-[15px] font-bold text-slate-900 truncate">Nguyễn Thị Thu Hà</p>
                                <p className="text-xs text-primary font-semibold">10:30</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-slate-600 font-medium truncate w-[180px]">Đã gửi file báo cáo Q3, sếp check giúp em nhé.</p>
                                <span className="flex items-center justify-center h-5 min-w-[20px] px-1.5 bg-primary text-white text-[10px] font-bold rounded-full shadow-sm">2</span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Item 2 */}
                    <div className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 hover:border-gray-100 transition-colors" onClick={() => window.location.href = '/chat/2'}>
                        <div className="relative shrink-0">
                            <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC874nxxKi4csQZMpkpKvoK0yVH7p84GYgup9sRxvtC9KfmdZDhXj2Fs2zoDkSR4Kxy5arrswe8I0o6_phc6EO8RZ8sM98CUbzCKw2xaSs7R0g_Lrz889LNfXnlw_spqNyXl6fRo1clO_FqnS6wc2fuHoC9g-_rO5bsFV73oeeuKw1oxvIx4vznnOorYXAuPKY7p74165U9tL9A1RNtqXPC60uPXR4fpLSvmWqYfS_5byL55eh8BPJQ630a75MP0xLUXka_Ht6zkSQ')" }}></div>
                            <div className="absolute bottom-0 right-0 size-3 bg-gray-300 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="text-[15px] font-bold text-slate-900 truncate">Trần Văn Minh</p>
                                <p className="text-xs text-slate-400">Hôm qua</p>
                            </div>
                            <p className="text-sm text-slate-500 truncate">Project X deadline là ngày mai nhé</p>
                        </div>
                    </div>

                    {/* Chat Item 3 - Group */}
                    <div className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 hover:border-gray-100 transition-colors" onClick={() => window.location.href = '/chat/3'}>
                        <div className="relative shrink-0">
                            <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsC7gB2qQPW6ZT7S2a3leeOv-7EdS3NyFkSE9wCwcGTeD6Jsvu6UeF-TgQpYaUn5f23i8g2RDcjjdUXJ4CNe_ORF2eTvyPbndo9EpGNFIrz0dZHDWMhCDVl1LPJ_j1LNcq4uBJHpFUjqjIfjHED8alo23Bs4sJsA5G7I8--3xqOqeE4YN6ixOXIGFemgX3PU8RonzHganfVnkRxKuM8SR5MSjXP-AzGrGu-MsW465bthsITI-TagnjQE0gJINBZhwqcluw_CWQ6Po')" }}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="text-[15px] font-bold text-slate-900 truncate">Design Team</p>
                                <p className="text-xs text-slate-400">T.2</p>
                            </div>
                            <p className="text-sm text-slate-500 truncate"><span className="text-slate-900 font-medium">Hồng:</span> Đã gửi ảnh chụp màn hình</p>
                        </div>
                    </div>

                    {/* Chat Item 4 */}
                    <div className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 hover:border-gray-100 transition-colors" onClick={() => window.location.href = '/chat/4'}>
                        <div className="relative shrink-0">
                            <div className="size-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-bold text-lg">L</div>
                            <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="text-[15px] font-bold text-slate-900 truncate">Lê Hoàng Nam</p>
                                <p className="text-xs text-slate-400">T.3</p>
                            </div>
                            <p className="text-sm text-slate-500 truncate">Ok, chốt phương án này nhé.</p>
                        </div>
                    </div>

                    {/* Chat Item 5 */}
                    <div className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 hover:border-gray-100 transition-colors" onClick={() => window.location.href = '/chat/5'}>
                        <div className="relative shrink-0">
                            <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5iiw0eR02dNpmj2VDQNAkIK6iabaTsKfiC2Uzo5DAKJwWiAImwEMKFuSmJ28tgY8wdKSziGiR0WB4IN51Z3a7dzcLMIrMeXMyWx8YTvpbEaMjm2i2iMLz51_QU7z5Hdn0lpzvfNc0d2PHRWbKyEiln1hEITtMgaZ8wZNjbJMPeihdCnI9C8K1DnyBRdLjgiFzoSs_5brwI_IvcvKK2HO-taaI7zrgz-dzUKUot96JG-b0aep2BR-PtzVfmBBv8Wn1NvB01hXu8MM')" }}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="text-[15px] font-bold text-slate-900 truncate">Phạm Quốc Anh</p>
                                <p className="text-xs text-slate-400">20/10</p>
                            </div>
                            <p className="text-sm text-slate-500 truncate">Cậu kiểm tra email chưa?</p>
                        </div>
                    </div>

                    {/* Chat Item 6 - Group */}
                    <div className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 hover:border-gray-100 transition-colors" onClick={() => window.location.href = '/chat/6'}>
                        <div className="relative shrink-0">
                            <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtMOrmVGrd_LhjiW-EsuZG_ZD8rC57mTK9crA1NKEwovo2Ykp3oFdF6vZGudPcVNsGQ4Ul8GobvxuPIZ7FFGaV1wYE9S1RemYBwEi-eL9XvJIrQkHszrp1RhlpBm4Nnc_-mH8J0_XucQjANXlujbxD_tW1szqHMlNxfBZM936Q3M4NDEYqslp4zex4EaQY3wthHi-ggbV477yt5GAWPEwqldYFMj4ZJyQS0VWE7dhFqAEA94u2YVf9LVXwfO0mmYgRAwtwSWE3VGc')" }}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="text-[15px] font-bold text-slate-900 truncate">Marketing Dept</p>
                                <p className="text-xs text-slate-400">18/10</p>
                            </div>
                            <p className="text-sm text-slate-500 truncate"><span className="text-slate-900 font-medium">Hương:</span> Plan tháng tới cần duyệt...</p>
                        </div>
                    </div>

                    {/* Chat Item 7 - Archived */}
                    <div className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 hover:border-gray-100 transition-colors" onClick={() => window.location.href = '/chat/7'}>
                        <div className="relative shrink-0">
                            <div className="size-12 rounded-full bg-cover bg-center grayscale opacity-70" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAI_FIUZ4NV0VqDLYQTm_RGZEjaovea2tF8YK-QVGImlkd4_eWeVe8uGiVAwUFuAXPwoRQZxCObMODjisAzVxoapVSrLmG9FfsAV50eyjg-qDYK-aXBIwb4npL7MGoqPs9hkjSDC1wFRyTRPzXsD96oCjf1SWDdHk8AYvXGb1BxSUhU9nYbYYgkEKl_pxcrD0kns7U4X0pqrV58EF5xgYPcKJ4LG55vy5xM9iIdsGPf61iiiKCLLaEFIBodxqd5wpxU1qo9kUExG08')" }}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="text-[15px] font-bold text-slate-400 truncate">Support Bot</p>
                                <p className="text-xs text-slate-400">01/10</p>
                            </div>
                            <p className="text-sm text-slate-400 truncate">Phiên hỗ trợ đã kết thúc.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Empty State */}
            <div className="flex-1 flex flex-col h-full bg-white relative">
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                    <div className="mb-6 size-24 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                        <span className="material-symbols-outlined text-4xl text-slate-300">chat_bubble_outline</span>
                    </div>
                    <p className="text-lg text-slate-500 font-medium">
                        Chọn một cuộc trò chuyện để bắt đầu
                    </p>
                </div>
            </div>
        </div>
    );
}
