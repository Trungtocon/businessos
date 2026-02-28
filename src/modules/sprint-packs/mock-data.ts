import type { LeadPack } from "./schemas";
import type { ContentPack } from "./schemas";
import type { ReportPack } from "./schemas";
import type { SprintInput } from "./types";

// ─── Mock Lead Pack ───────────────────────────────────────────────────

export function mockLeadPack(input: SprintInput): LeadPack {
    return {
        icp: {
            who: `Chủ doanh nghiệp SME ngành ${input.industry}, có nhu cầu ${input.offer}`,
            painPoints: [
                "Khó khăn trong việc tìm kiếm khách hàng mới",
                "Chi phí quảng cáo cao nhưng hiệu quả thấp",
                "Không có quy trình bán hàng rõ ràng",
            ],
            triggers: [
                "Vừa ra mắt sản phẩm/dịch vụ mới",
                "Doanh thu quý trước giảm",
                "Đối thủ đang mở rộng thị phần",
            ],
            exclusions: [
                "Doanh nghiệp không có website",
                "Ngân sách dưới 5 triệu/tháng",
            ],
        },
        persona: {
            name: "Anh Minh - CEO SME",
            context: `CEO công ty ${input.industry}, 35-45 tuổi, quản lý 10-50 nhân viên. Muốn ${input.goal7d}.`,
            objections: [
                "Tôi đã thử nhiều cách mà không hiệu quả",
                "Chi phí quá cao",
                "Không có thời gian để triển khai",
            ],
            desiredOutcome: `Có hệ thống lead generation tự động, tăng doanh thu 30% trong 90 ngày`,
        },
        offerAngles: [
            { angle: "Tiết kiệm chi phí", promise: `Giảm 50% chi phí tìm khách so với quảng cáo truyền thống`, proof: "Case study: Công ty X tiết kiệm 200tr/quý", cta: "Nhận tư vấn miễn phí ngay" },
            { angle: "Tốc độ", promise: `Có lead đầu tiên trong 7 ngày`, proof: "Đã triển khai cho 50+ doanh nghiệp", cta: "Đăng ký Sprint ngay" },
            { angle: "Tự động hóa", promise: `Hệ thống nurture tự động 24/7`, proof: "Tỷ lệ chuyển đổi trung bình 12%", cta: "Xem demo hệ thống" },
        ],
        funnelPlan: [
            { step: "Awareness", channel: input.primaryChannel, asset: "Video ngắn giới thiệu vấn đề", successMetric: "1000+ views" },
            { step: "Interest", channel: input.primaryChannel, asset: "Lead magnet: Checklist miễn phí", successMetric: "100+ downloads" },
            { step: "Consideration", channel: "email", asset: "Email sequence 5 ngày", successMetric: "30%+ open rate" },
            { step: "Conversion", channel: "zalo", asset: "Tư vấn 1-1 qua Zalo", successMetric: "20%+ booking rate" },
        ],
        crmPipelineStages: ["Mới (New Lead)", "Đã liên hệ (Contacted)", "Đã demo (Demo Done)", "Đề xuất (Proposal)", "Đã chốt (Won)"],
        nurtureSequences: {
            sequence1: [
                { day: 1, message: `Chào [Tên], cảm ơn bạn đã quan tâm đến ${input.offer}`, channel: "email", cta: "Xem case study" },
                { day: 3, message: "3 sai lầm phổ biến khi tìm khách hàng mới", channel: "email", cta: "Đọc bài viết" },
                { day: 5, message: `Cách doanh nghiệp ${input.industry} tăng 50% lead`, channel: "email", cta: "Xem video hướng dẫn" },
                { day: 7, message: "Bạn có muốn nhận bản phân tích miễn phí?", channel: "zalo", cta: "Đặt lịch tư vấn" },
                { day: 10, message: "Ưu đãi đặc biệt: Giảm 30% cho Sprint đầu tiên", channel: "email", cta: "Đăng ký ngay" },
            ],
            sequence2: [
                { day: 1, message: "Follow up sau demo - Tổng kết nội dung đã thảo luận", channel: "email", cta: "Xem proposal" },
                { day: 3, message: "Chia sẻ thêm case study ngành tương tự", channel: "zalo", cta: "Đặt câu hỏi" },
                { day: 7, message: "Deadline ưu đãi: Còn 48h để đăng ký Sprint", channel: "email", cta: "Đăng ký Sprint" },
            ],
        },
        followUpChecklist7d: [
            "Ngày 1: Gửi email chào mừng + lead magnet",
            "Ngày 2: Gọi điện xác nhận + giới thiệu nhanh",
            "Ngày 3: Gửi case study ngành tương tự",
            "Ngày 4: Mời tham gia webinar/demo",
            "Ngày 5: Follow up sau demo + gửi proposal",
            "Ngày 6: Xử lý objections + negotiation",
            "Ngày 7: Close deal hoặc schedule follow up tiếp",
        ],
        nextActions: [
            `Thiết lập CRM pipeline với 5 stages`,
            `Tạo lead magnet cho ngành ${input.industry}`,
            `Setup email automation sequence 1`,
            `Chạy campaign quảng cáo trên ${input.primaryChannel}`,
            "Review và optimize sau 7 ngày",
        ],
    };
}

