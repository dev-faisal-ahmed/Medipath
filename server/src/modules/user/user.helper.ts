function generateRandomPassword() {
  const chars = `abcdefghijklmnopqrstuvwxyz0123456789`;
  let password = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

export const userHelper = { generateRandomPassword };
