<template>
  <div>
    <div class="shouye">
      <div class="n1">
        <el-col :span="6">
          <el-card shadow="always">
            <!-- 折线图 -->
            <div id="chartmainline" style="width:350px; height:350px;"></div>
          </el-card>
        </el-col>
      </div>
      <div class="n2">
        <el-col :span="6">
          <el-card shadow="always">
            <!-- 柱状图 -->
            <div id="chartmainbar" style="width:350px; height:350px;"></div>
          </el-card>
        </el-col>
      </div>
      <div class="n3">
        <el-col :span="10">
          <el-card shadow="always">
            <div id="leiDaTu" class="echart" style="width: 400px;height: 400px;"></div>
          </el-card>
        </el-col>
      </div>
    </div>

    <div class="echart">
      <el-col :span="10">
        <el-card shadow="always">
          <div ref="worldDiv" style="width: 800px;height: 600px;"></div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
import worldJson from "echarts/map/json/world.json";
import { mapGetters } from "vuex";

export default {
  name: "World",
  data() {
    return {
      optionline: {
        title: {
          text: "数据统计",
        },
        tooltip: {},
        legend: {
          data: ["用户来源"],
        },
        xAxis: {
          data: ["安卓用户", "苹果用户", "PC用户", "其他"],
        },
        yAxis: {},
        series: [
          {
            name: "访问量",
            type: "line", //设置图表主题
            data: [500, 200, 360, 100],
            lineStyle: {
              color: "#41c7db",
              width: 2,
            },
            itemStyle: {
              color: "#41c7db",
            },
          },
        ],
      },

      optionbar: {
        title: {
          text: "柱状图",
        },
        tooltip: {},
        legend: {
          data: ["用户来源"],
        },
        xAxis: {
          data: ["安卓用户", "苹果用户", "PC用户", "其他"],
        },
        yAxis: {},
        series: [
          {
            name: "访问量",
            type: "bar", //设置图表主题
            data: [500, 200, 360, 100],
            itemStyle: {
              color: function (params) {
                let colorList = ["#41c7db", "#41c7db", "#41c7db", "#41c7db"];
                return colorList[params.dataIndex];
              },
            },
          },
        ],
      },
      option: {
        title: {
          text: "主要使用国家",
          subtext: "",
          sublink: "http://esa.un.org/wpp/Excel-Data/population.htm",
          x: "center",
          y: "top",
        },
        tooltip: {
          trigger: "item",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x: "right",
          y: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "主要使用国家",
            type: "map",
            mapType: "world",
            roam: true,
            mapLocation: {
              y: 60,
            },
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                areaColor: "#0D62AA",
                borderColor: "#41c7db ",
                borderWidth: 0,
              },
              emphasis: {
                areaColor: "#41c7db ",
              },
            },
            //随便显示几个国家
            data: [
              { name: "China", value: 1359821.465, selected: true },
              { name: "France", value: 63230.866, selected: true },
              { name: "Russia", value: 21861.476, selected: true },
              { name: "United States", value: 12247.116, selected: true },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.drawLine();
    this.initEcharts();
    this.$nextTick(function () {
      this.drawPie("leiDaTu");
    });
  },
  methods: {
    drawLine: function () {
      //基于准本好的DOM，初始化echarts实例
      let chartmainline = this.$echarts.init(
        document.getElementById("chartmainline")
      );
      let chartmainbar = this.$echarts.init(
        document.getElementById("chartmainbar")
      );
      //绘制图表
      chartmainline.setOption(this.optionline);
      chartmainbar.setOption(this.optionbar);
    },
    // 图表
    initEcharts() {
      // world
      this.$echarts.registerMap("world", worldJson);
      var world_charts = this.$echarts.init(this.$refs.worldDiv);
      world_charts.setOption(this.option);
    },
    drawPie() {
      let charts = this.$echarts.init(document.getElementById("leiDaTu"));
      var option = {
        title: {
          link: "https://www.baidu.com",
        },
        tooltip: {}, //提示层
        legend: {
          data: ["name1"],
        },
        radar: {
          name: {
            textStyle: {
              color: "gray", //字体颜色
              backgroundColor: "", //背景色
              borderRadius: 3, //圆角
              padding: [3, 5], //padding
            },
          },
          center: ["47%", "42%"],
          radius: "65%",
          startAngle: 270,
          indicator: [
            {
              name: "Android",
              max: 600,
            },
            {
              name: "IOS",
              max: 200,
            },
            {
              name: "PC",
              max: 360,
            },
            {
              name: "Other",
              max: 100,
            },
          ],
        },
        series: [
          {
            type: "radar",
            data:[
              {
                value: [80, 80, 80, 80],
              },
            ],
          },
        ],
      };

      charts.setOption(option);
    },
  },
};
</script>

<style scoped>
.shouye {
  display: flex;
  float: left;
  margin-left: 30px;
}

.shouye .el-card {
  width: 400px;
  height: 370px;
}
.n2 {
  margin-left: 50px;
}
.n3 {
  margin-left: 50px;
}
.echart .el-card {
  width: 850px;
  margin-top: 30px;
  height: 500px;
  margin-left: 30px;
}

.el-card__body {
  padding: 0px;
}
</style>







