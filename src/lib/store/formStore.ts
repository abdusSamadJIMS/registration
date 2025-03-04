// // import { create } from 'zustand';

// // type Gymnast = {
// //     discipline: string;
// //     level: string;
// //     gymnastName: string;
// //     gender: string;
// //     ageCategory: string;
// // };

// // type FormState = {
// //     step: number;
// //     coachAcademy: {
// //         clubName: string;
// //         clubLocation: string;
// //         coachName: string;
// //         email: string;
// //         phone: string;
// //     };
// //     gymnasts: Gymnast[];
// //     payment: {
// //         paymentMode: string;
// //         fees: number;
// //         paymentScreenshot: File | null;
// //         eligibility: boolean;
// //         understand: boolean;
// //     };
// //     validationErrors: Record<string, string>;
// // };

// // type FormActions = {
// //     setStep: (step: number) => void;
// //     setCoachAcademy: (data: Partial<FormState['coachAcademy']>) => void;
// //     setGymnasts: (gymnasts: Gymnast[]) => void;
// //     setPayment: (data: Partial<FormState['payment']>) => void;
// //     validateStep: (step: number) => boolean;
// //     clearErrors: () => void;
// //     submitForm: () => void;
// // };

// // const useRegistrationStore = create<FormState & FormActions>((set, get) => ({
// //     step: 1,
// //     coachAcademy: {
// //         clubName: "",
// //         clubLocation: "",
// //         coachName: "",
// //         email: "",
// //         phone: ""
// //     },
// //     gymnasts: [{
// //         discipline: "",
// //         level: "",
// //         gymnastName: "",
// //         gender: "",
// //         ageCategory: "",
// //     }],
// //     payment: {
// //         paymentMode: "",
// //         fees: 0,
// //         paymentScreenshot: null,
// //         eligibility: false,
// //         understand: false
// //     },
// //     validationErrors: {},

// //     submitForm: () => {
// //         const state = get();
// //         if (!state.validateStep(3)) {
// //             return
// //         }
// //         console.log('--- FORM SUBMISSION DATA ---');
// //         console.log('Coach/Academy Info:', state.coachAcademy);
// //         console.log('Gymnasts:', state.gymnasts);
// //         console.log('Payment Details:', {
// //             ...state.payment,
// //             paymentScreenshot: state.payment.paymentScreenshot?.name || 'No file'
// //         });

// //         //backend logic

// //         set({
// //             step: 1,
// //             coachAcademy: {
// //                 clubName: "",
// //                 clubLocation: "",
// //                 coachName: "",
// //                 email: "",
// //                 phone: ""
// //             },
// //             gymnasts: [{
// //                 discipline: "",
// //                 level: "",
// //                 gymnastName: "",
// //                 gender: "",
// //                 ageCategory: "",
// //             }],
// //             payment: {
// //                 paymentMode: "",
// //                 fees: 0,
// //                 paymentScreenshot: null,
// //                 eligibility: false,
// //                 understand: false
// //             },
// //             validationErrors: {}
// //         });
// //     },


// //     setStep: (step) => set({ step }),

// //     setCoachAcademy: (data) => set((state) => {
// //         const isDelhi = data.clubLocation?.toLowerCase() === "delhi";
// //         const perGymnastFee = isDelhi ? 1999 : 3999;
// //         return {
// //             coachAcademy: { ...state.coachAcademy, ...data },
// //             payment: {
// //                 ...state.payment,
// //                 fees: perGymnastFee * state.gymnasts.length
// //             }
// //         };
// //     }),

// //     setGymnasts: (gymnasts) => set((state) => {
// //         const isDelhi = state.coachAcademy.clubLocation.toLowerCase() === "delhi";
// //         const perGymnastFee = isDelhi ? 1999 : 3999;
// //         return {
// //             gymnasts,
// //             payment: {
// //                 ...state.payment,
// //                 fees: perGymnastFee * gymnasts.length
// //             }
// //         };
// //     }),

// //     setPayment: (data) => set((state) => ({
// //         payment: { ...state.payment, ...data }
// //     })),

// //     validateStep: (step) => {
// //         const errors: Record<string, string> = {};
// //         const state = get();

