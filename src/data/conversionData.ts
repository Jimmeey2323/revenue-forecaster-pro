// Historical conversion data by location

export interface MonthlyConversionData {
  month: string;
  year: number;
  monthNum: number;
  trials: number;
  newMembers: number;
  converted: number;
  retained: number;
  retentionRate: number;
  conversionRate: number;
  avgLTV: number;
  totalLTV: number;
  avgConvDays: number;
}

export interface LocationConversionData {
  location: string;
  data: MonthlyConversionData[];
}

// Kwality House (Kemps Corner) Conversion Data
export const kwalityHouseConversion: MonthlyConversionData[] = [
  { month: "Mar", year: 2024, monthNum: 3, trials: 57, newMembers: 52, converted: 22, retained: 23, retentionRate: 44.2, conversionRate: 42.3, avgLTV: 11700, totalLTV: 670000, avgConvDays: 94 },
  { month: "Apr", year: 2024, monthNum: 4, trials: 68, newMembers: 63, converted: 17, retained: 19, retentionRate: 30.2, conversionRate: 27.0, avgLTV: 13100, totalLTV: 890000, avgConvDays: 15 },
  { month: "May", year: 2024, monthNum: 5, trials: 61, newMembers: 59, converted: 14, retained: 16, retentionRate: 27.1, conversionRate: 23.7, avgLTV: 14700, totalLTV: 900000, avgConvDays: 72 },
  { month: "Jun", year: 2024, monthNum: 6, trials: 97, newMembers: 96, converted: 31, retained: 35, retentionRate: 36.5, conversionRate: 32.3, avgLTV: 9200, totalLTV: 890000, avgConvDays: 139 },
  { month: "Jul", year: 2024, monthNum: 7, trials: 68, newMembers: 67, converted: 21, retained: 24, retentionRate: 35.8, conversionRate: 31.3, avgLTV: 9600, totalLTV: 650000, avgConvDays: 29 },
  { month: "Aug", year: 2024, monthNum: 8, trials: 70, newMembers: 69, converted: 26, retained: 30, retentionRate: 43.5, conversionRate: 37.7, avgLTV: 14800, totalLTV: 1030000, avgConvDays: 58 },
  { month: "Sep", year: 2024, monthNum: 9, trials: 79, newMembers: 76, converted: 24, retained: 29, retentionRate: 38.2, conversionRate: 31.6, avgLTV: 31100, totalLTV: 2460000, avgConvDays: 49 },
  { month: "Oct", year: 2024, monthNum: 10, trials: 51, newMembers: 50, converted: 14, retained: 15, retentionRate: 30.0, conversionRate: 28.0, avgLTV: 13400, totalLTV: 680000, avgConvDays: 76 },
  { month: "Nov", year: 2024, monthNum: 11, trials: 54, newMembers: 53, converted: 11, retained: 13, retentionRate: 24.5, conversionRate: 20.8, avgLTV: 11200, totalLTV: 610000, avgConvDays: 88 },
  { month: "Dec", year: 2024, monthNum: 12, trials: 66, newMembers: 64, converted: 20, retained: 23, retentionRate: 35.9, conversionRate: 31.3, avgLTV: 13400, totalLTV: 880000, avgConvDays: 53 },
  { month: "Jan", year: 2025, monthNum: 1, trials: 51, newMembers: 50, converted: 13, retained: 13, retentionRate: 26.0, conversionRate: 26.0, avgLTV: 4800, totalLTV: 240000, avgConvDays: 52 },
  { month: "Feb", year: 2025, monthNum: 2, trials: 64, newMembers: 61, converted: 21, retained: 25, retentionRate: 41.0, conversionRate: 34.4, avgLTV: 9600, totalLTV: 620000, avgConvDays: 32 },
  { month: "Mar", year: 2025, monthNum: 3, trials: 67, newMembers: 64, converted: 21, retained: 29, retentionRate: 45.3, conversionRate: 32.8, avgLTV: 12000, totalLTV: 800000, avgConvDays: 25 },
  { month: "Apr", year: 2025, monthNum: 4, trials: 62, newMembers: 61, converted: 21, retained: 24, retentionRate: 39.3, conversionRate: 34.4, avgLTV: 11500, totalLTV: 710000, avgConvDays: 22 },
  { month: "May", year: 2025, monthNum: 5, trials: 119, newMembers: 114, converted: 28, retained: 38, retentionRate: 33.3, conversionRate: 24.6, avgLTV: 9900, totalLTV: 1170000, avgConvDays: 21 },
  { month: "Jun", year: 2025, monthNum: 6, trials: 97, newMembers: 93, converted: 27, retained: 35, retentionRate: 37.6, conversionRate: 29.0, avgLTV: 10200, totalLTV: 990000, avgConvDays: 26 },
  { month: "Jul", year: 2025, monthNum: 7, trials: 86, newMembers: 85, converted: 30, retained: 36, retentionRate: 42.4, conversionRate: 35.3, avgLTV: 8600, totalLTV: 740000, avgConvDays: 27 },
  { month: "Aug", year: 2025, monthNum: 8, trials: 126, newMembers: 123, converted: 31, retained: 33, retentionRate: 26.8, conversionRate: 25.2, avgLTV: 4800, totalLTV: 600000, avgConvDays: 21 },
  { month: "Sep", year: 2025, monthNum: 9, trials: 137, newMembers: 136, converted: 23, retained: 24, retentionRate: 17.6, conversionRate: 16.9, avgLTV: 4300, totalLTV: 590000, avgConvDays: 18 },
  { month: "Oct", year: 2025, monthNum: 10, trials: 106, newMembers: 102, converted: 25, retained: 26, retentionRate: 25.5, conversionRate: 24.5, avgLTV: 5200, totalLTV: 550000, avgConvDays: 11 },
  { month: "Nov", year: 2025, monthNum: 11, trials: 129, newMembers: 127, converted: 20, retained: 24, retentionRate: 18.9, conversionRate: 15.7, avgLTV: 2600, totalLTV: 340000, avgConvDays: 9 },
  { month: "Dec", year: 2025, monthNum: 12, trials: 32, newMembers: 31, converted: 5, retained: 6, retentionRate: 19.4, conversionRate: 16.1, avgLTV: 2100, totalLTV: 68800, avgConvDays: 4 },
];

