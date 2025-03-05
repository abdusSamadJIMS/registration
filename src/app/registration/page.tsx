// 'use client'
// import React, { useState } from 'react'
// import Steps from '../components/steps'
// import CoachAcademyInformation from '../components/coach-academy-information'
// import FormPagination from '../components/form-pagination'
// import GymnastInformation from '../components/gymnast-information'
// import PaymentInformation from '../components/payment-information'

// const Registration = () => {
//     const [coachAcademy, setCoachAcademy] = useState({
//         clubName: "",
//         clubLocation: "",
//         coachName: "",
//         email: "",
//         phone: ""
//     })

//     const [gymnast, setGymnast] = useState([{
//         discipline: "",
//         level: "",
//         gymnastName: "",
//         gender: "",
//         ageCategory: "",
//     }])

//     const [payment, setPayment] = useState({
//         paymentMode: "",
//         fees: coachAcademy.clubLocation ? coachAcademy.clubLocation === "delhi" ? 1999 : 3999 : 0,
//         paymentScreenshot: new File([""], "screenshot") as File | undefined,
//         eligibility: false,
//         understand: false

//     })

//     const [step, setStep] = useState(1)
//     return (
//         <main className='container max-w-2xl mx-auto '>
//             <Steps
//                 step={step}
//             />
//             <div className='my-20'>
//                 {
//                     step === 1 && (
//                         <CoachAcademyInformation
//                             coachAcademy={coachAcademy}
//                             setCoachAcademy={setCoachAcademy}
//                         />
//                     )
//                 }

//                 {
//                     step === 2 && (
//                         <GymnastInformation
//                             gymnast={gymnast}
//                             setGymnast={setGymnast}
//                         />
//                     )
//                 }

//                 {
//                     step === 3 && (
//                         <PaymentInformation
//                             payment={payment}
//                             setPayment={setPayment}
//                         />
//                     )
//                 }

//                 {/* <button type="button" className='btn'
//                     onClick={() => {
//                         console.log("Payment: ", payment)
//                     }}
//                 >
//                     show payment
//                 </button> */}
//                 <FormPagination
//                     state={step}
//                     setState={setStep}
//                 />
//             </div>
//         </main>
//     )
// }

// export default Registration

// 'use client';
// import { useShallow } from 'zustand/react/shallow';
// import useRegistrationStore from '@/lib/store/formStore';
// import { useEffect } from 'react';
// import CoachAcademyInformation from '../components/coach-academy-information';
// import GymnastInformation from '../components/gymnast-information';
// import PaymentInformation from '../components/payment-information';
// import FormPagination from '../components/form-pagination';
// import Steps from '../components/steps';
// import { useRouter } from 'next/navigation';

// const Registration = () => {
//     // const router = useRouter();

//     const {
//         step,
//         validateStep,
//         clearErrors,
//         setStep,
//         submitForm
//     } = useRegistrationStore(
//         useShallow((state) => ({
//             step: state.step,
//             validateStep: state.validateStep,
//             clearErrors: state.clearErrors,
//             setStep: state.setStep,
//             submitForm: state.submitForm
//         }))
//     );

//     const handleSubmit = () => {
//         submitForm();
//         // router.push('/thank-you');
//     };
//     const handleNext = () => {
//         if (validateStep(step)) {
//             clearErrors();
//             setStep(step + 1);
//         }
//     };

//     const handlePrevious = () => {
//         clearErrors();
//         setStep(step - 1);
//     };

//     useEffect(() => {
//         return () => clearErrors();
//     }, [clearErrors]);

//     return (
//         <main className='container max-w-2xl mx-auto p-4'>
//             <Steps currentStep={step} totalSteps={3} />

//             <div className='my-8 space-y-8'>
//                 {step === 1 && <CoachAcademyInformation />}
//                 {step === 2 && <GymnastInformation />}
//                 {step === 3 && <PaymentInformation />}

//                 <FormPagination
//                     currentStep={step}
//                     onNext={handleNext}
//                     onPrevious={handlePrevious}
//                     showSubmit={step === 3}
//                     onSubmit={handleSubmit}
//                 />
//             </div>
//         </main>
//     );
// };

// export default Registration;

// 'use client';
// import { useShallow } from 'zustand/react/shallow';
// import useRegistrationStore from '@/lib/store/formStore';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import CoachAcademyInformation from '../components/coach-academy-information';
// import FormPagination from '../components/form-pagination';
// import GymnastInformation from '../components/gymnast-information';
// import PaymentInformation from '../components/payment-information';
// import Steps from '../components/steps';


// const Registration = () => {
//     const router = useRouter();
//     const [isHydrated, setIsHydrated] = useState(false);

//     const {
//         step,
//         validateStep,
//         clearErrors,
//         setStep,
//         submitForm
//     } = useRegistrationStore(
//         useShallow((state) => ({
//             step: state.step,
//             validateStep: state.validateStep,
//             clearErrors: state.clearErrors,
//             setStep: state.setStep,
//             submitForm: state.submitForm
//         }))
//     );

//     useEffect(() => {
//         setIsHydrated(true);
//     }, []);

//     const handleNext = () => {
//         if (validateStep(step)) {
//             clearErrors();
//             setStep(step + 1);
//         }
//     };

//     const handlePrevious = () => {
//         clearErrors();
//         setStep(step - 1);
//     };

//     const handleSubmit = () => {
//         const success = submitForm();
//         if (success) {
//             router.push('/thank-you');
//         } else {
//             alert('Please complete all required fields in step 3');
//         }
//     };

//     if (!isHydrated) {
//         return <div className="text-center p-8">Loading registration form...</div>;
//     }

//     return (
//         <main className='container max-w-2xl mx-auto p-4 min-h-screen'>
//             <Steps currentStep={step} totalSteps={3} />

//             <div className='my-8 space-y-8'>
//                 {step === 1 && <CoachAcademyInformation />}
//                 {step === 2 && <GymnastInformation />}
//                 {step === 3 && <PaymentInformation />}

//                 <FormPagination
//                     currentStep={step}
//                     onNext={handleNext}
//                     onPrevious={handlePrevious}
//                     showSubmit={step === 3}
//                     onSubmit={handleSubmit}
//                 />
//             </div>
//         </main>
//     );
// };

// export default Registration;

import React from 'react'
import Registration from '../components/registration'

const page = () => {
    return (
        <main className='container max-w-2xl mx-auto p-4 min-h-screen'>
            <h1 className='text-2xl font-bold text-primary flex flex-col justify-center items-center py-3'>
                Registration Form - All India Level Wise Gymnastics Competition 2025
            </h1>
            <span className="divider"></span>
            <Registration />
        </main>
    )
}

export default page