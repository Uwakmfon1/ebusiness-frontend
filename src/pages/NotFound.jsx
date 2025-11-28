export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
