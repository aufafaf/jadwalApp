// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     const data = await request.json();

//     // Transform schedules data - jangan include dayId di create
//     const schedulesData = (data.schedules || []).map((schedule: any) => ({
//       startTime: schedule.startTime,
//       endTime: schedule.endTime,
//       activity: schedule.activity,
//       completed: schedule.completed ?? false,
//     }));

//     const updated = await prisma.daySchedule.update({
//       where: { id },
//       data: {
//         day: data.day,
//         date: data.date,
//         schedules: {
//           deleteMany: {},
//           create: schedulesData,
//         },
//       },
//       include: {
//         schedules: true,
//       },
//     });

//     return NextResponse.json(updated);
//   } catch (error) {
//     console.error("Error updating schedule:", error);
//     return NextResponse.json(
//       { error: "Failed to update schedule", details: String(error) },
//       { status: 500 },
//     );
//   }
// }

// export async function DELETE(
//   _request: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;

//     await prisma.daySchedule.delete({
//       where: { id },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error deleting schedule:", error);
//     return NextResponse.json(
//       { error: "Failed to delete schedule" },
//       { status: 500 },
//     );
//   }
// }

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params terlebih dahulu
    const { id } = await context.params;
    const data = await request.json();

    console.log("Updating schedule with ID:", id);
    console.log("Update data:", data);

    // Validasi data
    if (!data.day || !data.date) {
      return NextResponse.json(
        { error: "Missing required fields: day and date" },
        { status: 400 }
      );
    }

    // Transform schedules data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schedulesData = (data.schedules || []).map((schedule: any) => ({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      activity: schedule.activity,
      completed: schedule.completed ?? false,
    }));

    // Update dengan nested write
    const updated = await prisma.daySchedule.update({
      where: { id },
      data: {
        day: data.day,
        date: data.date,
        schedules: {
          deleteMany: {}, // Hapus semua schedule lama
          create: schedulesData, // Buat schedule baru
        },
      },
      include: {
        schedules: {
          orderBy: {
            startTime: 'asc',
          },
        },
      },
    });

    console.log("Schedule updated successfully:", updated);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { 
        error: "Failed to update schedule", 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params terlebih dahulu
    const { id } = await context.params;

    console.log("Deleting schedule with ID:", id);

    // Cek apakah schedule exists
    const exists = await prisma.daySchedule.findUnique({
      where: { id },
    });

    if (!exists) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }

    // Delete cascade akan otomatis hapus semua schedules terkait
    await prisma.daySchedule.delete({
      where: { id },
    });

    console.log("Schedule deleted successfully");
    return NextResponse.json({ success: true, message: "Schedule deleted" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { 
        error: "Failed to delete schedule",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}