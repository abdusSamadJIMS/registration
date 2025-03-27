'use client';
import { useShallow } from 'zustand/react/shallow';
import useRegistrationStore from '@/lib/store/formStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CoachAcademyInformation from '../components/coach-academy-information';
import FormPagination from '../components/form-pagination';
import GymnastInformation from '../components/gymnast-information';
import PaymentInformation from '../components/payment-information';
import Steps from '../components/steps';
import { newEntry } from '@/lib/action';



const Registration = () => {
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);

    const {
        step,
        validateStep,
        clearErrors,
        setStep,
        submitForm,
        bannerPromotion,
        coachAcademy,
        gymnasts,
        payment,
        setPayment
    } = useRegistrationStore(
        useShallow((state) => ({
            step: state.step,
            validateStep: state.validateStep,
            clearErrors: state.clearErrors,
            setStep: state.setStep,
            submitForm: state.submitForm,
            payment: state.payment,
            gymnasts: state.gymnasts,
            coachAcademy: state.coachAcademy,
            bannerPromotion: state.bannerPromotion,
            setPayment: state.setPayment
        }))
    );

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const handleNext = () => {
        if (validateStep(step)) {
            clearErrors();
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        clearErrors();
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        const perGymnastFee = 1800;
        const baseTotalFees = perGymnastFee * gymnasts.length * 1.18;
        const totalFees = bannerPromotion.wantBanner ? baseTotalFees + 1500 : baseTotalFees;
        setPayment({
            fees: totalFees
        })
        const success = submitForm();
        if (success) {
            router.push('/thank-you');

            const res = await newEntry(coachAcademy, gymnasts, bannerPromotion, payment)
            if (res.ok) {
                router.push('/thank-you');
            } else {
                console.error('Error submitting form', res);
                alert('Error submitting form. Please try again later.');
                // router.push('/thank-you');
            }
        } else {
            console.error('Error submitting form');
            alert('Please complete all required fields in step 3');
        }
    };

    if (!isHydrated) {
        return <div className="text-center p-8">Loading registration form...</div>;
    }

    return (
        <section className=''>
            <Steps currentStep={step} totalSteps={3} />
            <div className='flex justify-end mt-5'>
                <span className='text-sm text-info text-right '>
                    All fields are mandatory
                </span>
            </div>
            <div className='mb-8  mt-2 space-y-8'>
                {step === 1 && <CoachAcademyInformation />}
                {step === 2 && <GymnastInformation />}
                {step === 3 && <PaymentInformation />}

                <FormPagination
                    currentStep={step}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    showSubmit={step === 3}
                    onSubmit={handleSubmit}
                />
            </div>
        </section>
    );
};

export default Registration;