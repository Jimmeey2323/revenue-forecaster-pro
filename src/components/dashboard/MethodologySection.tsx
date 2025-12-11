import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calculator, TrendingUp, Calendar, Users, AlertTriangle } from "lucide-react";

export function MethodologySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Forecasting Methodology & Calculations
        </CardTitle>
        <CardDescription>
          Understanding how the 2026 revenue forecasts are generated
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="seasonal">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Seasonal Decomposition
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3">
              <p>
                We analyze 23 months of historical data (Jan 2024 - Nov 2025) to identify seasonal patterns for each location.
              </p>
              <div className="bg-muted p-3 rounded-md font-mono text-xs">
                <p className="font-semibold mb-1">Seasonal Index Formula:</p>
                <p>Index(month) = Avg Revenue(month) / Overall Average Revenue</p>
              </div>
              <p>
                <strong>Key Findings:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>April & September</strong>: Peak months (120-140% of average) - likely new year resolutions & post-monsoon fitness goals</li>
                <li><strong>June & November</strong>: Lower months (70-85% of average) - monsoon season and festival periods</li>
                <li><strong>December</strong>: Variable due to holiday schedules</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="growth">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Year-over-Year Growth Analysis
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3">
              <p>
                We compare Jan-Nov 2025 vs Jan-Nov 2024 to calculate organic growth rates for each location.
              </p>
              <div className="bg-muted p-3 rounded-md font-mono text-xs">
                <p className="font-semibold mb-1">Growth Rate Formula:</p>
                <p>Growth = (2025 Revenue - 2024 Revenue) / 2024 Revenue × 100%</p>
              </div>
              <p><strong>Calculated Growth Rates (2024→2025):</strong></p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Kenkere House:</strong> ~12-15% growth</li>
                <li><strong>Kwality House:</strong> ~18-22% growth</li>
                <li><strong>Supreme HQ:</strong> ~25-30% growth (newer location, faster expansion)</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                Note: Supreme HQ opened in May 2024, so its growth trajectory is steeper.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="scenarios">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Scenario Multipliers
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3">
              <p>Three scenarios adjust the growth rate to account for uncertainty:</p>
              <div className="grid gap-3">
                <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-md border border-amber-200 dark:border-amber-800">
                  <p className="font-semibold text-amber-800 dark:text-amber-200">Conservative (×0.7)</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Assumes slower growth due to market saturation, economic uncertainty, or increased competition.
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-md border border-green-200 dark:border-green-800">
                  <p className="font-semibold text-green-800 dark:text-green-200">Moderate (×1.0)</p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Continues current growth trajectory. Best estimate based on historical trends.
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md border border-blue-200 dark:border-blue-800">
                  <p className="font-semibold text-blue-800 dark:text-blue-200">Aggressive (×1.3)</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Assumes accelerated growth from marketing initiatives or market expansion.
                  </p>
                </div>
              </div>
              <div className="bg-muted p-3 rounded-md font-mono text-xs mt-3">
                <p className="font-semibold mb-1">Final Forecast Formula:</p>
                <p>Forecast(month) = Base Revenue × (1 + Growth × Scenario Multiplier) × Seasonal Index</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="members">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                New Member Calculations
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3">
              <p>To determine how many new members are needed to hit revenue targets:</p>
              <div className="bg-muted p-3 rounded-md font-mono text-xs space-y-2">
                <p className="font-semibold">Step 1: Isolate New Member Revenue</p>
                <p>New Member Revenue = Target Revenue × (1 - Renewal %)</p>
                <p className="text-muted-foreground">We assume 40% of revenue comes from renewals (unpredictable)</p>
                
                <p className="font-semibold mt-3">Step 2: Calculate New Members Needed</p>
                <p>New Members = New Member Revenue ÷ Avg Transaction Value (₹9,000)</p>
                
                <p className="font-semibold mt-3">Step 3: Calculate Leads Required</p>
                <p>Leads (20% conv.) = New Members ÷ 0.20</p>
                <p>Leads (15% conv.) = New Members ÷ 0.15</p>
              </div>
              <p className="text-muted-foreground">
                <strong>Example:</strong> If April target is ₹10L, with 40% renewals, you need ₹6L from new members. 
                At ₹9K avg, that's 67 new members. With 15-20% conversion, you need 335-447 leads.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="assumptions">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                Key Assumptions & Limitations
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3">
              <div className="space-y-3">
                <div className="border-l-4 border-amber-500 pl-3">
                  <p className="font-semibold">Average Transaction Value: ₹9,000</p>
                  <p className="text-muted-foreground text-xs">
                    Based on your input. Actual may vary by package (₹1,500 single class to ₹192,500 annual).
                  </p>
                </div>
                <div className="border-l-4 border-amber-500 pl-3">
                  <p className="font-semibold">Renewal Rate: 40% of Revenue</p>
                  <p className="text-muted-foreground text-xs">
                    Conservative assumption. Actual renewal % varies by season and client engagement.
                  </p>
                </div>
                <div className="border-l-4 border-amber-500 pl-3">
                  <p className="font-semibold">Lead Conversion: 15-20%</p>
                  <p className="text-muted-foreground text-xs">
                    Range provided as per your input. Industry average for fitness is 10-25%.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <p className="font-semibold">December 2025 Excluded</p>
                  <p className="text-muted-foreground text-xs">
                    Partial data (₹2.5L total) suggests incomplete month. Excluded from calculations.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
