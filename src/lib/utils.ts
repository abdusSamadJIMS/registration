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

