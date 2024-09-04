"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import Link from "next/link";

// pages/index.js
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 bg-blue-700 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Your File Drive</h1>
        <p className="text-lg mb-6">
          Store and access your files securely and easily.
        </p>
        <Link href="/dashboard/files">
          <Button
            className="flex gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-gray-200"
            onClick={() => {}}
          >
            Get Started
            <ArrowRight />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              User-friendly interface for all your file management needs.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
            <p className="text-gray-600">
              Your files are protected with the latest security measures.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Access Anywhere</h3>
            <p className="text-gray-600">
              Access your files from any device, anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200">
          Sign Up Now
        </button>
      </section>
    </div>
  );
}
