import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearWatchlist } from "../store/watchlistSlice";
import toast from "react-hot-toast";
import ConfirmModal from "../components/common/ConfirmModal";
import { useUser } from "@clerk/clerk-react";

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [displayName, setDisplayName] = useState(user?.fullName || "");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearWatchlist = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    dispatch(clearWatchlist());
    toast.success("Your watchlist has been cleared.");
    setShowConfirm(false);
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-gray-900/50 p-6 rounded-xl shadow-md border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              disabled
              // onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="text"
              value={user?.primaryEmailAddress?.emailAddress}
              disabled
              className="w-full bg-gray-700 text-gray-400 p-2 rounded-md border border-gray-600"
            />
          </div>
          <div className="bg-gray-900/60 rounded-lg p-3 flex flex-col">
            <span className="text-sm">Member Since</span>
            <span className="text-white font-semibold text-lg">
              {new Date(user?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Watchlist */}
        <div className="bg-gray-900/50 p-6 rounded-xl shadow-md border border-gray-700 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Watchlist</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Clear Watchlist</span>
            <button
              onClick={handleClearWatchlist}
              className="bg-red-500/90 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* Confirm Modal */}
      <ConfirmModal
        open={showConfirm}
        title="Clear Watchlist?"
        message="Are you sure you want to clear your watchlist? This action cannot be undone."
        onConfirm={confirmClear}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default Settings;
