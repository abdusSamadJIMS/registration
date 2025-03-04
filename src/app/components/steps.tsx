// import React from 'react'

// const Steps = ({ step }: { step: number }) => {
//     return (
//         <div className='flex  justify-center '>
//             <ul className="steps">
//                 <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Coach & Academy</li>
//                 <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Gymnast</li>
//                 <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Payment</li>
//             </ul>
//         </div>
//     )
// }

// export default Steps

const Steps = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
    return (
        <div className="flex justify-center">

            <div className="steps ">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={`step 
                    ${index + 1 <= currentStep ? 'step-primary' : ''}`}
                    >
                        {index === 0 ? "Club Information" : index === 1 ? "Gymnast Details" : "Payment & Confirmation"}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Steps;