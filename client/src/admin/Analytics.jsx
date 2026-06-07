import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Database, Inbox, DollarSign, MessageSquare, Clock, AlertCircle } from 'lucide-react';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/analytics');
        if (response.data && response.data.success) {
          setData(response.data.data);
        } else {
          setError('Failed to fetch analytics statistics');
        }
      } catch (err) {
        console.error('Analytics load error:', err);
        setError(err.response?.data?.message || 'Error connecting to database analytics server');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 flex items-center gap-3">
        <AlertCircle size={20} />
        <span>{error}</span>
      </div>
    );
  }

  const { totals, leads, pipeline, recentSubmissions } = data;

  const kpis = [
    { label: 'Total Projects', value: totals.projects, icon: Database, color: '#915EFF' },
    { label: 'Leads Received', value: totals.submissions, icon: Inbox, color: '#00D4FF' },
    { label: 'Testimonials', value: totals.testimonials, icon: MessageSquare, color: '#F59E0B' },
    {
      label: 'Pipeline Value',
      value: `$${pipeline.estimatedValue.toLocaleString()}`,
      icon: DollarSign,
      color: '#10b981',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between"
            >
              <div>
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{kpi.label}</span>
                <h3 className="text-white font-extrabold text-2xl font-heading mt-1">{kpi.value}</h3>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex justify-center items-center"
                style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}
              >
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead status breakdown & summary info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead status split */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
          <h3 className="text-white font-extrabold text-base font-heading mb-6">Leads Breakdown</h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
              <span className="text-yellow-400 font-semibold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> Pending
              </span>
              <span className="text-white font-bold">{leads.pending}</span>
            </div>

            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
              <span className="text-blue-400 font-semibold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Contacted
              </span>
              <span className="text-white font-bold">{leads.contacted}</span>
            </div>

            <div className="flex justify-between items-center text-sm pb-2">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Archived
              </span>
              <span className="text-white font-bold">{leads.archived}</span>
            </div>
          </div>
        </div>

        {/* pipeline notes */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
          <h4 className="text-white font-extrabold text-lg font-heading mb-2">💰 Project Budget Forecast</h4>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            The pipeline valuation translates estimated customer submission budgets into actual dollars. Currently, Sabeel has a potential pipeline of{' '}
            <strong className="text-green-400">${pipeline.estimatedValue.toLocaleString()}</strong> in negotiation. Protect and review leads promptly to secure contracts!
          </p>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-white font-extrabold text-base font-heading">Recent Leads</h3>
          <span className="text-slate-400 text-xs flex items-center gap-1">
            <Clock size={12} /> Last 5 entries
          </span>
        </div>

        <div className="overflow-x-auto">
          {recentSubmissions.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">No submissions received yet.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase font-bold tracking-wider border-b border-white/5">
                  <th className="p-4">Client</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Est. Budget</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {recentSubmissions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-white">
                      <div>{sub.name}</div>
                      <div className="text-slate-500 text-xs font-light">{sub.email}</div>
                    </td>
                    <td className="p-4 text-slate-300">{sub.company || 'Not Specified'}</td>
                    <td className="p-4 text-secondary font-bold">{sub.budget}</td>
                    <td className="p-4 text-slate-400 text-xs">
                      {new Date(sub.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sub.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            : sub.status === 'contacted'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