// Supreme HQ (Bandra) Conversion Data
export const supremeHQConversion: MonthlyConversionData[] = [
  { month: "Mar", year: 2024, monthNum: 3, trials: 2, newMembers: 0, converted: 0, retained: 0, retentionRate: 0, conversionRate: 0, avgLTV: 7300, totalLTV: 14500, avgConvDays: 139 },
  { month: "Apr", year: 2024, monthNum: 4, trials: 0, newMembers: 0, converted: 0, retained: 0, retentionRate: 0, conversionRate: 0, avgLTV: 0, totalLTV: 0, avgConvDays: 0 },
  { month: "May", year: 2024, monthNum: 5, trials: 385, newMembers: 385, converted: 74, retained: 101, retentionRate: 26.2, conversionRate: 19.2, avgLTV: 6100, totalLTV: 2360000, avgConvDays: 73 },
  { month: "Jun", year: 2024, monthNum: 6, trials: 220, newMembers: 217, converted: 65, retained: 79, retentionRate: 36.4, conversionRate: 30.0, avgLTV: 12100, totalLTV: 2670000, avgConvDays: 63 },
  { month: "Jul", year: 2024, monthNum: 7, trials: 178, newMembers: 174, converted: 42, retained: 58, retentionRate: 33.3, conversionRate: 24.1, avgLTV: 12500, totalLTV: 2230000, avgConvDays: 90 },
  { month: "Aug", year: 2024, monthNum: 8, trials: 319, newMembers: 313, converted: 73, retained: 94, retentionRate: 30.0, conversionRate: 23.3, avgLTV: 6600, totalLTV: 2100000, avgConvDays: 75 },
  { month: "Sep", year: 2024, monthNum: 9, trials: 154, newMembers: 151, converted: 59, retained: 68, retentionRate: 45.0, conversionRate: 39.1, avgLTV: 14500, totalLTV: 2230000, avgConvDays: 70 },
  { month: "Oct", year: 2024, monthNum: 10, trials: 80, newMembers: 79, converted: 26, retained: 27, retentionRate: 34.2, conversionRate: 32.9, avgLTV: 9500, totalLTV: 760000, avgConvDays: 82 },
  { month: "Nov", year: 2024, monthNum: 11, trials: 101, newMembers: 100, converted: 18, retained: 20, retentionRate: 20.0, conversionRate: 18.0, avgLTV: 5000, totalLTV: 500000, avgConvDays: 46 },
  { month: "Dec", year: 2024, monthNum: 12, trials: 96, newMembers: 90, converted: 26, retained: 28, retentionRate: 31.1, conversionRate: 28.9, avgLTV: 9500, totalLTV: 910000, avgConvDays: 24 },
  { month: "Jan", year: 2025, monthNum: 1, trials: 100, newMembers: 95, converted: 24, retained: 26, retentionRate: 27.4, conversionRate: 25.3, avgLTV: 15500, totalLTV: 1550000, avgConvDays: 26 },
  { month: "Feb", year: 2025, monthNum: 2, trials: 112, newMembers: 109, converted: 28, retained: 29, retentionRate: 26.6, conversionRate: 25.7, avgLTV: 9400, totalLTV: 1060000, avgConvDays: 48 },
  { month: "Mar", year: 2025, monthNum: 3, trials: 114, newMembers: 99, converted: 25, retained: 29, retentionRate: 29.3, conversionRate: 25.3, avgLTV: 8400, totalLTV: 950000, avgConvDays: 54 },
  { month: "Apr", year: 2025, monthNum: 4, trials: 168, newMembers: 160, converted: 45, retained: 50, retentionRate: 31.3, conversionRate: 28.1, avgLTV: 11100, totalLTV: 1860000, avgConvDays: 30 },
  { month: "May", year: 2025, monthNum: 5, trials: 156, newMembers: 149, converted: 46, retained: 50, retentionRate: 33.6, conversionRate: 30.9, avgLTV: 11800, totalLTV: 1840000, avgConvDays: 32 },
  { month: "Jun", year: 2025, monthNum: 6, trials: 178, newMembers: 168, converted: 37, retained: 39, retentionRate: 23.2, conversionRate: 22.0, avgLTV: 5400, totalLTV: 970000, avgConvDays: 27 },
  { month: "Jul", year: 2025, monthNum: 7, trials: 168, newMembers: 166, converted: 33, retained: 41, retentionRate: 24.7, conversionRate: 19.9, avgLTV: 5300, totalLTV: 890000, avgConvDays: 29 },
  { month: "Aug", year: 2025, monthNum: 8, trials: 122, newMembers: 119, converted: 27, retained: 32, retentionRate: 26.9, conversionRate: 22.7, avgLTV: 3600, totalLTV: 440000, avgConvDays: 28 },
  { month: "Sep", year: 2025, monthNum: 9, trials: 100, newMembers: 98, converted: 22, retained: 23, retentionRate: 23.5, conversionRate: 22.4, avgLTV: 4700, totalLTV: 470000, avgConvDays: 19 },
  { month: "Oct", year: 2025, monthNum: 10, trials: 82, newMembers: 78, converted: 14, retained: 19, retentionRate: 24.4, conversionRate: 17.9, avgLTV: 3500, totalLTV: 280000, avgConvDays: 25 },
  { month: "Nov", year: 2025, monthNum: 11, trials: 118, newMembers: 116, converted: 19, retained: 20, retentionRate: 17.2, conversionRate: 16.4, avgLTV: 2400, totalLTV: 280000, avgConvDays: 7 },
  { month: "Dec", year: 2025, monthNum: 12, trials: 57, newMembers: 52, converted: 2, retained: 1, retentionRate: 1.9, conversionRate: 3.8, avgLTV: 996, totalLTV: 56800, avgConvDays: 2 },
];

