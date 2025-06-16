import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import type { Transaction } from "@shared/schema";

export default function FinancialDashboard() {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Financial Transparency Dashboard
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-blue-50">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-40"></div>
                    <div className="h-3 bg-gray-300 rounded w-24"></div>
                  </div>
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : transactions && transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 text-sm font-medium text-gray-600">Transaction ID</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Type</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Amount</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Verification</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.slice(0, 10).map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="py-4 text-sm font-mono text-gray-900">
                      {transaction.transactionId}
                    </td>
                    <td className="py-4 text-sm text-gray-900 capitalize">
                      {transaction.type}
                    </td>
                    <td className="py-4 text-sm font-semibold text-gray-900">
                      ${Number(transaction.amount).toLocaleString()}
                    </td>
                    <td className="py-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        {getVerificationIcon(transaction.verificationStatus)}
                        <span className={`ml-1 text-sm ${
                          transaction.verificationStatus === "verified" ? "text-green-700" :
                          transaction.verificationStatus === "pending" ? "text-yellow-700" :
                          "text-red-700"
                        }`}>
                          {transaction.verificationStatus === "verified" ? "Verified" :
                           transaction.verificationStatus === "pending" ? "Pending" :
                           "Failed"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {new Date(transaction.createdAt!).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {transactions.length > 10 && (
              <div className="mt-4 text-center">
                <Button variant="outline">
                  View All Transactions ({transactions.length})
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Eye className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Financial transparency data will appear here as transactions are processed.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
