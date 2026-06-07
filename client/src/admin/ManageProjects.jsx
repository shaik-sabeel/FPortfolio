import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Globe, Sparkles, Loader2, AlertCircle } from 'lucide-react';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    liveLink: '',
    githubLink: '',
    featured: false,
    order: 0,
  });

  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/projects');
      if (response.data && response.data.success) {
        setProjects(response.data.data);
      }
    } catch (err) {
      console.error('Fetch projects admin error:', err);
      setError('Could not fetch projects list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      image: '',
      liveLink: '',
      githubLink: '',
      featured: false,
      order: projects.length + 1,
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      image: project.image,
      liveLink: project.liveLink || '',
      githubLink: project.githubLink || '',
      featured: project.featured || false,
      order: project.order || 0,
    });
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim() || !formData.image.trim() || !formData.technologies.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        // Edit mode
        const response = await axios.put(`/api/projects/${editingId}`, formData);
        if (response.data && response.data.success) {
          setIsOpen(false);
          fetchProjects();
        }
      } else {
        // Add mode
        const response = await axios.post('/api/projects', formData);
        if (response.data && response.data.success) {
          setIsOpen(false);
          fetchProjects();
        }
      }
    } catch (err) {
      console.error('Save project admin error:', err);
      setError(err.response?.data?.message || 'Error saving project details');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await axios.delete(`/api/projects/${id}`);
      if (response.data && response.data.success) {
        fetchProjects();
      }
    } catch (err) {
      console.error('Delete project admin error:', err);
      alert('Failed to delete project');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex justify-between items-center">
        <h2 className="text-white font-extrabold text-lg font-heading">Manage Projects</h2>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-semibold text-sm shadow-md hover:bg-primary/95 hover:scale-[1.02] transition-all"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {error && !isOpen && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Projects Table List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            {projects.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">No projects stored. Add one now!</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-xs uppercase font-bold tracking-wider border-b border-white/5">
                    <th className="p-4">Sort Order</th>
                    <th className="p-4">Image</th>
                    <th className="p-4">Project Title</th>
                    <th className="p-4">Technologies</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-[#00D4FF]">#{project.order}</td>
                      <td className="p-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-16 h-10 object-cover rounded border border-white/10"
                        />
                      </td>
                      <td className="p-4 font-semibold text-white">
                        <div>{project.title}</div>
                        {/* links shortcuts */}
                        <div className="flex gap-2.5 mt-1">
                          {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-[10px] text-slate-500 hover:text-white flex items-center gap-0.5">
                              <Globe size={8} /> Live
                            </a>
                          )}
                          {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-[10px] text-slate-500 hover:text-white flex items-center gap-0.5">
                              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                              </svg> Repo
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.technologies.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-[10px] text-slate-500 font-bold px-1">+{project.technologies.length - 4} more</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {project.featured ? (
                          <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded border border-accent/20 text-accent bg-accent/5 flex items-center gap-0.5 w-fit">
                            <Sparkles size={8} /> Yes
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">No</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(project)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#00D4FF] hover:bg-white/5 transition-colors focus:outline-none"
                            title="Edit project"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(project._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors focus:outline-none"
                            title="Delete project"
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
                {editingId ? 'Edit Project Details' : 'Create New Project'}
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
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="modal-title" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    id="modal-title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                {/* Sort Order */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="modal-order" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Order Value (sorting) *</label>
                  <input
                    type="number"
                    name="order"
                    id="modal-order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                    placeholder="1, 2, 3..."
                    required
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-col gap-2">
                <label htmlFor="modal-technologies" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Technologies *</label>
                <input
                  type="text"
                  name="technologies"
                  id="modal-technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  placeholder="React, Node.js, Socket.io, Tailwind CSS (comma-separated)"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-2">
                <label htmlFor="modal-image" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Project Image URL *</label>
                <input
                  type="text"
                  name="image"
                  id="modal-image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  placeholder="https://images.unsplash.com/..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Live Demo Link */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="modal-liveLink" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Live Demo Link</label>
                  <input
                    type="url"
                    name="liveLink"
                    id="modal-liveLink"
                    value={formData.liveLink}
                    onChange={handleInputChange}
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                    placeholder="https://example.com"
                  />
                </div>

                {/* GitHub link */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="modal-githubLink" className="text-slate-400 text-xs uppercase font-bold tracking-wider">GitHub Link</label>
                  <input
                    type="url"
                    name="githubLink"
                    id="modal-githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                    placeholder="https://github.com/sabeel/..."
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label htmlFor="modal-description" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Description *</label>
                <textarea
                  name="description"
                  id="modal-description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  placeholder="Summarize project goals, challenges overcome, and architecture details..."
                  required
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3 py-2 border-b border-white/5">
                <input
                  type="checkbox"
                  name="featured"
                  id="modal-featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded text-primary focus:ring-0 bg-white/5 border-white/5"
                />
                <label htmlFor="modal-featured" className="text-slate-300 text-sm font-semibold select-none cursor-pointer">
                  Feature this project on the homepage grid
                </label>
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
                    'Save Project'
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
