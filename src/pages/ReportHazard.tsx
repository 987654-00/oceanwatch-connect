import { useState } from "react";
import { AlertTriangle, Camera, MapPin, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

export default function ReportHazard() {
  const [formData, setFormData] = useState({
    hazardType: "",
    location: "",
    latitude: "",
    longitude: "",
    severity: "",
    description: "",
    photos: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Hazard report submitted successfully!", {
      description: "Your report has been sent to INCOIS for immediate review."
    });
    
    // Reset form
    setFormData({
      hazardType: "",
      location: "",
      latitude: "",
      longitude: "",
      severity: "",
      description: "",
      photos: [],
    });
  };

  const hazardTypes = [
    "Tsunami Warning",
    "High Waves",
    "Storm Surge", 
    "Coastal Flooding",
    "Swell Surge",
    "Abnormal Tides",
    "Coastal Erosion",
    "Other"
  ];

  const severityLevels = [
    { value: "low", label: "Low", color: "bg-green-500" },
    { value: "medium", label: "Medium", color: "bg-yellow-500" },
    { value: "high", label: "High", color: "bg-orange-500" },
    { value: "critical", label: "Critical", color: "bg-red-500" },
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        }));
        toast.success("Location captured successfully!");
      }, (error) => {
        toast.error("Unable to get location. Please enter manually.");
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-ocean rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Report Ocean Hazard</h1>
            <p className="text-primary-foreground/80">
              Help protect coastal communities by reporting dangerous ocean conditions
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hazard Details Card */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Hazard Information
              </CardTitle>
              <CardDescription>
                Describe the ocean hazard you're observing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hazardType">Hazard Type</Label>
                <Select value={formData.hazardType} onValueChange={(value) => 
                  setFormData(prev => ({...prev, hazardType: value}))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hazard type" />
                  </SelectTrigger>
                  <SelectContent>
                    {hazardTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '_')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="severity">Severity Level</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {severityLevels.map((level) => (
                    <Button
                      key={level.value}
                      type="button"
                      variant={formData.severity === level.value ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setFormData(prev => ({...prev, severity: level.value}))}
                    >
                      <div className={`w-3 h-3 rounded-full ${level.color} mr-2`}></div>
                      {level.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you're observing (wave height, water level, damage, etc.)"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Media Card */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location & Evidence
              </CardTitle>
              <CardDescription>
                Provide location details and upload photos/videos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Location Name</Label>
                <Input
                  id="location"
                  placeholder="e.g., Marina Beach, Chennai"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    placeholder="13.0827"
                    value={formData.latitude}
                    onChange={(e) => setFormData(prev => ({...prev, latitude: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    placeholder="80.2707"
                    value={formData.longitude}
                    onChange={(e) => setFormData(prev => ({...prev, longitude: e.target.value}))}
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                className="w-full"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Use Current Location
              </Button>

              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload photos or videos of the hazard
                </p>
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Max 10 files, 5MB each
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Guidelines */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm">Reporting Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                <div>
                  <div className="font-medium text-red-700 dark:text-red-400">Critical</div>
                  <div className="text-muted-foreground">Immediate danger to life/property</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-1"></div>
                <div>
                  <div className="font-medium text-orange-700 dark:text-orange-400">High</div>
                  <div className="text-muted-foreground">Potential for significant impact</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1"></div>
                <div>
                  <div className="font-medium text-yellow-700 dark:text-yellow-400">Medium</div>
                  <div className="text-muted-foreground">Moderate concern, monitor closely</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-gradient-ocean px-8">
            <Save className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
}