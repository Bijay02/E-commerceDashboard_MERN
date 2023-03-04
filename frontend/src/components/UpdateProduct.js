import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate= useNavigate();

  useEffect(() => {
    // console.log(params);
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    // console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'Put',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        
      }
    });
    result = await result.json();
    console.log(result);
    navigate('/');
  };

  return (
    <div className="product">
      <h1>UpdateProduct</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
