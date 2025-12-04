"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Users, FolderOpen } from "lucide-react";

interface StatsProps {
  upcomingEvents: number;
  pastEvents: number;
  totalEvents: number;
  draftBlogs: number;
  publishedBlogs: number;
  totalBlogs: number;
  totalAuthors: number;
  totalCategories: number;
}

export function DashboardStats({
  upcomingEvents,
  pastEvents,
  totalEvents,
  draftBlogs,
  publishedBlogs,
  totalBlogs,
  totalAuthors,
  totalCategories,
}: StatsProps) {
  const stats = [
    {
      title: "Upcoming Events",
      value: upcomingEvents,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Past Events",
      value: pastEvents,
      icon: Calendar,
      color: "text-slate-600",
      bgColor: "bg-slate-100",
    },
    {
      title: "Total Events",
      value: totalEvents,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Draft Blogs",
      value: draftBlogs,
      icon: FileText,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Published Blogs",
      value: publishedBlogs,
      icon: FileText,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Total Blogs",
      value: totalBlogs,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Authors",
      value: totalAuthors,
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: FolderOpen,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
