// "use client"
// import React, { useState, useEffect } from 'react';
// import { Plus, Edit2, Trash2, Eye, Search, Calendar, User } from 'lucide-react';

// const BlogApp = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingBlog, setEditingBlog] = useState(null);
//   const [viewingBlog, setViewingBlog] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     title: '',
//     description: ''
//   });

//   // Sample data to start with
//   useEffect(() => {
//     const sampleBlogs = [
//       {
//         _id: '1',
//         title: 'Getting Started with React Hooks',
//         description: 'React Hooks revolutionized how we write React components. In this comprehensive guide, we\'ll explore useState, useEffect, and custom hooks to help you build more efficient and maintainable React applications.',
//         createdAt: new Date('2024-08-15')
//       },
//       {
//         _id: '2',
//         title: 'Building Scalable Node.js APIs',
//         description: 'Learn best practices for creating robust and scalable REST APIs using Node.js, Express, and MongoDB. We\'ll cover authentication, error handling, data validation, and performance optimization techniques.',
//         createdAt: new Date('2024-08-20')
//       },
//       {
//         _id: '3',
//         title: 'Modern CSS Grid Layouts',
//         description: 'CSS Grid has transformed web layout design. Discover how to create complex, responsive layouts with ease using Grid properties, template areas, and advanced positioning techniques.',
//         createdAt: new Date('2024-08-25')
//       }
//     ];
//     setBlogs(sampleBlogs);
//   }, []);

//   const filteredBlogs = blogs.filter(blog =>
//     blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     blog.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSubmit = () => {
//     if (!formData.title.trim() || !formData.description.trim()) return;

//     if (editingBlog) {
//       setBlogs(blogs.map(blog =>
//         blog._id === editingBlog._id
//           ? { ...blog, ...formData }
//           : blog
//       ));
//       setEditingBlog(null);
//     } else {
//       const newBlog = {
//         _id: Date.now().toString(),
//         ...formData,
//         createdAt: new Date()
//       };
//       setBlogs([newBlog, ...blogs]);
//     }

//     setFormData({ title: '', description: '' });
//     setShowForm(false);
//   };

//   const handleEdit = (blog) => {
//     setEditingBlog(blog);
//     setFormData({ title: blog.title, description: blog.description });
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this blog post?')) {
//       setBlogs(blogs.filter(blog => blog._id !== id));
//     }
//   };

//   const resetForm = () => {
//     setFormData({ title: '', description: '' });
//     setEditingBlog(null);
//     setShowForm(false);
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <header className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">B</span>
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 BlogSpace
//               </h1>
//             </div>
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//             >
//               <Plus size={20} />
//               <span>New Post</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-6xl mx-auto px-6 py-8">
//         {/* Search Bar */}
//         <div className="mb-8">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search blog posts..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
//             />
//           </div>
//         </div>

