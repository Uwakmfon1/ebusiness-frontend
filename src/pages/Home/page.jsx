import useFetchData from "../../hooks/useFetchData";

export default function Home() {
  const { data, loading, error } = useFetchData(
    "http://localhost:8000/api/products"
  );

  const dataArray = Object.values(data);
  const items = dataArray[0];
  console.log(items);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Our Products
      </h1>

      {items.length === 0 && (
        <p className="text-center text-gray-500">No products available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="w-full h-48 bg-gray-200 overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                {product.description}
              </p>

              {product.price && (
                <p className="text-lg font-bold text-indigo-600 mt-4">
                  ₦{Number(product.price).toLocaleString()}
                </p>
              )}

              <button className="mt-4 w-full bg-gray text-black font-semibold border shadow py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <a href={`/details/${product.id}`} className="block w-full">
                  View Details 
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
