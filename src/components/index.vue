<template>
  <div id="app">
    <div id="d3_v4"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var nodes = [
        { name: "BeiJing" },
        { name: "XiaMen" },
        { name: "XiAn" },
        { name: "HangZhou" },
        { name: "ShangHai" },
        { name: "QingDao" },
        { name: "NanJing" },
        { name: "NanJing" },
        { name: "NanJing" },
        { name: "NanJing" },
        { name: "NanJing" }
      ];
      var links = [
        { source: 0, target: 1, relation: "挚友" },
        { source: 0, target: 2, relation: "挚友" },
        { source: 0, target: 3, relation: "挚友" },
        { source: 1, target: 4, relation: "挚友" },
        { source: 1, target: 5, relation: "挚友" },
        { source: 1, target: 6, relation: "挚友" }
      ];
      // for (var i = 0; i < 2000; i++) {
      //   nodes.push({
      //     name: i + "名字"
      //   });
      //   links.push({
      //     source: i,
      //     target: i + 1
      //   });
      // }

      var width = 1800;
      var height = 800;
      var svg = d3
        .select("#d3_v4")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      console.log(d3.forceManyBody());
      // 通过布局来转换数据，然后进行绘制
      var simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links).distance(200)) //弹性力
        .force("charge", d3.forceManyBody()) //万有引力
        .force("center", d3.forceCenter(width / 2, height / 2)); //重力  还有一个碰撞力

      simulation
        .nodes(nodes) //设置力模拟的节点
        .on("tick", ticked);

      simulation
        .force("link") //添加或移除力
        .links(links); //设置连接数组
      var color = d3.scaleOrdinal(d3.schemeCategory20);
      // 绘制
      var svg_links = svg
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 3)
        .call(
          d3
            .zoom() //创建缩放行为
            .scaleExtent([-5, 2]) //设置缩放范围
        );

      var svg_nodes = svg
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        })
        .attr("r", "20")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .call(
          d3
            .drag()
            .on("start", dragstarted) //d3.drag() 创建一个拖曳行为
            .on("drag", dragged)
            .on("end", dragended)
        );
      console.log(nodes);
      //添加描述节点的文字
      var svg_texts = svg
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .style("fill", "black")
        .text(function(d) {
          return d.name;
        });
      // 关系线
      var links_texts = svg
        .selectAll(".mytext")
        .data(links)
        .enter()
        .append("text")
        .style("fill", "red")
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.relation;
        });
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      function ticked() {
        svg_links
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });

        links_texts
          .attr("x", function(d) {
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", function(d) {
            return (d.source.y + d.target.y) / 2;
          });

        svg_nodes
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) {
            return d.y;
          });

        svg_texts
          .attr("x", function(d) {
            return d.x;
          })
          .attr("y", function(d) {
            return d.y;
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
#d3_v4 {
  width: 1800px;
  height: 800px;
  border: 1px solid red;
  margin: 0 auto;
}
</style>
