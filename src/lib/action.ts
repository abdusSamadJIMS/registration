"use server";

import { prisma } from "./prisma";
import { Gymnast } from "./store/formStore";

type CoachAcademy = {
    clubName: string;
    clubLocation: string;
    clubRegion: string;
    coachName: string;
    email: string;
    phone: string;
};

type BannerPromotion = {
    wantBanner: boolean;
    bannerFile: string;
};

type Payment = {
    paymentMode: string;
    fees: number;
    paymentScreenshot: string;
    eligibility: boolean;
    understand: boolean;
};

export async function newEntry(
    coachAcademy: CoachAcademy,
    gymnasts: Gymnast[],
    bannerPromotion: BannerPromotion,
    payment: Payment
) {
    try {
        // Step 1: Validate input data (optional but recommended)
        if (!coachAcademy || !gymnasts || !bannerPromotion || !payment) {
            throw new Error("Invalid input data");
        }

        // Step 2: Create the CoachAcademy entry
        const newCoachAcademy = await prisma.coachAcademy.create({
            data: {
                clubLocation: coachAcademy.clubLocation,
                clubName: coachAcademy.clubName,
                clubRegion: coachAcademy.clubRegion,
                coachName: coachAcademy.coachName,
                email: coachAcademy.email,
                phone: coachAcademy.phone,
                fees: payment.fees,
                eligibility: payment.eligibility,
                understand: payment.understand,
                paymentScreenshot: payment.paymentScreenshot,
                paymentMode: payment.paymentMode,
                wantBanner: bannerPromotion.wantBanner,
                bannerFile: bannerPromotion.bannerFile,
            },
        });

        if (!newCoachAcademy) {
            throw new Error("Failed to create CoachAcademy entry");
        }

        // Step 3: Create Gymnast entries in parallel
        const gymnastPromises = gymnasts.map(async (gymnast) => {
            return prisma.gymnast.create({
                data: {
                    coachAcademyId: newCoachAcademy.id,
                    discipline: gymnast.discipline,
                    level: gymnast.level,
                    gymnastName: gymnast.gymnastName,
                    dob: gymnast.dob,
                    ageCategory: gymnast.ageCategory,
                },
            });
        });

        // Wait for all Gymnast entries to be created
        await Promise.all(gymnastPromises);

        // Step 4: Return success response
        return { ok: true, coachAcademyId: newCoachAcademy.id };
    } catch (error) {
        console.error("Error in newEntry:", error);
        return { ok: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}