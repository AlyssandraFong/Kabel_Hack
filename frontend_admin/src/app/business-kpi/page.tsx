"use client";

import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

// Sample Data
const rawGrossMarginData = [
  { car: "Car A", acquisition: 15000, resale: 20000, reconditioning: 2000, dealer: "Dealer 1" },
  { car: "Car B", acquisition: 12000, resale: 16000, reconditioning: 1500, dealer: "Dealer 2" },
  { car: "Car C", acquisition: 18000, resale: 25000, reconditioning: 2500, dealer: "Dealer 1" },
  { car: "Car D", acquisition: 10000, resale: 15000, reconditioning: 1200, dealer: "Dealer 3" },
];

const rawDaysToSellData = [
  { car: "Car A", days: 12, dealer: "Dealer 1" },
  { car: "Car B", days: 30, dealer: "Dealer 2" },
  { car: "Car C", days: 8, dealer: "Dealer 1" },
  { car: "Car D", days: 20, dealer: "Dealer 3" },
];

const rawDealerRetentionData = [
  { id: "Repeat Dealers", value: 65 },
  { id: "One-time Dealers", value: 35 },
];

const chartColors = ["#3B82F6", "#10B981", "#F59E0B"];

export default function BusinessKPIPage() {
  const [selectedCar, setSelectedCar] = useState("all");
  const [selectedDealer, setSelectedDealer] = useState("all");

  // Filtering
  const filteredGrossMarginData = rawGrossMarginData.filter(
    (item) =>
      (selectedCar === "all" || item.car === selectedCar) &&
      (selectedDealer === "all" || item.dealer === selectedDealer)
  );

  const filteredDaysToSellData = [
    {
      id: "Days to Sell",
      data: rawDaysToSellData
        .filter(
          (item) =>
            (selectedCar === "all" || item.car === selectedCar) &&
            (selectedDealer === "all" || item.dealer === selectedDealer)
        )
        .map((item) => ({ x: item.car, y: item.days })),
    },
  ];

  // Summary Metrics
  const totalGrossMargin = filteredGrossMarginData.reduce(
    (sum, item) => sum + (item.resale - item.acquisition - item.reconditioning),
    0
  );
  const averageDaysToSell =
    filteredDaysToSellData[0].data.reduce((sum, item) => sum + item.y, 0) /
    (filteredDaysToSellData[0].data.length || 1);

  // Enhanced Glass Effect Classes
  const glassClass =
    "!rounded-2xl !transition-all !duration-200 !ease-out relative flex flex-col gap-3 px-4 py-3 cursor-default select-none outline-none " +
    "bg-white/20 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 " +
    "backdrop-blur-md hover:!bg-white/30 dark:hover:!bg-white/20 hover:scale-105 hover:shadow-xl dark:hover:shadow-white/10";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-emerald-200 to-teal-300 transition-colors">

      <div className="pt-30 px-4 md:px-12 lg:px-24 pb-12">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-500 dark:text-emerald-400">
            Business KPI Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Monitor key business performance metrics at a glance
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className={`${glassClass} w-52`}>
            <label className="text-sm font-medium mb-1">Filter by Car</label>
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Cars</option>
              {rawGrossMarginData.map((item) => (
                <option key={item.car} value={item.car}>
                  {item.car}
                </option>
              ))}
            </select>
          </div>

          <div className={`${glassClass} w-52`}>
            <label className="text-sm font-medium mb-1">Filter by Dealer</label>
            <select
              value={selectedDealer}
              onChange={(e) => setSelectedDealer(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Dealers</option>
              {[...new Set(rawGrossMarginData.map((item) => item.dealer))].map(
                (dealer) => (
                  <option key={dealer} value={dealer}>
                    {dealer}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Gross Margin</p>
            <h3 className="text-2xl font-bold text-blue-500 dark:text-emerald-400">
              ${totalGrossMargin.toLocaleString()}
            </h3>
          </div>

          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Days to Sell</p>
            <h3 className="text-2xl font-bold text-blue-500 dark:text-emerald-400">
              {averageDaysToSell.toFixed(1)} days
            </h3>
          </div>

          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Dealer Retention</p>
            <h3 className="text-2xl font-bold text-blue-500 dark:text-emerald-400">
              {rawDealerRetentionData.find((d) => d.id === "Repeat Dealers")?.value}%
            </h3>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Gross Margin */}
          <div className={`${glassClass} p-6`}>
            <h2 className="text-lg font-semibold text-blue-500 dark:text-emerald-400 mb-2">
              Gross Margin per Car
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Acquisition vs resale vs reconditioning cost
            </p>
            <div className="h-72">
              <ResponsiveBar
                data={filteredGrossMarginData}
                keys={["acquisition", "resale", "reconditioning"]}
                indexBy="car"
                margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                padding={0.3}
                colors={chartColors}
                axisBottom={{ legend: "Car", legendPosition: "middle", legendOffset: 32 }}
                axisLeft={{ legend: "Amount ($)", legendPosition: "middle", legendOffset: -50 }}
                enableLabel={false}
              />
            </div>
          </div>

          {/* Days to Sell */}
          <div className={`${glassClass} p-6`}>
            <h2 className="text-lg font-semibold text-blue-500 dark:text-emerald-400 mb-2">
              Days to Sell
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Time taken from acquisition to sale
            </p>
            <div className="h-72">
              <ResponsiveLine
                data={filteredDaysToSellData}
                margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto" }}
                axisBottom={{ legend: "Car", legendOffset: 32, legendPosition: "middle" }}
                axisLeft={{ legend: "Days", legendOffset: -50, legendPosition: "middle" }}
                colors={["#3B82F6"]}
                pointSize={10}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                enableArea={true}
                curve="monotoneX"
              />
            </div>
          </div>

          {/* Dealer Retention */}
          <div className={`${glassClass} p-6`}>
            <h2 className="text-lg font-semibold text-blue-500 dark:text-emerald-400 mb-2">
              Dealer Retention
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Percentage of repeat vs new dealers
            </p>
            <div className="h-72">
              <ResponsivePie
                data={rawDealerRetentionData}
                margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={["#3B82F6", "#F59E0B"]}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
