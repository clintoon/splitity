import randomcolor from 'randomcolor';

const generateRandomColor = (): string => {
  return randomcolor({
    luminosity: 'bright',
  });
};

export { generateRandomColor };
