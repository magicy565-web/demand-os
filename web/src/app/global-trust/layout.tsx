import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '全球布局 | Global Trust Network',
  description: '联接全球，信任共建。全球化布局，区域化服务。',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