// ─── Mock Content Pack ────────────────────────────────────────────────

export function mockContentPack(input: SprintInput): ContentPack {
    const days = Array.from({ length: 14 }, (_, i) => ({
        day: i + 1,
        theme: [`Giới thiệu ${input.offer}`, "Pain points khách hàng", "Case study", "Behind the scenes", "Tips & tricks", "Testimonial", "FAQ", "Offer đặc biệt", "Trend ngành", "So sánh sản phẩm", "Hướng dẫn nhanh", "Social proof", "Story khách hàng", "CTA đặc biệt"][i],
        format: ["Carousel", "Short video", "Infographic", "Story", "Reel", "Post dài", "Live", "Carousel", "Video", "Infographic", "Story", "Post", "Video", "Carousel"][i],
        hook: `Hook ngày ${i + 1}: ${["Bạn có biết", "Sai lầm lớn nhất", "Bí quyết #1", "Đừng bỏ lỡ", "3 bước đơn giản", "Khách hàng nói gì", "Câu hỏi thường gặp", "Chỉ còn hôm nay", "Xu hướng mới", "So sánh thú vị", "Hướng dẫn 60s", "Kết quả thực tế", "Câu chuyện cảm hứng", "Cơ hội cuối"][i]}...`,
        cta: ["Lưu lại ngay", "Comment để nhận", "Inbox để tư vấn", "Swipe để xem", "Tag bạn bè", "Chia sẻ ngay", "Gửi câu hỏi", "Đăng ký ngay", "Follow để cập nhật", "So sánh & chọn", "Thử ngay", "Xem thêm", "Xem full story", "Hành động ngay"][i],
    }));

    return {
        calendar14d: days,
        hooks10: [
            `Bạn đang mất khách vì ${input.industry} thay đổi quá nhanh?`,
            "3 sai lầm khiến 90% SME thất bại trong marketing",
            `${input.offer} - Giải pháp mà đối thủ không muốn bạn biết`,
            "Tôi đã giúp 50+ doanh nghiệp tăng 3x doanh thu. Đây là cách...",
            "DỪNG LẠI nếu bạn đang làm marketing kiểu này",
            `Công thức ${input.tone === "bold" ? "bá đạo" : "hiệu quả"} nhất cho ${input.industry}`,
            "1 phút đọc = tiết kiệm 1 triệu quảng cáo",
            `${input.targetCustomer} cần gì? Câu trả lời sẽ khiến bạn bất ngờ`,
            "Case study: Từ 0 đến 100 khách/ngày trong 30 ngày",
            "Checklist marketing miễn phí (lưu lại ngay!)",
        ],
        ctas10: [
            "Inbox 'SPRINT' để nhận tư vấn miễn phí",
            "Comment '📋' để nhận checklist",
            "Lưu lại để dùng khi cần!",
            "Tag 1 người cần đọc bài này",
            "Chia sẻ cho team marketing của bạn",
            "Follow để nhận thêm tips mỗi ngày",
            "Click link in bio để đăng ký Sprint",
            "Gửi tin nhắn 'DEMO' để xem demo",
            "Đăng ký workshop miễn phí cuối tuần này",
            "Comment 'YES' nếu bạn đồng ý!",
        ],
        posts10: Array.from({ length: 10 }, (_, i) => ({
            title: `Bài ${i + 1}: ${["Giới thiệu", "Vấn đề", "Giải pháp", "Case study", "Tips", "FAQ", "Offer", "Testimony", "Trend", "CTA"][i]} - ${input.offer}`,
            caption: `Caption bài ${i + 1} cho ${input.targetCustomer} trong ngành ${input.industry}. Tone: ${input.tone}. Nội dung tập trung vào ${input.goal7d}.`,
            channel: input.primaryChannel === "multi" ? ["facebook", "tiktok", "facebook", "tiktok", "facebook", "tiktok", "facebook", "tiktok", "facebook", "tiktok"][i] : input.primaryChannel,
            hashtags: [`#${input.industry.replace(/\s/g, "")}`, "#MarketingSME", "#BusinessOS", `#${input.offer.replace(/\s/g, "").slice(0, 20)}`],
            visualBrief: `Thiết kế ${["carousel", "video thumbnail", "infographic", "story", "reel cover", "banner", "video", "testimonial card", "trend visual", "CTA banner"][i]} với tone ${input.tone}, màu sắc chuyên nghiệp`,
        })),
        videos3: [
            { title: `Video 1: ${input.offer} là gì và tại sao ${input.targetCustomer} cần?`, script: `Hook (3s): "Bạn đang mất tiền vì chưa biết điều này"\nProblem (10s): Nêu pain point\nSolution (15s): Giới thiệu ${input.offer}\nCTA (5s): "Inbox SPRINT để biết thêm"`, shots: ["Close-up người nói", "B-roll sản phẩm", "Screen recording demo", "Logo + CTA"] },
            { title: `Video 2: 3 bước triển khai ${input.offer} cho ${input.industry}`, script: `Hook (3s): "3 bước mà 90% doanh nghiệp bỏ qua"\nStep 1 (10s): Phân tích\nStep 2 (10s): Triển khai\nStep 3 (10s): Đo lường\nCTA (5s): "Bạn đang ở bước nào?"`, shots: ["Whiteboard animation", "Screen recording", "Data visualization", "Person talking to camera"] },
            { title: `Video 3: Case study - Kết quả sau 7 ngày Sprint`, script: `Hook (3s): "Đây là kết quả THỰC sau 7 ngày"\nBefore (10s): Tình trạng trước\nAction (10s): Những gì đã làm\nResult (10s): Số liệu cụ thể\nCTA (5s): "Đăng ký Sprint của bạn"`, shots: ["Before/after screenshot", "Dashboard metrics", "Client testimonial clip", "CTA slide"] },
        ],
        keyVisualBrief: {
            concept: `Chuyên nghiệp, đáng tin cậy, hiện đại cho ngành ${input.industry}`,
            colors: input.tone === "bold" ? "Đỏ cam (#FF4500) + Đen (#1a1a1a) + Trắng" : input.tone === "friendly" ? "Xanh dương (#2563EB) + Cam (#F59E0B) + Trắng" : "Xanh navy (#1E3A5F) + Vàng gold (#D4AF37) + Trắng",
            typography: "Heading: Montserrat Bold, Body: Inter Regular",
            do: "Dùng layout clean, whitespace nhiều, CTA rõ ràng, ảnh chất lượng cao",
            dont: "Không dùng quá 3 màu, không dùng font nhiều kiểu, không nhồi nhét text",
        },
        nextActions: [
            "Thiết kế template Canva cho 14 ngày",
            `Setup lịch đăng trên ${input.primaryChannel}`,
            "Quay 3 video theo script",
            "Tạo hashtag bank chuyên dụng",
            "Setup analytics tracking cho từng bài",
        ],
    };
}

