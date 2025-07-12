import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, BookOpen, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const featuredSkills = [
  { name: "Web Development", count: 45, type: "offered" },
  { name: "Graphic Design", count: 32, type: "offered" },
  { name: "Language Exchange", count: 28, type: "wanted" },
  { name: "Music Lessons", count: 23, type: "offered" },
  { name: "Photography", count: 19, type: "wanted" },
  { name: "Cooking", count: 15, type: "offered" },
];

const stats = [
  { label: "Active Users", value: "1,234", icon: Users },
  { label: "Skills Shared", value: "856", icon: BookOpen },
  { label: "Successful Swaps", value: "492", icon: Zap },
];

export const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Share Skills,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Build Community
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect with like-minded individuals to exchange skills, learn new talents, 
            and grow together in a collaborative community.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search for skills (e.g., Web Development, Guitar, Cooking...)"
                className="pl-12 h-14 text-lg bg-card border-2 shadow-lg"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-2 h-10"
              >
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" variant="default" className="w-full sm:w-auto">
                Browse Skills
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Popular Skills
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the most sought-after skills in our community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredSkills.map((skill, index) => (
              <Card key={index} className="hover:shadow-md transition-all hover:scale-105 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="mb-2">
                    <Badge 
                      variant={skill.type === "offered" ? "default" : "outline"}
                      className={skill.type === "offered" 
                        ? "bg-skill-offered/10 text-skill-offered border-skill-offered/20" 
                        : "border-skill-wanted text-skill-wanted"
                      }
                    >
                      {skill.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                  <p className="text-xs text-muted-foreground">{skill.count} users</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/browse">
              <Button variant="outline" size="lg">
                View All Skills
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Start sharing and learning in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                List the skills you can offer and what you'd like to learn
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Request</h3>
              <p className="text-muted-foreground">
                Find people with skills you need and send swap requests
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-success to-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn & Grow</h3>
              <p className="text-muted-foreground">
                Exchange knowledge and build lasting connections
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};