'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '../../components/Navbar';

export default function JobDetail() {
    const router = useRouter();
    const params = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (params.id) {
            fetchJob();
        }
    }, [params.id]);

    const fetchJob = async() => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`);
            setJob(response.data);
            setError(null);
        } catch (err) {
            setError('Job not found or failed to load');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async(newStatus) => {
        setUpdating(true);
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`, {
                status: newStatus
            });
            setJob(response.data);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async() => {
        if (confirm('Are you sure you want to delete this job request?')) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`);
                router.push('/');
            } catch (error) {
                console.error('Error deleting job:', error);
                alert('Failed to delete job');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open':
                return 'bg-green-100 text-green-800';
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'Closed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading job details...</p>
            </div>
            </>
        );
    }

    if (error || !job) {
        return (
            <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error || 'Job not found'}
            </div>
            </div>
            </>
        );
    }

    return (
        <>
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
        <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(job.status)}`}>
            {job.status}
        </span>
        </div>

        <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
        <p className="text-gray-600">{job.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
        <h3 className="text-sm font-medium text-gray-500">Category</h3>
        <p className="text-gray-800">{job.category}</p>
        </div>
        <div>
        <h3 className="text-sm font-medium text-gray-500">Location</h3>
        <p className="text-gray-800">{job.location}</p>
        </div>
        <div>
        <h3 className="text-sm font-medium text-gray-500">Contact Name</h3>
        <p className="text-gray-800">{job.contactName}</p>
        </div>
        <div>
        <h3 className="text-sm font-medium text-gray-500">Contact Email</h3>
        <p className="text-gray-800">{job.contactEmail}</p>
        </div>
        <div>
        <h3 className="text-sm font-medium text-gray-500">Created</h3>
        <p className="text-gray-800">{new Date(job.createdAt).toLocaleString()}</p>
        </div>
        </div>

        <div className="border-t pt-6">
        <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Update Status</label>
        <select 
            value={job.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updating}
            className="input-field max-w-xs"
        >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
        </select>
        {updating && <p className="text-sm text-gray-500 mt-1">Updating...</p>}
        </div>

        <div className="flex gap-3">
        <button
            onClick={() => router.push('/')}
            className="btn-secondary"
        >
            Back to Home
        </button>
        <button
            onClick={handleDelete}
            className="btn-danger"
        >
            Delete Job
        </button>
        </div>
        </div>
        </div>
        </main>
        </>
        );
    }