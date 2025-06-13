import React, { use } from "react";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const Update = () => {
  const { user } = use(AuthContext);
  const oldData = useLoaderData();

  const updateMutation = useMutation({
    mutationFn: (updatedData) =>
      axios.put(`http://localhost:5000/foods/${oldData._id}`, updatedData),
    onSuccess: () => {
      Swal.fire("Updated!", "Your food item has been updated.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update food item.", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newInfo = Object.fromEntries(formData.entries());

    const userEmail = user.email;
    const userName = user.displayName;

    const updatedData = {
      ...newInfo,
      quantity: Number(newInfo.quantity),
      userEmail,
      userName,
      availability: "Available",
    };

    updateMutation.mutate(updatedData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-6 px-8 rounded-t-3xl">
          <h2 className="text-3xl font-bold text-white">Update Food Information</h2>
          <p className="mt-2 text-sm text-orange-100">Ensure the data is accurate and up-to-date.</p>
        </div>

        <div className="p-4 md:p-6 lg:p-8 space-y-8 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Food Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={oldData?.name}
                  required
                  placeholder="e.g., Fresh Apples"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="img"
                  defaultValue={oldData?.img}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={oldData?.quantity}
                  min="1"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Expiration Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="expire"
                  defaultValue={oldData?.expire}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pickup Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={oldData?.location}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  defaultValue={oldData?.notes}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl shadow-inner">
              <h3 className="font-semibold text-gray-800 mb-1.5  md:mb-3">Donor Info</h3>
              <div className="flex items-center gap-4">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-12 h-12 rounded-full shadow object-cover"
                  />
                )}
                <div>
                  <p className="text-gray-800 font-medium">{user.displayName}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Update Information
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
