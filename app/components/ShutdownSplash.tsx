import {useEffect} from 'react';

export function ShutdownSplash() {
  useEffect(() => {
    // Prevent any navigation or interaction
    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Disable all links and forms
    document.addEventListener('click', preventDefault, true);
    document.addEventListener('submit', preventDefault, true);
    document.addEventListener('keydown', preventDefault, true);

    return () => {
      document.removeEventListener('click', preventDefault, true);
      document.removeEventListener('submit', preventDefault, true);
      document.removeEventListener('keydown', preventDefault, true);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SALE CLOSED</h1>
        <p className="text-xl text-gray-600">THANKS FOR YOUR SUPPORT.</p>
      </div>
    </div>
  );
} 