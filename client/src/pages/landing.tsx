import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, TrendingUp } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-gray-900">HumanAid</span>
            </div>
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-blue-700 text-white"
            >
              Login to Continue
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Transparent Humanitarian Resource Distribution
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our blockchain-powered platform that ensures every donation reaches those who need it most. 
              Track your impact with complete transparency and real-time verification.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/api/login'}
                className="bg-primary hover:bg-blue-700 text-white px-8 py-3"
              >
                Start Donating
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-blue-50 px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose HumanAid?
            </h2>
            <p className="text-lg text-gray-600">
              Our platform combines cutting-edge technology with humanitarian mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Blockchain Security
                </h3>
                <p className="text-gray-600 text-sm">
                  Every transaction is recorded on blockchain for immutable transparency
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-secondary text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Real-time Tracking
                </h3>
                <p className="text-gray-600 text-sm">
                  Monitor your donations from contribution to final distribution
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="text-accent text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verified Recipients
                </h3>
                <p className="text-gray-600 text-sm">
                  Biometric verification ensures aid reaches genuine beneficiaries
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-warning text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Direct Impact
                </h3>
                <p className="text-gray-600 text-sm">
                  See exactly how your contribution is making a difference
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Transparent Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of donors who trust HumanAid for transparent humanitarian giving
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
          >
            Get Started Today
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold text-white">HumanAid</span>
          </div>
          <p className="text-center text-gray-400">
            © 2024 HumanAid. Transparent humanitarian resource distribution platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
