"use client";

import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";

interface RawRevenueData {
  month: string;
  resale: number;
  financing: number;
  warranties: number;
}

const chartColors = ["#3B82F6", "#10B981", "#F59E0B"];

export default function FinancialKPIPage() {
  const [rawRevenueData, setRawRevenueData] = useState<any[]>([]);
  const [rawCashCycleData, setRawCashCycleData] = useState<any[]>([]);
  const glassClass =
    "!rounded-2xl !transition-all !duration-200 !ease-out relative flex flex-col gap-3 px-4 py-3 cursor-default select-none outline-none " +
    "bg-white/20 dark:bg-gray-800/30 border border-white/20 dark:border-white/10 " +
    "backdrop-blur-md hover:!bg-white/30 dark:hover:!bg-white/20 hover:scale-105 hover:shadow-xl dark:hover:shadow-white/10";

    // Fetch Revenue Data
    useEffect(() => {
      async function fetchRevenue() {
        try {
          const res = await fetch("/api/revenues");
          const data: any[] = await res.json();
          setRawRevenueData(data);
        } catch (error) {
          console.error("Failed to fetch revenue data:", error);
        }
      }
      fetchRevenue();
    }, []);

    // Fetch Cash Cycle Data
    useEffect(() => {
      async function fetchCashCycle() {
        try {
          const res = await fetch("/api/cashCycles");
          const data: any[] = await res.json();
          setRawCashCycleData(data);
        } catch (error) {
          console.error("Failed to fetch cash cycle data:", error);
        }
      }
      fetchCashCycle();
    }, []);

  const totalRevenue = rawRevenueData.reduce(
    (sum, item) => sum + item.resale + item.financing + item.warranties,
    0
  );

  const avgCashCycle =
    rawCashCycleData.reduce((sum, item) => sum + item.days, 0) /
    rawCashCycleData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-100 to-teal-100 transition-colors">
      <div className="pt-30 px-4 md:px-12 lg:px-24 pb-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-600 dark:text-emerald-400">
            Financial KPI Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Track revenue streams and cash efficiency
          </p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-emerald-400">
              ${totalRevenue.toLocaleString()}
            </h3>
          </div>

          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Average Cash Conversion Cycle
            </p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-emerald-400">
              {avgCashCycle.toFixed(1)} days
            </h3>
          </div>

          <div className={glassClass}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Revenue from Resale
            </p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-emerald-400">
              ${rawRevenueData.reduce((sum, item) => sum + item.resale, 0).toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Revenue Breakdown */}
          <div className={`${glassClass} p-6`}>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-emerald-400 mb-2">
              Revenue Breakdown
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Resale, financing, and warranties per month
            </p>
            <div className="h-72">
              <ResponsiveBar
                data={rawRevenueData}
                keys={["resale", "financing", "warranties"]}
                indexBy="month"
                margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                padding={0.3}
                colors={chartColors}
                axisLeft={{ legend: "Revenue ($)", legendPosition: "middle", legendOffset: -50 }}
                enableLabel={false}
              />
            </div>
          </div>

          {/* Cash Conversion Cycle */}
          <div className={`${glassClass} p-6`}>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-emerald-400 mb-2">
              Cash Conversion Cycle
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Average days to convert inventory to cash
            </p>
            <div className="h-72">
              <ResponsiveLine
                data={[
                  {
                    id: "Cash Cycle",
                    data: rawCashCycleData.map((item) => ({
                      x: item.month,
                      y: item.days,
                    })),
                  },
                ]}
                margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: 0, max: "auto" }}
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
        </div>
      </div>
    </div>
  );
}

