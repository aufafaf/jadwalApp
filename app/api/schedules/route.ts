import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const schedules = await prisma.daySchedule.findMany({
      include: {
        schedules: {
          orderBy: {
            startTime: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedules" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Creating schedule with data:", data);

    // Validate required fields
    if (!data.day || !data.date) {
      return NextResponse.json(
        { error: "Missing required fields: day and date" },
        { status: 400 },
      );
    }

    const daySchedule = await prisma.daySchedule.create({
      data: {
        day: data.day,
        date: data.date,
        schedules: {
          create: data.schedules || [],
        },
      },
      include: {
        schedules: true,
      },
    });

    console.log("Schedule created successfully:", daySchedule);
    return NextResponse.json(daySchedule, { status: 201 });
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json(
      {
        error: "Failed to create schedule",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
