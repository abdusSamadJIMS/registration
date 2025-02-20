// const FormPagination = ({
//     currentStep,
//     onNext,
//     onPrevious,
//     showSubmit,
//     onSubmit
// }: {
//     currentStep: number;
//     onNext: () => void;
//     onPrevious: () => void;
//     showSubmit: boolean;
//     onSubmit: () => void;
// }) => {
//     return (
//         <div className="flex justify-between gap-4 mt-8">
//             {currentStep > 1 && (
//                 <button
//                     type="button"
//                     onClick={onPrevious}
//                     className="btn btn-outline flex-1"
//                 >
//                     Previous
//                 </button>
//             )}

//             {currentStep < 3 ? (
//                 <button
//                     type="button"
//                     onClick={onNext}
//                     className="btn btn-primary flex-1"
//                 >
//                     Next
//                 </button>
//             ) : (
//                 <button
//                     type="button"
//                     onClick={onSubmit}
//                     className="btn btn-success flex-1"
//                     disabled={!showSubmit}
//                 >
//                     Submit Registration
//                 </button>
//             )}
//         </div>
//     );
// };

// export default FormPagination

import React from 'react';

const FormPagination = ({
    currentStep,
    onNext,
    onPrevious,
    showSubmit,
    onSubmit
}: {
    currentStep: number;
    onNext: () => void;
    onPrevious: () => void;
    showSubmit: boolean;
    onSubmit: () => void;
}) => {
    return (
        <div className="flex justify-between gap-4 mt-8">
            {currentStep > 1 && (
                <button
                    type="button"
                    onClick={onPrevious}
                    className="btn btn-outline flex-1"
                >
                    Previous
                </button>
            )}

            {currentStep < 3 ? (
                <button
                    type="button"
                    onClick={onNext}
                    className="btn btn-primary flex-1"
                >
                    Next
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onSubmit}
                    className="btn btn-success flex-1"
                    disabled={!showSubmit}
                >
                    Submit Registration
                </button>
            )}
        </div>
    );
};

export default FormPagination;