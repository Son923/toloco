import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { SHEET_CONFIG } from '@/config/sheets';

// Validate environment variables
const requiredEnvVars = [
  'GOOGLE_SHEET_ID',
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Function to format private key
const formatPrivateKey = (key: string) => {
  // Remove any wrapping quotes and convert escaped newlines to actual newlines
  const formattedKey = key
    .replace(/^["']|["']$/g, '')  // Remove wrapping quotes
    .replace(/\\n/g, '\n');       // Convert \n to actual newlines
  return formattedKey;
};

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY || ''),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function POST(req: Request) {
  try {
    // Log environment variables (excluding sensitive data)
    console.log('Environment check:', {
      hasSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      privateKeyStart: process.env.GOOGLE_PRIVATE_KEY?.substring(0, 30) + '...',
      sheetConfig: {
        ...SHEET_CONFIG,
        spreadsheetId: SHEET_CONFIG.spreadsheetId?.substring(0, 5) + '...',
      },
    });

    const body = await req.json();
    const { name, email, phone, company, industry, message } = body;

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare the values to be inserted
    const values = [
      [
        name,
        email,
        phone,
        company,
        industry,
        message,
        new Date().toISOString(), // Timestamp
      ],
    ];

    try {
      // Test the authentication first
      await sheets.spreadsheets.get({
        spreadsheetId: SHEET_CONFIG.spreadsheetId,
      });

      // If authentication successful, append the values
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_CONFIG.spreadsheetId,
        range: SHEET_CONFIG.range,
        valueInputOption: SHEET_CONFIG.valueInputOption,
        insertDataOption: SHEET_CONFIG.insertDataOption,
        requestBody: {
          values,
        },
      });

      return NextResponse.json(
        { 
          message: 'Đã gửi thông tin thành công!',
          debug: {
            spreadsheetId: SHEET_CONFIG.spreadsheetId?.substring(0, 5) + '...',
            updatedRange: response.data.updates?.updatedRange,
            updatedRows: response.data.updates?.updatedRows,
          }
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.error('Google Sheets API Error:', {
        error: error.message,
        code: error.code,
        status: error.status,
        stack: error.stack,
      });
      
      if (error.message.includes('invalid_grant')) {
        throw new Error('Authentication failed. Please check the credentials.');
      }
      
      throw error;
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        message: error instanceof Error 
          ? `Error: ${error.message}` 
          : 'Có lỗi xảy ra, vui lòng thử lại sau.',
        debug: { timestamp: new Date().toISOString() }
      },
      { status: 500 }
    );
  }
} 