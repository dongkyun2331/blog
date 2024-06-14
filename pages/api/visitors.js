// /pages/api/visitors.js

import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const dataDir = path.resolve('.', 'data');
      const filePath = path.join(dataDir, 'visitors.json');

      let visitors = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        visitors = JSON.parse(fileData);
      }

      res.status(200).json({ count: visitors.length });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
