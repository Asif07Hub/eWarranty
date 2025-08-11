import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft, Zap, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckStatus = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [claimData, setClaimData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setClaimData({
        claimId: searchTerm,
        batteryInfo: {
          serialNumber: 'VT24150089',
          brand: 'Volta',
          model: 'AGM 70Ah',
          registrationId: 'REG-1705123456'
        },
        issueType: 'Battery not charging',
        description: 'Battery stops charging after 2 hours and shows error light',
        submissionDate: '2024-01-16',
        status: 'Under Review',
        estimatedResolution: '2024-01-19',
        timeline: [
          { date: '2024-01-16', status: 'Claim Submitted', description: 'Your warranty claim has been received', completed: true },
          { date: '2024-01-17', status: 'Under Review', description: 'Technical team is reviewing your claim', completed: true },
          { date: '2024-01-18', status: 'Inspection Scheduled', description: 'Field inspection scheduled', completed: false },
          { date: '2024-01-19', status: 'Resolution', description: 'Claim resolution and action', completed: false }
        ]
      });
      setIsSearching(false);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Submitted': { color: 'bg-blue-100 text-blue-800', icon: Clock },
      'Under Review': { color: 'bg-orange-100 text-orange-800', icon: Clock },
      'Approved': { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
      'Rejected': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'In Progress': { color: 'bg-purple-100 text-purple-800', icon: Clock },
      'Completed': { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Submitted'];
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getBrandColor = (brand: string) => {
    const colors = {
      'Volta': 'from-yellow-400 to-yellow-600',
      'Osaka': 'from-orange-400 to-orange-600',
      'Fujika': 'from-purple-400 to-purple-600',
      'SAGA': 'from-green-400 to-green-600'
    };
    return colors[brand as keyof typeof colors] || 'from-blue-400 to-blue-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/')}
          className="text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Pakistan Accumulators</span>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Search Section */}
        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Check Claim Status</CardTitle>
            <p className="text-muted-foreground">
              Enter your claim ID or registration ID to check status
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Claim ID or Registration ID</Label>
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., CLM-1705312345 or REG-1705123456"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <Button 
              onClick={handleSearch}
              className="w-full bg-gradient-primary hover:shadow-glow"
              disabled={!searchTerm.trim() || isSearching}
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Check Status
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {claimData && (
          <div className="space-y-6">
            {/* Battery Info */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <div className={`p-4 rounded-lg bg-gradient-to-r ${getBrandColor(claimData.batteryInfo.brand)} text-white`}>
                  <div className="text-center">
                    <p className="font-bold text-lg">{claimData.batteryInfo.brand}</p>
                    <p className="text-sm opacity-90">{claimData.batteryInfo.model}</p>
                    <p className="text-xs opacity-75">Serial: {claimData.batteryInfo.serialNumber}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Claim ID:</span>
                    <span className="font-medium">{claimData.claimId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    {getStatusBadge(claimData.status)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Submitted:</span>
                    <span className="font-medium">{claimData.submissionDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Est. Resolution:</span>
                    <span className="font-medium">{claimData.estimatedResolution}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Issue Details */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">Issue Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Issue Type:</span>
                    <p className="font-medium">{claimData.issueType}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Description:</span>
                    <p className="text-sm">{claimData.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">Progress Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claimData.timeline.map((item: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.completed 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {item.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <div className="w-2 h-2 bg-current rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`font-medium ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {item.status}
                          </p>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      Contact our support team for any questions about your claim.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Call Support: +92-XXX-XXXXXX
                    </Button>
                    <Button variant="outline" className="w-full">
                      WhatsApp: +92-XXX-XXXXXX
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results */}
        {searchTerm && !claimData && !isSearching && (
          <Card className="bg-gradient-card shadow-elegant">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Results Found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We couldn't find any claims with ID "{searchTerm}". Please check your ID and try again.
              </p>
              <Button 
                variant="outline"
                onClick={() => setSearchTerm('')}
                className="w-full"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;