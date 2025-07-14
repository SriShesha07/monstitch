import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductDetail from "../../pages/admin/ProductDetail";
import OrderDetail from "../../pages/admin/OrderDetail";
import UserDetail from "../../pages/admin/UserDetail";
import { useContext } from "react";
import myContext from "../../context/myContext";
import Layout from "../../componentss/layout/Layout";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { getAllProduct, getAllOrder, getAllUser } = context;

  return (
    <Layout>
      <div>
        {/* Top */}
        <div className="top mb-5 px-5 mt-5">
          <div className=" bg-black py-5 border border-white rounded-lg">
            <h1 className=" text-center text-2xl font-bold text-white">
              Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="px-5">
          {/* Mid  */}
          <div className="mid mb-5">
            {/* main  */}
            <div className=" bg-black-50 py-5 rounded-xl border border-white shadow-md">
              {/* image  */}
              <div className="flex justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt=""
                />
              </div>
              {/* text  */}
              <div className="">
                {/* Name  */}
                <h1 className=" text-center text-lg text-white">
                  <span className=" font-bold">Name : </span>
                  {user?.name}
                </h1>

                {/* Email  */}
                <h1 className=" text-center text-lg text-white">
                  <span className=" font-bold">Email : </span>
                  {user?.email}
                </h1>

                {/* Date  */}
                <h1 className=" text-center text-lg text-white">
                  <span className=" font-bold">Date : </span>
                  {user?.date}
                </h1>

                {/* Role  */}
                <h1 className=" text-center text-lg text-white">
                  <span className=" font-bold">Role : </span>
                  {user?.role}
                </h1>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="">
            <Tabs>
              <TabList className="flex flex-wrap -m-4 text-center justify-center">
                {/* Total Products */}
                <Tab className="focus:outline-none p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                  <div className="group border bg-black hover:bg-white border-white px-4 py-3 rounded-xl transition-colors duration-200">
                    <div className="w-12 h-12 mb-3 inline-block text-white group-hover:text-black transition-colors duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={50}
                        height={50}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shopping-basket"
                      >
                        <path d="m5 11 4-7" />
                        <path d="m19 11-4-7" />
                        <path d="M2 11h20" />
                        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                        <path d="m9 11 1 9" />
                        <path d="M4.5 15.5h15" />
                        <path d="m15 11-1 9" />
                      </svg>
                    </div>

                    <h2 className="title-font font-medium text-3xl text-white group-hover:text-black transition-colors duration-200 fonts1">
                      {getAllProduct.length}
                    </h2>

                    <p className="text-white font-bold group-hover:text-black transition-colors duration-200">
                      Total Products
                    </p>
                  </div>
                </Tab>

                {/* Total Order  */}
                {/* Total Orders */}
                <Tab className="focus:outline-none p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                  <div className="group border bg-black hover:bg-white border-white px-4 py-3 rounded-xl transition-colors duration-200">
                    <div className="text-white group-hover:text-black w-12 h-12 mb-3 inline-block transition-colors duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={50}
                        height={50}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-list-ordered"
                      >
                        <line x1={10} x2={21} y1={6} y2={6} />
                        <line x1={10} x2={21} y1={12} y2={12} />
                        <line x1={10} x2={21} y1={18} y2={18} />
                        <path d="M4 6h1v4" />
                        <path d="M4 10h2" />
                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                      </svg>
                    </div>
                    <h2 className="title-font font-medium text-3xl text-white group-hover:text-black transition-colors duration-200 fonts1">
                      {getAllOrder.length}
                    </h2>
                    <p className="text-white font-bold group-hover:text-black transition-colors duration-200">
                      Total Order
                    </p>
                  </div>
                </Tab>

                {/* Total Users */}
                <Tab className="focus:outline-none p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                  <div className="group border bg-black hover:bg-white border-white px-4 py-3 rounded-xl transition-colors duration-200">
                    <div className="text-white group-hover:text-black w-12 h-12 mb-3 inline-block transition-colors duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={50}
                        height={50}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-users"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx={9} cy={7} r={4} />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h2 className="title-font font-medium text-3xl text-white group-hover:text-black transition-colors duration-200 fonts1">
                      {getAllUser.length}
                    </h2>
                    <p className="text-white font-bold group-hover:text-black transition-colors duration-200">
                      Total Users
                    </p>
                  </div>
                </Tab>
              </TabList>

              <TabPanel>
                <div className="mt-20">
                <ProductDetail />
                </div>
              </TabPanel>

              <TabPanel>
                 <div className="mt-20">
                <OrderDetail />
                </div>
              </TabPanel>

              <TabPanel>
                 <div className="mt-20">
                <UserDetail />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
