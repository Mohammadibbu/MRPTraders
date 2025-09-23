// import React from "react";
// import {
//   Package,
//   Clock,
//   CheckCircle,
//   Bell,
//   ShoppingCart,
//   TrendingUp,
// } from "lucide-react";

// const ClientDashboard: React.FC = () => {
//   const recentOrders = [
//     {
//       id: "001",
//       product: "Rambutan",
//       status: "Shipped",
//       date: "2025-01-15",
//       value: "$500",
//     },
//     {
//       id: "002",
//       product: "Dragon Fruit",
//       status: "Processing",
//       date: "2025-01-14",
//       value: "$320",
//     },
//     {
//       id: "003",
//       product: "Mangosteen",
//       status: "Delivered",
//       date: "2025-01-10",
//       value: "$650",
//     },
//   ];

//   const notifications = [
//     "Your Rambutan order has been shipped",
//     "New Dragon Fruit batch available",
//     "Payment received for order #003",
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
//           <p className="text-gray-600">
//             Welcome back! Here's an overview of your trading activities.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center">
//               <div className="bg-blue-100 rounded-lg p-3 mr-4">
//                 <Package className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">12</div>
//                 <div className="text-gray-600 text-sm">Active Orders</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center">
//               <div className="bg-yellow-100 rounded-lg p-3 mr-4">
//                 <Clock className="h-6 w-6 text-yellow-600" />
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">5</div>
//                 <div className="text-gray-600 text-sm">Pending</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center">
//               <div className="bg-green-100 rounded-lg p-3 mr-4">
//                 <CheckCircle className="h-6 w-6 text-green-600" />
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">45</div>
//                 <div className="text-gray-600 text-sm">Completed</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center">
//               <div className="bg-[#CCBBAE] rounded-lg p-3 mr-4">
//                 <TrendingUp className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">$12.5K</div>
//                 <div className="text-gray-600 text-sm">Total Spent</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Recent Orders */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
//               <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
//               Recent Orders
//             </h2>
//             <div className="space-y-4">
//               {recentOrders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
//                 >
//                   <div>
//                     <div className="font-medium text-gray-900">
//                       {order.product}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       Order #{order.id} • {order.date}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-medium text-gray-900">
//                       {order.value}
//                     </div>
//                     <span
//                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         order.status === "Delivered"
//                           ? "bg-green-100 text-green-800"
//                           : order.status === "Shipped"
//                           ? "bg-blue-100 text-blue-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Notifications */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
//               <Bell className="h-5 w-5 mr-2 text-primary" />
//               Notifications
//             </h2>
//             <div className="space-y-3">
//               {notifications.map((notification, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center p-3 bg-gray-50 rounded-lg"
//                 >
//                   <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
//                   <span className="text-gray-700">{notification}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;
