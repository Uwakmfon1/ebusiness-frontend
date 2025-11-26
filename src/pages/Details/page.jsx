import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { set } from "zod";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        const data = await res.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    // setLoading(true);
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>No product found</p>;
  
  return (
    <div className="w-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Product Details Page
      </h1>

      <div>        
        <div className="w-full grid grid-cols-2 overflow-hidden">
          <img
            src={product.data.image_url}
            alt={product.data.name}
            className="w-full h-full object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {product.data.name}
            </h2>
            <p className="text-gray-500 text-sm mt-2">{product.data.description}</p>

            {product.data.price && (
              <p className="text-lg font-bold text-indigo-600 mt-4">
                ₦{Number(product.data.price).toLocaleString()}
              </p>
            )}

            <button className="bg-brown-500 w-full"><a href="#">Add to Cart</a></button>
          </div>
        </div>
      </div>
    </div>
  );
}
