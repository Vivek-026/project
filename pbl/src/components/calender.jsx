import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { CalendarDays, FileText } from 'lucide-react';
import pdfFile from "../assets/academic-calender1.pdf";

function Calendar() {
  return (
    //min-h-screen bg-gray-50 md:ml-64
    <div className="flex flex-col items-center min-h-screen bg-gray-50 md:ml-64 p-4 lg:p-8 transition-all duration-300 ease-in-out">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <CalendarDays className="text-purple-600 w-8 h-8 md:w-10 md:h-10" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-800 tracking-tight">
              Academic Calendar
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto px-4 text-sm md:text-base lg:text-lg">
            Stay updated with important academic dates, events, and deadlines. 
            View and download the official calendar to plan your semester effectively.
          </p>
        </div>

        {/* PDF Viewer Container */}
        <div className="relative w-full bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 opacity-50"></div>
          <div className="relative h-[60vh] md:h-[70vh] lg:h-[75vh] p-3 md:p-5">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer 
                fileUrl={pdfFile}
                className="h-full rounded-lg overflow-hidden"
              />
            </Worker>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6 md:mt-8 flex justify-center">
          <a 
            href={pdfFile} 
            download 
            className="group flex items-center gap-3 px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <FileText className="w-5 h-5 group-hover:animate-pulse" />
            <span className="font-medium">Download Calendar</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Calendar;