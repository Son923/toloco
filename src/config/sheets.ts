const requiredEnvVars = [
  'GOOGLE_SHEET_ID',
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
] as const;

// Validate environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const SHEET_CONFIG = {
  spreadsheetId: process.env.GOOGLE_SHEET_ID,
  range: 'Sheet1!A:G', // From column A to G
  valueInputOption: 'USER_ENTERED',
  insertDataOption: 'INSERT_ROWS'
}; 