// //         switch (step) {
// //             case 1:
// //                 if (!state.coachAcademy.clubName) errors.clubName = "Required";
// //                 if (!state.coachAcademy.clubLocation) errors.clubLocation = "Required";
// //                 if (!state.coachAcademy.coachName) errors.coachName = "Required";
// //                 if (!/^\d{10}$/.test(state.coachAcademy.phone)) errors.phone = "Invalid phone number";
// //                 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.coachAcademy.email)) errors.email = "Invalid email";
// //                 break;

// //             case 2:
// //                 state.gymnasts.forEach((g, index) => {
// //                     if (!g.discipline) errors[`gymnasts[${index}].discipline`] = "Required";
// //                     if (!g.level) errors[`gymnasts[${index}].level`] = "Required";
// //                     if (!g.gymnastName) errors[`gymnasts[${index}].gymnastName`] = "Required";
// //                     if (!g.gender) errors[`gymnasts[${index}].gender`] = "Required";
// //                     if (!g.ageCategory) errors[`gymnasts[${index}].ageCategory`] = "Required";
// //                 });
// //                 break;

// //             case 3:
// //                 if (!state.payment.paymentMode) errors.paymentMode = "Required";
// //                 if (!state.payment.paymentScreenshot) errors.paymentScreenshot = "Required";
// //                 if (!state.payment.eligibility) errors.eligibility = "Required";
// //                 if (!state.payment.understand) errors.understand = "Required";
// //                 break;
// //         }

// //         set({ validationErrors: errors });
// //         return Object.keys(errors).length === 0;
// //     },

// //     clearErrors: () => set({ validationErrors: {} })


// // }));

// // export default useRegistrationStore;


// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

// type Gymnast = {
//     discipline: string;
//     level: string;
//     gymnastName: string;
//     dob: string;
//     ageCategory: string;
// };


// type FormState = {
//     step: number;
//     coachAcademy: {
//         clubName: string;
//         clubLocation: string;
//         clubRegion: string;
//         coachName: string;
//         email: string;
//         phone: string;
//     };
//     gymnasts: Gymnast[];

//     payment: {
//         paymentMode: string;
//         fees: number;
//         paymentScreenshot: File | null;
//         eligibility: boolean;
//         understand: boolean;
//     };
//     validationErrors: Record<string, string>;
// };

// type FormActions = {
//     setStep: (step: number) => void;
//     setCoachAcademy: (data: Partial<FormState['coachAcademy']>) => void;
//     setGymnasts: (gymnasts: Gymnast[]) => void;
//     setPayment: (data: Partial<FormState['payment']>) => void;
//     validateStep: (step: number) => boolean;
//     clearErrors: () => void;
//     submitForm: () => boolean;
//     clearPersistedStore: () => void;
// };

// const useRegistrationStore = create<FormState & FormActions>()(
//     persist(
//         (set, get) => ({
//             step: 1,
//             coachAcademy: {
//                 clubName: "",
//                 clubLocation: "",
//                 clubRegion: "",
//                 coachName: "",
//                 email: "",
//                 phone: ""
//             },
//             gymnasts: [{
//                 discipline: "",
//                 level: "",
//                 gymnastName: "",
//                 dob: "",
//                 ageCategory: "",
//             }],
//             payment: {
//                 paymentMode: "",
//                 fees: 0,
//                 paymentScreenshot: null,
//                 eligibility: false,
//                 understand: false
//             },
//             validationErrors: {},

//             setStep: (step) => set({ step }),

//             setCoachAcademy: (data) => set((state) => ({
//                 coachAcademy: { ...state.coachAcademy, ...data },
//                 payment: {
//                     ...state.payment,
//                     fees: data.clubLocation?.toLowerCase() === "delhi" ? 1999 * state.gymnasts.length : 3999 * state.gymnasts.length
//                 }
//             })),

//             setGymnasts: (gymnasts) => set((state) => ({
//                 gymnasts,
//                 payment: {
//                     ...state.payment,
//                     fees: state.coachAcademy.clubLocation.toLowerCase() === "delhi" ? 1999 * gymnasts.length : 3999 * gymnasts.length
//                 }
//             })),

//             setPayment: (data) => set((state) => ({
//                 payment: { ...state.payment, ...data }
//             })),

