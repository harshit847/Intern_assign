import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewItems() {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/viewItems')
            .then((res) => setItems(res.data.data))
            .catch((err) => console.error(err));
    }, []);

    const handleEnquire = async () => {
        try {
            await axios.post('http://localhost:5000/api/send-enquiry', {
                name: selected.name,
                type: selected.type,
                description: selected.description,
                userEmail: email,
            });
            alert("Enquiry sent!");
            setSelected(null);
            setEmail('');
        } catch (err) {
            alert("Failed to send enquiry.");
        }
    };

    return (
        <div style={{ padding: '20px',paddingLeft:"90px", fontFamily: 'sans-serif' }}>
            <h2 style={{fontSize: '3rem',
      fontWeight: '700',
      textShadow: '2px 2px #ff0050, -2px -2px #00f2ea',
      letterSpacing: '1px'}}>Items</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {items.map((item) => (
                    <div key={item._id}
                        onClick={() => setSelected(item)}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '50px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease',
                            width: '250px',
                            height: '250px',
                            textAlign: 'center'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {item.coverImage && (
                            <img
                                src={item.coverImage}
                                width="100"
                                height="100"
                                alt={item.name}
                                loading="lazy"
                                style={{ objectFit: 'cover', borderRadius: '6px' }}
                            />
                        )}
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>

            {selected && (
                <div style={{
                    position: 'fixed',
                    top: '10%',
                    left: '15%',
                    background: '#fff',
                    padding: '20px 120px',
                    border: '2px solid black',
                    borderRadius: '10px',
                    zIndex: 10,
                    width: '30%',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    animation: 'fadeIn 0.3s ease-in-out'
                }}>
                    <h3>{selected.name}</h3>
                    <p><strong>Type:</strong> {selected.type}</p>
                    <p>{selected.description}</p>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        overflowX: 'auto',
                        maxHeight: '200px'
                    }}>
                        {Array.isArray(selected.image) && selected.image.map((img, i) => (
                            <img key={i} src={img} width={200} height={150} loading="lazy" alt={`img-${i}`} />
                        ))}
                    </div>

                    <br />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '5px', width: '200px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <br /><br />
                    <button
                        onClick={handleEnquire}
                        style={{ marginRight: '10px', padding: '6px 12px', background: '#0d6efd', color: '#fff', border: 'none', borderRadius: '4px' }}
                    >
                        Enquire
                    </button>
                    <button
                        onClick={() => setSelected(null)}
                        style={{marginLeft: "50px", padding: '6px 12px', background: 'red', border: 'none', borderRadius: '4px' }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
