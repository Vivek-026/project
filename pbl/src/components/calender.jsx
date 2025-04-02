import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { CalendarDays, FileText } from 'lucide-react';
import pdfFile from "../assets/academic-calender.pdf"; // Update with actual PDF path

function Calendar() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
            
            {/* Heading and Description */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-purple-800 flex items-center justify-center gap-4">
                    <CalendarDays className="text-purple-600" size={40} />
                    Academic Calendar
                </h1>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Stay updated with important academic dates, events, and deadlines.  
                    View and download the official calendar to plan your semester effectively.
                </p>
            </div>

            {/* PDF Viewer */}
            <div className="w-3/4 h-[80vh] border border-gray-300 shadow-lg bg-white p-4 rounded-lg">
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfFile} />
                </Worker>
            </div>

            {/* Download Button */}
            <div className="mt-6">
                <a 
                    href={pdfFile} 
                    download 
                    className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
                >
                    <FileText size={20} />
                    Download Calendar
                </a>
            </div>
        </div>
    );
}

export default Calendar;
