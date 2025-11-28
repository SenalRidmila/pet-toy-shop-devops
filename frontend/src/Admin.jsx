import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, image: base64 });
    } catch (error) {
      console.error("Error converting image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/products/${editId}`, formData);
        alert("Product Updated!");
        setIsEditing(false);
      } else {
        await axios.post('http://localhost:8080/api/products', formData);
        alert("Product Added!");
      }
      setFormData({ name: '', price: '', image: '' }); 
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Check console.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setFormData({ name: product.name, price: product.price, image: product.image });
    setIsEditing(true);
    setEditId(product.id);
  };

  return (
    <div className="admin-container">
      <h2>🛠️ Admin Panel - Manage Products</h2>

      <div className="form-box">
        <h3>{isEditing ? 'Update Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" placeholder="Product Name" required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="number" placeholder="Price (Rs.)" required
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
          
          {/* File Input */}
          <div style={{margin: '10px 0'}}>
            <label>Upload Image: </label>
            <input 
              type="file" 
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />
          </div>

          {}
          {formData.image && (
             <img src={formData.image} alt="Preview" style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px'}} />
          )}

          <br/>
          <button type="submit" className={isEditing ? "update-btn" : "add-btn"}>
            {isEditing ? 'Update Item' : 'Add Item'}
          </button>
          
          {isEditing && (
             <button type="button" onClick={() => {setIsEditing(false); setFormData({name:'', price:'', image:''})}} className="cancel-btn">
               Cancel
             </button>
          )}
        </form>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                {}
                {p.image ? (
                   <img src={p.image} alt="product" className="table-img"/>
                ) : (
                   <span>No Image</span>
                )}
              </td>
              <td>{p.name}</td>
              <td>Rs. {p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)} className="edit-btn">Edit ✏️</button>
                <button onClick={() => handleDelete(p.id)} className="del-btn">Delete 🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;