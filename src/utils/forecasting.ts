import { historicalData, MonthlyRevenue } from "@/data/historicalData";

export type ScenarioType = "conservative" | "moderate" | "aggressive";

export interface ForecastResult {
  month: string;
  monthNum: number;
  year: number;
  kenkereHouse: number;
  kwalityHouse: number;
  supremeHQ: number;
  grandTotal: number;
  seasonalFactor: number;
  growthRate: number;
}

export interface MemberRequirement {
  month: string;
  location: string;
  targetRevenue: number;
  newMembersNeeded: number;
  leadsNeededLow: number; // 20% conversion
  leadsNeededHigh: number; // 15% conversion
}

// Calculate seasonal indices for each month based on historical data
function calculateSeasonalIndices(): Record<number, Record<string, number>> {
  const monthlyAverages: Record<number, Record<string, number[]>> = {};
  
  // Group data by month
  for (let i = 1; i <= 12; i++) {
    monthlyAverages[i] = { kenkere: [], kwality: [], supreme: [] };
  }
  
  historicalData.forEach(d => {
    // Exclude Dec 2025 as it's partial data
    if (d.year === 2025 && d.monthNum === 12) return;
    
    monthlyAverages[d.monthNum].kenkere.push(d.kenkereHouse);
    monthlyAverages[d.monthNum].kwality.push(d.kwalityHouse);
    if (d.supremeHQ !== null) {
      monthlyAverages[d.monthNum].supreme.push(d.supremeHQ);
    }
  });
  
  // Calculate overall average for each location
  const overallAvg = {
    kenkere: historicalData.filter(d => !(d.year === 2025 && d.monthNum === 12)).reduce((sum, d) => sum + d.kenkereHouse, 0) / 23,
    kwality: historicalData.filter(d => !(d.year === 2025 && d.monthNum === 12)).reduce((sum, d) => sum + d.kwalityHouse, 0) / 23,
    supreme: historicalData.filter(d => d.supremeHQ !== null && !(d.year === 2025 && d.monthNum === 12)).reduce((sum, d) => sum + (d.supremeHQ || 0), 0) / 19
  };
  
  // Calculate seasonal index for each month
  const indices: Record<number, Record<string, number>> = {};
  
  for (let i = 1; i <= 12; i++) {
    const kenkereAvg = monthlyAverages[i].kenkere.length > 0 
      ? monthlyAverages[i].kenkere.reduce((a, b) => a + b, 0) / monthlyAverages[i].kenkere.length 
      : overallAvg.kenkere;
    const kwalityAvg = monthlyAverages[i].kwality.length > 0 
      ? monthlyAverages[i].kwality.reduce((a, b) => a + b, 0) / monthlyAverages[i].kwality.length 
      : overallAvg.kwality;
    const supremeAvg = monthlyAverages[i].supreme.length > 0 
      ? monthlyAverages[i].supreme.reduce((a, b) => a + b, 0) / monthlyAverages[i].supreme.length 
      : overallAvg.supreme;
    
    indices[i] = {
      kenkere: kenkereAvg / overallAvg.kenkere,
      kwality: kwalityAvg / overallAvg.kwality,
      supreme: supremeAvg / overallAvg.supreme
    };
  }
  
  return indices;
}

// Calculate year-over-year growth rate
function calculateGrowthRates(): Record<string, number> {
  // Compare 2025 vs 2024 (using months 1-11 to avoid partial Dec 2025)
  const data2024 = historicalData.filter(d => d.year === 2024 && d.monthNum <= 11);
  const data2025 = historicalData.filter(d => d.year === 2025 && d.monthNum <= 11);
  
  const sum2024 = {
    kenkere: data2024.reduce((sum, d) => sum + d.kenkereHouse, 0),
    kwality: data2024.reduce((sum, d) => sum + d.kwalityHouse, 0),
    supreme: data2024.filter(d => d.supremeHQ !== null).reduce((sum, d) => sum + (d.supremeHQ || 0), 0)
  };
  
  const sum2025 = {
    kenkere: data2025.reduce((sum, d) => sum + d.kenkereHouse, 0),
    kwality: data2025.reduce((sum, d) => sum + d.kwalityHouse, 0),
    supreme: data2025.reduce((sum, d) => sum + (d.supremeHQ || 0), 0)
  };
  
  return {
    kenkere: (sum2025.kenkere - sum2024.kenkere) / sum2024.kenkere,
    kwality: (sum2025.kwality - sum2024.kwality) / sum2024.kwality,
    supreme: sum2024.supreme > 0 ? (sum2025.supreme - sum2024.supreme) / sum2024.supreme : 0.15
  };
}

