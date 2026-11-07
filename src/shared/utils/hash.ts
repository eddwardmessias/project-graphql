import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
