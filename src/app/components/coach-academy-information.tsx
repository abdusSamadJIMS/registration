// import { states } from '@/lib/constant';
// import React from 'react'

// const CoachAcademyInformation = ({ coachAcademy, setCoachAcademy }: {
//     coachAcademy: {
//         clubName: string;
//         clubLocation: string;
//         coachName: string;
//         email: string;
//         phone: string;
//     },
//     setCoachAcademy: React.Dispatch<React.SetStateAction<{
//         clubName: string;
//         clubLocation: string;
//         coachName: string;
//         email: string;
//         phone: string;
//     }>>

// }) => {
//     return (
//         <div className='flex gap-2 flex-col  items-center w-full'>
//             <input type="text"
//                 onChange={e => {
//                     setCoachAcademy({ ...coachAcademy, clubName: e.target.value })
//                 }}
//                 defaultValue={coachAcademy.clubName}
//                 placeholder="Club/Academy Name" className="input input-bordered w-full " />
//             <select
//                 onChange={e => {
//                     setCoachAcademy({ ...coachAcademy, clubLocation: e.target.value })
//                 }}
//                 defaultValue={coachAcademy.clubLocation}
//                 className="select select-bordered w-full " >
//                 <option disabled value="">Club/Academy Location</option>
//                 {
//                     states.map((state) => (
//                         <option key={state} value={state.toLowerCase().replace(" ", "-")}>{state}</option>
//                     ))
//                 }
//             </select>
//             <input
//                 onChange={e => {
//                     setCoachAcademy({ ...coachAcademy, coachName: e.target.value })
//                 }}
//                 defaultValue={coachAcademy.coachName}
//                 type="text" placeholder="Coach’s Full Name" className="input input-bordered w-full " />
//             <input
//                 onChange={e => {
//                     setCoachAcademy({ ...coachAcademy, phone: e.target.value })
//                 }}
//                 defaultValue={coachAcademy.phone}
//                 type="text" placeholder="Contact Number" className="input input-bordered w-full " />
//             <input
//                 onChange={e => {
//                     setCoachAcademy({ ...coachAcademy, email: e.target.value })
//                 }}
//                 defaultValue={coachAcademy.email}
//                 type="email" placeholder="Email Address" className="input input-bordered w-full " />
//         </div>
//     )
// }

// export default CoachAcademyInformation
'use client';
import { useShallow } from 'zustand/react/shallow';
import useRegistrationStore from '@/lib/store/formStore';
import { states } from '@/lib/constant';

const CoachAcademyInformation = () => {
    const { coachAcademy, setCoachAcademy, validationErrors } = useRegistrationStore(
        useShallow((state) => ({
            coachAcademy: state.coachAcademy,
            setCoachAcademy: state.setCoachAcademy,
            validationErrors: state.validationErrors
        }))
    );

    return (
        <div className='flex flex-col gap-4 w-full'>
            <div className='w-full'>
                <input
                    value={coachAcademy.clubName}
                    onChange={(e) => setCoachAcademy({ clubName: e.target.value })}
                    placeholder="Club/Academy Name"
                    className="input input-bordered w-full"
                />
                {validationErrors.clubName && (
                    <p className="text-error text-sm mt-1">{validationErrors.clubName}</p>
                )}
            </div>

            <div className='w-full'>
                <select
                    value={coachAcademy.clubLocation}
                    onChange={(e) => setCoachAcademy({ clubLocation: e.target.value })}
                    className="select select-bordered w-full"
                >
                    <option disabled value="">Club/Academy Location</option>
                    {states.map((state) => (
                        <option key={state} value={state.toLowerCase().trim().replaceAll(" ", "-")}>
                            {state}
                        </option>
                    ))}
                </select>
                {validationErrors.clubLocation && (
                    <p className="text-error text-sm mt-1">{validationErrors.clubLocation}</p>
                )}
            </div>

            <div className='w-full'>
                <input
                    value={coachAcademy.coachName}
                    onChange={(e) => setCoachAcademy({ coachName: e.target.value })}
                    placeholder="Coach’s Full Name"
                    className="input input-bordered w-full"
                />
                {validationErrors.coachName && (
                    <p className="text-error text-sm mt-1">{validationErrors.coachName}</p>
                )}
            </div>

            <div className='w-full'>
                <input
                    value={coachAcademy.phone}
                    onChange={(e) => setCoachAcademy({ phone: e.target.value })}
                    placeholder="Contact Number"
                    className="input input-bordered w-full"
                    type="tel"
                />
                {validationErrors.phone && (
                    <p className="text-error text-sm mt-1">{validationErrors.phone}</p>
                )}
            </div>

            <div className='w-full'>
                <input
                    value={coachAcademy.email}
                    onChange={(e) => setCoachAcademy({ email: e.target.value })}
                    placeholder="Email Address"
                    className="input input-bordered w-full"
                    type="email"
                />
                {validationErrors.email && (
                    <p className="text-error text-sm mt-1">{validationErrors.email}</p>
                )}
            </div>
        </div>
    );
};

export default CoachAcademyInformation;