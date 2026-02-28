import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "BusinessOS - Hệ điều hành doanh nghiệp thế hệ mới",
        template: "%s | BusinessOS",
    },
    description:
        "Kết nối trí tuệ - Vận hành thông minh. Nền tảng Dual-View giúp CEO quản trị bằng đầu ngón tay và Freelancer tối ưu hiệu suất.",
    keywords: [
        "ERP",
        "BusinessOS",
        "Freelancer Platform",
        "Quản trị doanh nghiệp",
        "Dual-View",
        "SME",
        "AI",
        "Project Management",
        "Virtual Mode",
        "Classic Mode",
    ],
    authors: [{ name: "BusinessOS Corporation", url: "https://businessos.vn" }],
    creator: "BusinessOS Corporation",
    publisher: "BusinessOS Corporation",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://businessos.vn"),
    openGraph: {
        title: "BusinessOS - Hệ điều hành doanh nghiệp thế hệ mới",
        description:
            "Kết nối trí tuệ - Vận hành thông minh. Nền tảng Dual-View giúp CEO quản trị bằng đầu ngón tay và Freelancer tối ưu hiệu suất.",
        url: "https://businessos.vn",
        siteName: "BusinessOS",
        images: [
            {
                url: "/images/imported/thumbnail.png",
                width: 1200,
                height: 630,
                alt: "BusinessOS - Dual-View Platform",
            },
        ],
        locale: "vi_VN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "BusinessOS - Hệ điều hành doanh nghiệp thế hệ mới",
        description:
            "Kết nối trí tuệ - Vận hành thông minh. Nền tảng Dual-View giúp CEO quản trị bằng đầu ngón tay và Freelancer tối ưu hiệu suất.",
        images: ["/images/imported/thumbnail.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}

