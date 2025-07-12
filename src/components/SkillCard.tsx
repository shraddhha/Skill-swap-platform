import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageSquare, Clock } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  type: "offered" | "wanted";
}

interface SkillCardProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
    location: string;
  };
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  onRequest: (userId: string) => void;
  onMessage: (userId: string) => void;
}

export const SkillCard = ({ 
  user, 
  skillsOffered, 
  skillsWanted, 
  onRequest, 
  onMessage 
}: SkillCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16 border-2 border-primary/10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground">{user.location}</p>
            
            <div className="flex items-center space-x-1 mt-1">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium ml-1">{user.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({user.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Skills Offered */}
        {skillsOffered.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Skills Offered</h4>
            <div className="flex flex-wrap gap-2">
              {skillsOffered.map((skill) => (
                <Badge 
                  key={skill.id} 
                  variant="secondary"
                  className="bg-skill-offered/10 text-skill-offered border-skill-offered/20 hover:bg-skill-offered/20"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills Wanted */}
        {skillsWanted.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Skills Wanted</h4>
            <div className="flex flex-wrap gap-2">
              {skillsWanted.map((skill) => (
                <Badge 
                  key={skill.id} 
                  variant="outline"
                  className="border-skill-wanted text-skill-wanted hover:bg-skill-wanted/10"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onRequest(user.id)}
          >
            <Clock className="w-4 h-4 mr-2" />
            Request
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onMessage(user.id)}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};