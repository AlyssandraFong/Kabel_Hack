// "use client";

// import React, { useState } from "react";
// import PageHeader from "@/partials/PageHeader";

// const FinancePage = () => {
//   const [carPrice, setCarPrice] = useState<number | "">("");
//   const [downPayment, setDownPayment] = useState<number | "">("");
//   const [interestRate, setInterestRate] = useState<number | "">("");
//   const [loanTerm, setLoanTerm] = useState<number | "">("");
//   const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
//   const [totalRepayment, setTotalRepayment] = useState<number | null>(null);
//   const [totalInterest, setTotalInterest] = useState<number | null>(null);

//   const calculateLoan = () => {
//     // Ensure all fields are filled
//     if (carPrice === "" || downPayment === "" || interestRate === "" || loanTerm === "") {
//       alert("Please fill in all fields before calculating.");
//       return;
//     }

//     const principal = carPrice - downPayment;
//     const monthlyRate = interestRate / 100 / 12;
//     const numberOfPayments = loanTerm * 12;

//     // Validation checks
//     if (principal <= 0) {
//       alert("Down payment cannot be greater than or equal to car price.");
//       return;
//     }
//     if (numberOfPayments <= 0) {
//       alert("Loan term must be greater than 0.");
//       return;
//     }

//     let payment: number;

//     if (monthlyRate === 0) {
//       // No interest case
//       payment = principal / numberOfPayments;
//     } else {
//       // Standard amortization formula
//       payment =
//         (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
//         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
//     }

//     const total = payment * numberOfPayments;
//     const interest = total - principal;

//     setMonthlyPayment(payment);
//     setTotalRepayment(total);
//     setTotalInterest(interest);
//   };

//   const resetForm = () => {
//     setCarPrice("");
//     setDownPayment("");
//     setInterestRate("");
//     setLoanTerm("");
//     setMonthlyPayment(null);
//     setTotalRepayment(null);
//     setTotalInterest(null);
//   };

//   return (
//     <>
//       <PageHeader title="Car Loan Calculator" />

//       <section>
//         <div className="container">
//           {/* Loan Details Card */}
//           <div className="bg-light dark:bg-darkmode-light p-10 rounded-md shadow-lg mt-10">
//             <h2 className="text-2xl md:text-3xl font-semibold mb-6">Loan Details</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="flex flex-col">
//                 <label className="mb-2 font-medium">Car Price (RM)</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={carPrice}
//                   onChange={(e) => setCarPrice(Math.max(0, Number(e.target.value)))}
//                   placeholder="Enter car price"
//                   className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="mb-2 font-medium">Down Payment (RM)</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={downPayment}
//                   onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
//                   placeholder="Enter down payment"
//                   className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="mb-2 font-medium">Interest Rate (%)</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={interestRate}
//                   onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
//                   placeholder="Enter interest rate"
//                   className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="mb-2 font-medium">Loan Term (Years)</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={loanTerm}
//                   onChange={(e) => setLoanTerm(Math.max(0, Number(e.target.value)))}
//                   placeholder="Enter loan term"
//                   className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner w-full"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-4 justify-center mt-4">
//               <button onClick={calculateLoan} className="btn btn-primary">
//                 Calculate Payment
//               </button>
//               <button onClick={resetForm} className="btn btn-outline">
//                 Reset Form
//               </button>
//             </div>
//           </div>

//           {/* Result Card */}
//           {monthlyPayment !== null && (
//             <div className="bg-light dark:bg-darkmode-light p-10 rounded-md shadow-lg mt-10">
//               <h2 className="text-2xl md:text-3xl font-semibold mb-6">Estimated Loan Summary</h2>
//               <p className="text-xl font-semibold mb-2">
//                 Monthly Payment:{" "}
//                 <span className="text-black">RM {monthlyPayment.toFixed(2)}</span>
//               </p>
//               <p className="text-lg mb-1">
//                 Total Repayment:{" "}
//                 <span className="text-black">RM {totalRepayment?.toFixed(2)}</span>
//               </p>
//               <p className="text-lg">
//                 Total Interest Paid:{" "}
//                 <span className="text-black">RM {totalInterest?.toFixed(2)}</span>
//               </p>
//             </div>
//           )}
//         </div>
//       </section>
//       <br />
//       <br />
//     </>
//   );
// };

