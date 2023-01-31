import { getRandomInt } from "./getRandomInt";

export const generateCircle = () => {
  return {
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    radius: 70,
    fill: "blue",
    id: getRandomInt(1000).toString(),
  };
};
