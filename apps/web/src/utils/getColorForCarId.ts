export const getColorForCarId = (carId: string | undefined): string => {
  const colors = [
    'rgba(255, 87, 51, 0.5)',
    'rgba(51, 255, 87, 0.5)',
    'rgba(51, 87, 255, 0.5)',
    'rgba(255, 51, 161, 0.5)',
    'rgba(51, 255, 245, 0.5)',
    'rgba(255, 255, 51, 0.5)',
    'rgba(255, 153, 51, 0.5)',
    'rgba(153, 51, 255, 0.5)',
    'rgba(51, 255, 153, 0.5)',
    'rgba(255, 51, 51, 0.5)',
    'rgba(51, 153, 255, 0.5)',
    'rgba(255, 51, 255, 0.5)',
    'rgba(153, 255, 51, 0.5)',
    'rgba(51, 255, 51, 0.5)',
    'rgba(255, 153, 153, 0.5)',
    'rgba(51, 51, 255, 0.5)',
    'rgba(255, 51, 153, 0.5)',
    'rgba(51, 255, 255, 0.5)',
    'rgba(255, 255, 153, 0.5)',
    'rgba(153, 51, 51, 0.5)',
  ];
  if (!carId) return 'rgba(0, 0, 0, 0.5)';
  const index = carId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};