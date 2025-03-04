
// 'use client';
// import { useShallow } from 'zustand/react/shallow';
// import useRegistrationStore from '@/lib/store/formStore';
// import { getCurrentDate } from '@/lib/utils';

// const GymnastInformation = () => {
//     const today = getCurrentDate();
//     const { gymnasts, setGymnasts, validationErrors } = useRegistrationStore(
//         useShallow((state) => ({
//             gymnasts: state.gymnasts,
//             setGymnasts: state.setGymnasts,
//             validationErrors: state.validationErrors
//         }))
//     );

//     const addGymnast = () => {
//         setGymnasts([
//             ...gymnasts,
//             {
//                 discipline: '',
//                 level: '',
//                 gymnastName: '',
//                 dob: '',
//                 ageCategory: ''
//             }
//         ]);
//     };

//     const removeGymnast = (index: number) => {
//         setGymnasts(gymnasts.filter((_, i) => i !== index));
//     };

//     const updateField = (index: number, field: keyof typeof gymnasts[0], value: string) => {
//         const updated = [...gymnasts];
//         updated[index] = { ...updated[index], [field]: value };
//         setGymnasts(updated);
//     };

//     const getError = (index: number, field: string) => {
//         return validationErrors[`gymnasts[${index}].${field}`];
//     };

//     return (
//         <div className='w-full space-y-4'>
//             {gymnasts.map((g, i) => (
//                 <div key={i} className='flex flex-col gap-4 border p-4 rounded-lg'>
//                     <fieldset className='w-full'>
//                         <legend className="fieldset-legend">Select Discipline</legend>
//                         <select
//                             value={g.discipline}
//                             onChange={(e) => updateField(i, 'discipline', e.target.value)}
//                             className="select w-full"
//                         >
//                             <option disabled value="">Select Discipline</option>
//                             <option value="mag">(MAG) Men’s Artistic Gymnastics)</option>
//                             <option value="wag">(WAG) Women’s Artistic Gymnastics)</option>
//                         </select>
//                         {getError(i, 'discipline') && (
//                             <p className="text-error fieldset-label">{getError(i, 'discipline')}</p>
//                         )}
//                     </fieldset>

//                     <fieldset className='fieldset'>
//                         <legend className="fieldset-legend">Enter Date of Birth</legend>
//                         <input
//                             max={today}
//                             placeholder='DOB'
//                             type='date'
//                             value={g.dob} // Controlled input
//                             onChange={(e) => updateField(i, 'dob', e.target.value)}
//                             className="input  w-full"
//                         />

//                         {getError(i, 'dob') && (
//                             <p className="text-error filedset-label">{getError(i, 'dob')}</p>
//                         )}
//                     </fieldset>

//                     <fieldset className='fieldset'>
//                         <legend className="fieldset-legend">Select Level</legend>
//                         <select
//                             value={g.level}
//                             onChange={(e) => updateField(i, 'level', e.target.value)}
//                             className="select  w-full"
//                         >
//                             <option disabled value="">Select Level</option>
//                             <option value="level-1">Level 1</option>
//                             <option value="level-2">Level 2</option>
//                             <option value="level-3">Level 3</option>
//                             <option value="level-4">Level 4</option>
//                             <option value="level-5">Level 5</option>

//                         </select>
//                         {getError(i, 'level') && (
//                             <p className="text-error fieldset-label">{getError(i, 'level')}</p>
//                         )}
//                     </fieldset>

//                     <fieldset className='fieldset'>
//                         <legend className="fieldset-legend">Enter Gymnast{"'"}s Name</legend>
//                         <input
//                             value={g.gymnastName}
//                             onChange={(e) => updateField(i, 'gymnastName', e.target.value)}
//                             placeholder="Gymnast Full Name"
//                             className="input  w-full"
//                         />
//                         {getError(i, 'gymnastName') && (
//                             <p className="text-error filedset-label">{getError(i, 'gymnastName')}</p>
//                         )}
//                     </fieldset>



//                     <fieldset className='fieldset'>
//                         <legend className="fieldset-legend">Age Category</legend>
//                         <input
//                             value={g.ageCategory}
//                             onChange={(e) => updateField(i, 'ageCategory', e.target.value)}
//                             className="input  w-full"
//                             disabled
//                         />

//                         {getError(i, 'ageCategory') && (
//                             <p className="text-error filedset-label">{getError(i, 'ageCategory')}</p>
//                         )}
//                     </fieldset>

//                     {gymnasts.length > 1 && (
//                         <button
//                             onClick={() => removeGymnast(i)}
//                             className="btn btn-error btn-xs self-end"
//                         >
//                             Remove Gymnast
//                         </button>
//                     )}
//                 </div>
//             ))}

//             <button
//                 onClick={addGymnast}
//                 className="btn btn-primary btn-sm w-full mt-4"
//             >
//                 Add Another Gymnast
//             </button>
//         </div>
//     );
// };

// export default GymnastInformation;
'use client';
import { useShallow } from 'zustand/react/shallow';
import useRegistrationStore from '@/lib/store/formStore';
import { getCurrentDate } from '@/lib/utils';

