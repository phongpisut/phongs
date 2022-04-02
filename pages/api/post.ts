// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../utils/mongodb";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("db");
  console.log(req.body)
  db.collection("participant").insertOne(JSON.parse(req.body)).then((response)=>{
    res.status(200).json(response)
  }).catch(err=> res.status(500).json({ error: err }))
  

   
}
