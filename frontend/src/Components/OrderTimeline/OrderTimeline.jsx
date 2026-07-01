const OrderTimeline = ({ status }) => {

    const steps = [
        "Processing",
        "Confirmed",
        "Shipped",
        "Delivered"
    ];

    const currentStep = steps.indexOf(status);

    return (
        <div className="max-w-md mx-auto py-6">

            {steps.map((step, index) => (

                <div
                    key={step}
                    className="flex items-start"
                >

                    <div className="flex flex-col items-center">

                        {/* Circle */}
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold
                            ${
                                index <= currentStep
                                    ? "bg-[#C9A227]"
                                    : "bg-gray-300"
                            }`}
                        >
                            {index + 1}
                        </div>

                        {/* Line */}
                        {index !== steps.length - 1 && (
                            <div
                                className={`w-1 h-16
                                ${
                                    index < currentStep
                                        ? "bg-[#C9A227]"
                                        : "bg-gray-300"
                                }`}
                            />
                        )}

                    </div>

                    <div className="ml-5">

                        <h3
                            className={`font-semibold
                            ${
                                index <= currentStep
                                    ? "text-black"
                                    : "text-gray-400"
                            }`}
                        >
                            {step}
                        </h3>

                    </div>

                </div>
            ))}

        </div>
    );
};

export default OrderTimeline;