//         {/* Blog Form Modal */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
//                 </h2>
//               </div>
//               <div className="p-6 space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     placeholder="Enter blog title..."
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description *
//                   </label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     rows={8}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
//                     placeholder="Write your blog content here..."
//                     required
//                   />
//                 </div>
//                 <div className="flex space-x-4 pt-4">
//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                   >
//                     {editingBlog ? 'Update Post' : 'Create Post'}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Blog Detail Modal */}
//         {viewingBlog && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1 pr-4">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-3">
//                       {viewingBlog.title}
//                     </h1>
//                     <div className="flex items-center space-x-4 text-sm text-gray-500">
//                       <div className="flex items-center space-x-1">
//                         <Calendar size={16} />
//                         <span>{formatDate(viewingBlog.createdAt)}</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <User size={16} />
//                         <span>Admin</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setViewingBlog(null)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl"
//                   >
//                     ×
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="prose max-w-none text-gray-700 leading-relaxed">
//                   {viewingBlog.description.split('\n').map((paragraph, index) => (
//                     <p key={index} className="mb-4 last:mb-0">
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Blog Grid */}
//         {filteredBlogs.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search size={32} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">
//               {searchTerm ? 'No posts found' : 'No blog posts yet'}
//             </h3>
//             <p className="text-gray-500 mb-6">
//               {searchTerm ? 'Try adjusting your search terms' : 'Create your first blog post to get started'}
//             </p>
//             {!searchTerm && (
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 Create First Post
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredBlogs.map((blog) => (
//               <div
//                 key={blog._id}
//                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1 pr-2 group-hover:text-blue-600 transition-colors duration-200">
//                       {blog.title}
//                     </h3>
//                   </div>
                  
//                   <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
//                     <Calendar size={14} />
//                     <span>{formatDate(blog.createdAt)}</span>
//                   </div>

//                   <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
//                     {blog.description.length > 150
//                       ? blog.description.substring(0, 150) + '...'
//                       : blog.description
//                     }
//                   </p>

//                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                     <button
//                       onClick={() => setViewingBlog(blog)}
//                       className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
//                     >
//                       <Eye size={16} />
//                       <span>Read More</span>
//                     </button>
                    
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => handleEdit(blog)}
//                         className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
//                         title="Edit post"
//                       >
//                         <Edit2 size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(blog._id)}
//                         className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                         title="Delete post"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Stats Footer */}
//         <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//             <div className="space-y-2">
//               <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 {blogs.length}
//               </div>
//               <div className="text-gray-600 font-medium">Total Posts</div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//                 {filteredBlogs.length}
//               </div>
//               <div className="text-gray-600 font-medium">Showing</div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 {blogs.reduce((acc, blog) => acc + blog.description.split(' ').length, 0)}
//               </div>
//               <div className="text-gray-600 font-medium">Total Words</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogApp;
"use client"
// import React, { useState, useEffect } from "react";
// import { Plus, Edit2, Trash2, Eye, Search, Calendar, User } from "lucide-react";

// /**
//  * BlogApp - full single-page frontend component that connects to your NestJS backend.
//  * - Expects backend endpoints:
//  *    GET    /blogs           -> returns array of blogs
//  *    POST   /blogs           -> create blog (body: { title, description })
//  *    PUT    /blogs/:id       -> update blog
//  *    DELETE /blogs/:id       -> delete blog
//  *
//  * Adjust API_URL if your backend is running elsewhere.
//  */

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/blogs";

// const BlogApp = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingBlog, setEditingBlog] = useState(null);
//   const [viewingBlog, setViewingBlog] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({ title: "", description: "" });

//   // Fetch blogs from backend
//   useEffect(() => {
//     fetchBlogs();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const fetchBlogs = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(API_URL);
//       if (!res.ok) throw new Error("Failed to fetch blogs");
//       const data = await res.json();
//       // Ensure createdAt is Date object for formatting
//       const normalized = data.map((b) => ({ ...b, createdAt: b.createdAt ? new Date(b.createdAt) : new Date() }));
//       // Sort newest first
//       normalized.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setBlogs(normalized);
//     } catch (err) {
//       console.error(err);
//       alert("Could not fetch blogs. Check backend server and CORS.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredBlogs = blogs.filter(
//     (blog) =>
//       blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       blog.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

//   // Create or Update
//   const handleSubmit = async () => {
//     if (!formData.title.trim() || !formData.description.trim()) {
//       alert("Please enter title and description");
//       return;
//     }

//     try {
//       if (editingBlog) {
//         // Update
//         const res = await fetch(`${API_URL}/${editingBlog._id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         });
//         if (!res.ok) throw new Error("Update failed");
//         const updated = await res.json();
//         setBlogs((prev) => prev.map((b) => (b._id === updated._id ? { ...updated, createdAt: new Date(updated.createdAt) } : b)));
//         alert("Post updated");
//       } else {
//         // Create
//         const res = await fetch(API_URL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         });
//         if (!res.ok) throw new Error("Create failed");
//         const created = await res.json();
//         // normalize createdAt
//         created.createdAt = created.createdAt ? new Date(created.createdAt) : new Date();
//         setBlogs((prev) => [created, ...prev]);
//         alert("Post created");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error saving post. Check console for details.");
//     } finally {
//       setFormData({ title: "", description: "" });
//       setEditingBlog(null);
//       setShowForm(false);
//     }
//   };

//   // Edit flow
//   const handleEdit = (blog) => {
//     setEditingBlog(blog);
//     setFormData({ title: blog.title || "", description: blog.description || "" });
//     setShowForm(true);
//   };

//   // Delete flow
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this blog post?")) return;
//     try {
//       const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       setBlogs((prev) => prev.filter((b) => b._id !== id));
//       alert("Post deleted");
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting post.");
//     }
//   };

//   const resetForm = () => {
//     setFormData({ title: "", description: "" });
//     setEditingBlog(null);
//     setShowForm(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <header className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">B</span>
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 BlogSpace
//               </h1>
//             </div>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => {
//                   setEditingBlog(null);
//                   setFormData({ title: "", description: "" });
//                   setShowForm(true);
//                 }}
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 <Plus size={18} />
//                 <span>New Post</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-6xl mx-auto px-6 py-8">
//         {/* Search Bar */}
//         <div className="mb-8">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search blog posts..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
//             />
//           </div>
//         </div>

//         {/* Blog Form Modal */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <h2 className="text-2xl font-bold text-gray-800">{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</h2>
//               </div>
//               <div className="p-6 space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     placeholder="Enter blog title..."
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     rows={8}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
//                     placeholder="Write your blog content here..."
//                     required
//                   />
//                 </div>
//                 <div className="flex space-x-4 pt-4">
//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                   >
//                     {editingBlog ? "Update Post" : "Create Post"}
//                   </button>
//                   <button type="button" onClick={resetForm} className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium">
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Blog Detail Modal */}
//         {viewingBlog && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1 pr-4">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-3">{viewingBlog.title}</h1>
//                     <div className="flex items-center space-x-4 text-sm text-gray-500">
//                       <div className="flex items-center space-x-1">
//                         <Calendar size={16} />
//                         <span>{formatDate(viewingBlog.createdAt)}</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <User size={16} />
//                         <span>Admin</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button onClick={() => setViewingBlog(null)} className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl">
//                     ×
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="prose max-w-none text-gray-700 leading-relaxed">
//                   {viewingBlog.description.split("\n").map((paragraph, index) => (
//                     <p key={index} className="mb-4 last:mb-0">
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Blog Grid / Empty state */}
//         {loading ? (
//           <div className="text-center py-16">
//             <div className="loader mx-auto mb-4">Loading...</div>
//           </div>
//         ) : filteredBlogs.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search size={32} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">{searchTerm ? "No posts found" : "No blog posts yet"}</h3>
//             <p className="text-gray-500 mb-6">{searchTerm ? "Try adjusting your search terms" : "Create your first blog post to get started"}</p>
//             {!searchTerm && (
//               <button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
//                 Create First Post
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredBlogs.map((blog) => (
//               <div key={blog._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group">
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1 pr-2 group-hover:text-blue-600 transition-colors duration-200">{blog.title}</h3>
//                   </div>

//                   <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
//                     <Calendar size={14} />
//                     <span>{formatDate(blog.createdAt)}</span>
//                   </div>

//                   <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
//                     {blog.description.length > 150 ? blog.description.substring(0, 150) + "..." : blog.description}
//                   </p>

//                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                     <button onClick={() => setViewingBlog(blog)} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium">
//                       <Eye size={16} />
//                       <span>Read More</span>
//                     </button>

//                     <div className="flex items-center space-x-2">
//                       <button onClick={() => handleEdit(blog)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200" title="Edit post">
//                         <Edit2 size={16} />
//                       </button>
//                       <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200" title="Delete post">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Stats Footer */}
//         <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//             <div className="space-y-2">
//               <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{blogs.length}</div>
//               <div className="text-gray-600 font-medium">Total Posts</div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{filteredBlogs.length}</div>
//               <div className="text-gray-600 font-medium">Showing</div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{blogs.reduce((acc, blog) => acc + (blog.description ? blog.description.split(" ").length : 0), 0)}</div>
//               <div className="text-gray-600 font-medium">Total Words</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogApp;
"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, Search, Calendar, User } from "lucide-react";

// ✅ Use env variable for backend
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/blogs";

const BlogApp = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
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
      const data = await res.json();
      const normalized = data.map((b) => ({
        ...b,
        createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
      }));
      normalized.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBlogs(normalized.reverse());
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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Create or Update
  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please enter title and description");
      return;
    }

    try {
      if (editingBlog) {
        // Update
        const res = await fetch(`${API_URL}/${editingBlog._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === updated._id
              ? { ...updated, createdAt: new Date(updated.createdAt) }
              : b
          )
        );
        alert("Post updated");
      } else {
        // Create
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Create failed");
        const created = await res.json();
        created.createdAt = created.createdAt
          ? new Date(created.createdAt)
          : new Date();
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
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title || "", description: blog.description || "" });
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;
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
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Blog Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter blog title..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Write your blog content here..."
                    required
                  />
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {editingBlog ? "Update Post" : "Create Post"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog List */}
        {loading ? (
          <div className="text-center py-16">
            <p>Loading...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No blog posts yet
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Calendar size={14} />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.description.length > 150
                      ? blog.description.substring(0, 150) + "..."
                      : blog.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setViewingBlog(blog)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                    >
                      <Eye size={16} />
                      <span>Read More</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{blogs.length}</div>
              <div className="text-gray-600 font-medium">Total Posts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {filteredBlogs.length}
              </div>
              <div className="text-gray-600 font-medium">Showing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {blogs.reduce(
                  (acc, blog) =>
                    acc + (blog.description ? blog.description.split(" ").length : 0),
                  0
                )}
              </div>
              <div className="text-gray-600 font-medium">Total Words</div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Detail Modal */}
      {viewingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    {viewingBlog.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{formatDate(viewingBlog.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>Admin</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setViewingBlog(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              {viewingBlog.description.split("\n").map((para, i) => (
                <p key={i} className="mb-4">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogApp;

