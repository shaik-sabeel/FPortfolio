import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Star, Loader2, AlertCircle } from 'lucide-react';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    feedback: '',
    image: '',
    rating: 5,
  });

  const [saving, setSaving] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/testimonials');
      if (response.data && response.data.success) {
        setTestimonials(response.data.data);
      }
    } catch (err) {
      console.error('Fetch testimonials admin error:', err);
      setError('Could not fetch testimonials list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      company: '',
      feedback: '',
      image: '',
      rating: 5,
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setFormData({
      name: testimonial.name,
      company: testimonial.company,
      feedback: testimonial.feedback,
      image: testimonial.image || '',
      rating: testimonial.rating || 5,
    });
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.company.trim() || !formData.feedback.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        // Edit mode
        const response = await axios.put(`/api/testimonials/${editingId}`, formData);
        if (response.data && response.data.success) {
          setIsOpen(false);
          fetchTestimonials();
        }
      } else {
        // Add mode
        const response = await axios.post('/api/testimonials', formData);
        if (response.data && response.data.success) {
          setIsOpen(false);
          fetchTestimonials();
        }
      }
    } catch (err) {
      console.error('Save testimonial admin error:', err);
      setError(err.response?.data?.message || 'Error saving testimonial details');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const response = await axios.delete(`/api/testimonials/${id}`);
      if (response.data && response.data.success) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error('Delete testimonial admin error:', err);
      alert('Failed to delete testimonial');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex justify-between items-center">
        <h2 className="text-white font-extrabold text-lg font-heading">Manage Testimonials</h2>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-semibold text-sm shadow-md hover:bg-primary/95 hover:scale-[1.02] transition-all"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {error && !isOpen && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Testimonials Table List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            {testimonials.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">No testimonials stored. Add one now!</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-xs uppercase font-bold tracking-wider border-b border-white/5">
                    <th className="p-4">Client</th>
                    <th className="p-4">Company/Role</th>
                    <th className="p-4">Feedback Quote</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {testimonials.map((test) => (
                    <tr key={test._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-white flex items-center gap-3">
                        <img
                          src={test.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                          alt={test.name}
                          className="w-8 h-8 object-cover rounded-full border border-white/10"
                        />
                        <span>{test.name}</span>
                      </td>
                      <td className="p-4 text-slate-300">{test.company}</td>
                      <td className="p-4 text-slate-400 font-light max-w-sm truncate">{test.feedback}</td>
                      <td className="p-4">
                        <div className="flex gap-0.5 text-yellow-400">
                          {[...Array(test.rating || 5)].map((_, i) => (
                            <Star key={i} size={12} className="fill-current" />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(test)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#00D4FF] hover:bg-white/5 transition-colors focus:outline-none"
                            title="Edit testimonial"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(test._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors focus:outline-none"
                            title="Delete testimonial"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Modal Add/Edit Form */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl glass-card rounded-3xl border border-white/5 overflow-hidden shadow-card animate-scale-up">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0d092c]">
              <h3 className="text-white font-extrabold text-lg font-heading">
                {editingId ? 'Edit Testimonial Details' : 'Create New Testimonial'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 max-h-[75vh] overflow-y-auto bg-[#050816]">
              {error && (
                <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Client Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="modal-name" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Client Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="modal-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                    placeholder="E.g. Sarah Jenkins"
                    required
                  />
                </div>

                {/* Company/Role */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="modal-company" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Company / Role *</label>
                  <input
                    type="text"
                    name="company"
                    id="modal-company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                    placeholder="E.g. CEO at TechVibe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Avatar Image URL */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="modal-image" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Client Avatar URL</label>
                  <input
                    type="text"
                    name="image"
                    id="modal-image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                {/* Rating selection */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="modal-rating" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Rating (Stars) *</label>
                  <select
                    name="rating"
                    id="modal-rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="bg-[#110d25] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>

              {/* Feedback text */}
              <div className="flex flex-col gap-2">
                <label htmlFor="modal-feedback" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Feedback Comment *</label>
                <textarea
                  name="feedback"
                  id="modal-feedback"
                  rows={4}
                  value={formData.feedback}
                  onChange={handleInputChange}
                  className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  placeholder="Insert customer recommendation quote..."
                  required
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 mt-4 border-t border-white/5 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white transition-all text-xs uppercase font-bold"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/95 transition-all text-xs uppercase font-bold flex items-center gap-1.5 shadow-md"
                >
                  {saving ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    'Save Testimonial'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
