// prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

// Bunu yapma sebebimiz prisma clienti her requestte olusturmak yerine global olarak olusturup her requestte kullanmak. Bu sekilde performans artisi sagliyoruz. Global den kasit ise herhangi bir requestte olusturulan prisma clienti diger requestlerde de kullanilabilir. Bu sekilde olusturdugumuz prisma clienti herhangi bir requestte olusturulduysa tekrar olusturulmuyor.

// prisma kurma adimlari
// 1. yarn add prisma
// 2. yarn prisma init
// 3. prisma/schema.prisma dosyasini olusturduk. Bu dosyada veritabanimizdaki tablolari olusturuyoruz.
// 4. prisma migrate dev --name init --preview-feature
// 5. lib icerisinde prisma.ts dosyasini olusturduk.
// 6. global olarak prisma clienti olusturduk.
// 7. npx prisma studio ile veritabanimiza bakabiliriz.