//             validateStep: (step) => {
//                 const errors: Record<string, string> = {};
//                 const state = get();

//                 switch (step) {
//                     case 1:
//                         if (!state.coachAcademy.clubName) errors.clubName = "Required";
//                         if (!state.coachAcademy.clubLocation) errors.clubLocation = "Required";
//                         if (!state.coachAcademy.coachName) errors.coachName = "Required";
//                         if (!/^\d{10}$/.test(state.coachAcademy.phone)) errors.phone = "Invalid phone number";
//                         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.coachAcademy.email)) errors.email = "Invalid email";
//                         break;

//                     case 2:
//                         state.gymnasts.forEach((g, index) => {
//                             if (!g.discipline) errors[`gymnasts[${index}].discipline`] = "Required";
//                             if (!g.level) errors[`gymnasts[${index}].level`] = "Required";
//                             if (!g.gymnastName) errors[`gymnasts[${index}].gymnastName`] = "Required";
//                             if (!g.dob) errors[`gymnasts[${index}].dob`] = "Required";
//                             if (!g.ageCategory) errors[`gymnasts[${index}].ageCategory`] = "Required";
//                         });
//                         break;

//                     case 3:
//                         if (!state.payment.paymentMode) errors.paymentMode = "Required";
//                         if (!state.payment.paymentScreenshot) errors.paymentScreenshot = "Required";
//                         if (!state.payment.eligibility) errors.eligibility = "Required";
//                         if (!state.payment.understand) errors.understand = "Required";
//                         break;
//                 }

//                 set({ validationErrors: errors });
//                 return Object.keys(errors).length === 0;
//             },

//             clearErrors: () => set({ validationErrors: {} }),

//             submitForm: () => {
//                 const state = get();

//                 // Validate final step before submission
//                 if (!state.validateStep(3)) {
//                     console.log('Submission blocked - validation failed');
//                     return false;
//                 }

//                 console.log('Submitting data:', state);
//                 get().clearPersistedStore();
//                 return true;
//             },

//             clearPersistedStore: () => set({
//                 step: 1,
//                 coachAcademy: {
//                     clubName: "",
//                     clubRegion: "",
//                     clubLocation: "",
//                     coachName: "",
//                     email: "",
//                     phone: ""
//                 },
//                 gymnasts: [{
//                     discipline: "",
//                     level: "",
//                     gymnastName: "",
//                     dob: "",
//                     ageCategory: "",
//                 }],
//                 payment: {
//                     paymentMode: "",
//                     fees: 0,
//                     paymentScreenshot: null,
//                     eligibility: false,
//                     understand: false
//                 },
//                 validationErrors: {}
//             })
//         }),
//         {
//             name: 'gymnastics-registration-store',
//             storage: createJSONStorage(() => localStorage),
//             partialize: (state) => ({
//                 step: state.step,
//                 coachAcademy: state.coachAcademy,
//                 gymnasts: state.gymnasts,
//                 payment: {
//                     ...state.payment,
//                     paymentScreenshot: null // Files can't be persisted in localStorage
//                 }
//             })
//         }
//     )
// );

// export default useRegistrationStore;

// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

// export type Gymnast = {
//     discipline: string;
//     level: string;
//     gymnastName: string;
//     dob: string;
//     ageCategory: string;
// };

// type FormState = {
//     step: number;
//     coachAcademy: {
//         clubName: string;
//         clubLocation: string;
//         clubRegion: string;
//         coachName: string;
//         email: string;
//         phone: string;
//     };
//     gymnasts: Gymnast[];
//     bannerPromotion: {
//         wantBanner: boolean | null; // Yes (true) / No (false) / Not selected (null)
//         bannerFile: string;
//     };
//     payment: {
//         paymentMode: string;
//         fees: number;
//         paymentScreenshot: string;
//         eligibility: boolean;
//         understand: boolean;
//     };
//     validationErrors: Record<string, string>;
// };

// type FormActions = {
//     setStep: (step: number) => void;
//     setCoachAcademy: (data: Partial<FormState['coachAcademy']>) => void;
//     setGymnasts: (gymnasts: Gymnast[]) => void;
//     setBannerPromotion: (data: Partial<FormState['bannerPromotion']>) => void;
//     setPayment: (data: Partial<FormState['payment']>) => void;
//     validateStep: (step: number) => boolean;
//     clearErrors: () => void;
//     submitForm: () => boolean;
//     clearPersistedStore: () => void;
// };

