<template>
  <div class="bar">
    <h3>柱形图</h3>
    <div id="bar_one" class="border"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.barOne();
  },
  methods: {
    barOne() {
      const data = [50, 43, 100, 280, 67, 89, 300];
      const width = 400;
      const height = 400;
      let svg = d3
        .select("#bar_one")
        .append("svg") //添加
        .attr("width", width)
        .attr("height", height);

      const padding = { top: 20, right: 20, bottom: 20, left: 20 };
      const rectStep = 35; //矩形所占的宽度（包括空白）
      const rectWidth = 30; //矩形所占的宽度（不包括空白）

      // 矩形
      let rect = svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", "blue")
        .attr("x", function(d, i) {
          return padding.left + i * rectStep;
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
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("fill", "white")
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
          return padding.left + i * rectStep;
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
<style lang="less" scoped>
.bar {
  text-align: center;
  .border {
    border: 1px solid red;
  }
  #bar_one {
    width: 500px;
    height: 500px;
  }
}
</style>