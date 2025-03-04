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
//                 placeholder="Club/Academy Name" className="input  w-full " />
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
//                 type="text" placeholder="Coach’s Full Name" className="input  w-full " />
//             <input
//                 onChange={e => {
//                     setCoachAcademy({ ...coachAcademy, phone: e.target.value })
//                 }}
//                 defaultValue={coachAcademy.phone}
//                 type="text" placeholder="Contact Number" className="input  w-full " />
//             <input
//                 onChange={e => {
//                     setCoachAcademy({ ...coachAcademy, email: e.target.value })
//                 }}
//                 defaultValue={coachAcademy.email}
//                 type="email" placeholder="Email Address" className="input  w-full " />
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
            <fieldset className="fieldset ">
                <legend className="fieldset-legend">Enter Club/Academy Name</legend>
                <input
                    value={coachAcademy.clubName}
                    onChange={(e) => setCoachAcademy({ clubName: e.target.value })}
                    type="text"
                    className="input w-full"
                    placeholder="Club/Academy Name" />
                {validationErrors.clubName && (
                    <p className="fieldset-label text-error">{validationErrors.clubName}</p>
                )}
            </fieldset>


            <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Select Club/Academy Location</legend>
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
                    <p className="text-error fieldset-label">{validationErrors.clubLocation}</p>
                )}
            </fieldset>
            <fieldset className='fieldset'>
                <legend className="fieldset-legend">Select Club/Academy Region</legend>
                <select
                    value={coachAcademy.clubRegion}
                    onChange={(e) => setCoachAcademy({ clubRegion: e.target.value })}
                    className="select select-bordered w-full"
                >
                    <option disabled value="">Club/Academy Region</option>
                    <option value={"ncr"}>
                        NCR
                    </option>
                    <option value={"roi"}>
                        Rest of India
                    </option>
                </select>
                {validationErrors.clubLocation && (
                    <p className="text-error fieldset-label">{validationErrors.clubLocation}</p>
                )}
            </fieldset>

            <fieldset className='fieldset'>
                <legend className="fieldset-legend">Enter Coach{"'"}s Full Name</legend>
                <input
                    value={coachAcademy.coachName}
                    onChange={(e) => setCoachAcademy({ coachName: e.target.value })}
                    placeholder="Coach’s Full Name"
                    className="input  w-full"
                />
                {validationErrors.coachName && (
                    <p className="text-error fieldset-label">{validationErrors.coachName}</p>
                )}
            </fieldset>

            <fieldset className='fieldset'>
                <legend className="fieldset-legend">Enter Contact Number</legend>
                <input
                    value={coachAcademy.phone}
                    onChange={(e) => setCoachAcademy({ phone: e.target.value })}
                    placeholder="Contact Number"
                    className="input  w-full"
                    type="tel"
                />
                {validationErrors.phone && (
                    <p className="text-error fieldset-label">{validationErrors.phone}</p>
                )}
            </fieldset>

            <fieldset className='fieldset'>
                <legend className="fieldset-legend">Enter Email Address</legend>
                <input
                    value={coachAcademy.email}
                    onChange={(e) => setCoachAcademy({ email: e.target.value })}
                    placeholder="Email Address"
                    className="input  w-full"
                    type="email"
                />
                {validationErrors.email && (
                    <p className="text-error fieldset-label">{validationErrors.email}</p>
                )}
            </fieldset>
        </div>
    );
};

export default CoachAcademyInformation;