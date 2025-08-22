"use client";

import React, { useState } from "react";
import PageHeader from "@/partials/PageHeader";

const FinancePage = () => {
  const [carPrice, setCarPrice] = useState<number | "">("");
  const [downPayment, setDownPayment] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [loanTerm, setLoanTerm] = useState<number | "">("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateLoan = () => {
    if (!carPrice || !downPayment || !interestRate || !loanTerm) return;

    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const payment =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(payment);
  };

  const resetForm = () => {
    setCarPrice("");
    setDownPayment("");
    setInterestRate("");
    setLoanTerm("");
    setMonthlyPayment(null);
  };

  return (
    <>
      <PageHeader title="Car Loan Calculator" />

      <section>
        <div className="container">
          {/* Loan Details Card */}
          <div className="bg-light dark:bg-darkmode-light p-10 rounded-md shadow-lg mt-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Loan Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Car Price (RM)</label>
                <input
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  placeholder="Enter car price"
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Down Payment (RM)</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  placeholder="Enter down payment"
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Interest Rate (%)</label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  placeholder="Enter interest rate"
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Loan Term (Years)</label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  placeholder="Enter loan term"
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={calculateLoan}
                className="btn btn-primary"
              >
                Calculate Payment
              </button>
              <button
                onClick={resetForm}
                className="btn btn-outline"
              >
                Reset Form
              </button>
            </div>
          </div>

          {/* Result Card */}
          {monthlyPayment !== null && (
            <div className="bg-light dark:bg-darkmode-light p-10 rounded-md shadow-lg mt-10">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Estimated Payment</h2>
              <p className="text-xl font-semibold">
                Your estimated monthly payment is:{" "}
                <span className="text-green-600">RM {monthlyPayment.toFixed(2)}</span>
              </p>
            </div>
          )}
        </div>
      </section>
      <br></br>
      <br></br>
    </>
  );
};

export default FinancePage;
