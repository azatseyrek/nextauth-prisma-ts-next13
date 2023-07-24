import { NextRequest } from 'next/server';

import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });
  // eslint-disable-next-line no-unused-vars
  const { password, ...userWithoutPass } = user;
  return new Response(JSON.stringify(userWithoutPass));
}
