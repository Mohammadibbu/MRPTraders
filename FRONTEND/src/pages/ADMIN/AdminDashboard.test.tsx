import React from "react";
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  Settings,
  BarChart3,
} from "lucide-react";

const AdminDashboardTest: React.FC = () => {
  const pendingApprovals = [
    { id: 1, name: "ABC Fruits Ltd", type: "Seller", date: "2025-01-15" },
    { id: 2, name: "Global Import Co", type: "Client", date: "2025-01-14" },
    { id: 3, name: "Premium Exports", type: "Seller", date: "2025-01-13" },
  ];

  const systemStats = [
    { label: "Total Users", value: "1,247", change: "+12%" },
    { label: "Active Sellers", value: "156", change: "+8%" },
    { label: "Monthly Orders", value: "2,340", change: "+15%" },
    { label: "Platform Revenue", value: "$125,640", change: "+22%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Platform overview and management tools.
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </button>
            <button className="bg-gradient-to-r from-primary to-[#CCBBAE] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3 mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,247</div>
                <div className="text-gray-600 text-sm">Total Users</div>
                <div className="text-green-600 text-sm font-medium">
                  +12% this month
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3 mr-4">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2,340</div>
                <div className="text-gray-600 text-sm">Monthly Orders</div>
                <div className="text-green-600 text-sm font-medium">
                  +15% this month
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3 mr-4">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">$125.6K</div>
                <div className="text-gray-600 text-sm">Platform Revenue</div>
                <div className="text-green-600 text-sm font-medium">
                  +22% this month
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-lg p-3 mr-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">7</div>
                <div className="text-gray-600 text-sm">Pending Reviews</div>
                <div className="text-yellow-600 text-sm font-medium">
                  Requires attention
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Approvals */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-primary" />
                Pending Approvals
              </h2>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {pendingApprovals.length} pending
              </span>
            </div>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.type} • {item.date}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-medium hover:bg-green-200 transition-colors">
                      Approve
                    </button>
                    <button className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium hover:bg-red-200 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Analytics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Platform Analytics
            </h2>
            <div className="space-y-4">
              {systemStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 text-sm font-medium">
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-primary text-white p-4 rounded-lg hover:bg-opacity-90 transition-all duration-200">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <div className="font-medium">Manage Users</div>
            </button>
            <button className="bg-[#CCBBAE] text-white p-4 rounded-lg hover:bg-opacity-90 transition-all duration-200">
              <Package className="h-6 w-6 mx-auto mb-2" />
              <div className="font-medium">Product Moderation</div>
            </button>
            <button className="bg-gray-600 text-white p-4 rounded-lg hover:bg-opacity-90 transition-all duration-200">
              <BarChart3 className="h-6 w-6 mx-auto mb-2" />
              <div className="font-medium">View Reports</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardTest;
