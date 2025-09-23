// import React from "react";
// import {
//   Package,
//   DollarSign,
//   TrendingUp,
//   Users,
//   Plus,
//   Settings,
// } from "lucide-react";

// const SellerDashboard: React.FC = () => {
//   const products = [
//     { id: 1, name: "Rambutan", stock: 500, price: "$5.00", status: "Active" },
//     { id: 2, name: "Durian", stock: 200, price: "$8.00", status: "Active" },
//     {
//       id: 3,
//       name: "Mangosteen",
//       stock: 0,
//       price: "$6.50",
//       status: "Out of Stock",
//     },
//   ];

//   const recentSales = [
//     { product: "Rambutan", quantity: 100, revenue: "$500", date: "2025-01-15" },
//     { product: "Durian", quantity: 50, revenue: "$400", date: "2025-01-14" },
//     {
//       product: "Mangosteen",
//       quantity: 75,
//       revenue: "$487.50",
//       date: "2025-01-12",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Seller Dashboard
//             </h1>
//             <p className="text-gray-600">
//               Manage your products and track your sales performance.
//             </p>
//           </div>
//           <button className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
//             <Plus className="h-5 w-5" />
//             <span>Add Product</span>
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center">
//               <div className="bg-green-100 rounded-lg p-3 mr-4">
//                 <DollarSign className="h-6 w-6 text-green-600" />
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">$8,450</div>
//                 <div className="text-gray-600 text-sm">Monthly Revenue</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center">
//               <div className="bg-blue-100 rounded-lg p-3 mr-4">
//                 <Package className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">15</div>
//                 <div className="text-gray-600 text-sm">Active Products</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center">
//               <div className="bg-purple-100 rounded-lg p-3 mr-4">
//                 <Users className="h-6 w-6 text-purple-600" />
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">89</div>
//                 <div className="text-gray-600 text-sm">Orders This Month</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center">
//               <div className="bg-secondary rounded-lg p-3 mr-4">
//                 <TrendingUp className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">+12%</div>
//                 <div className="text-gray-600 text-sm">Growth Rate</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Product Management */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-900 flex items-center">
//                 <Package className="h-5 w-5 mr-2 text-primary" />
//                 Your Products
//               </h2>
//               <button className="text-primary hover:text-secondary flex items-center space-x-1">
//                 <Settings className="h-4 w-4" />
//                 <span className="text-sm">Manage</span>
//               </button>
//             </div>
//             <div className="space-y-4">
//               {products.map((product) => (
//                 <div
//                   key={product.id}
//                   className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
//                 >
//                   <div>
//                     <div className="font-medium text-gray-900">
//                       {product.name}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       Stock: {product.stock} units • {product.price}
//                     </div>
//                   </div>
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       product.status === "Active"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {product.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recent Sales */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
//               <TrendingUp className="h-5 w-5 mr-2 text-primary" />
//               Recent Sales
//             </h2>
//             <div className="space-y-4">
//               {recentSales.map((sale, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
//                 >
//                   <div>
//                     <div className="font-medium text-gray-900">
//                       {sale.product}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       Quantity: {sale.quantity} • {sale.date}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-medium text-green-600">
//                       {sale.revenue}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;
