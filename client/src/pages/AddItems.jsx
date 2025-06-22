import { useState } from "react";
import axios from "axios";

export default function AddItem() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: null,
    images: [],
  });

  const handleCoverImage = (e) => {
    setForm((prev) => ({ ...prev, coverImage: e.target.files[0] }));
  };

  const handleImages = (e) => {
    setForm((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, type, description, coverImage, images } = form;
    if (!name || !type || !description || !coverImage || images.length === 0) {
      return alert("All fields required");
    }

    const data = new FormData();
    data.append("name", name);
    data.append("type", type);
    data.append("description", description);
    data.append("coverImage", coverImage);
    images.forEach((img) => data.append("images", img));

    const API = import.meta.env.VITE_API_URL;

    try {
      await axios.post(`${API}/api/items", data`);
      alert("Added");
      setForm({ name: "", type: "", description: "", coverImage: null, images: [] });
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><br />
      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option value="">Type</option>
        <option value="Shirt">Shirt</option>
        <option value="Tshirt">Tshirt</option>
        <option value="Pant">Pant</option>
        <option value="Bags">Bags</option>
      </select><br />
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /><br />
      <input type="file" onChange={handleCoverImage} /><br />
      <input type="file" multiple onChange={handleImages} /><br />
      <button type="submit">Add Item</button>
    </form>
  );
}