// Get base revenue (average of last 6 months of 2025, excluding partial Dec)
function getBaseRevenue(): Record<string, number> {
  const recentData = historicalData.filter(d => d.year === 2025 && d.monthNum >= 6 && d.monthNum <= 11);
  
  return {
    kenkere: recentData.reduce((sum, d) => sum + d.kenkereHouse, 0) / recentData.length,
    kwality: recentData.reduce((sum, d) => sum + d.kwalityHouse, 0) / recentData.length,
    supreme: recentData.reduce((sum, d) => sum + (d.supremeHQ || 0), 0) / recentData.length
  };
}

export function generateForecast(scenario: ScenarioType): ForecastResult[] {
  const seasonalIndices = calculateSeasonalIndices();
  const growthRates = calculateGrowthRates();
  const baseRevenue = getBaseRevenue();
  
  // Adjust growth based on scenario
  const scenarioMultipliers: Record<ScenarioType, number> = {
    conservative: 0.7,
    moderate: 1.0,
    aggressive: 1.3
  };
  
  const multiplier = scenarioMultipliers[scenario];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const forecasts: ForecastResult[] = [];
  
  for (let i = 0; i < 12; i++) {
    const monthNum = i + 1;
    const seasonal = seasonalIndices[monthNum];
    
    // Apply growth and seasonal factors
    const kenkere = Math.round(
      baseRevenue.kenkere * (1 + growthRates.kenkere * multiplier) * seasonal.kenkere
    );
    const kwality = Math.round(
      baseRevenue.kwality * (1 + growthRates.kwality * multiplier) * seasonal.kwality
    );
    const supreme = Math.round(
      baseRevenue.supreme * (1 + growthRates.supreme * multiplier) * seasonal.supreme
    );
    
    forecasts.push({
      month: months[i],
      monthNum,
      year: 2026,
      kenkereHouse: kenkere,
      kwalityHouse: kwality,
      supremeHQ: supreme,
      grandTotal: kenkere + kwality + supreme,
      seasonalFactor: (seasonal.kenkere + seasonal.kwality + seasonal.supreme) / 3,
      growthRate: (growthRates.kenkere + growthRates.kwality + growthRates.supreme) / 3 * multiplier
    });
  }
  
  return forecasts;
}

export function calculateMemberRequirements(
  forecasts: ForecastResult[],
  avgTransactionValue: number = 9000,
  renewalPercentage: number = 40 // Assume 40% comes from renewals
): MemberRequirement[] {
  const requirements: MemberRequirement[] = [];
  const locations = [
    { key: "kenkereHouse", name: "Kenkere House (Bengaluru)" },
    { key: "kwalityHouse", name: "Kwality House, Kemps Corner" },
    { key: "supremeHQ", name: "Supreme HQ, Bandra" }
  ] as const;
  
  forecasts.forEach(forecast => {
    locations.forEach(loc => {
      const targetRevenue = forecast[loc.key];
      const revenueFromNewMembers = targetRevenue * (1 - renewalPercentage / 100);
      const newMembersNeeded = Math.ceil(revenueFromNewMembers / avgTransactionValue);
      
      requirements.push({
        month: forecast.month,
        location: loc.name,
        targetRevenue,
        newMembersNeeded,
        leadsNeededLow: Math.ceil(newMembersNeeded / 0.20), // 20% conversion
        leadsNeededHigh: Math.ceil(newMembersNeeded / 0.15) // 15% conversion
      });
    });
  });
  
  return requirements;
}

export function getHistoricalStats() {
  const validData = historicalData.filter(d => !(d.year === 2025 && d.monthNum === 12));
  
  const totals = {
    kenkere: validData.reduce((sum, d) => sum + d.kenkereHouse, 0),
    kwality: validData.reduce((sum, d) => sum + d.kwalityHouse, 0),
    supreme: validData.filter(d => d.supremeHQ !== null).reduce((sum, d) => sum + (d.supremeHQ || 0), 0)
  };
  
  const avg = {
    kenkere: totals.kenkere / validData.length,
    kwality: totals.kwality / validData.length,
    supreme: totals.supreme / validData.filter(d => d.supremeHQ !== null).length
  };
  
  const max = {
    kenkere: Math.max(...validData.map(d => d.kenkereHouse)),
    kwality: Math.max(...validData.map(d => d.kwalityHouse)),
    supreme: Math.max(...validData.filter(d => d.supremeHQ !== null).map(d => d.supremeHQ || 0))
  };
  
  return { totals, avg, max };
}

export function formatCurrency(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-IN');
}
