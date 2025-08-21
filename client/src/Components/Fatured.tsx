import { FaTruck, FaHeadphones, FaShieldAlt } from "react-icons/fa"

export default function Featured() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]  bg-white p-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
        <div className="flex flex-col items-center text-center gap-2 p-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 border border-gray-300 mb-4">
            <FaTruck className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-bold uppercase tracking-wide">FREE AND FAST DELIVERY</h3>
          <p className="text-sm text-gray-600">Free delivery for all orders over $140</p>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 border border-gray-300 mb-4">
            <FaHeadphones className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-bold uppercase tracking-wide">24/7 CUSTOMER SERVICE</h3>
          <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 border border-gray-300 mb-4">
            <FaShieldAlt className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-bold uppercase tracking-wide">MONEY BACK GUARANTEE</h3>
          <p className="text-sm text-gray-600">We return money within 30 days</p>
        </div>
      </div>
    </div>
  )
}
