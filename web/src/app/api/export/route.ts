import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Mock 数据
const mockData = [
  {
    id: '1',
    product_name: '智能手环',
    category: 'electronics',
    trend_score: 85,
    lifecycle: 'explosive',
    created_at: '2026-02-01',
  },
  {
    id: '2',
    product_name: '便携式咖啡机',
    category: 'home_garden',
    trend_score: 72,
    lifecycle: 'emerging',
    created_at: '2026-02-02',
  },
  {
    id: '3',
    product_name: '无线耳机',
    category: 'electronics',
    trend_score: 91,
    lifecycle: 'explosive',
    created_at: '2026-02-03',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { format, ids } = body;

    // 筛选要导出的数据
    const dataToExport = ids
      ? mockData.filter((item) => ids.includes(item.id))
      : mockData;

    if (format === 'pdf') {
      return exportPDF(dataToExport);
    } else if (format === 'excel') {
      return exportExcel(dataToExport);
    } else if (format === 'csv') {
      return exportCSV(dataToExport);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid format' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

function exportPDF(data: any[]) {
  const doc = new jsPDF();

  // 标题
  doc.setFontSize(18);
  doc.text('产品分析报告', 14, 22);

  // 日期
  doc.setFontSize(11);
  doc.text(`生成日期: ${new Date().toLocaleDateString('zh-CN')}`, 14, 32);

  // 表格
  autoTable(doc, {
    startY: 40,
    head: [['产品名称', '类别', '趋势分数', '生命周期', '创建日期']],
    body: data.map((item) => [
      item.product_name,
      getCategoryName(item.category),
      item.trend_score,
      getLifecycleName(item.lifecycle),
      item.created_at,
    ]),
    styles: { font: 'helvetica', fontSize: 10 },
    headStyles: { fillColor: [66, 139, 202] },
  });

  // 生成 PDF Buffer
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="product-analysis-${Date.now()}.pdf"`,
    },
  });
}

function exportExcel(data: any[]) {
  // 创建工作簿
  const wb = XLSX.utils.book_new();

  // 准备数据
  const wsData = [
    ['产品名称', '类别', '趋势分数', '生命周期', '创建日期'],
    ...data.map((item) => [
      item.product_name,
      getCategoryName(item.category),
      item.trend_score,
      getLifecycleName(item.lifecycle),
      item.created_at,
    ]),
  ];

  // 创建工作表
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // 设置列宽
  ws['!cols'] = [
    { wch: 20 }, // 产品名称
    { wch: 15 }, // 类别
    { wch: 12 }, // 趋势分数
    { wch: 12 }, // 生命周期
    { wch: 15 }, // 创建日期
  ];

  // 添加工作表到工作簿
  XLSX.utils.book_append_sheet(wb, ws, '产品分析');

  // 生成 Excel Buffer
  const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  return new NextResponse(excelBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="product-analysis-${Date.now()}.xlsx"`,
    },
  });
}

function exportCSV(data: any[]) {
  // CSV 标题
  const headers = ['产品名称', '类别', '趋势分数', '生命周期', '创建日期'];

  // CSV 数据行
  const rows = data.map((item) => [
    item.product_name,
    getCategoryName(item.category),
    item.trend_score,
    getLifecycleName(item.lifecycle),
    item.created_at,
  ]);

  // 组合 CSV
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  // 添加 BOM 以支持中文
  const bom = '\uFEFF';
  const csvBuffer = Buffer.from(bom + csvContent, 'utf-8');

  return new NextResponse(csvBuffer, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="product-analysis-${Date.now()}.csv"`,
    },
  });
}

// 辅助函数
function getCategoryName(category: string): string {
  const categoryMap: Record<string, string> = {
    electronics: '电子产品',
    home_garden: '家居园艺',
    sports: '运动健身',
    fashion: '时尚服饰',
    beauty: '美妆护肤',
    toys: '玩具游戏',
    automotive: '汽车配件',
    other: '其他',
  };
  return categoryMap[category] || category;
}

function getLifecycleName(lifecycle: string): string {
  const lifecycleMap: Record<string, string> = {
    emerging: '新兴期',
    explosive: '爆发期',
    mature: '成熟期',
    declining: '衰退期',
  };
  return lifecycleMap[lifecycle] || lifecycle;
}
