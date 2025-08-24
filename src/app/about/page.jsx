import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, Globe, Users } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-theme-purple">
      {/* Header Section */}
      <header className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-theme-purple sm:text-5xl">
          About Us
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Empowering truth with cutting-edge technology. Learn about our mission to combat misinformation using advanced AI and modern UI.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <section className="mb-16">
          <Card className="border-none shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-theme-purple flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                At TruthGuard, we are dedicated to fighting the spread of fake news and misinformation. Our AI-powered fake news detection system leverages advanced natural language processing and machine learning to identify and flag unreliable content in real-time, ensuring users have access to trustworthy information.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <Card className="border-none shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-theme-purple flex items-center">
                <Brain className="w-6 h-6 mr-2" />
                Our Technology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Built with Next.js 15 and shadcn/ui, our platform combines a sleek, accessible user interface with powerful AI algorithms. We use state-of-the-art NLP models to analyze text, cross-reference sources, and detect patterns of misinformation. Our system is designed to be fast, reliable, and user-friendly, with a light theme and intuitive components powered by Tailwind CSS and Lucide React icons.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Impact Section */}
        <section className="mb-16">
          <Card className="border-none shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-theme-purple flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                Our Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Our platform has processed millions of articles and social media posts, helping users and organizations make informed decisions. By providing real-time insights and clear visualizations, we empower journalists, researchers, and everyday users to navigate the complex digital information landscape with confidence.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <Card className="border-none shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-theme-purple flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                We are a diverse team of AI researchers, software engineers, and UX designers passionate about truth and transparency. With expertise in machine learning, web development, and data science, we collaborate to build tools that make a difference in the fight against misinformation.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-theme-purple mb-6">
            Join Us in the Fight Against Misinformation
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to explore our fake news detection system? Get started today or contact us to learn more about how we’re making the internet a more trustworthy place.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-theme-purple text-white hover:bg-theme-purple/90">
              <Link href="/get-started">Get Started</Link>
            </Button>
            <Button asChild variant="outline" className="border-theme-purple text-theme-purple hover:bg-theme-purple/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} TruthGuard. All rights reserved.</p>
      </footer>
    </div>
  );
}