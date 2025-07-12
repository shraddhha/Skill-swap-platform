import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Send, 
  Inbox, 
  Calendar,
  MessageSquare,
  Star
} from "lucide-react";

interface SwapRequest {
  id: string;
  type: "sent" | "received";
  user: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  skillOffered: string;
  skillWanted: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  message: string;
  createdAt: string;
  scheduledAt?: string;
}

// Mock data
const mockRequests: SwapRequest[] = [
  {
    id: "1",
    type: "received",
    user: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "",
      rating: 4.8,
    },
    skillOffered: "React Development",
    skillWanted: "UI/UX Design",
    status: "pending",
    message: "Hi! I'd love to help you with React development in exchange for some UI/UX design guidance. I'm working on a project that could use some design input.",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    type: "sent",
    user: {
      id: "user2",
      name: "Maria Rodriguez",
      avatar: "",
      rating: 4.9,
    },
    skillOffered: "Photography",
    skillWanted: "Graphic Design",
    status: "accepted",
    message: "I can help you with portrait photography techniques, and I'd appreciate learning about graphic design workflows.",
    createdAt: "2024-01-14T14:20:00Z",
    scheduledAt: "2024-01-20T15:00:00Z",
  },
  {
    id: "3",
    type: "sent",
    user: {
      id: "user3",
      name: "David Chen",
      avatar: "",
      rating: 4.7,
    },
    skillOffered: "Guitar Lessons",
    skillWanted: "Piano Lessons",
    status: "completed",
    message: "I can teach you guitar basics in exchange for piano lessons. I've been wanting to learn piano for years!",
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "4",
    type: "received",
    user: {
      id: "user4",
      name: "Sarah Wilson",
      avatar: "",
      rating: 5.0,
    },
    skillOffered: "Marketing Strategy",
    skillWanted: "Web Development",
    status: "rejected",
    message: "I can share marketing strategies for your projects if you can help me understand modern web development frameworks.",
    createdAt: "2024-01-12T16:45:00Z",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "accepted":
      return <CheckCircle className="w-4 h-4" />;
    case "rejected":
      return <XCircle className="w-4 h-4" />;
    case "completed":
      return <Star className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "status-pending";
    case "accepted":
      return "status-accepted";
    case "rejected":
      return "status-rejected";
    case "completed":
      return "skill-offered";
    default:
      return "status-pending";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const RequestsPage = () => {
  const [requests] = useState(mockRequests);
  const [selectedTab, setSelectedTab] = useState("all");

  const handleAcceptRequest = (requestId: string) => {
    console.log("Accept request:", requestId);
    // This will need backend integration
  };

  const handleRejectRequest = (requestId: string) => {
    console.log("Reject request:", requestId);
    // This will need backend integration
  };

  const handleMessageUser = (userId: string) => {
    console.log("Message user:", userId);
    // This will need backend integration
  };

  const filteredRequests = requests.filter(request => {
    if (selectedTab === "all") return true;
    if (selectedTab === "sent") return request.type === "sent";
    if (selectedTab === "received") return request.type === "received";
    if (selectedTab === "pending") return request.status === "pending";
    return true;
  });

  const requestCounts = {
    all: requests.length,
    sent: requests.filter(r => r.type === "sent").length,
    received: requests.filter(r => r.type === "received").length,
    pending: requests.filter(r => r.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Skill Swap Requests</h1>
          <p className="text-muted-foreground">
            Manage your incoming and outgoing skill exchange requests
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              All ({requestCounts.all})
            </TabsTrigger>
            <TabsTrigger value="received" className="flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              Received ({requestCounts.received})
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Sent ({requestCounts.sent})
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending ({requestCounts.pending})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.user.avatar} alt={request.user.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {request.user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-foreground">
                              {request.user.name}
                            </h3>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-warning text-warning" />
                              <span className="text-sm font-medium ml-1">{request.user.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{formatDate(request.createdAt)}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {request.type === "sent" ? "Sent" : "Received"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <Badge 
                        variant="outline"
                        className={`flex items-center gap-1 text-${getStatusColor(request.status)} border-${getStatusColor(request.status)}/20`}
                      >
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Skills Exchange */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">
                            {request.type === "sent" ? "You offer:" : "They offer:"}
                          </h4>
                          <Badge className="bg-skill-offered/10 text-skill-offered border-skill-offered/20">
                            {request.skillOffered}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">
                            {request.type === "sent" ? "You want:" : "They want:"}
                          </h4>
                          <Badge variant="outline" className="border-skill-wanted text-skill-wanted">
                            {request.skillWanted}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Message</h4>
                      <p className="text-sm text-muted-foreground bg-card p-3 rounded-lg border">
                        {request.message}
                      </p>
                    </div>

                    {/* Scheduled Session */}
                    {request.scheduledAt && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-success/10 p-3 rounded-lg">
                        <Calendar className="w-4 h-4 text-success" />
                        <span>
                          Scheduled for {formatDate(request.scheduledAt)}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      {request.type === "received" && request.status === "pending" && (
                        <>
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                        </>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleMessageUser(request.user.id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      
                      {request.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <Star className="w-4 h-4 mr-2" />
                          Rate Exchange
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-muted-foreground">
                    <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No requests found</h3>
                    <p className="mb-4">
                      {selectedTab === "all" && "You don't have any skill swap requests yet."}
                      {selectedTab === "sent" && "You haven't sent any requests yet."}
                      {selectedTab === "received" && "No one has sent you any requests yet."}
                      {selectedTab === "pending" && "No pending requests at the moment."}
                    </p>
                    <Button variant="outline">
                      Browse Skills
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};