import { Routes, Route, Link } from 'react-router-dom';
import AddItem from './pages/AddItems';
import ViewItems from './pages/ViewItems';

function App() {
  return (
    <div>
      <nav
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '20px',
          backgroundColor: '#f0f4f8',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          fontWeight: '500',
          fontSize: '16px'
        }}
      >
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>View Items</Link>
        <Link to="/add" style={{ color: '#2563eb', textDecoration: 'none' }}>Add Item</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </div>
  );
}

export default App;
