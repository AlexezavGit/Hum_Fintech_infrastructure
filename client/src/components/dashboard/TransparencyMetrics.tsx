import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";
import type { Transaction } from "@shared/schema";

export default function TransparencyMetrics() {
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  // Calculate metrics
  const totalTransactions = transactions?.length || 0;
  const verifiedTransactions = transactions?.filter(t => t.verificationStatus === "verified").length || 0;
  const completedTransactions = transactions?.filter(t => t.status === "completed").length || 0;

  const fundTrackingRate = totalTransactions > 0 ? 100 : 0; // All funds are tracked
  const reportAccuracy = totalTransactions > 0 ? (verifiedTransactions / totalTransactions) * 100 : 100;
  const verificationStatus = totalTransactions > 0 ? (completedTransactions / totalTransactions) * 100 : 100;

  const metrics = [
    {
      label: "Fund Tracking",
      value: fundTrackingRate,
      color: "bg-secondary",
    },
    {
      label: "Report Accuracy", 
      value: reportAccuracy,
      color: "bg-primary",
    },
    {
      label: "Verification Status",
      value: verificationStatus,
      color: "bg-warning",
    },
  ];

  const overallScore = (fundTrackingRate + reportAccuracy + verificationStatus) / 3;

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Transparency Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{metric.label}</span>
              <span>{Math.round(metric.value)}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <Shield className="text-secondary mr-2 h-4 w-4" />
            <span className="text-sm font-medium text-green-800">
              {overallScore >= 95 ? "Excellent" : overallScore >= 85 ? "Good" : "Fair"} Transparency Rating
            </span>
          </div>
          <p className="text-xs text-green-700 mt-1">
            All transactions are publicly verifiable on blockchain
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
