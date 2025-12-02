import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Landmark,
  Mountain,
  Award,
  PartyPopper,
  Sprout,
  Heart,
  BookOpen,
  TreePine,
  Users,
  CalendarCheck,
} from "lucide-react";

const timelineItems = [
  {
    icon: Landmark,
    title: "Foundation",
    year: "2014",
  },
  {
    icon: Mountain,
    title: "First Major Project",
    year: "2016",
  },
  {
    icon: Award,
    title: "National Recognition",
    year: "2019",
  },
  {
    icon: PartyPopper,
    title: "10-Year Anniversary",
    year: "2024",
  },
];

const values = [
  {
    icon: Sprout,
    title: "Sustainability",
    description:
      "Promoting practices that protect our planet for future generations.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "Building strong, engaged communities that champion environmental causes.",
  },
  {
    icon: BookOpen,
    title: "Education",
    description:
      "Empowering individuals with the knowledge to make a difference.",
  },
];

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    bio: "John's passion for the environment started it all. He leads our team with vision and an unwavering commitment to our planet.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
  },
  {
    name: "Jane Smith",
    role: "Director of Operations",
    bio: "Jane ensures our projects run smoothly and effectively, turning our vision into on-the-ground action.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
  },
  {
    name: "Alex Johnson",
    role: "Community Outreach",
    bio: "Alex connects us with communities, building partnerships that amplify our impact and spread awareness.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
];

const impactStats = [
  {
    icon: TreePine,
    value: "10,000+",
    label: "Trees Planted",
  },
  {
    icon: Users,
    value: "5,000+",
    label: "Volunteers Engaged",
  },
  {
    icon: CalendarCheck,
    value: "200+",
    label: "Workshops Held",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative mx-4 md:mx-8 mt-4 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 py-20 md:py-28 px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Connecting People and Planet
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover our journey, our team, and our commitment to fostering a
            sustainable future for all.
          </p>
        </div>
      </section>

      {/* Our Story + Timeline Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Our Story */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                From a small group of volunteers to a national movement, our
                journey is one of passion, dedication, and growth.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative pl-8">
              {/* Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/30" />

              <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex items-start gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-medium text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-primary font-semibold">{item.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              We are dedicated to preserving natural habitats and promoting
              social awareness through community engagement, education, and
              direct action.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="border border-border/50 bg-background"
                >
                  <CardContent className="pt-6">
                    <value.icon className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Meet the Team
            </h2>
            <p className="text-muted-foreground">
              The passionate individuals dedicated to our cause.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Our Impact
            </h2>
            <p className="text-muted-foreground">
              Our efforts have made a tangible difference, thanks to our
              community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {impactStats.map((stat) => (
              <Card
                key={stat.label}
                className="text-center border-0 bg-primary/10"
              >
                <CardContent className="pt-8 pb-8">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
