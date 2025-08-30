"use client";

import React, { useState } from "react";
import ImageFallback from "@/helpers/ImageFallback";
import PageHeader from "@/partials/PageHeader";
import { carData } from "@/data/carData";

const SellCarPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...filesArray]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setImages([]);
    setMake("");
    setModel("");
    setYear(null);
    setMileage(null);
    setPrice(null);
  };

  const calculatePrice = () => {
    if (!make || !model || !year || !mileage) {
      alert("⚠️ Please fill in car make, model, year, and mileage first.");
      return;
    }

    const basePrice = 20000;
    const ageDiscount = (new Date().getFullYear() - year) * 500;
    const mileageDiscount = mileage * 0.1;

    const estimatedPrice = basePrice - ageDiscount - mileageDiscount;

    setPrice(estimatedPrice);
  };

  return (
    <>
      <PageHeader title="Sell Your Car" />

      <section className="min-h-screen bg-gradient-gray-1000 dark:from-darkmode dark:via-darkmode-light dark:to-darkmode">
        <div className="container max-w-5xl mx-auto px-4 py-12 space-y-12">
          
          {/* Upload Images Section */}
          <div className="glass rounded-2xl bg-light dark:bg-darkmode-light p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Upload Images</h2>
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {images.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <ImageFallback
                      src={src}
                      alt={`Car Image ${idx}`}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-xl border border-gray-200 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="block cursor-pointer text-center">
              <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 hover:border-blue-500 transition">
                <p className="text-gray-600 dark:text-gray-300">
                  Drag & Drop or <span className="font-semibold">Click to Upload</span>
                </p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Car Details */}
          <div className="glass rounded-2xl bg-light dark:bg-darkmode-light p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Make */}
              <div>
                <label className="text-sm font-medium text-gray-600">Make</label>
                <select
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("");
                  }}
                  className="mt-2 w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-700"
                >
                  <option value="">Select Make</option>
                  {Object.keys(carData).map((makeName) => (
                    <option key={makeName} value={makeName}>
                      {makeName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="text-sm font-medium text-gray-600">Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!make}
                  className="mt-2 w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Model</option>
                  {make &&
                    carData[make].map((modelName: string) => (
                      <option key={modelName} value={modelName}>
                        {modelName}
                      </option>
                    ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="text-sm font-medium text-gray-600">Year</label>
                <select
                  value={year ?? ""}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="mt-2 w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-700"
                >
                  <option value="">Select Year</option>
                  {[...Array(18)].map((_, i) => {
                    const y = 2008 + i;
                    return (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    );
                  })}
                  <option value={2025}>2025</option>
                </select>
              </div>

              {/* Mileage */}
              <div>
                <label className="text-sm font-medium text-gray-600">Mileage (km)</label>
                <input
                  type="number"
                  placeholder="Enter mileage"
                  value={mileage ?? ""}
                  onChange={(e) => setMileage(Number(e.target.value))}
                  className="mt-2 w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-700"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={calculatePrice}
                className="flex-1 bg-black text-white px-6 py-4 rounded-xl font-semibold shadow-md hover:scale-105 transition"
              >
                Calculate Price
              </button>
              <button
                onClick={resetForm}
                className="flex-1 border border-gray-300 px-6 py-4 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Reset Form
              </button>
            </div>
          </div>

          {/* Car Report */}
          <div className="glass rounded-2xl p-12 bg-light dark:bg-darkmode-light shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Car Report</h2>
            {price !== null ? (
              <>
                <p className="text-5xl font-bold bg-black bg-clip-text text-transparent mb-4">
                  ${price.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Estimated market value for your {year} {make} {model}
                </p>
              </>
            ) : (
              <p className="text-gray-500">
                After uploading your car images and details, you'll see an estimated price here.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SellCarPage;
