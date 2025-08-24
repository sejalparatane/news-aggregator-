"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-theme-purple">
              My Website
            </Link>
            <p className="text-sm text-gray-600">
              Empowering connections through innovative solutions and seamless user experiences.
            </p>
            <div className="flex space-x-4">
              <Input placeholder="Your email" type="email" className="text-theme-purple" />
              <Button variant="outline" className="text-theme-purple border-theme-purple hover:bg-theme-purple hover:text-white">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-theme-purple">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-theme-purple hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-theme-purple hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-theme-purple hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-theme-purple hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-theme-purple">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-theme-purple hover:text-theme-purple/80">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-theme-purple hover:text-theme-purple/80">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-theme-purple hover:text-theme-purple/80">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-theme-purple hover:text-theme-purple/80">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-theme-purple hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-theme-purple hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-theme-purple">
            © {new Date().getFullYear()} My Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}