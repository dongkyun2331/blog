// /pages/api/track.js

import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const dataDir = path.resolve('.', 'data');
      const filePath = path.join(dataDir, 'visitors.json');

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      const { path: visitorPath } = req.body;
      const timestamp = new Date();

      const newVisitor = { path: visitorPath, timestamp };

      let visitors = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        visitors = JSON.parse(fileData);
      }

      visitors.push(newVisitor);
      fs.writeFileSync(filePath, JSON.stringify(visitors, null, 2));

      res.status(200).json({ message: 'Visitor recorded' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
