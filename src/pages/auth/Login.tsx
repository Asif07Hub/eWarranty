
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TenantSelector } from '@/components/TenantSelector';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { LogIn, Mail, Lock, AlertCircle, ArrowLeft, Zap } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { currentTenant } = useTenant();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, currentTenant?.subdomain);
      
      // Check if system admin and redirect appropriately
      if (email === 'sysadmin@ewarranty.pk') {
        navigate('/platform/dashboard');
      } else {
        navigate(redirectTo);
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    setIsLoading(true);
    try {
      const demoCredentials = {
        'system-admin': { email: 'sysadmin@ewarranty.pk', password: 'demo123' },
        'brand-admin': { email: 'brandadmin@ewarranty.pk', password: 'demo123' },
        'manufacturing-plant': { email: 'plant@ewarranty.pk', password: 'demo123' },
        'brand-distributor': { email: 'distributor@ewarranty.pk', password: 'demo123' },
        'customer': { email: 'customer@ewarranty.pk', password: 'demo123' }
      };
      
      const credentials = demoCredentials[role as keyof typeof demoCredentials];
      await login(credentials.email, credentials.password, currentTenant?.subdomain);
      
      // Redirect system admin to platform dashboard
      if (role === 'system-admin') {
        navigate('/platform/dashboard');
      } else {
        navigate(redirectTo);
      }
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-trust-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="flex items-center space-x-3 group">
            <Button variant="ghost" size="icon" className="group-hover:bg-accent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-heading font-bold text-foreground">eWarranty</span>
            </div>
          </Link>
          
          <Button variant="outline" asChild>
            <Link to="/signup">Create Account</Link>
          </Button>
        </div>
      </header>

      {/* Dev Mode Simulator - Only on Login Page */}
      <TenantSelector />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm shadow-elegant border border-border/50 hover:shadow-glow transition-all duration-500">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex items-center justify-center">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-glow"
                style={{ backgroundColor: currentTenant?.primaryColor || 'hsl(var(--trust-blue))' }}
              >
                <LogIn className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-card-title font-heading text-card-foreground">
                Welcome to {currentTenant?.displayName || 'eWarranty'}
              </CardTitle>
              <p className="text-body text-muted-foreground">
                Sign in to your warranty portal
              </p>
              {currentTenant && (
                <p className="text-small text-muted-foreground opacity-75">
                  {currentTenant.subdomain}.ewarranty.pk
                </p>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="bg-destructive/10 border-destructive/20 animate-fade-in">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-small font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-small font-medium text-foreground">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground shadow-glow hover-scale transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-small">
                  <span className="px-3 bg-card text-muted-foreground">Or try demo</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDemoLogin('system-admin')}
                  disabled={isLoading}
                  className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-all"
                >
                  System Admin
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDemoLogin('brand-admin')}
                  disabled={isLoading}
                  className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-all"
                >
                  Brand Admin
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDemoLogin('manufacturing-plant')}
                  disabled={isLoading}
                  className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-all"
                >
                  Manufacturing
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDemoLogin('brand-distributor')}
                  disabled={isLoading}
                  className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-all"
                >
                  Distributor
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin('customer')}
                disabled={isLoading}
                className="w-full text-xs hover:bg-primary/10 hover:border-primary/30 transition-all"
              >
                Customer
              </Button>
            </div>

            <div className="text-center text-small text-muted-foreground">
              Don't have an account?{' '}
              <Link 
                to={`/signup${currentTenant ? `?tenant=${currentTenant.subdomain}` : ''}`}
                className="text-primary hover:text-primary-dark font-medium hover:underline transition-all"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
