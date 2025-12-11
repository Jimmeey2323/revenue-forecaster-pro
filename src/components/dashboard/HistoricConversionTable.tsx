import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MonthlyConversionData } from "@/data/conversionData";
import { formatCurrency } from "@/utils/forecasting";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface HistoricConversionTableProps {
  data: MonthlyConversionData[];
  location: string;
}

export function HistoricConversionTable({ data, location }: HistoricConversionTableProps) {
  // Show last 12 months
  const recentData = data.slice(-12).reverse();

  const getTrendIcon = (current: number, avg: number) => {
    const diff = ((current - avg) / avg) * 100;
    if (diff > 5) return <TrendingUp className="h-3 w-3 text-emerald-500" />;
    if (diff < -5) return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const avgConversion = data.reduce((sum, d) => sum + d.conversionRate, 0) / data.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{location} - Historic Conversion Data</CardTitle>
        <CardDescription>Last 12 months of trial-to-member conversion metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Trials</TableHead>
                <TableHead className="text-right">New Members</TableHead>
                <TableHead className="text-right">Converted</TableHead>
                <TableHead className="text-right">Conv %</TableHead>
                <TableHead className="text-right">Retained</TableHead>
                <TableHead className="text-right">Ret %</TableHead>
                <TableHead className="text-right">Avg LTV</TableHead>
                <TableHead className="text-right">Conv Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentData.map((row) => (
                <TableRow key={`${row.year}-${row.monthNum}`}>
                  <TableCell className="font-medium">
                    {row.month} {row.year}
                  </TableCell>
                  <TableCell className="text-right">{row.trials}</TableCell>
                  <TableCell className="text-right">{row.newMembers}</TableCell>
                  <TableCell className="text-right">{row.converted}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {getTrendIcon(row.conversionRate, avgConversion)}
                      <Badge 
                        variant={row.conversionRate >= 25 ? "default" : row.conversionRate >= 20 ? "secondary" : "outline"}
                        className="font-mono"
                      >
                        {row.conversionRate.toFixed(1)}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{row.retained}</TableCell>
                  <TableCell className="text-right">
                    <span className={row.retentionRate >= 30 ? "text-emerald-600" : "text-muted-foreground"}>
                      {row.retentionRate.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrency(row.avgLTV)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {row.avgConvDays} days
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
