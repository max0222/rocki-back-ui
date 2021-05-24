<template>
  <!--  <div class="dashboard-editor-container">-->
  <!--    <panel-group @handleSetLineChartData="handleSetLineChartData"/>-->

  <!--    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
  <!--      <line-chart :chart-data="lineChartData"/>-->
  <!--    </el-row>-->

  <!--    <el-row :gutter="32">-->
  <!--      <el-col :xs="24" :sm="24" :lg="8">-->
  <!--        <div class="chart-wrapper">-->
  <!--          <raddar-chart/>-->
  <!--        </div>-->
  <!--      </el-col>-->
  <!--      <el-col :xs="24" :sm="24" :lg="8">-->
  <!--        <div class="chart-wrapper">-->
  <!--          <pie-chart/>-->
  <!--        </div>-->
  <!--      </el-col>-->
  <!--      <el-col :xs="24" :sm="24" :lg="8">-->
  <!--        <div class="chart-wrapper">-->
  <!--          <bar-chart/>-->
  <!--        </div>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--  </div>-->
  <div>
    <h1>New Users Statistics</h1>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <p>{{ userData.day0.date }}</p>
          <p>{{ userData.day0.count }}</p>
          <p>{{ userData.day0.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <p>{{ userData.day1.date }}</p>
          <p>{{ userData.day1.count }}</p>
          <p>{{ userData.day1.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <p>{{ userData.day2.date }}</p>
          <p>{{ userData.day2.count }}</p>
          <p>{{ userData.day2.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <p>{{ userData.day3.date }}</p>
          <p>{{ userData.day3.count }}</p>
          <p>{{ userData.day3.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <p>{{ userData.day4.date }}</p>
          <p>{{ userData.day4.count }}</p>
          <p>{{ userData.day4.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <p>{{ userData.day5.date }}</p>
          <p>{{ userData.day5.count }}</p>
          <p>{{ userData.day5.rate }}%</p>
        </div>
      </el-col>
    </el-row>
    <h1>New Tracks Statistics</h1>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <p>{{ trackData.day0.date }}</p>
          <p>{{ trackData.day0.count }}</p>
          <p>{{ trackData.day0.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <p>{{ trackData.day1.date }}</p>
          <p>{{ trackData.day1.count }}</p>
          <p>{{ trackData.day1.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <p>{{ trackData.day2.date }}</p>
          <p>{{ trackData.day2.count }}</p>
          <p>{{ trackData.day2.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <p>{{ trackData.day3.date }}</p>
          <p>{{ trackData.day3.count }}</p>
          <p>{{ trackData.day3.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <p>{{ trackData.day4.date }}</p>
          <p>{{ trackData.day4.count }}</p>
          <p>{{ trackData.day4.rate }}%</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <p>{{ trackData.day5.date }}</p>
          <p>{{ trackData.day5.count }}</p>
          <p>{{ trackData.day5.rate }}%</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'
import { listToday } from '@/api'
import { listUserStatistics, listTrackStatistics } from '@/api'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      userData: 'NAN',
      trackData: 'NAN'
    }
  },
  created() {
    this.getNewUserStatistics()
    this.getNewTrackStatistics()
  },
  methods: {
    getNewUserStatistics() {
      listUserStatistics().then(response => {
        this.userData = response.data
      })
    },
    getNewTrackStatistics() {
      listTrackStatistics().then(response => {
        this.trackData = response.data
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.bg-up {

}

.bg-down {

}
</style>
