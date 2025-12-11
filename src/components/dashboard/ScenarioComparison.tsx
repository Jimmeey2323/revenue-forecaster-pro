import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { generateForecast, formatCurrency } from "@/utils/forecasting";

export function ScenarioComparison() {
  const conservative = generateForecast("conservative");
  const moderate = generateForecast("moderate");
  const aggressive = generateForecast("aggressive");

  const chartData = conservative.map((c, i) => ({
    month: c.month,
    conservative: c.grandTotal,
    moderate: moderate[i].grandTotal,
    aggressive: aggressive[i].grandTotal
  }));

  const chartConfig = {
    conservative: {
      label: "Conservative",
      color: "hsl(var(--chart-1))",
    },
    moderate: {
      label: "Moderate",
      color: "hsl(var(--chart-3))",
    },
    aggressive: {
      label: "Aggressive",
      color: "hsl(var(--chart-2))",
    },
  };

  const totals = {
    conservative: conservative.reduce((sum, f) => sum + f.grandTotal, 0),
    moderate: moderate.reduce((sum, f) => sum + f.grandTotal, 0),
    aggressive: aggressive.reduce((sum, f) => sum + f.grandTotal, 0)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Comparison - 2026 Total Revenue</CardTitle>
        <CardDescription>
          Comparing conservative, moderate, and aggressive forecasts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Conservative</p>
            <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{formatCurrency(totals.conservative)}</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">Moderate</p>
            <p className="text-lg font-bold text-green-800 dark:text-green-200">{formatCurrency(totals.moderate)}</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Aggressive</p>
            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{formatCurrency(totals.aggressive)}</p>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
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
              <Bar dataKey="conservative" name="Conservative" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="moderate" name="Moderate" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="aggressive" name="Aggressive" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