// const useRegistrationStore = create<FormState & FormActions>()(
//     persist(
//         (set, get) => ({
//             step: 1,
//             coachAcademy: {
//                 clubName: "",
//                 clubLocation: "",
//                 clubRegion: "",
//                 coachName: "",
//                 email: "",
//                 phone: ""
//             },
//             gymnasts: [{
//                 discipline: "",
//                 level: "",
//                 gymnastName: "",
//                 dob: "",
//                 ageCategory: "",
//             }],
//             bannerPromotion: {
//                 wantBanner: null,
//                 bannerFile: ""
//             },
//             payment: {
//                 paymentMode: "",
//                 fees: 0,
//                 paymentScreenshot: "",
//                 eligibility: false,
//                 understand: false
//             },
//             validationErrors: {},

//             setStep: (step) => set({ step }),

//             setCoachAcademy: (data) => set((state) => ({
//                 coachAcademy: { ...state.coachAcademy, ...data },
//                 payment: {
//                     ...state.payment,
//                     fees: (data.clubLocation?.toLowerCase() === "delhi" ? 1999 : 3999) * state.gymnasts.length
//                 }
//             })),

//             setGymnasts: (gymnasts) => set((state) => ({
//                 gymnasts,
//                 payment: {
//                     ...state.payment,
//                     fees: (state.coachAcademy.clubLocation.toLowerCase() === "delhi" ? 1999 : 3999) * gymnasts.length
//                 }
//             })),

//             setBannerPromotion: (data) => set((state) => {
//                 const wantBanner = data.wantBanner ?? state.bannerPromotion.wantBanner;
//                 const bannerFile = data.bannerFile ?? state.bannerPromotion.bannerFile;

//                 let updatedFees = state.payment.fees;

//                 // Update fee based on banner selection
//                 if (wantBanner === true) {
//                     updatedFees += 1500; // Add ₹1,500 for the banner
//                 } else if (state.bannerPromotion.wantBanner === true && wantBanner === false) {
//                     updatedFees -= 1500; // Remove ₹1,500 if they deselect
//                 }

//                 return {
//                     bannerPromotion: { wantBanner, bannerFile },
//                     payment: { ...state.payment, fees: updatedFees }
//                 };
//             }),

//             setPayment: (data) => set((state) => ({
//                 payment: { ...state.payment, ...data }
//             })),

//             validateStep: (step) => {
//                 const errors: Record<string, string> = {};
//                 const state = get();

//                 switch (step) {
//                     case 1:
//                         if (!state.coachAcademy.clubName) errors.clubName = "Required";
//                         if (!state.coachAcademy.clubLocation) errors.clubLocation = "Required";
//                         if (!state.coachAcademy.coachName) errors.coachName = "Required";
//                         if (!/^\d{10}$/.test(state.coachAcademy.phone)) errors.phone = "Invalid phone number";
//                         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.coachAcademy.email)) errors.email = "Invalid email";
//                         break;

//                     case 2:
//                         state.gymnasts.forEach((g, index) => {
//                             if (!g.discipline) errors[`gymnasts[${index}].discipline`] = "Required";
//                             if (!g.level) errors[`gymnasts[${index}].level`] = "Required";
//                             if (!g.gymnastName) errors[`gymnasts[${index}].gymnastName`] = "Required";
//                             if (!g.dob) errors[`gymnasts[${index}].dob`] = "Required";
//                             if (!g.ageCategory) errors[`gymnasts[${index}].ageCategory`] = "Required";
//                         });
//                         break;

//                     case 3:
//                         // if (state.bannerPromotion.wantBanner === null) {
//                         //     errors.wantBanner = "Required";
//                         // }
//                         // if (state.bannerPromotion.wantBanner && !state.bannerPromotion.bannerFile) {
//                         //     errors.bannerFile = "Required when selecting 'Yes'";
//                         // }
//                         if (!state.payment.paymentMode) errors.paymentMode = "Required";
//                         if (!state.payment.paymentScreenshot) errors.paymentScreenshot = "Required";
//                         if (!state.payment.eligibility) errors.eligibility = "Required";
//                         if (!state.payment.understand) errors.understand = "Required";
//                         break;
//                 }

