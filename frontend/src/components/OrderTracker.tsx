import React from 'react';

interface OrderTrackerProps {
  orderDate: string;
  status: 'placed' | 'shipped' | 'delivered';
}

const steps = ['placed', 'shipped', 'delivered'] as const;

const OrderTracker: React.FC<OrderTrackerProps> = ({ orderDate, status }) => {
  const currentStep = steps.indexOf(status);

  return (
    <div className="w-full md:w-[50%] ">
      {/* Horizontal layout for md+ screens */}
      <div className="hidden sm:flex justify-between items-center relative">
        {/* Line behind dots */}
        <div className="absolute top-2.5 left-0 w-full h-0.5 bg-gray-300 z-0">
          <div
            className="bg-secondary h-0.5 transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center z-10 flex-1 text-center">
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                index <= currentStep
                  ? 'bg-secondary border-secondary'
                  : 'bg-white border-gray-300'
              }`}
            ></div>
            <span
              className={`text-xs mt-2 ${
                index <= currentStep ? 'text-secondary font-medium' : 'text-gray-400'
              }`}
            >
              {step === 'placed'
                ? `Placed\n(${new Date(orderDate).toLocaleDateString()})`
                : step.charAt(0).toUpperCase() + step.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Vertical layout for small screens */}
      <div className="flex sm:hidden flex-col gap-4 relative pl-5 border-l-2 border-gray-200 mt-4">
        {steps.map((step, index) => (
          <div key={step} className="relative flex items-center  ">
            {/* Dot */}
            <div
              className={`absolute -left-[10px]  w-3 h-3 rounded-full border-2 ${
                index <= currentStep
                  ? 'bg-secondary border-secondary'
                  : 'bg-white border-gray-300'
              }`}
            ></div>
            {/* Label */}
            <p
              className={`text-sm ml-[10px] ${
                index <= currentStep ? 'text-secondary font-medium' : 'text-gray-400'
              }`}
            >
              {step === 'placed'
                ? `Order placed on ${new Date(orderDate).toLocaleDateString()}`
                : step.charAt(0).toUpperCase() + step.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;