// export default FinancePage;

"use client";

import React, { useState } from "react";
import PageHeader from "@/partials/PageHeader";

const FinancePage = () => {
  const [carPrice, setCarPrice] = useState<number | "">("");
  const [downPayment, setDownPayment] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [loanTerm, setLoanTerm] = useState<number | "">("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalRepayment, setTotalRepayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    if (carPrice === "" || downPayment === "" || interestRate === "" || loanTerm === "") {
      alert("⚠️ Please fill in all fields before calculating.");
      return;
    }

    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0) {
      alert("Down payment cannot be greater than or equal to car price.");
      return;
    }
    if (numberOfPayments <= 0) {
      alert("Loan term must be greater than 0.");
      return;
    }

    let payment: number;
    if (monthlyRate === 0) {
      payment = principal / numberOfPayments;
    } else {
      payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const total = payment * numberOfPayments;
    const interest = total - principal;

    setMonthlyPayment(payment);
    setTotalRepayment(total);
    setTotalInterest(interest);
  };

  const resetForm = () => {
    setCarPrice("");
    setDownPayment("");
    setInterestRate("");
    setLoanTerm("");
    setMonthlyPayment(null);
    setTotalRepayment(null);
    setTotalInterest(null);
  };

  return (
    <>
      <PageHeader title="Car Loan Calculator" />

      <section className="min-h-screen bg-gradient-gray-1000 dark:from-darkmode dark:via-darkmode-light dark:to-darkmode">
        <div className="container max-w-5xl mx-auto px-4 py-12 space-y-12">
          
          {/* Loan Details */}
          <div className="glass rounded-2xl bg-light dark:bg-darkmode-light p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Loan Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Car Price */}
              <div>
                <label className="text-sm font-medium text-gray-600">Car Price (RM)</label>
                <input
                  type="number"
                  min="0"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Math.max(0, Number(e.target.value)))}
                  placeholder="Enter car price"
                  className="mt-2 w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-inner"
                />
              </div>

              {/* Down Payment */}
              <div>
                <label className="text-sm font-medium text-gray-600">Down Payment (RM)</label>
                <input
                  type="number"
                  min="0"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                  placeholder="Enter down payment"
                  className="mt-2 w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-inner"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="text-sm font-medium text-gray-600">Interest Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  placeholder="Enter interest rate"
                  className="mt-2 w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-inner"
                />
              </div>

              {/* Loan Term */}
              <div>
                <label className="text-sm font-medium text-gray-600">Loan Term (Years)</label>
                <input
                  type="number"
                  min="0"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Math.max(0, Number(e.target.value)))}
                  placeholder="Enter loan term"
                  className="mt-2 w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-inner"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={calculateLoan}
                className="flex-1 bg-black text-white px-6 py-4 rounded-xl font-semibold shadow-md hover:scale-105 transition"
              >
                Calculate Payment
              </button>
              <button
                onClick={resetForm}
                className="flex-1 border border-gray-300 px-6 py-4 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Reset Form
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div className="glass rounded-2xl p-12 bg-light dark:bg-darkmode-light shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Estimated Loan Summary</h2>
            {monthlyPayment !== null ? (
              <>
                <p className="text-5xl font-bold bg-black bg-clip-text text-transparent mb-4">
                  RM {monthlyPayment.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  Monthly payment for a {loanTerm}-year loan at {interestRate}% interest
                </p>
                <div className="mt-6 space-y-2 text-gray-700">
                  <p>
                    <span className="font-medium">Total Repayment:</span>{" "}
                    RM {totalRepayment?.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-medium">Total Interest Paid:</span>{" "}
                    RM {totalInterest?.toFixed(2)}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500">
                After entering loan details, your estimated loan summary will appear here.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FinancePage;