// Helper function to calculate age category
const getAgeCategory = (age: number, level: string): string => {
    switch (level) {
        case 'level-1':
            if (age === 5) return 'u6';
            if (age === 6) return 'u7';
            if (age > 6) return 'open';
            break;
        case 'level-2':
            if (age === 5) return 'u6';
            if (age === 6) return 'u7';
            if (age === 7) return 'u8';
            if (age > 7) return 'open';
            break;
        case 'level-3':
            if (age === 5) return 'u6';
            if (age === 6) return 'u7';
            if (age === 7) return 'u8';
            if (age === 8) return 'u9';
            if (age > 8) return 'open';
            break;
        case 'level-4':
            if (age === 6) return 'u7';
            if (age === 7) return 'u8';
            if (age === 8) return 'u9';
            if (age === 9) return 'u10';
            if (age > 9) return 'open';
            break;
        case 'level-5':
            if (age === 7) return 'u8';
            if (age === 8) return 'u9';
            if (age === 9) return 'u10';
            if (age === 10) return 'u11';
            if (age > 10) return 'open';
            break;
        default:
            return '';
    }
    return '';
};

// Helper function to calculate exact age from DOB
const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthdate hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const GymnastInformation = () => {
    const today = getCurrentDate();
    const { gymnasts, setGymnasts, validationErrors } = useRegistrationStore(
        useShallow((state) => ({
            gymnasts: state.gymnasts,
            setGymnasts: state.setGymnasts,
            validationErrors: state.validationErrors,
        }))
    );

    const addGymnast = () => {
        setGymnasts([
            ...gymnasts,
            {
                discipline: '',
                level: '',
                gymnastName: '',
                dob: '',
                ageCategory: '',
            },
        ]);
    };

    const removeGymnast = (index: number) => {
        setGymnasts(gymnasts.filter((_, i) => i !== index));
    };

    const updateField = (index: number, field: keyof (typeof gymnasts)[0], value: string) => {
        const updated = [...gymnasts];
        const gymnast = updated[index];
        gymnast[field] = value;

        // Recalculate age category if level or dob changes
        if (field === 'level' || field === 'dob') {
            const dob = gymnast.dob;
            const level = gymnast.level;

            if (dob && level) {
                const age = calculateAge(dob);
                const ageCategory = getAgeCategory(age, level);
                gymnast.ageCategory = ageCategory;
            }
        }

        setGymnasts(updated);
    };

    const getError = (index: number, field: string) => {
        return validationErrors[`gymnasts[${index}].${field}`];
    };

    return (
        <div className="w-full space-y-4">
            {gymnasts.map((g, i) => {
                // const age = g.dob ? calculateAge(g.dob) : null;

                return (
                    <div key={i} className="flex flex-col gap-4 border p-4 rounded-lg">
                        <fieldset className="w-full">
                            <legend className="fieldset-legend">Select Discipline</legend>
                            <select
                                value={g.discipline}
                                onChange={(e) => updateField(i, 'discipline', e.target.value)}
                                className="select w-full"
                            >
                                <option disabled value="">
                                    Select Discipline
                                </option>
                                <option value="mag">(MAG) Men’s Artistic Gymnastics</option>
                                <option value="wag">(WAG) Women’s Artistic Gymnastics</option>
                            </select>
                            {getError(i, 'discipline') && (
                                <p className="text-error fieldset-label">{getError(i, 'discipline')}</p>
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Enter Date of Birth</legend>
                            <input
                                max={today}
                                placeholder="DOB"
                                type="date"
                                value={g.dob}
                                onChange={(e) => updateField(i, 'dob', e.target.value)}
                                className="input w-full"
                            />
                            {getError(i, 'dob') && (
                                <p className="text-error fieldset-label">{getError(i, 'dob')}</p>
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Select Level</legend>
                            <select
                                value={g.level}
                                onChange={(e) => updateField(i, 'level', e.target.value)}
                                className="select w-full"
                            >
                                <option disabled value="">
                                    Select Level
                                </option>
                                <option value="level-1">Level 1</option>
                                <option value="level-2">Level 2</option>
                                <option value="level-3">Level 3</option>
                                <option value="level-4">Level 4</option>
                                <option value="level-5">Level 5</option>
                            </select>
                            {getError(i, 'level') && (
                                <p className="text-error fieldset-label">{getError(i, 'level')}</p>
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Enter Gymnast{"'"}s Name</legend>
                            <input
                                value={g.gymnastName}
                                onChange={(e) => updateField(i, 'gymnastName', e.target.value)}
                                placeholder="Gymnast Full Name"
                                className="input w-full"
                            />
                            {getError(i, 'gymnastName') && (
                                <p className="text-error fieldset-label">{getError(i, 'gymnastName')}</p>
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age Category</legend>
                            <input
                                value={g.ageCategory}
                                onChange={(e) => updateField(i, 'ageCategory', e.target.value)}
                                className="input w-full"
                                disabled
                            />
                            {getError(i, 'ageCategory') && (
                                <p className="text-error fieldset-label">{getError(i, 'ageCategory')}</p>
                            )}
                        </fieldset>

                        {gymnasts.length > 1 && (
                            <button
                                onClick={() => removeGymnast(i)}
                                className="btn btn-error btn-xs self-end"
                            >
                                Remove Gymnast
                            </button>
                        )}
                    </div>
                );
            })}

            <button onClick={addGymnast} className="btn btn-primary btn-sm w-full mt-4">
                Add Another Gymnast
            </button>
        </div>
    );
};

export default GymnastInformation;