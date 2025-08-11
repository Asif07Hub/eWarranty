import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Users,
  QrCode,
  BarChart3,
  Settings,
  Package,
  Smartphone,
  ExternalLink,
  Crown,
  Play
} from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<any>(null);
  const [subdomain, setSubdomain] = useState('');
  const [checkedTasks, setCheckedTasks] = useState<{[key: string]: boolean}>({});

  const gettingStartedTasks = [
    {
      id: 'invite-team',
      title: 'Invite Your Team',
      description: 'Add team members and assign roles',
      icon: Users,
      link: '/admin/users',
      estimated: '5 min'
    },
    {
      id: 'setup-products',
      title: 'Add Your Products',
      description: 'Configure product categories and warranty terms',
      icon: Package,
      link: '/admin/products',
      estimated: '10 min'
    },
    {
      id: 'generate-qr',
      title: 'Generate First QR Codes',
      description: 'Create QR codes for your products',
      icon: QrCode,
      link: '/manufacturingunit/qr-generation',
      estimated: '5 min'
    },
    {
      id: 'customize-portal',
      title: 'Customize Customer Portal',
      description: 'Brand your customer-facing portal',
      icon: Smartphone,
      link: '/admin/branding',
      estimated: '10 min'
    },
    {
      id: 'test-registration',
      title: 'Test Warranty Registration',
      description: 'Try the customer registration flow',
      icon: CheckCircle,
      link: '/customer/register',
      estimated: '3 min'
    },
    {
      id: 'review-analytics',
      title: 'Explore Analytics',
      description: 'Understand your reporting dashboard',
      icon: BarChart3,
      link: '/admin/analytics',
      estimated: '5 min'
    }
  ];

  const quickLinks = [
    {
      title: 'Admin Dashboard',
      description: 'Manage system settings and users',
      link: '/admin/dashboard',
      icon: Settings,
      color: 'bg-trust-blue'
    },
    {
      title: 'Manufacturing Portal',
      description: 'Generate QR codes and manage batches',
      link: '/manufacturingunit/dashboard',
      icon: QrCode,
      color: 'bg-battery-green'
    },
    {
      title: 'Customer Portal',
      description: 'See what customers experience',
      link: '/customer/register',
      icon: Smartphone,
      color: 'bg-energy-yellow'
    },
    {
      title: 'Analytics',
      description: 'View reports and insights',
      link: '/admin/analytics',
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  useEffect(() => {
    // Load company data from signup
    const companyInfo = localStorage.getItem('companyInfo');
    const accountSetup = localStorage.getItem('accountSetup');
    const selectedPlan = localStorage.getItem('selectedPlan');
    const storedSubdomain = localStorage.getItem('selectedSubdomain');

    if (!companyInfo || !accountSetup || !selectedPlan) {
      navigate('/signup/company-info');
      return;
    }

    setCompanyData({
      company: JSON.parse(companyInfo),
      account: JSON.parse(accountSetup),
      plan: selectedPlan
    });

    if (storedSubdomain) {
      setSubdomain(storedSubdomain);
    }

    // Load completed tasks
    const completedTasks = localStorage.getItem('welcomeTasks');
    if (completedTasks) {
      setCheckedTasks(JSON.parse(completedTasks));
    }
  }, [navigate]);

  const handleTaskCheck = (taskId: string, checked: boolean) => {
    const updatedTasks = { ...checkedTasks, [taskId]: checked };
    setCheckedTasks(updatedTasks);
    localStorage.setItem('welcomeTasks', JSON.stringify(updatedTasks));
  };

  const completedTasksCount = Object.values(checkedTasks).filter(Boolean).length;
  const progressPercentage = (completedTasksCount / gettingStartedTasks.length) * 100;

  const handleQuickLinkClick = (link: string) => {
    navigate(link);
  };

  if (!companyData) return null;

  return (
    <div className="min-h-screen bg-page-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-battery-green rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-page-title font-heading text-card-foreground">
                Welcome to eWarranty!
              </h1>
              <p className="text-body text-muted-foreground">
                {companyData.company.companyName} • {subdomain}.ewarranty.pk
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-success text-white">
              Account Created Successfully
            </Badge>
            <Badge variant="outline">
              <Crown className="h-3 w-3 mr-1" />
              {companyData.plan} Plan
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card shadow-elegant border border-border">
            <CardContent className="p-6 text-center">
              <div className="text-card-title font-heading text-card-foreground mb-2">
                {completedTasksCount}/{gettingStartedTasks.length}
              </div>
              <div className="text-body text-muted-foreground">
                Setup Tasks Complete
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-elegant border border-border">
            <CardContent className="p-6 text-center">
              <div className="text-card-title font-heading text-card-foreground mb-2">
                {companyData.company.industry}
              </div>
              <div className="text-body text-muted-foreground">
                Industry
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-elegant border border-border">
            <CardContent className="p-6 text-center">
              <div className="text-card-title font-heading text-card-foreground mb-2">
                14 Days
              </div>
              <div className="text-body text-muted-foreground">
                Free Trial Remaining
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-elegant border border-border">
            <CardContent className="p-6 text-center">
              <div className="text-card-title font-heading text-card-foreground mb-2">
                0
              </div>
              <div className="text-body text-muted-foreground">
                Warranties Registered
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Getting Started Checklist */}
          <Card className="bg-card shadow-elegant border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-trust-blue" />
                Getting Started Checklist
              </CardTitle>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-body text-muted-foreground">
                    {completedTasksCount} of {gettingStartedTasks.length} completed
                  </span>
                  <span className="text-body text-muted-foreground">
                    ~{gettingStartedTasks.length * 6} min total
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {gettingStartedTasks.map((task) => {
                const Icon = task.icon;
                const isCompleted = checkedTasks[task.id];
                
                return (
                  <div key={task.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <Checkbox
                      id={task.id}
                      checked={isCompleted}
                      onCheckedChange={(checked) => handleTaskCheck(task.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4 text-trust-blue flex-shrink-0" />
                        <h4 className={`text-body font-medium ${isCompleted ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                          {task.title}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {task.estimated}
                        </Badge>
                      </div>
                      <p className={`text-small ${isCompleted ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                        {task.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuickLinkClick(task.link)}
                      className="flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="space-y-6">
            <Card className="bg-card shadow-elegant border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ArrowRight className="h-6 w-6 text-trust-blue" />
                  Quick Access
                </CardTitle>
                <p className="text-body text-muted-foreground">
                  Jump to key areas of your warranty platform
                </p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button
                      key={link.title}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-glow"
                      onClick={() => handleQuickLinkClick(link.link)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className={`w-8 h-8 ${link.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-body font-medium text-card-foreground">
                          {link.title}
                        </h4>
                        <p className="text-small text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Help & Resources */}
            <Card className="bg-card shadow-elegant border border-border">
              <CardHeader>
                <CardTitle>Help & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Play className="h-4 w-4" />
                  Watch Platform Tutorial
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Read Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;