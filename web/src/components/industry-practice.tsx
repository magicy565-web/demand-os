import Link from "next/link"
import { ArrowRight } from "lucide-react"

const industries = [
  {
    id: "01",
    name: "消费电子",
    nameEn: "Consumer Electronics",
    description: "智能硬件、可穿戴设备、智能家居生态",
    growth: "+24%",
  },
  {
    id: "02",
    name: "美妆个护",
    nameEn: "Beauty & Personal Care",
    description: "护肤、彩妆、个人护理产品出海",
    growth: "+31%",
  },
  {
    id: "03",
    name: "家居生活",
    nameEn: "Home & Living",
    description: "家具、家纺、厨房用品全球化",
    growth: "+18%",
  },
  {
    id: "04",
    name: "运动户外",
    nameEn: "Sports & Outdoor",
    description: "运动装备、户外用品、健身器材",
    growth: "+27%",
  },
  {
    id: "05",
    name: "母婴",
    nameEn: "Baby & Maternity",
    description: "婴童用品、孕产妇护理产品",
    growth: "+22%",
  },
  {
    id: "06",
    name: "宠物经济",
    nameEn: "Pet Economy",
    description: "宠物食品、用品、智能设备",
    growth: "+35%",
  },
]

export function IndustryPractice() {
  return (
    <section id="industries" className="section-padding bg-paper">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Industry Practice</p>
            <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-navy">
              行业聚焦
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md lg:text-right">
            我们深耕六大核心行业，以专业洞察与本土化经验助力您的全球化征程。
          </p>
        </div>

        {/* Industry Index List */}
        <div className="border-t border-border">
          {industries.map((industry) => (
            <Link
              key={industry.id}
              href={`#industry-${industry.id}`}
              className="group block border-b border-border py-6 lg:py-8 transition-colors duration-300 hover:bg-paper-warm"
            >
              <div className="flex items-center gap-4 lg:gap-8">
                {/* Index Number */}
                <span className="heading-serif text-2xl lg:text-3xl text-navy/20 w-12 lg:w-16 shrink-0">
                  {industry.id}
                </span>

                {/* Main Content */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8 items-center">
                  {/* Industry Name */}
                  <div className="lg:col-span-3">
                    <h3 className="heading-serif text-xl lg:text-2xl text-navy group-hover:text-cobalt transition-colors duration-300">
                      {industry.name}
                    </h3>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {industry.nameEn}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-6">
                    <p className="text-sm text-muted-foreground">
                      {industry.description}
                    </p>
                  </div>

                  {/* Growth */}
                  <div className="lg:col-span-2 hidden lg:block">
                    <span className="text-sm font-medium text-cobalt">
                      {industry.growth} YoY
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="lg:col-span-1 hidden lg:flex justify-end">
                    <ArrowRight className="w-5 h-5 text-navy/30 group-hover:text-navy group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
