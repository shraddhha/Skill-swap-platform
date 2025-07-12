import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SkillCard } from "@/components/SkillCard";
import { Search, Filter, MapPin } from "lucide-react";

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "",
    rating: 4.8,
    reviewCount: 24,
    location: "San Francisco, CA",
    skillsOffered: [
      { id: "1", name: "React Development", type: "offered" as const },
      { id: "2", name: "TypeScript", type: "offered" as const },
    ],
    skillsWanted: [
      { id: "3", name: "UI/UX Design", type: "wanted" as const },
      { id: "4", name: "Photography", type: "wanted" as const },
    ],
  },
  {
    id: "2",
    name: "Maria Rodriguez",
    avatar: "",
    rating: 4.9,
    reviewCount: 31,
    location: "New York, NY",
    skillsOffered: [
      { id: "5", name: "Graphic Design", type: "offered" as const },
      { id: "6", name: "Illustration", type: "offered" as const },
    ],
    skillsWanted: [
      { id: "7", name: "Spanish Tutoring", type: "wanted" as const },
    ],
  },
  {
    id: "3",
    name: "David Chen",
    avatar: "",
    rating: 4.7,
    reviewCount: 18,
    location: "Los Angeles, CA",
    skillsOffered: [
      { id: "8", name: "Piano Lessons", type: "offered" as const },
      { id: "9", name: "Music Theory", type: "offered" as const },
    ],
    skillsWanted: [
      { id: "10", name: "Web Development", type: "wanted" as const },
      { id: "11", name: "Guitar", type: "wanted" as const },
    ],
  },
  {
    id: "4",
    name: "Sarah Wilson",
    avatar: "",
    rating: 5.0,
    reviewCount: 12,
    location: "Seattle, WA",
    skillsOffered: [
      { id: "12", name: "Photography", type: "offered" as const },
      { id: "13", name: "Photo Editing", type: "offered" as const },
    ],
    skillsWanted: [
      { id: "14", name: "Marketing", type: "wanted" as const },
    ],
  },
];

const skillCategories = [
  "All Skills",
  "Technology",
  "Design",
  "Music",
  "Languages",
  "Photography",
  "Business",
  "Sports",
  "Cooking",
];

export const BrowsePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Skills");
  const [skillType, setSkillType] = useState("all");
  const [users] = useState(mockUsers);

  const handleRequest = (userId: string) => {
    console.log("Request skill swap with user:", userId);
    // This will need backend integration
  };

  const handleMessage = (userId: string) => {
    console.log("Send message to user:", userId);
    // This will need backend integration
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Skills</h1>
          <p className="text-muted-foreground">
            Discover talented individuals and connect for skill exchanges
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search skills or people..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Skill Type */}
              <div>
                <Select value={skillType} onValueChange={setSkillType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Skill Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="offered">Skills Offered</SelectItem>
                    <SelectItem value="wanted">Skills Wanted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                <MapPin className="w-3 h-3 mr-1" />
                Near me
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                Top Rated
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                Available Now
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                New Members
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">
              {filteredUsers.length} People Found
            </h2>
            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* User Grid */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <SkillCard
                key={user.id}
                user={user}
                skillsOffered={user.skillsOffered}
                skillsWanted={user.skillsWanted}
                onRequest={handleRequest}
                onMessage={handleMessage}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p>Try adjusting your search criteria or browse all skills</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Skills");
                  setSkillType("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredUsers.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Results
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};