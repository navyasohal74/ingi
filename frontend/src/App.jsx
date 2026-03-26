import { useState, useEffect } from 'react';
import axios from 'axios';

// 🚨 CRITICAL: Change this URL to your live Render.com URL before deploying to Vercel!
// Example: const API_URL = 'https://your-backend-name.onrender.com/api/contacts';
// const API_URL = 'http://localhost:5000/api/contacts';
const API_URL = 'https://ingi.onrender.com';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Human-like generic change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', email: '', phone: '' }); // Clear form
      fetchContacts(); // Refresh list
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>Contact Manager</h1>
      
      {/* Humanized Form Layout */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', marginBottom: '40px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h2 style={{ marginTop: '0', fontSize: '1.2rem', color: '#444' }}>Add New Contact</h2>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>Full Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>Email Address:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>Phone Number:</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <button type="submit" style={{ padding: '12px 15px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold', fontSize: '14px' }}>
          Save Contact
        </button>
      </form>

      {/* Modern Card Grid UI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {contacts.length === 0 ? (
          <p style={{ color: '#666' }}>No contacts found. Add one above!</p>
        ) : (
          contacts.map(contact => (
            <div key={contact._id} style={{ 
              border: '1px solid #eaeaea', 
              borderRadius: '8px', 
              padding: '20px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.04)',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#222' }}>{contact.name}</h3>
                <p style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>📧 {contact.email}</p>
                <p style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>📱 {contact.phone}</p>
                {/* Status badge - defaults to Lead if you implemented the extra schema field */}
                <span style={{ display: 'inline-block', padding: '4px 10px', backgroundColor: '#e8f4fd', color: '#0d6efd', borderRadius: '20px', fontSize: '12px', marginTop: '10px', fontWeight: '600' }}>
                  {contact.status || 'Lead'}
                </span>
              </div>
              <button onClick={() => handleDelete(contact._id)} style={{ display: 'block', marginTop: '20px', padding: '8px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: '500' }}>
                Delete Contact
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;