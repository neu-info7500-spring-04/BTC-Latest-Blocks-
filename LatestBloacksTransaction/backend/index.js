const cors = require('cors');
const express = require('express');
const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());

const BITQUERY_API_URL = 'https://graphql.bitquery.io/';

const BITQUERY_API_KEY = 'BQYVuqIpHjHwd9QSHzn5vVIZjAiqW2Rs';

app.get('/api/blocks', async (req, res) => {
  const query = `
    {
        bitcoin {
    blocks(options: {desc: ["height"], limit: 1000}) {
      height
      timestamp {
        time(format: "%Y-%m-%d %H:%M:%S")
      }
      transactionCount
      blockSize
      blockWeight
    }
  }
    }
  `;

  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(BITQUERY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': BITQUERY_API_KEY,
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});