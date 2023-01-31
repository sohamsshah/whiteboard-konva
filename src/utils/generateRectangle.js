import { getRandomInt } from "./getRandomInt";

export const generateRectangle = () => {
  return {
    id: getRandomInt(1000).toString(),
    x: 200,
    y: 200,
    height: 100,
    width: 100,
    fill: "pink",
  };
};
