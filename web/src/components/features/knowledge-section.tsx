import { FileText, Download } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "宠物经济",
    titleEn: "Pet Economy Report",
    category: "White Paper",
    description: "深入分析宠物经济产业链、消费趋势与商机",
    fileSize: "PDF",
    color: "bg-cobalt/20",
    pdfUrl: "/宠物经济.pdf",
  },
  {
    id: 2,
    title: "家居生活",
    titleEn: "Home & Living Report",
    category: "White Paper",
    description: "家居生活消费升级趋势、供应链优化与品牌机会",
    fileSize: "PDF",
    color: "bg-navy-light/30",
    pdfUrl: "/家居生活.pdf",
  },
  {
    id: 3,
    title: "消费电子",
    titleEn: "Consumer Electronics Report",
    category: "White Paper",
    description: "消费电子产业变革、技术创新与市场前景分析",
    fileSize: "PDF",
    color: "bg-cobalt-muted/20",
    pdfUrl: "/消费电子.pdf",
  },
]

export function KnowledgeSection() {
  return (
    <section id="insights" className="section-padding bg-white">
      <div className="container-editorial">
        {/* Section Header - White House Style */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold text-navy mb-6 tracking-tight">
            Knowledge Capital
          </h2>
          <p className="text-xl text-slate leading-relaxed">
            我们以白皮书、研究报告与行业洞察的形式，分享我们的专业知识与独到见解。
          </p>
        </div>

        {/* Reports Grid - Clean & Professional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report) => (
            <a
              key={report.id}
              href={report.pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {/* Card Container */}
              <div className="border border-gray-200 bg-white hover:border-brand-blue hover:shadow-xl transition-all duration-300">
                {/* Cover Image Area */}
                <div className="aspect-[4/3] bg-gray-50 p-8 flex flex-col justify-between border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate">
                      {report.category}
                    </span>
                    <Download className="w-5 h-5 text-slate opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <FileText className="w-12 h-12 text-navy opacity-20 mb-4" strokeWidth={1.5} />
                    <h3 className="text-xl font-semibold text-navy mb-2 leading-tight">
                      {report.title}
                    </h3>
                    <p className="text-xs text-slate uppercase tracking-wide">
                      {report.titleEn}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6">
                  <p className="text-sm text-slate leading-relaxed mb-4">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-light">
                    <span>{report.fileSize}</span>
                    <span className="text-brand-blue font-medium group-hover:underline">
                      下载报告 →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA - White House Style */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-navy mb-2">下载行业白皮书</h3>
              <p className="text-sm text-slate">了解市场洞察，把握行业机会</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
