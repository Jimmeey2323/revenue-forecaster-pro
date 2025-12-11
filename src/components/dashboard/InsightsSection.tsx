import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb,
  Target,
  Users,
  Calendar,
  DollarSign
} from "lucide-react";
import { kwalityHouseConversion, supremeHQConversion, getConversionStats } from "@/data/conversionData";
import { historicalData } from "@/data/historicalData";
import { formatCurrency } from "@/utils/forecasting";

export function InsightsSection() {
  const kwalityStats = getConversionStats(kwalityHouseConversion);
  const supremeStats = getConversionStats(supremeHQConversion);

  // Calculate YoY growth
  const data2024 = historicalData.filter(d => d.year === 2024);
  const data2025 = historicalData.filter(d => d.year === 2025 && d.monthNum <= 11);
  
  const total2024 = data2024.reduce((sum, d) => sum + d.grandTotal, 0);
  const total2025 = data2025.reduce((sum, d) => sum + d.grandTotal, 0);
  const yoyGrowth = ((total2025 - total2024) / total2024) * 100;

  // Seasonal patterns
  const monthlyTotals: Record<number, number[]> = {};
  historicalData.forEach(d => {
    if (!(d.year === 2025 && d.monthNum === 12)) {
      if (!monthlyTotals[d.monthNum]) monthlyTotals[d.monthNum] = [];
      monthlyTotals[d.monthNum].push(d.grandTotal);
    }
  });

  const monthlyAvg = Object.entries(monthlyTotals).map(([month, values]) => ({
    month: parseInt(month),
    avg: values.reduce((a, b) => a + b, 0) / values.length
  })).sort((a, b) => b.avg - a.avg);

  const bestMonths = monthlyAvg.slice(0, 3);
  const worstMonths = monthlyAvg.slice(-3);

  const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const insights = [
    {
      type: "success",
      icon: <TrendingUp className="h-4 w-4" />,
      title: "Strong YoY Revenue Growth",
      description: `Overall revenue grew by ${yoyGrowth.toFixed(1)}% from 2024 to 2025 (Jan-Nov), indicating strong business momentum.`
    },
    {
      type: "warning",
      icon: <AlertTriangle className="h-4 w-4" />,
      title: "Declining Conversion Rates",
      description: `Kwality House conversion trend: ${kwalityStats.conversionTrend.toFixed(1)}%. Supreme HQ: ${supremeStats.conversionTrend.toFixed(1)}%. Recent months show lower conversion rates than historical averages.`
    },
    {
      type: "info",
      icon: <Calendar className="h-4 w-4" />,
      title: "Seasonal Revenue Patterns",
      description: `Peak months: ${bestMonths.map(m => monthNames[m.month]).join(", ")}. Low months: ${worstMonths.map(m => monthNames[m.month]).join(", ")}. Plan marketing accordingly.`
    },
    {
      type: "success",
      icon: <DollarSign className="h-4 w-4" />,
      title: "Higher LTV at Supreme HQ",
      description: `Supreme HQ avg LTV: ${formatCurrency(supremeStats.avgLTV)} vs Kwality House: ${formatCurrency(kwalityStats.avgLTV)}. Bandra clients show higher lifetime value.`
    },
    {
      type: "warning",
      icon: <Users className="h-4 w-4" />,
      title: "Conversion Time Increasing",
      description: `Average days to convert has been increasing. Kwality: ${kwalityStats.avgConvDays.toFixed(0)} days, Supreme: ${supremeStats.avgConvDays.toFixed(0)} days. Consider faster follow-up strategies.`
    },
    {
      type: "info",
      icon: <Target className="h-4 w-4" />,
      title: "Trial Volume vs Conversion Trade-off",
      description: `Higher trial volumes correlate with lower conversion rates. Focus on quality leads over quantity for better ROI.`
    }
  ];

  const recommendations = [
    {
      priority: "High",
      title: "Improve Trial-to-Member Conversion",
      description: "Implement structured follow-up within 24-48 hours of trial. Current conversion rates (15-25%) have room for improvement to industry standard (30-35%).",
      impact: "Could increase new member revenue by 20-40%"
    },
    {
      priority: "High", 
      title: "Capitalize on Peak Seasons",
      description: `Increase marketing spend and trial capacity in ${bestMonths.map(m => monthNames[m.month]).join(", ")}. These months consistently outperform.`,
      impact: "Maximize revenue during high-demand periods"
    },
    {
      priority: "Medium",
      title: "Reduce Conversion Cycle Time",
      description: "Offer time-limited membership discounts for trials converting within 7 days. Current avg conversion time is too long.",
      impact: "Faster cash flow and higher conversion rates"
    },
    {
      priority: "Medium",
      title: "Optimize Membership Mix",
      description: "Push 10-20 class packs as they offer best balance of value and commitment. Reduce reliance on trial and single-class sales.",
      impact: "Higher average transaction value"
    },
    {
      priority: "Low",
      title: "Referral Program Enhancement",
      description: "Referral classes show ~30% conversion rate. Incentivize existing members to bring more referrals with class credits.",
      impact: "Lower acquisition cost, higher quality leads"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Key Insights from Historical Data
          </CardTitle>
          <CardDescription>
            Data-driven observations from 2024-2025 performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <Alert key={index} variant={insight.type === "warning" ? "destructive" : "default"}>
              {insight.icon}
              <AlertTitle>{insight.title}</AlertTitle>
              <AlertDescription>{insight.description}</AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Strategic Recommendations
          </CardTitle>
          <CardDescription>
            Actionable strategies to meet 2026 targets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={rec.priority === "High" ? "destructive" : rec.priority === "Medium" ? "default" : "secondary"}
                  >
                    {rec.priority} Priority
                  </Badge>
                  <span className="font-semibold">{rec.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <p className="text-sm font-medium text-primary">Impact: {rec.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Kwality House (Kemps Corner)</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Avg Conversion Rate</div>
                  <div className="font-bold text-lg">{kwalityStats.avgConversionRate.toFixed(1)}%</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Overall Conversion</div>
                  <div className="font-bold text-lg">{kwalityStats.overallConversionRate.toFixed(1)}%</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Total Trials</div>
                  <div className="font-bold text-lg">{kwalityStats.totalTrials.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Total Converted</div>
                  <div className="font-bold text-lg">{kwalityStats.totalConverted.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Avg LTV</div>
                  <div className="font-bold text-lg">{formatCurrency(kwalityStats.avgLTV)}</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Total LTV</div>
                  <div className="font-bold text-lg">{formatCurrency(kwalityStats.totalLTV)}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Supreme HQ (Bandra)</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Avg Conversion Rate</div>
                  <div className="font-bold text-lg">{supremeStats.avgConversionRate.toFixed(1)}%</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Overall Conversion</div>
                  <div className="font-bold text-lg">{supremeStats.overallConversionRate.toFixed(1)}%</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Total Trials</div>
                  <div className="font-bold text-lg">{supremeStats.totalTrials.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Total Converted</div>
                  <div className="font-bold text-lg">{supremeStats.totalConverted.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Avg LTV</div>
                  <div className="font-bold text-lg">{formatCurrency(supremeStats.avgLTV)}</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-muted-foreground">Total LTV</div>
                  <div className="font-bold text-lg">{formatCurrency(supremeStats.totalLTV)}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