//                 set({ validationErrors: errors });
//                 return Object.keys(errors).length === 0;
//             },

//             clearErrors: () => set({ validationErrors: {} }),

//             submitForm: () => {
//                 const state = get();

//                 // Validate final step before submission
//                 if (!state.validateStep(3)) {
//                     console.log("Errors", state.validationErrors)
//                     console.log('Submission blocked - validation failed');
//                     return false;
//                 }

//                 console.log('Submitting data:', state);
//                 get().clearPersistedStore();
//                 return true;
//             },

//             clearPersistedStore: () => set({
//                 step: 1,
//                 coachAcademy: {
//                     clubName: "",
//                     clubRegion: "",
//                     clubLocation: "",
//                     coachName: "",
//                     email: "",
//                     phone: ""
//                 },
//                 gymnasts: [{
//                     discipline: "",
//                     level: "",
//                     gymnastName: "",
//                     dob: "",
//                     ageCategory: "",
//                 }],
//                 bannerPromotion: {
//                     wantBanner: null,
//                     bannerFile: ""
//                 },
//                 payment: {
//                     paymentMode: "",
//                     fees: 0,
//                     paymentScreenshot: "",
//                     eligibility: false,
//                     understand: false
//                 },
//                 validationErrors: {}
//             })
//         }),
//         {
//             name: 'gymnastics-registration-store',
//             storage: createJSONStorage(() => localStorage),
//             partialize: (state) => ({
//                 step: state.step,
//                 coachAcademy: state.coachAcademy,
//                 gymnasts: state.gymnasts,
//                 bannerPromotion: state.bannerPromotion,
//                 payment: {
//                     ...state.payment,
//                     paymentScreenshot: null // Files can't be persisted in localStorage
//                 }
//             })
//         }
//     )
// );

// export default useRegistrationStore;


import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Gymnast = {
    discipline: string;
    level: string;
    gymnastName: string;
    dob: string;
    ageCategory: string;
};

type FormState = {
    step: number;
    coachAcademy: {
        clubName: string;
        clubLocation: string;
        clubRegion: string;
        coachName: string;
        email: string;
        phone: string;
    };
    gymnasts: Gymnast[];
    bannerPromotion: {
        wantBanner: boolean; // Changed from `boolean | null` to `boolean`
        bannerFile: string;
    };
    payment: {
        paymentMode: string;
        fees: number;
        paymentScreenshot: string;
        eligibility: boolean;
        understand: boolean;
    };
    validationErrors: Record<string, string>;
};

type FormActions = {
    setStep: (step: number) => void;
    setCoachAcademy: (data: Partial<FormState['coachAcademy']>) => void;
    setGymnasts: (gymnasts: Gymnast[]) => void;
    setBannerPromotion: (data: Partial<FormState['bannerPromotion']>) => void;
    setPayment: (data: Partial<FormState['payment']>) => void;
    validateStep: (step: number) => boolean;
    clearErrors: () => void;
    submitForm: () => boolean;
    clearPersistedStore: () => void;
};

