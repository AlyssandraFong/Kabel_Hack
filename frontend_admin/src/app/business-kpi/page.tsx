"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

const chartColors = ["#3B82F6", "#10B981", "#F59E0B"];

interface GrossMargin {
  car: string;
  dealer: string;
  acquisition: number;
  resale: number;
  reconditioning: number;
  [key: string]: string | number; // Add index signature for Nivo BarDatum compatibility
}

interface DaysToSell {
  car: string;
  days: number;
}

interface DealerRetention {
  id: string;
  value: number;
}

export default function BusinessKPIPage() {
  const [grossMarginData, setGrossMarginData] = useState<GrossMargin[]>([]);
  const [daysToSellData, setDaysToSellData] = useState<DaysToSell[]>([]);
  const [dealerRetentionData, setDealerRetentionData] = useState<DealerRetention[]>([]);

  const glassClass =
    "!rounded-2xl !transition-all !duration-200 !ease-out relative flex flex-col gap-3 px-4 py-3 " +
    "bg-white/20 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 " +
    "backdrop-blur-md hover:!bg-white/30 dark:hover:!bg-white/20 hover:scale-105 hover:shadow-xl dark:hover:shadow-white/10";

  // Fetch Gross Margins
  useEffect(() => {
    async function fetchGrossMargins() {
      try {
        const res = await fetch("/api/grossMargins");
        const data: GrossMargin[] = await res.json();
        setGrossMarginData(data);
      } catch (error) {
        console.error("Failed to fetch gross margins:", error);
      }
    }
    fetchGrossMargins();
  }, []);

  // Fetch DaysToSell
  useEffect(() => {
    async function fetchDaysToSell() {
      try {
        const res = await fetch("/api/daysToSells");
        const data: DaysToSell[] = await res.json();
        setDaysToSellData(data);
      } catch (error) {
        console.error("Failed to fetch DaysToSell data:", error);
      }
    }
    fetchDaysToSell();
  }, []);

  // Fetch Dealer Retention
  useEffect(() => {
    async function fetchDealers() {
      try {
        const res = await fetch("/api/cars");
        const cars = await res.json();
        const dealerCounts: Record<string, number> = {};
        cars.forEach((car: { dealer: string }) => {
          dealerCounts[car.dealer] = (dealerCounts[car.dealer] || 0) + 1;
        });
        const repeatDealers = Object.values(dealerCounts).filter((v) => v > 1).length;
        const oneTimeDealers = Object.values(dealerCounts).filter((v) => v === 1).length;
        setDealerRetentionData([
          { id: "Repeat Dealers", value: repeatDealers },
          { id: "One-time Dealers", value: oneTimeDealers },
        ]);
      } catch (error) {
        console.error("Failed to fetch dealers:", error);
      }
    }
    fetchDealers();
  }, []);

  // Summary Metrics
  const totalGrossMargin = grossMarginData.reduce(
    (sum, item) => sum + (item.resale - item.acquisition - item.reconditioning),
    0
  );

  const averageDaysToSell =
    daysToSellData.reduce((sum, item) => sum + item.days, 0) /
    (daysToSellData.length || 1);

  const repeatDealer = dealerRetentionData.find((d) => d.id === "Repeat Dealers")?.value || 0;
  const oneTimeDealer = dealerRetentionData.find((d) => d.id === "One-time Dealers")?.value || 0;
  const totalDealers = repeatDealer + oneTimeDealer;
  const repeatDealerPercentage = totalDealers > 0 ? Math.round((repeatDealer / totalDealers) * 100) : 0;

  // Prepare DaysToSell data for Nivo line chart
  const lineChartData = [
    {
      id: "Days to Sell",
      data: daysToSellData.map((item) => ({
        x: item.car,
        y: item.days,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-100 to-teal-100 transition-colors">
      <div className="pt-30 px-4 md:px-12 lg:px-24 pb-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-emerald-400">
            Business KPI Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Monitor key business performance metrics at a glance
          </p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Gross Margin</p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-emerald-400">
              ${totalGrossMargin.toLocaleString()}
            </h3>
          </div>
          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Days to Sell</p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-emerald-400">
              {averageDaysToSell.toFixed(1)} days
            </h3>
          </div>
          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Dealer Retention</p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-emerald-400">
              {repeatDealerPercentage}%
            </h3>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Gross Margin */}
          <div className={`${glassClass} p-6`}>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-emerald-400 mb-2">
              Gross Margin per Car
            </h2>
            <div className="h-72">
              <ResponsiveBar
                data={grossMarginData}
                keys={["acquisition", "resale", "reconditioning"]}
                indexBy="car"
                margin={{ top: 20, right: 20, bottom: 120, left: 70 }}
                padding={0.3}
                colors={chartColors}
                axisBottom={{ tickRotation: -90 }}
                axisLeft={{ legend: "Amount ($)", legendOffset: -60, legendPosition: "middle" }}
                enableLabel={false}
              />
            </div>
          </div>

          {/* Days to Sell */}
          <div className={`${glassClass} p-6`}>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-emerald-400 mb-2">
              Days to Sell
            </h2>
            <div className="h-72">
              <ResponsiveLine
                data={lineChartData}
                margin={{ top: 20, right: 20, bottom: 120, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: 0, max: "auto" }}
                axisBottom={{ tickRotation: -90 }}
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
            <h2 className="text-lg font-semibold text-blue-600 dark:text-emerald-400 mb-2">
              Dealer Retention
            </h2>
            <div className="h-72">
              <ResponsivePie
                data={dealerRetentionData}
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
