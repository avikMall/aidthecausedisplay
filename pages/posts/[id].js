import { google } from 'googleapis';

export async function getServerSideProps({ query }) {

    // Auth
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    // Query

    const { id } = query;
    const range = `Sheet1!A${id}:C${id}`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    // Result

    const [amount, content] = response.data.values[0];
    // console.log(amount, content)

    return { 
        props: {
            amount,
            content
        } 
    }
}

export default function Post({ amount, content }) {
    return <article>
        <h1>{amount}</h1>
        <div>{content}</div>
    </article>
}