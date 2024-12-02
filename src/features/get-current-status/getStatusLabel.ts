interface Props {
  status: number;
}

const getStatusLabel = ({ status }: Props): string => {
  if (status === 1) {
    return "В обробці";
  } else if (status === 2) {
    return "Відправлено";
  } else if (status === 3) {
    return "Відмовлено";
  } else if (status === 4) {
    return "Отримано";
  } else {
    return "Невідомий";
  }
};

export default getStatusLabel;
