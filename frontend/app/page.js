'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './components/JobCard';
import JobFilter from './components/JobFilter';
import Navbar from './components/Navbar';

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ category: '', status: '' });

    useEffect(() => {
        fetchJobs();
    }, [filters]);

    const fetchJobs = async() => {
        try {
            setLoading(true);
            const params = {};
            if (filters.category) params.category = filters.category;
            if (filters.status) params.status = filters.status;

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, { params });
            setJobs(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load jobs. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Service Requests</h1>

                <JobFilter 
                    filters={filters}
                    onFilterChange={setFilters}
                />

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600">Loading jobs...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {!loading && !error && jobs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No jobs found matching your criteria.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map(job => (
                        <JobCard 
                            key={job._id}
                            job={job}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}