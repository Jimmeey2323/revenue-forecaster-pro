import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { historicalData } from "@/data/historicalData";
import { ForecastResult, formatCurrency } from "@/utils/forecasting";

interface RevenueChartProps {
  forecasts: ForecastResult[];
  showForecast: boolean;
}

export function RevenueChart({ forecasts, showForecast }: RevenueChartProps) {
  const historicalChartData = historicalData
    .filter(d => !(d.year === 2025 && d.monthNum === 12)) // Exclude partial Dec 2025
    .map(d => ({
      period: `${d.month} ${d.year}`,
      kenkere: d.kenkereHouse,
      kwality: d.kwalityHouse,
      supreme: d.supremeHQ || 0,
      type: "historical"
    }));

  const forecastChartData = forecasts.map(f => ({
    period: `${f.month} 2026`,
    kenkere: f.kenkereHouse,
    kwality: f.kwalityHouse,
    supreme: f.supremeHQ,
    type: "forecast"
  }));

  const chartData = showForecast 
    ? [...historicalChartData, ...forecastChartData]
    : historicalChartData;

  const chartConfig = {
    kenkere: {
      label: "Kenkere House",
      color: "hsl(var(--chart-1))",
    },
    kwality: {
      label: "Kwality House",
      color: "hsl(var(--chart-3))",
    },
    supreme: {
      label: "Supreme HQ",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Revenue Trends by Location</CardTitle>
        <CardDescription>
          Historical data (Jan 2024 - Nov 2025) {showForecast && "and 2026 Forecasts"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorKenkere" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorKwality" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorSupreme" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value)}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip 
                content={<ChartTooltipContent 
                  formatter={(value) => formatCurrency(value as number)}
                />} 
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="kenkere"
                name="Kenkere House"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorKenkere)"
              />
              <Area
                type="monotone"
                dataKey="kwality"
                name="Kwality House"
                stroke="hsl(var(--chart-3))"
                fillOpacity={1}
                fill="url(#colorKwality)"
              />
              <Area
                type="monotone"
                dataKey="supreme"
                name="Supreme HQ"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorSupreme)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
