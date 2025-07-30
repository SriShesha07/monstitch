import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductDetail from "../../pages/admin/ProductDetail";
import OrderDetail from "../../pages/admin/OrderDetail";
import Layout from "../../componentss/layout/Layout";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="p-5 min-h-screen bg-black text-white">
        {/* Top Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold border border-white py-4 rounded-md">
            Admin Dashboard
          </h1>
        </div>

        {/* Tab Area */}
        <div className="border border-white p-5 rounded-lg">
          <Tabs defaultIndex={0}>
            {/* Tab Buttons */}
            <TabList className="flex justify-center gap-10 mb-10">
              <Tab className="border border-white px-10 py-4 rounded-md text-lg font-semibold cursor-pointer hover:bg-white hover:text-black transition">
                Orders
              </Tab>
              <Tab className="border border-white px-10 py-4 rounded-md text-lg font-semibold cursor-pointer hover:bg-white hover:text-black transition">
                Products
              </Tab>
            </TabList>

            {/* Tab Contents */}
            <TabPanel>
              <div className="border border-white p-10 rounded-lg">
                <OrderDetail />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="border border-white p-10 rounded-lg">
                <ProductDetail />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
