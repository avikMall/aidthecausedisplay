import { google } from 'googleapis';
import Link from 'next/link';

export async function getServerSideProps({ query }) {

  // Auth
  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });

  // Query

  const { id } = 0;
  const range = `Sheet1!F:F`;

  // const totCol = await sheets.spreadsheets.values.get({
  //   spreadsheetId: process.env.SHEET_ID,
  //   tot,
  // });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  

  // Result

  const data = response.data.values;
  const totalVal = parseInt(data.slice(-1)[0][0]) * 4;

  return { 
      props: {
          totalVal,
          // totalVal,
      } 
  }
}

export default function Post({ totalVal }) {
  return (
    <div className='outer'>      
      <div className='total-txt'>{"$" + totalVal}</div>
    </div>
  );
}