// ─── Mock Report Pack ─────────────────────────────────────────────────

export function mockReportPack(input: SprintInput): ReportPack {
    return {
        kpiSummary: [
            { kpi: "Leads mới", current: "47", target: "100", gap: "-53", note: "Cần tăng budget ads hoặc optimize funnel" },
            { kpi: "Tỷ lệ chuyển đổi", current: "8%", target: "15%", gap: "-7%", note: "Landing page cần A/B test" },
            { kpi: "Chi phí/lead (CPL)", current: "120k", target: "80k", gap: "+40k", note: "Giảm CPL bằng content organic" },
            { kpi: "Revenue", current: "45M", target: "80M", gap: "-35M", note: `Tập trung vào ${input.offer} có margin cao` },
            { kpi: "NPS Score", current: "42", target: "50", gap: "-8", note: "Cải thiện customer support response time" },
        ],
        insights3: [
            `${input.primaryChannel} đang là kênh có CPL thấp nhất - cần tăng 2x budget`,
            `${input.targetCustomer} phản hồi tốt nhất với content dạng video ngắn < 60s`,
            `Offer "${input.offer}" có conversion rate cao nhất khi kèm social proof`,
        ],
        decisions3: [
            `QUYẾT ĐỊNH: Tăng budget ${input.primaryChannel} thêm 50% trong tuần tới`,
            "QUYẾT ĐỊNH: Dừng campaign có CPL > 150k, chuyển budget sang organic",
            `QUYẾT ĐỊNH: Launch A/B test landing page mới cho ${input.offer}`,
        ],
        prioritizedTasks5: [
            { task: `Optimize landing page ${input.offer}`, impact: 5, effort: 3, ownerRole: "Marketing Lead", due: "T2" },
            { task: `Thêm 5 testimonials trên ${input.primaryChannel}`, impact: 4, effort: 2, ownerRole: "Content Creator", due: "T3" },
            { task: "Setup retargeting ads cho traffic tuần này", impact: 4, effort: 3, ownerRole: "Ads Specialist", due: "T4" },
            { task: `Quay 2 video case study ngành ${input.industry}`, impact: 3, effort: 4, ownerRole: "Video Team", due: "T5" },
            { task: "Review và clean CRM pipeline", impact: 3, effort: 2, ownerRole: "Sales Lead", due: "T6" },
        ],
        risks: [
            "Budget ads có thể hết trước cuối tháng nếu không optimize CPL",
            `Đối thủ đang tăng mạnh content trên ${input.primaryChannel} - cần differentiate`,
            "Team marketing đang overload - cần ưu tiên hoặc outsource",
        ],
        nextActions: [
            "Monday: Review dashboard và adjust budget",
            `Tuesday: Launch A/B test landing page ${input.offer}`,
            `Wednesday: Publish 3 bài content trên ${input.primaryChannel}`,
            "Thursday: Team meeting - review mid-week results",
            "Friday: Compile report + plan tuần tiếp theo",
        ],
    };
}
