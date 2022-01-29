// Get random integer
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random dummy data
const DUMMY_DATA = [...Array(getRandomInt(6, 30)).keys()].map((_, index) => {
  return {
    id: `d${index}`,
    value: getRandomInt(0, 100),
    label: `label_${index}`
  };
});

// Select main container
const container = d3.select("svg").classed("container", true);

// Get max height and width
const element = container.node();
const maxWidth = element.getBoundingClientRect().width;
const maxHeight = element.getBoundingClientRect().height;

// Get max value
const maxValue = d3.max(DUMMY_DATA, d => d.value);

const xScale = d3
  .scaleBand()
  .domain(DUMMY_DATA.map(datPoint => datPoint.label))
  .rangeRound([0, maxWidth])
  .padding(0.1);

const yScale = d3
  .scaleLinear()
  // Leave some space if bar is equal to maxValue
  .domain([0, maxValue * 1.1])
  .range([maxHeight, 0]);

const bar = container
  .selectAll(".bar")
  .data(DUMMY_DATA)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("width", xScale.bandwidth())
  .attr("height", data => maxHeight - yScale(data.value))
  .attr("x", data => xScale(data.label))
  .attr("y", data => yScale(data.value));
