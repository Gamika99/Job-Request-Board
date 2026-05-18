'use client';

export default function JobFilter({ filters, onFilterChange }) {
    const categories = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];
    const statuses = ['All', 'Open', 'In Progress', 'Closed'];

    const handleChange = (type, value) => {
        onFilterChange({
            ...filters,
            [type]: value === 'All' ? '' : value
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        className="input-field"
                        value={filters.category || 'All'}
                        onChange={(e) => handleChange('category', e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                        className="input-field"
                        value={filters.status || 'All'}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}