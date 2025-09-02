import { useState } from "react";
import { Filter, Layers, MapPin, RefreshCw, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InteractiveMap() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState("24h");

  const hazardData = [
    {
      id: 1,
      type: "Tsunami Warning",
      location: "Chennai Coast",
      coordinates: [80.2707, 13.0827],
      severity: "critical",
      reports: 23,
      lastUpdated: "2 min ago",
      status: "active"
    },
    {
      id: 2,
      type: "High Waves",
      location: "Mumbai Harbor",
      coordinates: [72.8777, 19.0760],
      severity: "high",
      reports: 8,
      lastUpdated: "15 min ago",
      status: "monitoring"
    },
    {
      id: 3,
      type: "Storm Surge",
      location: "Kochi Port",
      coordinates: [76.2673, 9.9312],
      severity: "medium",
      reports: 5,
      lastUpdated: "1 hour ago",
      status: "monitoring"
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return { variant: "destructive" as const, text: "Active" };
      case "monitoring": return { variant: "secondary" as const, text: "Monitoring" };
      case "resolved": return { variant: "default" as const, text: "Resolved" };
      default: return { variant: "secondary" as const, text: "Unknown" };
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-ocean rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Live Hazard Map</h1>
              <p className="text-primary-foreground/80">
                Real-time ocean hazards across Indian coastline
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
            <Button variant="secondary" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Map Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search Location</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search location..." className="pl-10" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last 1 Hour</SelectItem>
                  <SelectItem value="6h">Last 6 Hours</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Hazard Types</label>
              <div className="space-y-2">
                {["Tsunami", "High Waves", "Storm Surge", "Flooding"].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Map Layers</label>
              <div className="space-y-2">
                {["Satellite", "Bathymetry", "Currents", "Wind"].map((layer) => (
                  <Button key={layer} variant="outline" size="sm" className="w-full justify-start">
                    <Layers className="h-4 w-4 mr-2" />
                    {layer}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Area */}
        <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Interactive Map View</CardTitle>
            <CardDescription>
              Click on markers for detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-depth rounded-lg h-96 flex items-center justify-center">
              {/* Placeholder for actual map implementation */}
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map Loading...</p>
                <p className="text-sm">
                  This would integrate with Mapbox/Google Maps to show real-time hazard data
                </p>
              </div>

              {/* Simulated Markers */}
              <div className="absolute top-1/4 left-1/3">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse cursor-pointer"></div>
              </div>
              <div className="absolute top-2/3 right-1/3">
                <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse cursor-pointer"></div>
              </div>
              <div className="absolute bottom-1/4 left-1/2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse cursor-pointer"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Hazards List */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-destructive" />
            Active Hazards ({hazardData.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hazardData.map((hazard) => (
              <div key={hazard.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 ${getSeverityColor(hazard.severity)} rounded-full animate-pulse`}></div>
                  <div>
                    <div className="font-medium">{hazard.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {hazard.location} • {hazard.reports} reports • Updated {hazard.lastUpdated}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusBadge(hazard.status).variant}>
                    {getStatusBadge(hazard.status).text}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}