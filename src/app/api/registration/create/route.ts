import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { clubName, clubLocation, clubRegion, coachName, email, phone, gymnasts, bannerPromotion, payment } = body;


        // Create a new CoachAcademy entry with optional related models
        const newCoachAcademy = await prisma.coachAcademy.create({
            data: {
                clubName,
                clubLocation,
                clubRegion,
                coachName,
                email,
                phone,
                gymnasts: gymnasts ? {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    create: gymnasts.map((gymnast: any) => ({
                        discipline: gymnast.discipline,
                        level: gymnast.level,
                        gymnastName: gymnast.gymnastName,
                        dob: gymnast.dob,
                        ageCategory: gymnast.ageCategory,
                    }))
                } : undefined,
                bannerPromotion: bannerPromotion ? {
                    create: {
                        wantBanner: bannerPromotion.wantBanner,
                        bannerFile: bannerPromotion.bannerFile,
                    }
                } : undefined,
                payment: payment ? {
                    create: {
                        paymentMode: payment.paymentMode,
                        fees: payment.fees,
                        paymentScreenshot: payment.paymentScreenshot,
                        eligibility: payment.eligibility,
                        understand: payment.understand,
                    }
                } : undefined,
            },
        });

        return NextResponse.json(newCoachAcademy, { status: 201 });
    } catch (error) {
        console.error('Error creating entry:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
