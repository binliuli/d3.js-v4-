<template>
  <div>
    <h3>坐标轴</h3>
    <div id="line_one"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getLineone();
  },
  methods: {
    getLineone() {
      const width = 400;
      const height = 400;

      let svg = d3
        .select("#line_one")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      //用于坐标轴的线性比例尺
      let xScale = d3
        .scaleLinear()
        .domain([0, 10])
        .range([0, 300]); //像素

      let yScale = d3
        .scaleLinear()
        .domain([300, 0])
        .range([0, 300]); //Y轴数据倒叙

      //定义坐标轴
      //四个值：axisBottom  axisLeft axisRight axisTop
      let axisY = d3
        .axisLeft()
        .scale(yScale)
        .ticks(10); //使用上面定义的比例尺

      let axisX = d3
        .axisBottom()
        .scale(xScale) //使用上面定义的比例尺
        .ticks(10); //ticks(5)分成5分 默认是10分

      //在svg中添加一个包含坐标轴各元素的G元素
      let gAxisY = svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(50,50)"); //平移
      let gAxisX = svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(50,350)"); //平移

      axisY(gAxisY);
      axisX(gAxisX);

      //画图表背景线
      d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 300)
        .attr("y2", 0);

      d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", -300);

      // 开始画 柱形图
      const data = [50, 43, 100, 260, 67, 89, 280, 78, 66, 45];
      const padding = { top: 50, right: 50, bottom: 50, left: 50 };
      const rectStep = 30; //矩形所占的宽度（包括空白）
      const rectWidth = 20; //矩形所占的宽度（不包括空白）
      const color = d3.scaleOrdinal(d3.schemeCategory20);

      // 矩形
      let rect = svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("x", function(d, i) {
          return padding.left + i * rectStep + 5;
        })
        .attr("y", function(d, i) {
          return height - padding.bottom - d;
        })
        .attr("width", rectWidth)
        .attr("height", function(d) {
          return d;
        });

      // 文字
      let text = svg
        .selectAll(".rectText")
        .data(data)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
          return padding.left + i * rectStep + 5;
        })
        .attr("y", function(d, i) {
          return height - padding.bottom - d;
        })
        .attr("dx", rectWidth / 2)
        .attr("dy", "20px")
        .text(function(d) {
          return d;
        });
    }
  }
};
</script>
<style lang="less">
#line_one {
  .grid-line {
    stroke: pink;
    shape-rendering: crispEdges;
    stroke-opacity: 0.5; //透明度
  }
  .y-axis {
  }
}
</style>
<style lang="less" scoped>
#line_one {
  width: 400px;
  height: 400px;
  border: 1px solid red;
}
</style>
