import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.PROMOTE_EMAIL || 'alli@example.com';
  const user = await prisma.user.update({
    where: { email },
    data: { role: 'ADMIN' },
    select: { id: true, email: true, role: true },
  });
  console.log('Updated user:', user);
}

main()
  .catch((e) => {
    console.error('Failed to promote user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