const useRegistrationStore = create<FormState & FormActions>()(
    persist(
        (set, get) => ({
            step: 1,
            coachAcademy: {
                clubName: "",
                clubLocation: "",
                clubRegion: "",
                coachName: "",
                email: "",
                phone: ""
            },
            gymnasts: [{
                discipline: "",
                level: "",
                gymnastName: "",
                dob: "",
                ageCategory: "",
            }],
            bannerPromotion: {
                wantBanner: false, // Default to `false` instead of `null`
                bannerFile: ""
            },
            payment: {
                paymentMode: "",
                fees: 0,
                paymentScreenshot: "",
                eligibility: false,
                understand: false
            },
            validationErrors: {},

            setStep: (step) => set({ step }),

            setCoachAcademy: (data) => set((state) => ({
                coachAcademy: { ...state.coachAcademy, ...data },
                payment: {
                    ...state.payment,
                    fees: (data.clubLocation?.toLowerCase() === "delhi" ? 1999 : 3999) * state.gymnasts.length
                }
            })),

            setGymnasts: (gymnasts) => set((state) => ({
                gymnasts,
                payment: {
                    ...state.payment,
                    fees: (state.coachAcademy.clubLocation.toLowerCase() === "delhi" ? 1999 : 3999) * gymnasts.length
                }
            })),

            setBannerPromotion: (data) => set((state) => {
                const wantBanner = data.wantBanner ?? state.bannerPromotion.wantBanner;
                const bannerFile = data.bannerFile ?? state.bannerPromotion.bannerFile;

                let updatedFees = state.payment.fees;

                // Update fee based on banner selection
                if (wantBanner === true) {
                    updatedFees += 1500; // Add ₹1,500 for the banner
                } else if (state.bannerPromotion.wantBanner === true && wantBanner === false) {
                    updatedFees -= 1500; // Remove ₹1,500 if they deselect
                }

                return {
                    bannerPromotion: { wantBanner, bannerFile },
                    payment: { ...state.payment, fees: updatedFees }
                };
            }),

            setPayment: (data) => {
                console.log('Updating payment:', data); // Log the update
                set((state) => ({
                    payment: { ...state.payment, ...data }
                }));
            },

            validateStep: (step) => {
                const errors: Record<string, string> = {};
                const state = get();

                switch (step) {
                    case 1:
                        if (!state.coachAcademy.clubName) errors.clubName = "Required";
                        if (!state.coachAcademy.clubLocation) errors.clubLocation = "Required";
                        if (!state.coachAcademy.coachName) errors.coachName = "Required";
                        if (!/^\d{10}$/.test(state.coachAcademy.phone)) errors.phone = "Invalid phone number";
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.coachAcademy.email)) errors.email = "Invalid email";
                        break;

                    case 2:
                        state.gymnasts.forEach((g, index) => {
                            if (!g.discipline) errors[`gymnasts[${index}].discipline`] = "Required";
                            if (!g.level) errors[`gymnasts[${index}].level`] = "Required";
                            if (!g.gymnastName) errors[`gymnasts[${index}].gymnastName`] = "Required";
                            if (!g.dob) errors[`gymnasts[${index}].dob`] = "Required";
                            if (!g.ageCategory) errors[`gymnasts[${index}].ageCategory`] = "Required";
                        });
                        break;

                    case 3:
                        if (!state.payment.paymentMode) errors.paymentMode = "Required";
                        if (!state.payment.paymentScreenshot) errors.paymentScreenshot = "Required";
                        if (!state.payment.eligibility) errors.eligibility = "Required";
                        if (!state.payment.understand) errors.understand = "Required";
                        if (state.bannerPromotion.wantBanner && !state.bannerPromotion.bannerFile) {
                            errors.bannerFile = "Banner file is required when selecting 'Yes'";
                        }
                        break;
                }

                set({ validationErrors: errors });
                return Object.keys(errors).length === 0;
            },

            clearErrors: () => set({ validationErrors: {} }),

            submitForm: () => {
                const state = get();

                // Validate final step before submission
                if (!state.validateStep(3)) {
                    console.log("Errors", state.validationErrors);
                    console.log('Submission blocked - validation failed');
                    return false;
                }

                console.log('Submitting data:', state);
                get().clearPersistedStore();
                return true;
            },

            clearPersistedStore: () => set({
                step: 1,
                coachAcademy: {
                    clubName: "",
                    clubRegion: "",
                    clubLocation: "",
                    coachName: "",
                    email: "",
                    phone: ""
                },
                gymnasts: [{
                    discipline: "",
                    level: "",
                    gymnastName: "",
                    dob: "",
                    ageCategory: "",
                }],
                bannerPromotion: {
                    wantBanner: false,
                    bannerFile: ""
                },
                payment: {
                    paymentMode: "",
                    fees: 0,
                    paymentScreenshot: "",
                    eligibility: false,
                    understand: false
                },
                validationErrors: {}
            })
        }),
        {
            name: 'gymnastics-registration-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                step: state.step,
                coachAcademy: state.coachAcademy,
                gymnasts: state.gymnasts,
                bannerPromotion: state.bannerPromotion, // Include bannerPromotion in persistence
                payment: state.payment // Include paymentScreenshot in persistence
            })
        }
    )
);

export default useRegistrationStore;