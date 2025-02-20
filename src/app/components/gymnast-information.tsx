// import React from 'react'

// // Define the type for a single gymnast
// type Gymnast = {
//     discipline: string;
//     level: string;
//     gymnastName: string;
//     gender: string;
//     ageCategory: string;
// }

// const GymnastInformation = ({ gymnast, setGymnast }: {
//     gymnast: Gymnast[],
//     setGymnast: React.Dispatch<React.SetStateAction<Gymnast[]>>
// }) => {
//     // Add a new empty gymnast
//     const addGymnast = () => {
//         setGymnast(prev => [
//             ...prev,
//             {
//                 discipline: '',
//                 level: '',
//                 gymnastName: '',
//                 gender: '',
//                 ageCategory: ''
//             }
//         ])
//     }

//     // Remove a specific gymnast by index
//     const removeGymnast = (index: number) => {
//         setGymnast(prev => prev.filter((_, i) => i !== index))
//     }

//     // Update specific field of a gymnast
//     const updateField = (index: number, field: keyof Gymnast, value: string) => {
//         setGymnast(prev => prev.map((g, i) =>
//             i === index ? { ...g, [field]: value } : g
//         ))
//     }

//     return (
//         <div className=' w-full space-y-4'>
//             {gymnast.map((g, i) => (
//                 <div key={i} className='flex flex-col items-center gap-2  '>
//                     <select
//                         value={g.discipline}
//                         onChange={(e) => updateField(i, 'discipline', e.target.value)}
//                         className="select select-bordered w-full "
//                     >
//                         <option disabled value="">Select Discipline</option>
//                         <option value="mag">MAG</option>
//                         <option value="wag">WAG</option>
//                     </select>

//                     <select
//                         value={g.level}
//                         onChange={(e) => updateField(i, 'level', e.target.value)}
//                         className="select select-bordered w-full "
//                     >
//                         <option disabled value="">Select Level</option>
//                         <option value="level-1">Level 1</option>
//                         <option value="level-2">Level 2</option>
//                         <option value="level-3">Level 3</option>
//                         <option value="level-4">Level 4</option>
//                         <option value="level-5">Level 5</option>
//                     </select>

//                     <input
//                         value={g.gymnastName}
//                         onChange={(e) => updateField(i, 'gymnastName', e.target.value)}
//                         type="text"
//                         placeholder="Gymnast Full Name"
//                         className="input input-bordered w-full "
//                     />

//                     <select
//                         value={g.gender}
//                         onChange={(e) => updateField(i, 'gender', e.target.value)}
//                         className="select select-bordered w-full "
//                     >
//                         <option disabled value="">Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                     </select>

//                     <select
//                         value={g.ageCategory}
//                         onChange={(e) => updateField(i, 'ageCategory', e.target.value)}
//                         className="select select-bordered w-full "
//                     >
//                         <option disabled value="">Age Category</option>
//                         <option value="u6">U6</option>
//                         <option value="u8">U8</option>
//                         <option value="u10">U10</option>
//                         <option value="u12">U12</option>
//                         <option value="u15">U15</option>
//                         <option value="open">Open</option>
//                     </select>

//                     {gymnast.length > 1 && (
//                         <button
//                             onClick={() => removeGymnast(i)}
//                             className="btn btn-error btn-sm mt-2"
//                         >
//                             Remove Gymnast
//                         </button>
//                     )}
//                     {
//                         gymnast.length > 1 && (
//                             <div className="divider"></div>
//                         )
//                     }
//                 </div>
//             ))}

//             <div className='flex justify-center mt-4'>
//                 <button
//                     className="btn btn-primary btn-sm"
//                     onClick={addGymnast}
//                 >
//                     Add Another Gymnast
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default GymnastInformation

'use client';
import { useShallow } from 'zustand/react/shallow';
import useRegistrationStore from '@/lib/store/formStore';

const GymnastInformation = () => {
    const { gymnasts, setGymnasts, validationErrors } = useRegistrationStore(
        useShallow((state) => ({
            gymnasts: state.gymnasts,
            setGymnasts: state.setGymnasts,
            validationErrors: state.validationErrors
        }))
    );

    const addGymnast = () => {
        setGymnasts([
            ...gymnasts,
            {
                discipline: '',
                level: '',
                gymnastName: '',
                gender: '',
                ageCategory: ''
            }
        ]);
    };

    const removeGymnast = (index: number) => {
        setGymnasts(gymnasts.filter((_, i) => i !== index));
    };

    const updateField = (index: number, field: keyof typeof gymnasts[0], value: string) => {
        const updated = [...gymnasts];
        updated[index] = { ...updated[index], [field]: value };
        setGymnasts(updated);
    };

    const getError = (index: number, field: string) => {
        return validationErrors[`gymnasts[${index}].${field}`];
    };

    return (
        <div className='w-full space-y-4'>
            {gymnasts.map((g, i) => (
                <div key={i} className='flex flex-col gap-4 border p-4 rounded-lg'>
                    <div className='w-full'>
                        <select
                            value={g.discipline}
                            onChange={(e) => updateField(i, 'discipline', e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option disabled value="">Select Discipline</option>
                            <option value="mag">MAG</option>
                            <option value="wag">WAG</option>
                        </select>
                        {getError(i, 'discipline') && (
                            <p className="text-error text-sm mt-1">{getError(i, 'discipline')}</p>
                        )}
                    </div>

                    <div className='w-full'>
                        <select
                            value={g.level}
                            onChange={(e) => updateField(i, 'level', e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option disabled value="">Select Level</option>
                            <option value="level-1">Level 1</option>
                            <option value="level-2">Level 2</option>
                            <option value="level-3">Level 3</option>
                            <option value="level-4">Level 4</option>
                            <option value="level-5">Level 5</option>
                        </select>
                        {getError(i, 'level') && (
                            <p className="text-error text-sm mt-1">{getError(i, 'level')}</p>
                        )}
                    </div>

                    <div className='w-full'>
                        <input
                            value={g.gymnastName}
                            onChange={(e) => updateField(i, 'gymnastName', e.target.value)}
                            placeholder="Gymnast Full Name"
                            className="input input-bordered w-full"
                        />
                        {getError(i, 'gymnastName') && (
                            <p className="text-error text-sm mt-1">{getError(i, 'gymnastName')}</p>
                        )}
                    </div>

                    <div className='w-full'>
                        <select
                            value={g.gender}
                            onChange={(e) => updateField(i, 'gender', e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option disabled value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {getError(i, 'gender') && (
                            <p className="text-error text-sm mt-1">{getError(i, 'gender')}</p>
                        )}
                    </div>

                    <div className='w-full'>
                        <select
                            value={g.ageCategory}
                            onChange={(e) => updateField(i, 'ageCategory', e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option disabled value="">Age Category</option>
                            <option value="u6">U6</option>
                            <option value="u8">U8</option>
                            <option value="u10">U10</option>
                            <option value="u12">U12</option>
                            <option value="u15">U15</option>
                            <option value="open">Open</option>
                        </select>
                        {getError(i, 'ageCategory') && (
                            <p className="text-error text-sm mt-1">{getError(i, 'ageCategory')}</p>
                        )}
                    </div>

                    {gymnasts.length > 1 && (
                        <button
                            onClick={() => removeGymnast(i)}
                            className="btn btn-error btn-sm self-end"
                        >
                            Remove Gymnast
                        </button>
                    )}
                </div>
            ))}

            <button
                onClick={addGymnast}
                className="btn btn-primary btn-sm w-full mt-4"
            >
                Add Another Gymnast
            </button>
        </div>
    );
};

export default GymnastInformation;