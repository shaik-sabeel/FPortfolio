import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, ExternalLink, Mail, Clock, ShieldAlert, Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Track expanded message rows
  const [expandedId, setExpandedId] = useState(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contacts');
      if (response.data && response.data.success) {
        setSubmissions(response.data.data);
      }
    } catch (err) {
      console.error('Fetch contact submissions error:', err);
      setError('Could not fetch contact submissions list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`/api/contacts/${id}`, { status: newStatus });
      if (response.data && response.data.success) {
        // Update local state without full reload
        setSubmissions((prev) =>
          prev.map((sub) => (sub._id === id ? { ...sub, status: newStatus } : sub))
        );
      }
    } catch (err) {
      console.error('Update contact status error:', err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead?')) return;

    try {
      const response = await axios.delete(`/api/contacts/${id}`);
      if (response.data && response.data.success) {
        setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
      }
    } catch (err) {
      console.error('Delete contact error:', err);
      alert('Failed to delete lead');
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex justify-between items-center">
        <h2 className="text-white font-extrabold text-lg font-heading">Leads Inbox</h2>
        <span className="text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-white/5 border border-white/5 px-3 py-1 rounded-full">
          Total Leads: {submissions.length}
        </span>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs sm:text-sm flex items-center gap-2">
          <ShieldAlert size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Submissions Table List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            {submissions.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">No client leads received yet.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-xs uppercase font-bold tracking-wider border-b border-white/5">
                    <th className="p-4">Client Contact</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Est. Budget</th>
                    <th className="p-4">Submitted Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {submissions.map((sub) => {
                    const isExpanded = expandedId === sub._id;
                    return (
                      <React.Fragment key={sub._id}>
                        {/* Summary Row */}
                        <tr className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => toggleExpand(sub._id)}>
                          <td className="p-4">
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              {sub.name}
                              {sub.status === 'pending' && (
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                              )}
                            </div>
                            <div className="text-slate-500 text-xs font-light flex items-center gap-1 mt-0.5">
                              <Mail size={10} />
                              {sub.email}
                            </div>
                          </td>
                          <td className="p-4 text-slate-300">{sub.company || 'Not Specified'}</td>
                          <td className="p-4 text-secondary font-extrabold">{sub.budget}</td>
                          <td className="p-4 text-slate-400 text-xs">
                            <div className="flex items-center gap-1">
                              <Clock size={10} />
                              {new Date(sub.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </td>
                          <td className="p-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={sub.status}
                              onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold bg-[#110d25] border focus:outline-none cursor-pointer ${
                                sub.status === 'pending'
                                  ? 'text-yellow-400 border-yellow-500/20'
                                  : sub.status === 'contacted'
                                  ? 'text-blue-400 border-blue-500/20'
                                  : 'text-slate-400 border-slate-500/20'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => toggleExpand(sub._id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
                                title={isExpanded ? 'Hide message' : 'Show message'}
                              >
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                              <button
                                onClick={() => handleDelete(sub._id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors focus:outline-none"
                                title="Delete lead"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expandable Details Message Row */}
                        {isExpanded && (
                          <tr className="bg-white/[0.02] border-b border-white/5">
                            <td colSpan={6} className="p-6">
                              <div className="border-l-2 border-primary pl-4 py-1 text-slate-300">
                                <h4 className="text-xs uppercase font-extrabold text-slate-500 mb-2 tracking-wider">
                                  Project Inquiry Details
                                </h4>
                                <p className="text-sm font-light leading-relaxed whitespace-pre-wrap select-text">
                                  {sub.message}
                                </p>
                                
                                {/* Quick Email link */}
                                <div className="mt-4 flex items-center gap-4">
                                  <a
                                    href={`mailto:${sub.email}?subject=Regarding your portfolio submission: Sabeel`}
                                    className="px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/20 transition-all flex items-center gap-1.5"
                                  >
                                    <Mail size={12} />
                                    Reply to Client
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
