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
    <section id="insights" className="section-padding bg-navy">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-4">Knowledge Capital</p>
            <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-paper">
              知识资本
            </h2>
          </div>
          <p className="text-sm text-paper/60 max-w-md lg:text-right">
            我们以白皮书、研究报告与行业洞察的形式，分享我们的专业知识与独到见解。
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reports.map((report) => (
            <Link
              key={report.id}
              href={`#report-${report.id}`}
              className="group block"
            >
              {/* Cover */}
              <div
                className={`aspect-[3/4] ${report.color} p-6 lg:p-8 flex flex-col justify-between mb-4 transition-all duration-500 group-hover:brightness-110`}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-2">{report.category}</p>
                  <FileText
                    className="w-8 h-8 text-paper/30 mb-4"
                    strokeWidth={1}
                  />
                </div>
                <div>
                  <h3 className="heading-serif text-xl lg:text-2xl text-paper mb-2 leading-tight">
                    {report.title}
                  </h3>
                  <p className="text-xs text-paper/50 uppercase tracking-wider">
                    {report.titleEn}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-paper/70 leading-relaxed mb-2">
                    {report.description}
                  </p>
                  <span className="text-xs text-paper/40">{report.fileSize}</span>
                </div>
                <Download
                  className="w-5 h-5 text-paper/30 shrink-0 mt-1 group-hover:text-paper/60 transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-paper/10 text-center">
          <Link
            href="#all-insights"
            className="inline-flex items-center gap-2 text-sm text-paper/70 hover:text-paper transition-colors duration-300"
          >
            浏览全部洞察与研究
            <span className="text-paper/30">({'>'}50 篇)</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
