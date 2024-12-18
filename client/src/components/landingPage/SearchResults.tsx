const SearchResults = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Search Results</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto p-4">
          {results.map((result, index) => (
            <div key={index} className="py-3 border-b last:border-0">
              <h4 className="font-medium mb-1">{result.title}</h4>
              <p className="text-sm text-gray-600">{result.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
