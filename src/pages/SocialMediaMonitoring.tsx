import { useState } from "react";
import { BarChart3, MessageCircle, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SocialMediaMonitoring() {
  const socialMediaPosts = [
    {
      id: 1,
      platform: "Twitter",
      content: "Massive waves hitting Chennai marina! Water level rising rapidly. #TsunamiAlert #ChennaiFlood",
      author: "@chennai_local",
      location: "Chennai, Tamil Nadu",
      timestamp: "2 min ago",
      engagement: 234,
      sentiment: "urgent",
      verified: false
    },
    {
      id: 2,
      platform: "Facebook",
      content: "Unusual high tide at Bandra Bandstand. People evacuating the area. Authorities on scene.",
      author: "Mumbai Updates",
      location: "Mumbai, Maharashtra", 
      timestamp: "8 min ago",
      engagement: 89,
      sentiment: "concerning",
      verified: true
    },
    {
      id: 3,
      platform: "Instagram",
      content: "Storm surge warnings for Kochi port. Fishing boats returning to harbor. Stay safe everyone! 🌊",
      author: "@kochi_fisher",
      location: "Kochi, Kerala",
      timestamp: "15 min ago",
      engagement: 156,
      sentiment: "informative",
      verified: false
    }
  ];

  const trendingKeywords = [
    { keyword: "tsunami", mentions: 1247, change: "+89%" },
    { keyword: "high waves", mentions: 856, change: "+45%" },
    { keyword: "storm surge", mentions: 634, change: "+23%" },
    { keyword: "coastal flooding", mentions: 421, change: "+67%" },
    { keyword: "evacuation", mentions: 289, change: "+156%" },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "urgent": return "destructive";
      case "concerning": return "secondary";
      case "informative": return "default";
      default: return "secondary";
    }
  };

  const getPlatformBadge = (platform: string) => {
    const colors: Record<string, string> = {
      Twitter: "bg-blue-500",
      Facebook: "bg-blue-600", 
      Instagram: "bg-pink-500",
      YouTube: "bg-red-500"
    };
    return colors[platform] || "bg-gray-500";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-ocean rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Social Media Monitoring</h1>
              <p className="text-primary-foreground/80">
                Real-time social media analysis for ocean hazard detection
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Live Stream</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Monitoring Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentions</CardTitle>
            <MessageCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3,847</div>
            <p className="text-xs text-muted-foreground">+22% from last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Reports</CardTitle>
            <TrendingUp className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">47</div>
            <p className="text-xs text-muted-foreground">Requires immediate review</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Sources</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">156</div>
            <p className="text-xs text-muted-foreground">Active verified accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">73%</div>
            <p className="text-xs text-muted-foreground">Concern level rising</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Live Feed</TabsTrigger>
          <TabsTrigger value="trends">Trending</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Real-time Social Media Feed</CardTitle>
              <CardDescription>
                AI-filtered posts related to ocean hazards and coastal events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialMediaPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${getPlatformBadge(post.platform)} rounded-full`}></div>
                      <span className="font-medium">{post.author}</span>
                      {post.verified && (
                        <Badge variant="default" className="text-xs">Verified</Badge>
                      )}
                      <Badge variant={getSentimentColor(post.sentiment) as any} className="text-xs">
                        {post.sentiment}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                  </div>
                  
                  <p className="text-foreground mb-3">{post.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.location}</span>
                    <div className="flex items-center gap-4">
                      <span>{post.engagement} interactions</span>
                      <Button variant="ghost" size="sm">Review</Button>
                      <Button variant="ghost" size="sm">Flag</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Trending Keywords</CardTitle>
                <CardDescription>
                  Most mentioned hazard-related terms in the last 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingKeywords.map((item, index) => (
                  <div key={item.keyword} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                      <div>
                        <div className="font-medium">{item.keyword}</div>
                        <div className="text-sm text-muted-foreground">{item.mentions} mentions</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      {item.change}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>
                  Mention density by coastal regions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { region: "Tamil Nadu", percentage: 34, mentions: 1308 },
                  { region: "Maharashtra", percentage: 28, mentions: 1077 },
                  { region: "Kerala", percentage: 18, mentions: 693 },
                  { region: "Gujarat", percentage: 12, mentions: 462 },
                  { region: "West Bengal", percentage: 8, mentions: 307 }
                ].map((region) => (
                  <div key={region.region} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{region.region}</span>
                      <span>{region.mentions} mentions</span>
                    </div>
                    <Progress value={region.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>AI Analysis Dashboard</CardTitle>
              <CardDescription>
                Natural Language Processing insights and predictive indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Sentiment Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Urgent/Emergency</span>
                      <span className="text-sm font-medium text-destructive">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Concerning</span>
                      <span className="text-sm font-medium text-warning">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Informational</span>
                      <span className="text-sm font-medium text-success">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Credibility Score</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">8.7/10</div>
                    <p className="text-sm text-muted-foreground">
                      High confidence in threat assessment based on verified sources and cross-validation
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}