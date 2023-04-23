import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

import { options } from '../auth/[...nextauth]';

export default async function handle(req, res) {
  const { title, content } = req.body;

  const session = await getServerSession(req, res, options);

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
