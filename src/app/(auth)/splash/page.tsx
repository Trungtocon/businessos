"use client";

export default function SplashPage() {
    return (
        <div className="font-sans bg-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
            {/* Main Content */}
            <main className="flex flex-col items-center justify-center w-full max-w-md px-6 z-10 flex-grow">
                {/* Logo Section */}
                <div className="mb-10 animate-fade-in opacity-100 transition-opacity duration-1000 ease-out">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                        {/* Abstract Logo Representation */}
                        <div className="absolute inset-0 bg-blue-500/10 rounded-2xl rotate-45 transform scale-90"></div>
                        <div className="absolute inset-0 bg-blue-500/20 rounded-2xl -rotate-12 transform scale-75"></div>
                        <div className="relative z-10 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                            <span className="material-symbols-outlined text-5xl md:text-6xl text-blue-500">grid_view</span>
                        </div>
                    </div>
                    {/* Logo Text */}
                    <h1 className="mt-6 text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">BusinessOS</h1>
                </div>

                {/* Slogan */}
                <div className="mb-16 text-center max-w-xs md:max-w-sm">
                    <h3 className="text-slate-900 text-lg md:text-xl font-medium leading-relaxed tracking-normal">
                        Hệ điều hành cho doanh nghiệp tương lai
                    </h3>
                </div>

                {/* Loading Indicator */}
                <div aria-label="Loading application" className="w-full max-w-[240px] flex flex-col gap-2" role="progressbar">
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                    </div>
                    <div className="flex justify-center mt-2">
                        <span className="text-slate-400 text-xs font-medium tracking-wide uppercase">Loading Resources</span>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-6 w-full text-center px-4">
                <p className="text-slate-400 text-xs font-normal">v2.0.1 © 2024 BusinessOS Inc. All rights reserved.</p>
            </footer>

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="fixed -bottom-32 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="fixed -top-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
}
