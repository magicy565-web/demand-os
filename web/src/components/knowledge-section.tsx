import Image from "next/image"
import Link from "next/link"
import { Download, FileText } from "lucide-react"

export function KnowledgeSection() {
  const reports = [
    {
      id: 1,
      title: "全球贸易展望2026",
      description: "关键市场趋势和消费者行为预测",
      color: "bg-cobalt/10",
      icon: "📊",
      pages: "48",
      size: "12 MB",
      href: "#report-1",
    },
    {
      id: 2,
      title: "算法经济学",
      description: "AI如何重塑跨境商业决策",
      color: "bg-navy/10",
      icon: "🤖",
      pages: "36",
      size: "8 MB",
      href: "#report-2",
    },
    {
      id: 3,
      title: "本地化生存指南",
      description: "15个市场的监管与运营指南",
      color: "bg-cobalt-muted/10",
      icon: "🌍",
      pages: "64",
      size: "16 MB",
      href: "#report-3",
    },
  ]

  return (
    <section id="knowledge" className="section-padding bg-paper-warm">
      <div className="container-editorial">
        {/* Header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Research & Insights</p>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-navy mb-4">
            知识库
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            获取最新的市场研究、行业分析和执行指南。
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {reports.map((report) => (
            <Link
              key={report.id}
              href={report.href}
              className={`group/report p-6 lg:p-8 ${report.color} hover:shadow-lg transition-editorial border border-transparent hover:border-border`}
            >
              {/* Icon & Title */}
              <div className="mb-6">
                <div className="text-4xl mb-4">{report.icon}</div>
                <h3 className="heading-serif text-xl lg:text-2xl text-navy mb-2 group-hover/report:text-cobalt transition-colors duration-300">
                  {report.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="pt-6 border-t border-border/30 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  <p>{report.pages} pages • {report.size}</p>
                </div>
                <Download className="w-5 h-5 text-navy/30 group-hover/report:text-cobalt transition-colors duration-300" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-navy text-paper p-8 lg:p-12 rounded-none">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <FileText className="w-8 h-8 text-cobalt shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="heading-serif text-2xl mb-2">
                  订阅我们的洞察通讯
                </h3>
                <p className="text-paper/70 text-base">
                  获取每周的市场动态、研究亮点和行业新闻——直接发送到您的邮箱。
                </p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your.email@company.com"
                className="flex-1 px-4 py-3 bg-navy-light border border-paper/20 text-paper placeholder:text-paper/50 focus:outline-none focus:border-cobalt transition-editorial text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-cobalt text-navy font-bold uppercase tracking-wider text-sm hover:bg-cobalt/90 transition-editorial whitespace-nowrap"
              >
                订阅
              </button>
            </form>

            <p className="text-xs text-paper/50 mt-4">
              我们尊重您的隐私。 <Link href="#privacy" className="underline hover:text-paper">阅读我们的隐私政策</Link>
            </p>
          </div>
        </div>

        {/* Resource Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "白皮书", count: "8" },
            { label: "案例研究", count: "12" },
            { label: "网络研讨会录制", count: "15" },
            { label: "数据集", count: "6" },
          ].map((resource, index) => (
            <Link
              key={index}
              href="#resources"
              className="p-4 border border-border hover:border-navy transition-editorial text-center group/resource"
            >
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover/resource:text-navy transition-colors duration-300 mb-1">
                {resource.label}
              </p>
              <p className="heading-serif text-2xl text-navy">
                {resource.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KnowledgeSection
