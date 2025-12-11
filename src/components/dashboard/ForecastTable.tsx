import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ForecastResult, formatCurrency } from "@/utils/forecasting";
import { Badge } from "@/components/ui/badge";

interface ForecastTableProps {
  forecasts: ForecastResult[];
  scenario: string;
}

export function ForecastTable({ forecasts, scenario }: ForecastTableProps) {
  const totalKenkere = forecasts.reduce((sum, f) => sum + f.kenkereHouse, 0);
  const totalKwality = forecasts.reduce((sum, f) => sum + f.kwalityHouse, 0);
  const totalSupreme = forecasts.reduce((sum, f) => sum + f.supremeHQ, 0);
  const grandTotal = totalKenkere + totalKwality + totalSupreme;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>2026 Revenue Forecast</CardTitle>
            <CardDescription>Monthly breakdown by location</CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">{scenario} Scenario</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Month</TableHead>
                <TableHead className="text-right font-semibold">Kenkere House</TableHead>
                <TableHead className="text-right font-semibold">Kwality House</TableHead>
                <TableHead className="text-right font-semibold">Supreme HQ</TableHead>
                <TableHead className="text-right font-semibold">Total</TableHead>
                <TableHead className="text-right font-semibold">Seasonal Factor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecasts.map((f) => (
                <TableRow key={f.month}>
                  <TableCell className="font-medium">{f.month} 2026</TableCell>
                  <TableCell className="text-right">{formatCurrency(f.kenkereHouse)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(f.kwalityHouse)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(f.supremeHQ)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(f.grandTotal)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={f.seasonalFactor > 1 ? "default" : "secondary"}>
                      {(f.seasonalFactor * 100).toFixed(0)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>TOTAL 2026</TableCell>
                <TableCell className="text-right">{formatCurrency(totalKenkere)}</TableCell>
                <TableCell className="text-right">{formatCurrency(totalKwality)}</TableCell>
                <TableCell className="text-right">{formatCurrency(totalSupreme)}</TableCell>
                <TableCell className="text-right text-primary">{formatCurrency(grandTotal)}</TableCell>
                <TableCell className="text-right">—</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
