const LINE_HEIGHT_IN_UNITS = 16;
const FONT_WIDTH = {
  DEFAULT: 6,
};
const DEFAULT_NOTE_WIDTH = 365;

const calculateLabelsHeight = (labels) => {
  const labelsGap = 4;
  const labelsPadding = 4;
  const totalLabelSpace = labels.reduce((acc, curr) => {
    return (
      acc + curr.text.length * FONT_WIDTH.DEFAULT + labelsGap + labelsPadding
    );
  }, 0);

  const labelsHeight =
    (parseInt(totalLabelSpace / DEFAULT_NOTE_WIDTH) + 1) * LINE_HEIGHT_IN_UNITS;

  return labelsHeight;
};

const calculateTitleHeight = (title) => {
  return title.length / DEFAULT_NOTE_WIDTH;
};

export const generateDynamicNote = (note) => {
  const { comment, labels, title } = note;
  //

  const gap = 2 * LINE_HEIGHT_IN_UNITS;
  let totalHeight = 0;

  // calculate label height
  const labelsHeight = calculateLabelsHeight(labels, DEFAULT_NOTE_WIDTH);
  totalHeight += gap + labelsHeight;

  const titleHeight = calculateTitleHeight(title, DEFAULT_NOTE_WIDTH);
  console.log(labelsHeight);

  return {
    ...note,
    DEFAULT_NOTE_WIDTH: 365,
    height: totalHeight,
    fill: "white",
    x: 20,
    y: 20,
  };
};
