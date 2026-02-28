"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ChatDetailPage() {
    return (
        <div className="bg-slate-50 text-slate-900 h-screen flex flex-col overflow-hidden font-sans">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-3 shrink-0 z-20">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-slate-900">
                        <div className="size-8 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
                                <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">BusinessOS</h2>
                    </div>
                    <label className="flex flex-col min-w-40 !h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-slate-500 flex border-none bg-slate-200 items-center justify-center pl-4 rounded-l-lg border-r-0">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <Input className="flex w-full min-w-0 flex-1 rounded-lg rounded-l-none border-none bg-slate-200 h-full border-l-0 pl-2 text-base" placeholder="Tìm kiếm" />
                        </div>
                    </label>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <div className="flex gap-2">
                        <Button variant="secondary" size="icon" className="size-10" onClick={() => alert('notifications')}>
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </Button>
                        <Button variant="secondary" size="icon" className="size-10" onClick={() => alert('notifications')}>
                            <span className="material-symbols-outlined text-[20px]">settings</span>
                        </Button>
                    </div>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white cursor-pointer" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwm6DW6VqgUqbVfXnx-FGKN4DZsKOSk-QopHvSEaeWy2n06VelXg8d9A2fJZPCO6QMoR_WBUN-BEzuJFNB7xK6RwiWuGNwcsJgbtPWRbjz79DpRjM9FsBsiBaaXYDR8hu5nPnbgdQ_FOeclT1o-hRUERnzQR7sS3BDo-_YerVxL3MbnfZFloJzUXB2ehDvdo8Wm7H8PW1hAA0ZvINu5FkCD3cdWm1GUJ77vUBfio9wHcTcqLAJ7ZXt2KVAlUKdH6R2rtqRZLRHc0k")' }} onClick={() => { }}></div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar Nav */}
                <nav className="w-64 bg-white border-r border-slate-200 flex-col justify-between hidden md:flex shrink-0">
                    <div className="flex flex-col gap-2 p-4">
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 group transition-colors" href="/dashboard">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-900">dashboard</span>
                            <p className="text-slate-900 text-sm font-medium leading-normal">Dashboard</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 group transition-colors" href="/classic/projects">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-900">work</span>
                            <p className="text-slate-900 text-sm font-medium leading-normal">Dự án</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-200 text-primary" href="/chat">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                            <p className="text-slate-900 text-sm font-bold leading-normal">Tin nhắn</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 group transition-colors" href="/classic/projects">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-900">description</span>
                            <p className="text-slate-900 text-sm font-medium leading-normal">Tài liệu</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 group transition-colors" href="/classic/reports">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-900">bar_chart</span>
                            <p className="text-slate-900 text-sm font-medium leading-normal">Báo cáo</p>
                        </a>
                    </div>
                    <div className="p-4 border-t border-slate-200">
                        <div className="flex items-center gap-3 px-3 py-2">
                            <span className="material-symbols-outlined text-slate-500">help</span>
                            <p className="text-slate-900 text-sm font-medium">Trợ giúp</p>
                        </div>
                    </div>
                </nav>

                {/* Chat List */}
                <div className="w-80 flex flex-col border-r border-slate-200 bg-white hidden lg:flex">
                    <div className="p-4 border-b border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Đoạn chat</h3>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </span>
                            <Input className="w-full py-2 pl-10 pr-4 text-sm bg-slate-100 border-none" placeholder="Tìm kiếm đoạn chat..." type="text" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                        {/* Active Chat */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-200 border-l-4 border-primary cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => { }}>
                            <div className="relative shrink-0">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4VjLJcx0zjGvEp8yybNQ6GyMxtiqbUqihmj6oTkcZbzAbJWS6F4UBCmo2rxURqBizVYym5fiK3435OSdOSJuzkKBZCQkxUmHr3t7rTx0LH8-9kvg0JtTW_bhmDttWg02PBpOyy8sTK9sd9PDroewX7DDiX9KFXtJ6AvCRXdaXpzmGGeEqOEHC_zBdQryXBzCaqZ-Qyi_V8_DGgRADYkN3AHXMUZwmnxroOMVnY99gWndLrdPK_SnT2Y1PjR_drPOHkM0bCBiISbo")' }}></div>
                                <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <p className="text-slate-900 text-sm font-bold truncate">Nguyễn Văn A</p>
                                    <span className="text-xs text-slate-500 font-medium">10:30 AM</span>
                                </div>
                                <p className="text-slate-500 text-xs truncate">OK, để mình xem.</p>
                            </div>
                        </div>
                        {/* Other Chat */}
                        <div className="flex items-center gap-3 px-4 py-3 border-l-4 border-transparent hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { }}>
                            <div className="relative shrink-0">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjHBRHecYQ6DZTvwCuv3KlfvRpBk4LLJHAczlJUugmMPwZoyiudpCPjwUyDlZo56E8sUO4ajkAYETxJvqIuu-jusMyvjY48-pk4liiR2bJTuR14PY19zoVT5pdIkwuEGYiO8Nd5FakaDVkxfEn4Csp7wJBQJZbi7LISbD_90VjPX_Fw-CENTDEs_xVHYhjIlV8NGSMEDeHuFeHrgbAV-R_KkpfuAFDo1c9KGOr-jPzifre8Z3fGDdUxPm3BpKLWqIaaLb25BQlPmA")' }}></div>
                                <div className="absolute bottom-0 right-0 size-3 bg-gray-300 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <p className="text-slate-900 text-sm font-medium truncate">Trần Thị B</p>
                                    <span className="text-xs text-slate-400">09:15 AM</span>
                                </div>
                                <p className="text-slate-500 text-xs truncate font-medium">Gửi mình file nhé</p>
                            </div>
                            <div className="shrink-0 size-2 bg-primary rounded-full ml-2"></div>
                        </div>
                        {/* Group Chat */}
                        <div className="flex items-center gap-3 px-4 py-3 border-l-4 border-transparent hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { }}>
                            <div className="relative shrink-0">
                                <div className="flex items-center justify-center bg-purple-100 text-purple-600 rounded-full size-12 font-bold text-lg">KT</div>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <p className="text-slate-900 text-sm font-medium truncate">Phòng Kế Toán</p>
                                    <span className="text-xs text-slate-400">Thứ 2</span>
                                </div>
                                <p className="text-slate-500 text-xs truncate">Lịch họp thay đổi sang 2h chiều...</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Main Area */}
                <div className="flex flex-col flex-1 min-w-0 bg-white relative">
                    {/* Chat Header */}
                    <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="lg:hidden cursor-pointer mr-2" onClick={() => { }}>
                                <span className="material-symbols-outlined text-slate-900">arrow_back</span>
                            </div>
                            <div className="relative">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1Z_2QTL8_cQh33wqs4aZBv3UjeQBBopP9q8QDyih9DFU_4kR11ubMv9LzOYdd8sz-_M-7Nb5-Yrd-WYO2lO5zkYPJza-ltoKYQPFjQpw0vpAgvEVEuT1v7eSG2fRNsrOJopfaeNF9DNT84V18dmnTTdMpbFyXRa-htTWiTTyoH-5bDqGIC8lY1tEfe01IksSbTA4tXIwmzEnzczZXuOPalLWEfnAmP2gBVYHbMYfgA-k0_s1_fTN4u2oMGhISTRwuperQ-A227RE")' }}></div>
                                <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h3 className="text-slate-900 text-base font-bold leading-tight">Nguyễn Văn A</h3>
                                <p className="text-green-600 text-xs font-medium">Đang hoạt động</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 md:gap-3">
                            <Button variant="ghost" size="icon" className="p-2 rounded-full" title="Gọi thoại" onClick={() => alert('call')}>
                                <span className="material-symbols-outlined text-[20px]">call</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="p-2 rounded-full" title="Gọi video" onClick={() => alert('videocam')}>
                                <span className="material-symbols-outlined text-[20px]">videocam</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="p-2 rounded-full" title="Tìm kiếm trong tin nhắn" onClick={() => alert('search')}>
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </Button>
                            <div className="h-6 w-px bg-slate-200 mx-1"></div>
                            <Button variant="ghost" className="bg-primary/10 hover:bg-primary/20 text-primary ml-1" onClick={() => alert('add_task')}>
                                <span className="material-symbols-outlined text-[18px]">add_task</span>
                                <span className="text-sm font-bold hidden sm:inline">Tạo Task nhanh</span>
                            </Button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                        <div className="flex justify-center">
                            <span className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full font-medium">Hôm nay, 10:30 AM</span>
                        </div>

                        {/* Incoming Message */}
                        <div className="flex gap-3 max-w-[85%] sm:max-w-[70%]">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 mt-1" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdp46RDuQ1vKrvr0dlLWIuSPR8v0mENaNZUtjBznO0Ix7CpuoZy-AnGu8cBiB7iQc5OCKtaOFaoA5vJ0roXoF-5bmcnC7X9DtCuCmEWMwPY81PUFTLWd-GdJeL_vb22Rq1mWuMw56y0p3bW25WbVEWhNlDKPhXf8tXrzxSF6scx3tAYNE8gFd_FWmqNzMPENhuMHxfihK26W3PQXgRlEfbA65xcRVDBHarJp0EhF7d8mGIDSrTcJ9rOYdUj0lGQXNMGkz4evWQrmg")' }}></div>
                            <div className="flex flex-col gap-1">
                                <div className="bg-slate-100 p-3.5 rounded-2xl rounded-tl-none text-black text-[15px] leading-relaxed">
                                    <p>Chào bạn, báo cáo tài chính tháng này đã xong chưa?</p>
                                </div>
                                <span className="text-[11px] text-slate-400 ml-1">10:31 AM</span>
                            </div>
                        </div>

                        {/* Outgoing Message with File */}
                        <div className="flex flex-row-reverse gap-3 max-w-[85%] sm:max-w-[70%] self-end">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 mt-1" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAz1HqqYSg5Yh8hb7cFD7hmcGYm8EQYBMZliTJ7C1XFEsnEERKGL939dy9JpVw_v59J90KjdTjahwpJ2jhySgYjhK3lQ6yooPt1VIQ1zOKKtnAnLosP37djGMnmEdPrk-NVEe4eN9AB42qjkRTyrG4o5AgAs6ZWndn_59vhvr6fTsWfsQjw2w8n-dSfw3XPi9NPDdSPWx6-wg8VSL1cENA_3VQMOhwxKiSkILgm7uVkGdRIOUR8KcCN3rRSK8R5bz7_zXByqVx1-mA")' }}></div>
                            <div className="flex flex-col gap-2 items-end">
                                <div className="bg-primary text-white p-3.5 rounded-2xl rounded-tr-none text-[15px] leading-relaxed">
                                    <p>Mình đang hoàn thiện, gửi bạn bản nháp nhé.</p>
                                </div>
                                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 w-64 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => { }}>
                                    <div className="bg-red-50 p-2 rounded-lg">
                                        <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <p className="text-slate-900 text-sm font-semibold truncate">Bao_cao_TC_Draft.pdf</p>
                                        <p className="text-slate-400 text-xs">2.4 MB</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-500 text-lg">download</span>
                                </div>
                                <span className="text-[11px] text-slate-400 mr-1">10:32 AM</span>
                            </div>
                        </div>

                        {/* Outgoing Voice + Text */}
                        <div className="flex flex-row-reverse gap-3 max-w-[85%] sm:max-w-[70%] self-end">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 mt-1" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3rOO9kkfouhClrg6nMXQgXJZFWGifYVcHxc4hdw-c8n5aId8e-wQcH640k97e8exP61M1FXxfgH1QfCP-d1Jy0dNux6GcUPm9u8gSGeIRNsfNib6bS415ajsp8RZOoTkw1npvyl4V5dyJ-KrfFvlg3d7gkXYE6VX0xDT5HCfi6QM-UrSNO3fYQSt5mHzeO7fDsUTMLvEK4MGOboJdO-f4ex7KLTnhZ2PiUzvedZNZSqjygpKg9yIgT2cnTkod8kRB8VtMF1m6VOU")' }}></div>
                            <div className="flex flex-col gap-2 items-end">
                                <div className="flex items-center gap-3 bg-primary text-white p-3 rounded-2xl rounded-tr-none min-w-[240px]">
                                    <button className="size-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" onClick={() => { }}>
                                        <span className="material-symbols-outlined text-white text-lg">play_arrow</span>
                                    </button>
                                    <div className="flex gap-0.5 items-end h-6 text-white/80">
                                        <span className="inline-block w-[3px] h-2 bg-current rounded-full"></span>
                                        <span className="inline-block w-[3px] h-4 bg-current rounded-full"></span>
                                        <span className="inline-block w-[3px] h-3 bg-current rounded-full"></span>
                                        <span className="inline-block w-[3px] h-5 bg-current rounded-full"></span>
                                        <span className="inline-block w-[3px] h-2 bg-current rounded-full"></span>
                                        <span className="inline-block w-[3px] h-6 bg-current rounded-full"></span>
                                        <span className="inline-block w-[3px] h-3 bg-current rounded-full"></span>
                                        <span className="inline-block w-[3px] h-4 bg-current rounded-full"></span>
                                    </div>
                                    <span className="text-xs font-medium ml-auto">0:45</span>
                                </div>
                                <div className="bg-primary text-white p-3.5 rounded-2xl rounded-tr-none text-[15px] leading-relaxed">
                                    <p>Check giúp mình phần chi phí marketing.</p>
                                </div>
                                <span className="text-[11px] text-slate-400 mr-1">10:35 AM</span>
                            </div>
                        </div>

                        {/* Reply */}
                        <div className="flex gap-3 max-w-[85%] sm:max-w-[70%]">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 mt-1" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8wreP1puFUmsR6DwXqVeE0DFhW1bbIF8_Lfx1daDTSbaWhznl8l3EsyNzc3T0V9q8HiY2IxeeEgHDawASr6a9b8UWs_spHWrA_RyjuyQf3aH6ldKkl0imwWpaBHKF5mazEOKrg_EuBt5tc_RzFZcAMxlFQOWCxAAOfFSwRc5uDckpD3amHmfx8uth6WGxKsVbZxNbiXP0C2TocVG_AKfRNzZqsq5IHTuWQL6-GbjcOks0Dhm17HxRbgJ4iup2cT-x6sXHT4c_sQ")' }}></div>
                            <div className="flex flex-col gap-1">
                                <div className="bg-slate-100 p-3.5 rounded-2xl rounded-tl-none text-black text-[15px] leading-relaxed">
                                    <p>OK, để mình xem.</p>
                                </div>
                                <span className="text-[11px] text-slate-400 ml-1">Vừa xong</span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="bg-white p-4 border-t border-slate-200 shrink-0">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-end gap-2 bg-slate-100 p-2 rounded-lg border border-transparent focus-within:border-slate-200 focus-within:bg-white focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                                <div className="flex gap-1 pb-1 px-1">
                                    <Button variant="ghost" size="icon" className="p-2 rounded-full" title="Đính kèm file" onClick={() => alert('attach_file')}>
                                        <span className="material-symbols-outlined text-[20px]">attach_file</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="p-2 rounded-full" title="Gửi ảnh" onClick={() => alert('image')}>
                                        <span className="material-symbols-outlined text-[20px]">image</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="p-2 rounded-full" title="Ghi âm giọng nói" onClick={() => alert('mic')}>
                                        <span className="material-symbols-outlined text-[20px]">mic</span>
                                    </Button>
                                </div>
                                <textarea className="w-full bg-transparent border-none p-2 text-slate-900 placeholder:text-slate-400 focus:ring-0 resize-none text-[15px] max-h-32 min-h-[44px]" placeholder="Nhập tin nhắn..." rows={1}></textarea>
                                <Button variant="primary" size="icon" className="p-2.5 rounded-lg mb-0.5 mr-0.5" title="Gửi" onClick={() => alert('send')}>
                                    <span className="material-symbols-outlined text-[20px] block">send</span>
                                </Button>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-slate-400">Nhấn Enter để gửi, Shift + Enter để xuống dòng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
