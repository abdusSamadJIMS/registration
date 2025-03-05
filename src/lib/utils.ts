import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getAllEntries } from "./action";

export const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensures two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensures two digits
    return `${year}-${month}-${day}`;
};

function calculateAge(birthDateString: string) {
    const [day, month, year] = birthDateString.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day); // Month is 0-indexed

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
        age--;
    }

    return age;
}

export const levels = [
    { level: 1, years: [2019, 2018], openBefore: 2018 },
    { level: 2, years: [2019, 2018, 2017], openBefore: 2017 },
    { level: 3, years: [2019, 2018, 2017, 2016], openBefore: 2016 },
    { level: 4, years: [2018, 2017, 2016, 2015], openBefore: 2015, exclude: [2019] },
    { level: 5, years: [2017, 2016, 2015, 2014], openBefore: 2014, exclude: [2019, 2018] },
];

export const getAgeCategory = (dob: string, level: string) => {
    const age = calculateAge(dob);

    if (age <= 5) {
        if ((level === "level-1") || (level === "level-2") || (level === "level-3")) {
            return "open"
        } else {
            return `u${age}`
        }
    } else if (true) { }
}


export const getLevels = (dob: string) => {
    const age = calculateAge(dob);
    const levelsAge: { [key: number]: number } = {
        2: 3,
        3: 3,
        4: 3,
        5: 3,
        6: 4,
        7: 5,
        8: 5,
        9: 5,
        10: 5,
        11: 5,
        12: 5,
        13: 5,
        14: 5,
        15: 5,
    }
    const eligibleLevels = levelsAge[age]
    return eligibleLevels;
}

export const shortAgeGroupToNormal = (ageGroup: string) => {
    const obj: {
        [key: string]: string;
    } = {
        "u6": "Under 6",
        "u7": "Under 7",
        "u8": "Under 8",
        "u9": "Under 9",
        "u10": "Under 10",
        "u11": "Under 11",
        "u12": "Under 12",
        "u13": "Under 13",
        "u14": "Under 14",
        "u15": "Under 15",
        "open": "Open"
    }
    return obj[ageGroup] || ageGroup;
}

export const uploadImage = async (image: File) => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            // console.log("data:\n", data)
            return { imageUrl: data.imageUrl as string, ok: true }; // Return the URL on success
        } else {
            return { imageUrl: "", ok: false }; // Return empty URL on API error
        }
    } catch (error) {
        console.error("Upload failed:", error);
        return { imageUrl: "", ok: false }; // Return empty URL on network error
    }
};





// interface CoachAcademy {
//     id: string;
//     clubName: string;
//     clubLocation: string;
//     clubRegion: string;
//     coachName: string;
//     email: string;
//     phone: string;
//     paymentVerified: boolean;
//     paymentMode: string;
//     fees: number;
//     wantBanner: boolean;
//     bannerFile?: string;
//     paymentScreenshot?: string;
//     eligibility: boolean;
//     understand: boolean;
//     createdAt: string;
//     gymnasts: Gymnast[];
// }

// interface Gymnast {
//     id: string;
//     discipline: string;
//     level: string;
//     gymnastName: string;
//     fatherName: string;
//     dob: string;
//     ageCategory: string;
// }

export const exportEntriesToExcel = async () => {
    const res = await getAllEntries();
    if (!res.ok) {
        alert("Failed to fetch data from the server!");
        return { ok: false };
    }
    const coaches = res.data || []
    if (coaches.length === 0) {
        alert("No data to export!");
        return { ok: false };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattenedData: any[] = [];

    coaches.forEach((coach) => {
        if (coach.gymnasts.length === 0) {
            // If no gymnasts, create a single row for the coach
            flattenedData.push({
                ID: coach.id,
                "Club Name": coach.clubName,
                "Club Location": coach.clubLocation,
                "Club Region": coach.clubRegion.toUpperCase(),
                "Coach Name": coach.coachName,
                Email: coach.email,
                Phone: coach.phone,
                "Payment Verified": coach.paymentVerified ? "Yes" : "No",
                "Payment Mode": coach.paymentMode.toUpperCase(),
                Fees: coach.fees,
                "Wants Banner": coach.wantBanner ? "Yes" : "No",
                "Banner File": coach.bannerFile || "N/A",
                "Payment Screenshot": coach.paymentScreenshot || "N/A",
                "Eligibility Confirmation": coach.eligibility ? "Eligible" : "Not Eligible",
                "Understand about policy": coach.understand ? "Yes" : "No",
                "Created At": new Date(coach.createdAt).toLocaleString(),
                "Gymnast Name": "N/A",
                Discipline: "N/A",
                Level: "N/A",
                "Father Name": "N/A",
                "Date of Birth": "N/A",
                "Age Category": "N/A",
            });
        } else {
            // If gymnasts exist, create separate rows for each
            coach.gymnasts.forEach((gymnast) => {
                flattenedData.push({
                    ID: coach.id,
                    "Club Name": coach.clubName,
                    "Club Location": coach.clubLocation.toUpperCase(),
                    "Club Region": coach.clubRegion.toUpperCase(),
                    "Coach Name": coach.coachName,
                    Email: coach.email,
                    Phone: coach.phone,
                    "Payment Verified": coach.paymentVerified ? "Yes" : "No",
                    "Payment Mode": coach.paymentMode.toUpperCase(),
                    Fees: coach.fees,
                    "Wants Banner": coach.wantBanner ? "Yes" : "No",
                    "Banner File": coach.bannerFile || "N/A",
                    "Payment Screenshot": coach.paymentScreenshot || "N/A",
                    Eligibility: coach.eligibility ? "Eligible" : "Not Eligible",
                    Understand: coach.understand ? "Yes" : "No",
                    "Created At": new Date(coach.createdAt).toLocaleString(),
                    "Gymnast Name": gymnast.gymnastName,
                    Discipline: gymnast.discipline === "wag" ? "(WAG)" : "(MAG)",
                    Level: gymnast.level.toUpperCase().replace("-", " "),
                    "Father Name": gymnast.fatherName,
                    "Date of Birth": gymnast.dob,
                    "Age Category": shortAgeGroupToNormal(gymnast.ageCategory),
                });
            });
        }
    });

    // Convert data into a worksheet
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entries");

    // Convert to Excel file (binary data)
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Create a Blob and trigger download
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `entries-${new Date().toISOString().split("T")[0]}.xlsx`);
    return { ok: true }
};
