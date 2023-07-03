import axios from "axios";

export const getRandomWord = async () => {
  const { data } = await axios<{ FirstName: string }>(
    "https://api.randomdatatools.ru/?unescaped=false&params=FirstName"
  );

  return data.FirstName;
};
