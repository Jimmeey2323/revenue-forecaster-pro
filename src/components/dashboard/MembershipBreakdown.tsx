import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { membershipTypes } from "@/data/conversionData";
import { formatCurrency } from "@/utils/forecasting";
import { ForecastResult } from "@/utils/forecasting";
import { Package } from "lucide-react";

interface MembershipBreakdownProps {
  forecasts: ForecastResult[];
  renewalPercentage: number;
}

interface LocationBreakdown {
  location: string;
  targetRevenue: number;
  newMemberRevenue: number;
  membershipMix: {
    type: string;
    count: number;
    revenue: number;
    percentage: number;
  }[];
}

export function MembershipBreakdown({ forecasts, renewalPercentage }: MembershipBreakdownProps) {
  // Calculate annual targets per location
  const annualTargets = {
    kenkereHouse: forecasts.reduce((sum, f) => sum + f.kenkereHouse, 0),
    kwalityHouse: forecasts.reduce((sum, f) => sum + f.kwalityHouse, 0),
    supremeHQ: forecasts.reduce((sum, f) => sum + f.supremeHQ, 0),
  };

  // Recommended membership distribution based on typical fitness studio patterns
  const membershipDistribution = [
    { type: "Trial Class", percentage: 15, price: 1500 },
    { type: "5 Class Pack", percentage: 10, price: 10000 },
    { type: "10 Class Pack", percentage: 20, price: 18000 },
    { type: "20 Class Pack", percentage: 18, price: 32000 },
    { type: "30 Class Pack", percentage: 12, price: 42000 },
    { type: "50 Class Pack", percentage: 8, price: 62500 },
    { type: "100 Class Pack", percentage: 5, price: 110000 },
    { type: "Unlimited Monthly", percentage: 7, price: 25000 },
    { type: "Unlimited Quarterly", percentage: 3, price: 60000 },
    { type: "Unlimited Annual", percentage: 2, price: 192500 },
  ];

  const calculateBreakdown = (targetRevenue: number, location: string): LocationBreakdown => {
    const newMemberRevenue = targetRevenue * (1 - renewalPercentage / 100);
    
    const membershipMix = membershipDistribution.map(m => {
      const allocatedRevenue = newMemberRevenue * (m.percentage / 100);
      const count = Math.ceil(allocatedRevenue / m.price);
      return {
        type: m.type,
        count,
        revenue: count * m.price,
        percentage: m.percentage,
      };
    });

    return {
      location,
      targetRevenue,
      newMemberRevenue,
      membershipMix,
    };
  };

  const breakdowns: LocationBreakdown[] = [
    calculateBreakdown(annualTargets.kenkereHouse, "Kenkere House (Bengaluru)"),
    calculateBreakdown(annualTargets.kwalityHouse, "Kwality House (Mumbai)"),
    calculateBreakdown(annualTargets.supremeHQ, "Supreme HQ (Mumbai)"),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          2026 Membership Sales Targets by Type
        </CardTitle>
        <CardDescription>
          Recommended membership distribution to meet 2026 revenue targets (assuming {renewalPercentage}% from renewals)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {breakdowns.map((breakdown) => (
            <div key={breakdown.location} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{breakdown.location}</h4>
                <div className="text-sm text-muted-foreground">
                  Target: {formatCurrency(breakdown.targetRevenue)} | New Member Revenue: {formatCurrency(breakdown.newMemberRevenue)}
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Membership Type</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Sales Needed</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">% of Mix</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {breakdown.membershipMix.map((item) => (
                      <TableRow key={item.type}>
                        <TableCell className="font-medium">{item.type}</TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(membershipTypes.find(m => m.name === item.type)?.price || 0)}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">
                          {item.count}
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">
                          {formatCurrency(item.revenue)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {item.percentage}%
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {breakdown.membershipMix.reduce((sum, m) => sum + m.count, 0)}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(breakdown.membershipMix.reduce((sum, m) => sum + m.revenue, 0))}
                      </TableCell>
                      <TableCell className="text-right">100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
