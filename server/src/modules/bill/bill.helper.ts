const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const characterLength = characters.length;

const generateRandomCharacter = (length: number) => {
  let key = '';
  for (let i = 1; i <= length; i++) {
    key += characters[Math.floor(Math.random() * characterLength)];
  }
  return key;
};

const generateBillId = () => {
  let billId = generateRandomCharacter(3);
  billId += '-';
  for (let i = 1; i <= 6; i++) {
    billId += Math.floor(Math.random() * 10);
  }
  return billId;
};

export const billHelper = { generateBillId };
