import { hash, genSalt } from 'bcryptjs';

export async function createPasswordHash(password): Promise<any> {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}
