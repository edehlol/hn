import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await fetch(`https://hacker-news.firebaseio.com/v0/item/${req.query.id}.json`);
  const post = await data.json();

  res.status(200).json(post);
}
