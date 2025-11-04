import React from 'react';
import { FaCheckCircle, FaUsers, FaAward, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  const features = [
    'Premium bike collection from top brands',
    'Regular maintenance and safety inspections',
    'Flexible rental periods',
    'Competitive pricing',
    '24/7 customer support',
    'Insurance coverage included'
  ];

  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: FaUsers },
    { label: 'Bikes Available', value: '500+', icon: FaAward },
    { label: 'Years of Service', value: '5+', icon: FaShieldAlt },
    { label: 'Cities Covered', value: '25+', icon: FaCheckCircle }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About BikeRental
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We're passionate about connecting cyclists with the perfect bike for their adventures.
              Since 2019, we've been making cycling accessible, affordable, and enjoyable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  BikeRental was born from a simple idea: everyone should have access to quality bikes
                  without the commitment of ownership. Our founders, avid cyclists themselves, experienced
                  the frustration of finding reliable rental options during their travels.
                </p>
                <p>
                  What started as a small operation in one city has grown into a nationwide network,
                  serving thousands of cyclists across multiple locations. We pride ourselves on our
                  commitment to quality, safety, and customer satisfaction.
                </p>
                <p>
                  Today, BikeRental offers one of the largest selections of rental bikes, from mountain
                  bikes for rugged trails to electric bikes for effortless commuting. Every bike in our
                  fleet undergoes rigorous maintenance and safety checks to ensure your riding experience
                  is safe and enjoyable.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"
                alt="Bike collection"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-blue-600 text-2xl" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600">What sets BikeRental apart from the competition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8">
            To make cycling accessible to everyone by providing high-quality, affordable bike rentals
            while promoting sustainable transportation and healthy lifestyles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
              <p className="text-blue-100">Making bikes available whenever and wherever you need them</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-blue-100">Only the best bikes and equipment for our customers</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
              <p className="text-blue-100">Promoting eco-friendly transportation options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate people behind BikeRental</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Alex Johnson</h3>
              <p className="text-gray-600 mb-2">Founder & CEO</p>
              <p className="text-sm text-gray-500">Former professional cyclist with 10+ years experience</p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Chen</h3>
              <p className="text-gray-600 mb-2">Operations Manager</p>
              <p className="text-sm text-gray-500">Ensures every bike meets our high standards</p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Rodriguez</h3>
              <p className="text-gray-600 mb-2">Customer Experience Lead</p>
              <p className="text-sm text-gray-500">Dedicated to making every rental experience exceptional</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
