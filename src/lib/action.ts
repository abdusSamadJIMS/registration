"use server"

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
    wantBanner: boolean; // Yes (true) / No (false) / Not selected (null)
    bannerFile: string;
};
type Payment = {
    paymentMode: string;
    fees: number;
    paymentScreenshot: string;
    eligibility: boolean;
    understand: boolean;
};
export async function newEntry(coachAcademy: CoachAcademy, gymnasts: Gymnast[], bannerPromotion: BannerPromotion, payment: Payment) {
    try {
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
            }
        })

        if (newCoachAcademy) {
            gymnasts.forEach(async (gymnast) => {
                await prisma.gymnast.create({
                    data: {
                        coachAcademyId: newCoachAcademy.id,
                        discipline: gymnast.discipline,
                        level: gymnast.level,
                        gymnastName: gymnast.gymnastName,
                        dob: gymnast.dob,
                        ageCategory: gymnast.ageCategory,
                    }
                });
            });
        }

        return { ok: true }
    } catch (error) {
        console.error("Error creating CoachAcademy entry:", error);
        return { ok: false }
    }
}