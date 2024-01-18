import React from 'react';
import '../styles/adminhome.css';
function AdminHome() {
  return (
    <div>
      <header style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
        <h1>Admin Dashboard</h1>
      </header>

      <nav style={{ backgroundColor: '#555', color: '#fff', padding: '10px', textAlign: 'center' }}>
        <a href="#">Home</a> |
        <a href="#">Users</a> |
        <a href="#">Settings</a> |
        <a href="#">Logout</a>
      </nav>

      <section style={{ padding: '20px' }}>
        <h2>Welcome, Admin!</h2>
        <p>This is the home page of the admin dashboard. You can manage users, settings, and more.</p>
      </section>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center', position: 'fixed', bottom: '0', width: '100%' }}>
        &copy; 2024 Admin Dashboard
      </footer>
    </div>
  );
}
export default AdminHome;
