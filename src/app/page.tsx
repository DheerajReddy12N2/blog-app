"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, Search, Calendar, User } from "lucide-react";

// ✅ Use env variable for backend
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/blogs";

type Blog = {
  _id: string;
  title: string;
  description: string;
  createdAt?: string | Date;
};

const BlogApp: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [viewingBlog, setViewingBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });

  // Fetch blogs from backend
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data: Blog[] = await res.json();

      const normalized: Blog[] = data.map((b: Blog) => ({
        ...b,
        createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
      }));

      normalized.sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
      );

      setBlogs(normalized);
    } catch (err) {
      console.error(err);
      alert("Could not fetch blogs. Check backend server and CORS.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date?: string | Date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  // Create or Update
  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please enter title and description");
      return;
    }

    try {
      if (editingBlog) {
        const res = await fetch(`${API_URL}/${editingBlog._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated: Blog = await res.json();
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === updated._id
              ? { ...updated, createdAt: new Date(updated.createdAt) }
              : b
          )
        );
        alert("Post updated");
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Create failed");
        const created: Blog = await res.json();
        created.createdAt = created.createdAt ? new Date(created.createdAt) : new Date();
        setBlogs((prev) => [created, ...prev]);
        alert("Post created");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving post. Check console for details.");
    } finally {
      setFormData({ title: "", description: "" });
      setEditingBlog(null);
      setShowForm(false);
    }
  };

  // Edit
  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, description: blog.description });
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      alert("Post deleted");
    } catch (err) {
      console.error(err);
      alert("Error deleting post.");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setEditingBlog(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogSpace
            </h1>
          </div>
          <button
            onClick={() => {
              setEditingBlog(null);
              setFormData({ title: "", description: "" });
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            <span>New Post</span>
          </button>
        </div>
      </header>

      {/* The rest of your UI (search, modals, grid) remains same, just type Blog[] and Blog | null where needed */}
      {/* All map callbacks typed as (blog: Blog) => ... */}
    </div>
  );
};

export default BlogApp;
