"use client";

import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveHeatMap, HeatMapDatum } from "@nivo/heatmap";

interface PriceData {
  car: string;
  actual: number;
  predicted: number;
  [key: string]: string | number;
}

const rawPriceData: PriceData[] = [
  { car: "Car A", actual: 20000, predicted: 19500 },
  { car: "Car B", actual: 16000, predicted: 16200 },
  { car: "Car C", actual: 25000, predicted: 24800 },
  { car: "Car D", actual: 15000, predicted: 15200 },
];

interface HeatMapSeries {
  id: string;
  data: HeatMapDatum[];
}

const heatmapData: HeatMapSeries[] = [
  {
    id: "Car A",
    data: [
      { x: "North", y: 80 },
      { x: "South", y: 70 },
      { x: "East", y: 60 },
      { x: "West", y: 50 },
    ],
  },
  {
    id: "Car B",
    data: [
      { x: "North", y: 60 },
      { x: "South", y: 90 },
      { x: "East", y: 50 },
      { x: "West", y: 40 },
    ],
  },
  {
    id: "Car C",
    data: [
      { x: "North", y: 50 },
      { x: "South", y: 40 },
      { x: "East", y: 80 },
      { x: "West", y: 70 },
    ],
  },
  {
    id: "Car D",
    data: [
      { x: "North", y: 40 },
      { x: "South", y: 60 },
      { x: "East", y: 70 },
      { x: "West", y: 90 },
    ],
  },
];

const chartColors = ["#3B82F6", "#10B981"];

export default function CarPricingPage() {
  const [selectedCar, setSelectedCar] = useState("all");

  const filteredPriceData = rawPriceData.filter(
    (item) => selectedCar === "all" || item.car === selectedCar
  );

  const totalCars = filteredPriceData.length;
  const avgAccuracy =
    filteredPriceData.reduce(
      (sum, item) =>
        sum + (1 - Math.abs(item.actual - item.predicted) / item.actual),
      0
    ) / (totalCars || 1);

  const glassClass =
    "!rounded-2xl !transition-all !duration-200 !ease-out relative flex flex-col gap-3 px-6 py-5 cursor-default select-none outline-none " +
    "bg-white/20 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 " +
    "backdrop-blur-md hover:!bg-white/30 dark:hover:!bg-white/20 hover:scale-105 hover:shadow-xl dark:hover:shadow-white/10";

    const filterGlassClass =
    "!rounded-2xl !transition-all !duration-200 !ease-out relative flex flex-col gap-3 px-6 py-5 cursor-default select-none outline-none " +
    "bg-white/20 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 ";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-100 to-teal-100 transition-colors">
      <div className="pt-30 px-6 md:px-12 lg:px-24 pb-12">
        {/* Page Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-600">
            Car Pricing Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Monitor predicted vs actual pricing and market demand
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className={`${filterGlassClass} w-52`}>
            <label className="text-sm font-medium mb-1">Filter by Car</label>
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Cars</option>
              {rawPriceData.map((item) => (
                <option key={item.car} value={item.car}>
                  {item.car}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Cars</p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-emerald-400">
              {totalCars}
            </h3>
          </div>

          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Avg Price Accuracy
            </p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-emerald-400">
              {(avgAccuracy * 100).toFixed(1)}%
            </h3>
          </div>

          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Highest Priced Car
            </p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-emerald-400">
              {Math.max(...rawPriceData.map((d) => d.actual))}
            </h3>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Predicted vs Actual Price */}
          <div className={glassClass}>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-emerald-400 mb-2">
              Predicted vs Actual Price
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Compare predicted car prices to actual sales prices
            </p>
            <div className="h-80">
              <ResponsiveBar
                data={filteredPriceData}
                keys={["actual", "predicted"]}
                indexBy="car"
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                padding={0.3}
                colors={chartColors}
                axisBottom={{
                  legend: "Car",
                  legendPosition: "middle",
                  legendOffset: 32,
                }}
                axisLeft={{
                  legend: "Price ($)",
                  legendPosition: "middle",
                  legendOffset: -50,
                }}
                enableLabel={false}
              />
            </div>
          </div>

          {/* Market Demand Heatmap */}
          <div className={glassClass}>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-emerald-400 mb-2">
              Market Demand Heatmap
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Demand by region and car model
            </p>
            <div className="h-100">
              <ResponsiveHeatMap
                data={heatmapData}
                margin={{ top: 60, right: 60, bottom: 40, left: 60 }}
                forceSquare={true}
                colors={{ type: "diverging", scheme: "blues" }}
                axisTop={{
                  tickRotation: 10,
                  legend: "Region",
                  legendPosition: "middle",
                  legendOffset: 40,
                }}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                  legend: "Car",
                  legendPosition: "middle",
                  legendOffset: -50,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
