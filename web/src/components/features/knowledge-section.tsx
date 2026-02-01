import Link from "next/link"
import { FileText, Download } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "2026年全球贸易展望",
    titleEn: "Global Trade Outlook 2026",
    category: "Annual Report",
    description: "全面解读跨境电商市场格局变化与增长机遇",
    fileSize: "PDF / 4.2MB",
    color: "bg-cobalt/20",
  },
  {
    id: 2,
    title: "算法经济学",
    titleEn: "The Economics of Algorithms",
    category: "White Paper",
    description: "平台算法如何重塑跨境电商的流量分配与竞争格局",
    fileSize: "PDF / 2.8MB",
    color: "bg-navy-light/30",
  },
  {
    id: 3,
    title: "本地化生存指南",
    titleEn: "Localization Survival Guide",
    category: "Playbook",
    description: "从文化适应到供应链优化的全面本地化手册",
    fileSize: "PDF / 3.5MB",
    color: "bg-cobalt-muted/20",
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
            <Link
              key={report.id}
              href={`#report-${report.id}`}
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
            </Link>
          ))}
        </div>

        {/* Bottom CTA - White House Style */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-navy mb-2">探索更多洞察</h3>
              <p className="text-sm text-slate">访问我们的完整知识库，获取超过50篇行业研究报告</p>
            </div>
            <Link href="#all-insights" className="btn-primary">
              浏览全部研究 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
