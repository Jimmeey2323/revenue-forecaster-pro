import { useState } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ForecastTable } from "@/components/dashboard/ForecastTable";
import { MemberRequirementsTable } from "@/components/dashboard/MemberRequirementsTable";
import { MethodologySection } from "@/components/dashboard/MethodologySection";
import { ScenarioComparison } from "@/components/dashboard/ScenarioComparison";
import { generateForecast, calculateMemberRequirements, getHistoricalStats, formatCurrency, ScenarioType } from "@/utils/forecasting";
import { historicalData } from "@/data/historicalData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building2, TrendingUp, Users, Target, IndianRupee, Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [scenario, setScenario] = useState<ScenarioType>("moderate");
  const [showForecast, setShowForecast] = useState(true);
  const [avgTransactionValue, setAvgTransactionValue] = useState(9000);
  const [renewalPercentage, setRenewalPercentage] = useState(40);

  const forecasts = generateForecast(scenario);
  const memberRequirements = calculateMemberRequirements(forecasts, avgTransactionValue, renewalPercentage);
  const historicalStats = getHistoricalStats();

  // Calculate 2025 total (excluding partial Dec)
  const total2025 = historicalData
    .filter(d => d.year === 2025 && d.monthNum <= 11)
    .reduce((sum, d) => sum + d.grandTotal, 0);

  const forecast2026Total = forecasts.reduce((sum, f) => sum + f.grandTotal, 0);
  const yoyGrowth = ((forecast2026Total - total2025) / total2025) * 100;

  const totalNewMembers = memberRequirements.reduce((sum, r) => sum + r.newMembersNeeded, 0);
  const totalLeadsLow = memberRequirements.reduce((sum, r) => sum + r.leadsNeededLow, 0);
  const totalLeadsHigh = memberRequirements.reduce((sum, r) => sum + r.leadsNeededHigh, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Physique 57 Revenue Forecaster</h1>
              <p className="text-muted-foreground mt-1">
                2026 Revenue & Member Acquisition Forecasts
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="show-forecast"
                  checked={showForecast}
                  onCheckedChange={setShowForecast}
                />
                <Label htmlFor="show-forecast" className="text-sm">Show 2026 Forecast</Label>
              </div>
              <Select value={scenario} onValueChange={(v) => setScenario(v as ScenarioType)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="2026 Forecast (Total)"
            value={formatCurrency(forecast2026Total)}
            trend={yoyGrowth}
            subtitle="vs 2025 (Jan-Nov)"
            icon={<IndianRupee className="h-4 w-4" />}
          />
          <StatsCard
            title="New Members Needed"
            value={totalNewMembers.toLocaleString('en-IN')}
            subtitle="for 2026 targets"
            icon={<Users className="h-4 w-4" />}
          />
          <StatsCard
            title="Leads Required (20%)"
            value={totalLeadsLow.toLocaleString('en-IN')}
            subtitle="at 20% conversion"
            icon={<Target className="h-4 w-4" />}
          />
          <StatsCard
            title="Leads Required (15%)"
            value={totalLeadsHigh.toLocaleString('en-IN')}
            subtitle="at 15% conversion"
            icon={<Target className="h-4 w-4" />}
          />
        </div>

        {/* Historical Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Kenkere House (Avg)"
            value={formatCurrency(historicalStats.avg.kenkere)}
            subtitle={`Peak: ${formatCurrency(historicalStats.max.kenkere)}`}
            icon={<Building2 className="h-4 w-4" />}
          />
          <StatsCard
            title="Kwality House (Avg)"
            value={formatCurrency(historicalStats.avg.kwality)}
            subtitle={`Peak: ${formatCurrency(historicalStats.max.kwality)}`}
            icon={<Building2 className="h-4 w-4" />}
          />
          <StatsCard
            title="Supreme HQ (Avg)"
            value={formatCurrency(historicalStats.avg.supreme)}
            subtitle={`Peak: ${formatCurrency(historicalStats.max.supreme)}`}
            icon={<Building2 className="h-4 w-4" />}
          />
        </div>

        {/* Revenue Chart */}
        <RevenueChart forecasts={forecasts} showForecast={showForecast} />

        {/* Scenario Comparison */}
        <ScenarioComparison />

        {/* Forecast Table */}
        {showForecast && <ForecastTable forecasts={forecasts} scenario={scenario} />}

        <Separator />

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculation Parameters
            </CardTitle>
            <CardDescription>
              Adjust these values to recalculate member acquisition targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="avg-transaction">Average Transaction Value (₹)</Label>
                <Input
                  id="avg-transaction"
                  type="number"
                  value={avgTransactionValue}
                  onChange={(e) => setAvgTransactionValue(Number(e.target.value))}
                  className="max-w-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  Based on your membership pricing (₹1,500 - ₹192,500)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="renewal-pct">Estimated Renewal Revenue (%)</Label>
                <Input
                  id="renewal-pct"
                  type="number"
                  min={0}
                  max={80}
                  value={renewalPercentage}
                  onChange={(e) => setRenewalPercentage(Number(e.target.value))}
                  className="max-w-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  Percentage of revenue from existing member renewals (unpredictable)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Member Requirements */}
        <MemberRequirementsTable 
          requirements={memberRequirements} 
          avgTransactionValue={avgTransactionValue}
        />

        {/* Methodology */}
        <MethodologySection />

        {/* Footer */}
        <footer className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            Data period: January 2024 - November 2025 | Locations: Kenkere House (Bengaluru), Kwality House (Mumbai), Supreme HQ (Mumbai)
          </p>
          <p className="mt-1">
            Forecasts are estimates based on historical trends and may vary due to market conditions.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
