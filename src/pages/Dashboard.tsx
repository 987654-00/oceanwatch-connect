import { AlertCircle, Eye, MapPin, TrendingUp, Users, Waves } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const recentReports = [
    {
      id: 1,
      type: "Tsunami Warning",
      location: "Chennai Coast",
      time: "2 minutes ago",
      severity: "high",
      status: "active"
    },
    {
      id: 2,
      type: "High Waves",
      location: "Mumbai Harbor",
      time: "15 minutes ago",
      severity: "medium",
      status: "monitoring"
    },
    {
      id: 3,
      type: "Storm Surge",
      location: "Kolkata Port",
      time: "1 hour ago",
      severity: "low",
      status: "resolved"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-ocean rounded-xl p-8 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ocean Watch Dashboard</h1>
            <p className="text-primary-foreground/80 text-lg">
              Real-time coastal hazard monitoring and community reporting
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Live Status</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>All Systems Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-wave transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">23</div>
            <p className="text-xs text-muted-foreground">+12% from last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-wave transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitoring Stations</CardTitle>
            <Waves className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">156</div>
            <p className="text-xs text-muted-foreground">98.7% operational</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-wave transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">1,247</div>
            <p className="text-xs text-muted-foreground">Citizens online now</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-wave transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Social Mentions</CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">847</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Recent Hazard Reports
            </CardTitle>
            <CardDescription>Latest reports from citizens and monitoring stations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <div className="font-medium">{report.type}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report.location} • {report.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getSeverityColor(report.severity) as any}>
                    {report.severity}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              View All Reports
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-primary" />
              System Health
            </CardTitle>
            <CardDescription>Monitoring infrastructure and data flow status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Sensor Network</span>
                <span className="text-success">98.7%</span>
              </div>
              <Progress value={98.7} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Data Processing</span>
                <span className="text-success">99.1%</span>
              </div>
              <Progress value={99.1} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Social Media Feed</span>
                <span className="text-warning">89.3%</span>
              </div>
              <Progress value={89.3} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Mobile App Sync</span>
                <span className="text-success">95.8%</span>
              </div>
              <Progress value={95.8} className="h-2" />
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-3 mt-4">
              <div className="text-sm font-medium text-success">All Systems Operational</div>
              <div className="text-xs text-success/80 mt-1">
                No critical issues detected. Minor maintenance scheduled for 2:00 AM IST.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}