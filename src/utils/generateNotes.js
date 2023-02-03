import { getRandomInt } from "./getRandomInt";

export const generateNotes = (notes) => {
  let initialX = 40;
  let initialY = 40;
  let res = [];
  for (let i = 0; i < notes.length; i++) {
    if (i % 5 === 0 && i !== 0) {
      initialY += 260;
      initialX = 40;
    }

    initialX += 380;
    res.push({
      comment: notes[i]?.comment,
      title: notes[i]?.title,
      name: notes[i]?.owner.name,
      labels: notes[i]?.labels?.data,
      x: initialX,
      y: initialY,
      height: 245,
      width: 365,
      fill: "white",
      id: getRandomInt(1000000).toString(),
    });
  }
  return res;
};
