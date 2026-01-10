import logoPath from "@assets/feel-again-dots_PNG_1768054419574.png";
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
              <img src={logoPath} alt="Feel Again" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold text-gray-900">Feel Again</span>
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
              Feel Again: Digital Bridge for Psychological Support
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Technological platform for dignified and equitable access to trauma-informed psychological care.
              Supporting beneficiaries through professional guidance and transparent resource allocation.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/api/login'}
                className="bg-primary hover:bg-blue-700 text-white px-8 py-3"
              >
                Get Started
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
              Why Feel Again?
            </h2>
            <p className="text-lg text-gray-600">
              Integrating professional MHPSS standards with transparent technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Solana Security
                </h3>
                <p className="text-gray-600 text-sm">
                  Transparent co-financing through Solana smart contracts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-secondary text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  mhGAP Standards
                </h3>
                <p className="text-gray-600 text-sm">
                  Automated reporting based on international clinical protocols
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="text-accent text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Unified Environment
                </h3>
                <p className="text-gray-600 text-sm">
                  Connecting clinical facilities, NGOs, and private practice
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-warning text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Dignified Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Focus on long-term trauma recovery and professional care
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
            Ready to Support Professional Care?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the ecosystem providing trauma-informed psychological assistance
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
          >
            Join Ecosystem
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <img src={logoPath} alt="Feel Again" className="h-8 w-8 object-contain brightness-0 invert" />
            <span className="text-xl font-bold text-white">Feel Again</span>
          </div>
          <p className="text-center text-gray-400">
            © 2026 Feel Again. Professional MHPSS Ecosystem and Transparency Platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
