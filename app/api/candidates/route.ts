import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Candidate from '@/models/Candidate';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const vacancyId = searchParams.get('vacancyId');
    const status = searchParams.get('status');
    
    const query: any = {};
    if (vacancyId) query.vacancyId = vacancyId;
    if (status) query.status = status;
    
    const candidates = await Candidate.find(query)
      .populate('vacancyId')
      .sort({ aiScore: -1, createdAt: -1 });
    
    return NextResponse.json({ success: true, data: candidates });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const candidate = await Candidate.create(body);
    return NextResponse.json(
      { success: true, data: candidate },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