// Summary statistics
export function getConversionStats(data: MonthlyConversionData[]) {
  const validData = data.filter(d => !(d.year === 2025 && d.monthNum === 12));
  
  const avgConversionRate = validData.reduce((sum, d) => sum + d.conversionRate, 0) / validData.length;
  const avgRetentionRate = validData.reduce((sum, d) => sum + d.retentionRate, 0) / validData.length;
  const avgLTV = validData.reduce((sum, d) => sum + d.avgLTV, 0) / validData.length;
  const avgConvDays = validData.reduce((sum, d) => sum + d.avgConvDays, 0) / validData.length;
  
  const totalTrials = validData.reduce((sum, d) => sum + d.trials, 0);
  const totalConverted = validData.reduce((sum, d) => sum + d.converted, 0);
  const totalLTV = validData.reduce((sum, d) => sum + d.totalLTV, 0);
  
  // Calculate trend (comparing last 6 months with first 6 months)
  const firstHalf = validData.slice(0, Math.floor(validData.length / 2));
  const secondHalf = validData.slice(Math.floor(validData.length / 2));
  
  const firstHalfAvgConv = firstHalf.reduce((sum, d) => sum + d.conversionRate, 0) / firstHalf.length;
  const secondHalfAvgConv = secondHalf.reduce((sum, d) => sum + d.conversionRate, 0) / secondHalf.length;
  const conversionTrend = ((secondHalfAvgConv - firstHalfAvgConv) / firstHalfAvgConv) * 100;
  
  return {
    avgConversionRate,
    avgRetentionRate,
    avgLTV,
    avgConvDays,
    totalTrials,
    totalConverted,
    totalLTV,
    conversionTrend,
    overallConversionRate: (totalConverted / totalTrials) * 100
  };
}

// Membership types with pricing
export interface MembershipType {
  name: string;
  price: number;
  classCount: number | string;
  validity: string;
  avgPerClass?: number;
}

export const membershipTypes: MembershipType[] = [
  { name: "Trial Class", price: 1500, classCount: 1, validity: "Single use", avgPerClass: 1500 },
  { name: "5 Class Pack", price: 10000, classCount: 5, validity: "1 month", avgPerClass: 2000 },
  { name: "10 Class Pack", price: 18000, classCount: 10, validity: "2 months", avgPerClass: 1800 },
  { name: "20 Class Pack", price: 32000, classCount: 20, validity: "3 months", avgPerClass: 1600 },
  { name: "30 Class Pack", price: 42000, classCount: 30, validity: "4 months", avgPerClass: 1400 },
  { name: "50 Class Pack", price: 62500, classCount: 50, validity: "6 months", avgPerClass: 1250 },
  { name: "100 Class Pack", price: 110000, classCount: 100, validity: "12 months", avgPerClass: 1100 },
  { name: "Unlimited Monthly", price: 25000, classCount: "Unlimited", validity: "1 month" },
  { name: "Unlimited Quarterly", price: 60000, classCount: "Unlimited", validity: "3 months" },
  { name: "Unlimited Annual", price: 192500, classCount: "Unlimited", validity: "12 months" },
];
