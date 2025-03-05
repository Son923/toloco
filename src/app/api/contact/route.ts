import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { SHEET_CONFIG } from '@/config/sheets';

// Function to format private key
const formatPrivateKey = (key: string) => {
  try {
    // Basic cleanup
    let formattedKey = key.trim();
    
    // Remove any surrounding quotes
    formattedKey = formattedKey.replace(/^["']|["']$/g, '');
    
    // Ensure proper line breaks
    if (!formattedKey.includes('\n')) {
      formattedKey = formattedKey
        .replace(/\\n/g, '\n')
        .replace(/-----BEGIN PRIVATE KEY-----/, '-----BEGIN PRIVATE KEY-----\n')
        .replace(/-----END PRIVATE KEY-----/, '\n-----END PRIVATE KEY-----');
    }

    return formattedKey;
  } catch (error) {
    console.error('Error formatting private key:', error);
    throw new Error('Failed to format private key');
  }
};

// Initialize auth with proper error handling
const initializeAuth = () => {
  try {
    // Validate required environment variables
    const requiredEnvVars = ['GOOGLE_SHEET_ID', 'GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY'] as const;
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    const privateKey = formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY || '');
    console.log('Private key format check:', {
      hasHeader: privateKey.includes('-----BEGIN PRIVATE KEY-----'),
      hasFooter: privateKey.includes('-----END PRIVATE KEY-----'),
      containsNewlines: privateKey.includes('\n'),
      length: privateKey.length,
    });

    return new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: 'toloco',
        private_key: privateKey,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  } catch (error) {
    console.error('Auth initialization error:', error);
    throw error;
  }
};

export async function POST(req: Request) {
  try {
    const auth = initializeAuth();
    
    // Log environment variables (excluding sensitive data)
    console.log('Environment check:', {
      hasSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
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
        message: error.message,
        code: error.code,
        status: error.status,
        stack: error.stack,
      });
      
      if (error.message.includes('invalid_grant')) {
        throw new Error('Authentication failed: Please check service account permissions and credentials');
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