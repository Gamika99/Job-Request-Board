'use client';
import Link from 'next/link';

export default function JobCard({ job }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Open':
                return 'bg-green-100 text-green-800';
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'Closed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-00 text-gray-800';
        }
    };

    return (
        <div className="card">
            <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                </span>
            </div>
            <p className="text-gray-600 mb-3">{job.description.substring(0, 150)}...</p>
            <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-500">📍{job.location}</p>
                <p className="text-sm text-gray-500">🔧{job.category}</p>
                <p className="text-sm text-gray-500">📅{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
            <Link
                href={`/jobs/${job._id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                View Details
            </Link>
        </div>
    );
}