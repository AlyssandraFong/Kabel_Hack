"use client";

import React, { useState } from "react";
import ImageFallback from "@/helpers/ImageFallback";
import PageHeader from "@/partials/PageHeader";

const SellCarPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [mileage, setMileage] = useState<number | "">("");

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
    setYear("");
    setMileage("");
  };

  const calculatePrice = () => {
    const basePrice = 20000;
    const ageDiscount = year ? (new Date().getFullYear() - year) * 500 : 0;
    const mileageDiscount = mileage ? mileage * 0.1 : 0;
    return basePrice - ageDiscount - mileageDiscount;
  };

  return (
    <>
      <PageHeader title="Sell Your Car" />

      <section>
        <div className="container">
          {/* Upload Images Section */}
          <div className="bg-light dark:bg-darkmode-light p-10 rounded-md shadow-lg mt-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Upload Images</h2>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-6">
                {images.map((src, idx) => (
                  <div key={idx} className="relative w-32 h-32">
                    <ImageFallback
                      src={src}
                      alt={`Car Image ${idx}`}
                      width={128}
                      height={128}
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label  className="btn cursor-pointer 
             bg-black text-white 
             hover:bg-gray-800 
             dark:bg-white dark:text-black dark:hover:bg-gray-200
             transition-colors">
                Attach Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* Car Details Section */}
          <div className="bg-light dark:bg-darkmode-light p-10 rounded-md shadow-lg mt-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Car Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Make</label>
                <input
                  type="text"
                  placeholder="Make"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Model</label>
                <input
                  type="text"
                  placeholder="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Year</label>
                <input
                  type="number"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Mileage (km)</label>
                <input
                  type="number"
                  placeholder="Mileage"
                  value={mileage}
                  onChange={(e) => setMileage(Number(e.target.value))}
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={() => alert(`Estimated Price: $${calculatePrice()}`)}
                className="btn btn-primary"
              >
                Calculate Price
              </button>
              <button onClick={resetForm} className="btn btn-outline">
                Reset Form
              </button>
            </div>
          </div>

          {/* Car Report Section */}
          <div className="bg-light dark:bg-darkmode-light p-10 rounded-md shadow-lg mt-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Car Report</h2>
            <p className="text-text-light dark:text-darkmode-text-light">
              After uploading your car images and details, you'll see an estimated price here.
            </p>
          </div>
        </div>
      </section>
      <br></br>
    </>
  );
};

export default SellCarPage;
