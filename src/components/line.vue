<template>
  <div>
    <h3>坐标轴</h3>
    <div id="line_one"></div>
    <div id="line_two"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getLineone(); //柱形图
    this.getLineTwo(); //折线图
  },
  methods: {
    getLineTwo() {
      const width = 400;
      const height = 400;
      const dataset = [
        {
          country: "china",
          gdp: [
            [2000, 11920],
            [2001, 13170],
            [2002, 14660],
            [2003, 16800],
            [2004, 19440],
            [2005, 22780]
          ]
        },
        {
          country: "japan",
          gdp: [
            [2000, 12920],
            [2001, 13470],
            [2002, 19660],
            [2003, 12800],
            [2004, 12440],
            [2005, 20780]
          ]
        }
      ];

      const padding = { top: 30, right: 30, bottom: 30, left: 50 };
      // 计算 最大值
      let gdpmax = 0;
      for (let i = 0; i < dataset.length; i++) {
        let currGdp = d3.max(dataset[i].gdp, function(d) {
          return d[1];
        });
        if (currGdp > gdpmax) {
          gdpmax = currGdp;
        }
      }
      let svg = d3
        .select("#line_two")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // 定义域 值域
      let xScale = d3
        .scaleLinear()
        .domain([2000, 2005])
        .range([0, width - padding.left - padding.right]);

      let yScale = d3
        .scaleLinear()
        .domain([0, gdpmax * 1.1])
        .range([height - padding.top - padding.bottom, 0]);

      // 直线生成器
      let linePath = d3
        .line()
        .x(function(d) {
          return xScale(d[0]);
        })
        .y(function(d) {
          return yScale(d[1]);
        })
        //曲线  d3.curveCardinal.tension(0.4) 默认值是0 值越小弯曲程度越大
        .curve(d3.curveCardinal);

      // 颜色
      const colors = [d3.rgb(0, 0, 255), d3.rgb(0, 255, 0)];

      //开始画 折线
      svg
        .selectAll("path")
        .data(dataset)
        .enter()
        .append("path")
        .attr(
          "transform",
          "translate(" + padding.left + "," + padding.top + ")"
        )
        .attr("d", function(d) {
          return linePath(d.gdp);
        })
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("stroke", function(d, i) {
          return colors[i];
        });

      // 比例尺
      let axisY = d3
        .axisLeft()
        .scale(yScale)
        .ticks(5); //使用上面定义的比例尺

      let axisX = d3
        .axisBottom()
        .scale(xScale) //使用上面定义的比例尺
        .ticks(5); //ticks(5)分成5分 默认是10分
      let gAxisY = svg
        .append("g")
        .attr("class", "y-axis")
        .attr(
          "transform",
          "translate(" + padding.left + "," + padding.top + ")"
        ); //平移
      let gAxisX = svg
        .append("g")
        .attr("class", "x-axis")
        .attr(
          "transform",
          "translate(" + padding.left + "," + (height - padding.top) + ")"
        ); //平移

      axisY(gAxisY);
      axisX(gAxisX);

      //画图表背景线
      d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width - padding.left - padding.right)
        .attr("y2", 0);

      d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", -(height - padding.top - padding.bottom));
    },
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

      let tooltip = d3
        .select("#line_one")
        .append("div")
        .attr("class", "detail")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden") // 是否可见（一开始设置为隐藏）
        .text("");

      // 矩形
      let rect = svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "barRect")
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
        })
        .on("mouseover", function(d, i) {
          console.log(d, i);
          //滑入 颜色
          //   d3.select(this).attr("fill", "red");
          //  追着鼠标  定位  展示 数据
          tooltip.style("visibility", "visible").text(d);
        })
        .on("mousemove", function(d, i) {
          tooltip
            .transition()
            .duration(100)
            .style("top", event.pageY + 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function(d, i) {
          // 划出 动画效果
          //   d3.select(this)
          //     .transition()
          //     .duration(500)
          //     .attr("fill", "blue");
          tooltip.style("visibility", "hidden");
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
.grid-line {
  stroke: pink;
  shape-rendering: crispEdges;
  stroke-opacity: 0.5; //透明度
}
.detail {
  font-size: 12px;
  color: red;
  width: 30px;
  height: 30px;
  line-height: 30px;
  background: pink;
  text-align: center;
}
.d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 2px;
}
.barRect:hover {
  //鼠标移入hover事件
  fill: orange;
}
</style>
<style lang="less" scoped>
#line_one {
  width: 400px;
  height: 400px;
  border: 1px solid red;
  float: left;
}
#line_two {
  width: 400px;
  height: 400px;
  border: 1px solid red;
  float: left;
  margin-left: 20px;
}
</style>
