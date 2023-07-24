// api/login
import { NextRequest } from 'next/server';

import { signJwtAccessToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  password: string;
  email: string;
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithoutPass } = user;
    const accesToken = signJwtAccessToken(userWithoutPass);

    const result = {
      ...userWithoutPass,
      accesToken,
    };
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
}
