// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { set } from "zod";
// import { CartContext, useCart } from "../context/CartContext";

// export default function Details() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { addToCart, removeFromCart } = useContext(CartContext);
  

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`http://localhost:8000/api/products/${id}`);
//         const data = await res.json();
//         setProduct(data);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (!product) return <p>No product found</p>;
  
//   return (
//     <div className="w-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//         Product Details Page
//       </h1>

//       <div>        
//         <div className="w-full grid grid-cols-2 overflow-hidden">
//           <img
//             src={product.data.image_url}
//             alt={product.data.name}
//             className="w-full h-full object-cover"
//           />
//           <div className="p-4">
//             <h2 className="text-xl font-semibold text-gray-700">
//               {product.data.name}
//             </h2>
//             <p className="text-gray-500 text-sm mt-2">{product.data.description}</p>

//             {product.data.price && (
//               <p className="text-lg font-bold text-indigo-600 mt-4">
//                 ₦{Number(product.data.price).toLocaleString()}
//               </p>
//             )}

//             <button 
//               onClick={()=> addToCart(product.data)}
//               className="bg-brown-500 w-full">Add to Cart</button>
//             <input type="text" id="incart" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    incrementQuantity,
    decrementQuantity,
    isInCart,
    getItemQuantity,
    updateQuantity 
  } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product?.data) return;
    
    const productToAdd = {
      ...product.data,
      quantity: selectedQuantity
    };
    
    addToCart(productToAdd);
    // Reset quantity after adding
    setSelectedQuantity(1);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    setSelectedQuantity(newQuantity);
  };

  const handleIncrementInCart = () => {
    if (isInCart(product.data.id)) {
      incrementQuantity(product.data.id);
    }
  };

  const handleDecrementInCart = () => {
    if (isInCart(product.data.id)) {
      decrementQuantity(product.data.id);
    }
  };

  const handleRemoveFromCart = () => {
    if (isInCart(product.data.id)) {
      removeFromCart(product.data.id);
    }
  };

  const handleUpdateCartQuantity = () => {
    if (isInCart(product.data.id)) {
      updateQuantity(product.data.id, selectedQuantity);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-brown-500 text-white px-4 py-2 rounded-lg hover:bg-brown-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-brown-500 text-white px-6 py-3 rounded-lg hover:bg-brown-600 transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const productData = product.data;
  const isProductInCart = isInCart(productData.id);
  const cartQuantity = getItemQuantity(productData.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-brown-600 hover:text-brown-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Image */}
            <div className="p-8">
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={productData.image_url}
                  alt={productData.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Thumbnail Gallery (if multiple images) */}
              {productData.additional_images && productData.additional_images.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {productData.additional_images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${productData.name} ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-brown-500"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 lg:border-l lg:border-gray-200">
              {/* Product Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>
                  {productData.stock_status && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      productData.stock_status === 'in_stock' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {productData.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                  )}
                </div>
                
                {productData.category && (
                  <p className="text-gray-500 text-sm mt-2">
                    Category: <span className="font-medium">{productData.category}</span>
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-brown-600">
                    ₦{Number(productData.price).toLocaleString()}
                  </span>
                  {productData.original_price && (
                    <span className="text-xl text-gray-400 line-through">
                      ₦{Number(productData.original_price).toLocaleString()}
                    </span>
                  )}
                </div>
                {productData.original_price && (
                  <p className="text-green-600 font-medium mt-2">
                    Save ₦{Number(productData.original_price - productData.price).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{productData.description}</p>
              </div>

              {/* Additional Details */}
              {productData.specifications && Object.keys(productData.specifications).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cart Controls */}
              <div className="space-y-6">
                {/* Quantity Selector */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(selectedQuantity - 1)}
                        disabled={selectedQuantity <= 1}
                        className="px-4 py-3 text-black hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={selectedQuantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-16 text-center border-0 focus:ring-0 focus:outline-none"
                      />
                      <button
                        onClick={() => handleQuantityChange(selectedQuantity + 1)}
                        className="px-4 py-3 text-black hover:text-gray-900"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {productData.stock_quantity && (
                        <span>{productData.stock_quantity} items available</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cart Status */}
                {isProductInCart && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">
                            In your cart ({cartQuantity} {cartQuantity === 1 ? 'item' : 'items'})
                          </p>
                          <p className="text-sm text-green-600">
                            ₦{Number(productData.price * cartQuantity).toLocaleString()} total
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-green-300 rounded-lg bg-white">
                          <button
                            onClick={handleDecrementInCart}
                            className="px-3 py-1 text-green-600 hover:text-green-800"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 font-medium">{cartQuantity}</span>
                          <button
                            onClick={handleIncrementInCart}
                            className="px-3 py-1 text-green-600 hover:text-green-800"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={handleRemoveFromCart}
                          className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {isProductInCart ? (
                    <>
                      <button
                        onClick={() => navigate('/cart')}
                        className="flex-1 flex items-center justify-center gap-2 bg-brown-600 text-black px-8 py-4 rounded-lg hover:bg-brown-700 transition font-medium text-lg"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        View Cart
                      </button>
                      <button
                        onClick={handleUpdateCartQuantity}
                        className="flex-1 bg-white border-2 border-brown-600 text-brown-600 px-8 py-4 rounded-lg hover:bg-brown-50 transition font-medium text-lg"
                      >
                        Update Quantity
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={productData.stock_status === 'out_of_stock'}
                      className="flex-1 flex items-center justify-center gap-2 bg-brown-600 text-black px-8 py-4 rounded-lg hover:bg-brown-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      if (!isProductInCart) {
                        handleAddToCart();
                      }
                      navigate(`/cart/${id}/checkout`);
                    }}
                    disabled={productData.stock_status === 'out_of_stock'}
                    className="flex-1 bg-green-600 text-black px-8 py-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-lg"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Stock Warning */}
                {productData.stock_status === 'out_of_stock' && (
                  <p className="text-red-600 text-center font-medium">
                    This product is currently out of stock
                  </p>
                )}
              </div>
            </div>
          </div> 
        </div>

        {/* Related Products Section (optional) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          {/* Add related products component here */}
        </div>
      </div>
    </div>
  );
}