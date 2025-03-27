"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { Gymnast } from "./store/formStore";
import { transporter } from "./transporter";

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

        const perGymnastFee = 1800;
        const baseTotalFees = perGymnastFee * gymnasts.length * 1.18;
        const totalFees = bannerPromotion.wantBanner ? baseTotalFees + 1500 : baseTotalFees;

        // Step 2: Create the CoachAcademy entry
        const newCoachAcademy = await prisma.coachAcademy.create({
            data: {
                clubLocation: coachAcademy.clubLocation,
                clubName: coachAcademy.clubName,
                clubRegion: coachAcademy.clubRegion,
                coachName: coachAcademy.coachName,
                email: coachAcademy.email,
                phone: coachAcademy.phone,
                fees: totalFees,
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
                    fatherName: gymnast.fatherName
                },
            });
        });

        // Wait for all Gymnast entries to be created
        await Promise.all(gymnastPromises);

        // Step 4: Return success response
        revalidatePath("/(admin)/admin")
        return { ok: true, coachAcademyId: newCoachAcademy.id };
    } catch (error) {
        console.error("Error in newEntry:", error);
        return { ok: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}


export async function getEntries(page: number, query: string) {
    const max = 10
    const offset = page * max - max;
    try {
        const coachAcademy = await prisma.coachAcademy.findMany({
            take: max,
            skip: offset,
            include: {
                gymnasts: true
            },
            where: query ? {
                OR: [
                    { clubName: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } },
                    { phone: { contains: query, mode: "insensitive" } },
                    { coachName: { contains: query, mode: "insensitive" } },
                    { gymnasts: { some: { gymnastName: { contains: query, mode: "insensitive" } } } },
                    { gymnasts: { some: { fatherName: { contains: query, mode: "insensitive" } } } },
                ]
            } : undefined
        })
        // revalidatePath("/(admin)/admin")
        return { ok: true, data: coachAcademy };
    } catch (error) {
        return {
            ok: false,
            error: error instanceof Error ? error.message : "An unknown error occurred"
        }
    }
}

export async function getTotalPages() {
    const max = 10
    const count = await prisma.coachAcademy.count()
    return Math.ceil(count / max)
}

export async function getAllEntries() {
    try {
        const coachAcademy = await prisma.coachAcademy.findMany({
            include: {
                gymnasts: true
            }
        })
        return { ok: true, data: coachAcademy };
    } catch (error) {
        return {
            ok: false,
            error: error instanceof Error ? error.message : "An unknown error occurred"
        }

    }
}


export async function toggleVerificationStatus(id: string, verified: boolean) {

    try {
        const updateEntry = await prisma.coachAcademy.update({
            where: {
                id
            },
            data: {
                paymentVerified: verified
            }
        })
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: [updateEntry.email
            ],
            subject: `3rd All India Level Wise Gymnastics Competition Verified`.toLocaleUpperCase(),
            // text: `${name} registered in ${event} ${subEvent ? `-${subEvent}` : ''}`,
            html: `<main style="background:black;height:100vh;width:100vw;overflow:hidden;color:white;
            display:flex;justify-content:center;flex-direction:column;align-items:center
            ">
              <h1>Your registration for 3rd All India Level Wise Gymnastics Competition is verified successfully</h1>
              <h3>Thank you for registering 3rd All India Level Wise Gymnastics Competition. 
              </h3>
            </main>`
        }
        if (verified) {
            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    } else {
                        resolve(info)
                    }
                })
            })
        }

        revalidatePath("/admin")
    } catch (error) {
        console.log(error);

    }
}