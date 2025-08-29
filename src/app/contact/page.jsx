'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your form submission logic (e.g., API call)
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-theme-purple">
      {/* Header Section */}
      <header className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-theme-purple sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Got questions or feedback about our news aggregator? Reach out to us, and we’ll respond as soon as possible.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-theme-purple flex items-center">
                <Send className="w-6 h-6 mr-2" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="mt-1 border-gray-300 focus:border-theme-purple focus:ring-theme-purple text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="mt-1 border-gray-300 focus:border-theme-purple focus:ring-theme-purple text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="mt-1 border-gray-300 focus:border-theme-purple focus:ring-theme-purple text-gray-900"
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-theme-purple text-white hover:bg-theme-purple/90"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-theme-purple">
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 mr-4 text-theme-purple" />
                <div>
                  <h3 className="text-lg font-semibold text-theme-purple">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:support@newsaggregator.com" className="hover:underline">
                      support@newsaggregator.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 mr-4 text-theme-purple" />
                <div>
                  <h3 className="text-lg font-semibold text-theme-purple">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+1234567890" className="hover:underline">
                      +91 9428764983
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 text-theme-purple" />
                <div>
                  <h3 className="text-lg font-semibold text-theme-purple">Address</h3>
                  <p className="text-gray-600">
                    123 MGM university <br />
                    Ch. Sambhajinagar, maharashtra, India
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} News Aggregator. All rights reserved.</p>
      </footer>
    </div>
  );
}