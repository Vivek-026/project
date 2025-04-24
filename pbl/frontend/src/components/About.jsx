import React from 'react';
import { Code2, Users, Sparkles, GitBranch } from 'lucide-react';
import KaustubhImg from '../assets/kaustubh.jpg';
import vivekImg from '../assets/vivek.jpg';
import siddhiImg from '../assets/siddhi.jpg';
import dishaImg from '../assets/disha.png';

const teamMembers = [
  {
    name: 'Kaustubh',
    role: 'FullStack Developer',
    img: KaustubhImg,
    skills: ['Node.js', 'Express', 'React', 'Mongo'],
    contribution: 'Built RESTful API and implemented database schema',
  },
  {
    name: 'Vivek',
    role: 'FullStack Developer',
    img: vivekImg,
    skills: ['Node.js', 'Express', 'React', 'Mongo'],
    contribution: 'Built RESTful API and implemented database schema',
  },
  {
    name: 'Siddhi',
    role: 'UI/UX Developer',
    img: siddhiImg,
    skills: ['Figma', 'Mongo'],
    contribution: 'Made Beautiful Design for Website',
  },
  {
    name: 'Disha',
    role: 'UI/UX Developer',
    img: dishaImg,
    skills: ['Figma', 'Mongo'],
    contribution: 'Made Beautiful Design for Website',
  },
];

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Club Management',
    description: 'Efficiently manage club memberships and activities',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Event Planning',
    description: 'Organize and track college events seamlessly',
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Modern Stack',
    description: 'Built with cutting-edge MERN technologies',
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: 'Open Source',
    description: 'Collaborative development and transparency',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">
            About ClubConnect
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empowering college communities through seamless club management and event organization
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-purple-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* About Description */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              ClubConnect is a comprehensive platform designed to streamline the management of college clubs and events.
              Whether you're a student looking to explore different clubs or an admin managing registrations and events,
              ClubConnect brings everything under one roof.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This project was built with ❤️ using the MERN stack. It provides features like
              user authentication, club following, event registrations, admin tools, and more.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Thank you for being a part of this journey. Let's build an engaged and vibrant student community together!
            </p>
          </div>
        </div>

        {/* Team Section */}
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={member.img}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Contribution</h4>
                    <p className="text-gray-600 text-sm">{member.contribution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-600">&copy; 2025 ClubConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default About;