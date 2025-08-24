'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BlogPage() {
  // Sample blog posts data
  const [posts] = useState([
    {
      id: 1,
      title: 'Getting Started with Next.js 15',
      excerpt: 'Learn how to build modern web applications with the latest Next.js features.',
      author: 'Jane Doe',
      date: '2025-08-20',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Mastering shadcn/ui Components',
      excerpt: 'A deep dive into creating beautiful UIs with shadcn/ui and Tailwind CSS.',
      author: 'John Smith',
      date: '2025-08-18',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'Using Lucide Icons in Your Projects',
      excerpt: 'Enhance your web apps with Lucide React icons for a consistent look.',
      author: 'Alice Johnson',
      date: '2025-08-15',
      readTime: '4 min read',
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-theme-purple">Blog</h1>
          <p className="mt-2 text-lg text-gray-600">Insights, tutorials, and updates from our team.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-theme-purple">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full text-theme-purple border-theme-purple hover:bg-theme-purple hover:text-white"
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}