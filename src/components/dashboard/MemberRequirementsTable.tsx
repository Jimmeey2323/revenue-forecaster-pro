import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MemberRequirement, formatCurrency, formatNumber } from "@/utils/forecasting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface MemberRequirementsTableProps {
  requirements: MemberRequirement[];
  avgTransactionValue: number;
}

export function MemberRequirementsTable({ requirements, avgTransactionValue }: MemberRequirementsTableProps) {
  const locations = [
    "Kenkere House (Bengaluru)",
    "Kwality House, Kemps Corner",
    "Supreme HQ, Bandra"
  ];

  const getLocationData = (location: string) => {
    return requirements.filter(r => r.location === location);
  };

  const getLocationTotals = (location: string) => {
    const data = getLocationData(location);
    return {
      revenue: data.reduce((sum, r) => sum + r.targetRevenue, 0),
      members: data.reduce((sum, r) => sum + r.newMembersNeeded, 0),
      leadsLow: data.reduce((sum, r) => sum + r.leadsNeededLow, 0),
      leadsHigh: data.reduce((sum, r) => sum + r.leadsNeededHigh, 0)
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Member Acquisition Targets</CardTitle>
        <CardDescription>
          Based on avg. transaction value of {formatCurrency(avgTransactionValue)} and 15-20% lead conversion rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={locations[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {locations.map(loc => (
              <TabsTrigger key={loc} value={loc} className="text-xs md:text-sm truncate">
                {loc.split(",")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          {locations.map(location => {
            const data = getLocationData(location);
            const totals = getLocationTotals(location);
            
            return (
              <TabsContent key={location} value={location}>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Target Revenue</TableHead>
                        <TableHead className="text-right">New Members</TableHead>
                        <TableHead className="text-right">Leads (20% conv.)</TableHead>
                        <TableHead className="text-right">Leads (15% conv.)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((r) => (
                        <TableRow key={r.month}>
                          <TableCell className="font-medium">{r.month}</TableCell>
                          <TableCell className="text-right">{formatCurrency(r.targetRevenue)}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">{r.newMembersNeeded}</Badge>
                          </TableCell>
                          <TableCell className="text-right text-green-600">{r.leadsNeededLow}</TableCell>
                          <TableCell className="text-right text-amber-600">{r.leadsNeededHigh}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>ANNUAL TOTAL</TableCell>
                        <TableCell className="text-right">{formatCurrency(totals.revenue)}</TableCell>
                        <TableCell className="text-right">
                          <Badge>{totals.members}</Badge>
                        </TableCell>
                        <TableCell className="text-right text-green-600">{formatNumber(totals.leadsLow)}</TableCell>
                        <TableCell className="text-right text-amber-600">{formatNumber(totals.leadsHigh)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Summary for {location}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Annual Target</p>
                      <p className="font-semibold">{formatCurrency(totals.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">New Members/Year</p>
                      <p className="font-semibold">{totals.members}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Members/Month</p>
                      <p className="font-semibold">{Math.ceil(totals.members / 12)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Leads Range/Month</p>
                      <p className="font-semibold">
                        {Math.ceil(totals.leadsLow / 12)} - {Math.ceil(totals.leadsHigh / 12)}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
