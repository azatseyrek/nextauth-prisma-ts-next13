import { NextRequest } from 'next/server';

import prisma from '@/lib/prisma';
import {verifyJwtAccessToken} from '@/lib/jwt';

interface Params {
  id: number;
}

export async function GET(request: NextRequest, params: Params) {
  const accessToken = request.headers.get('authorization')?.split(' ')[1];

  if (!accessToken || !verifyJwtAccessToken(accessToken)) {
    return new Response(JSON.stringify({ error: 'Access token not found' }), {
      status: 401,
    });
  }

  const userPost = await prisma.post.findMany({
    where: {
      id: params.id,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(userPost));
}
