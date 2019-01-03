<template>
<transition>
    <div class="score-view">
      <div class="badge-box green">
          <span>{{vCount}}</span>
          <span>Views</span>
      </div>
      <div class="badge-box blue">
              <span>{{cCount}}</span>
              <span>Comments</span>
      </div>
      <div class="badge-box purple">
          <span>{{uScore}}%</span>
          <span>Rating</span>
      </div>
      <div class="badge-box aqua">
              <span>{{sScore}}%</span>
              <span>Happiness</span>
      </div>
      <div class="clearfix"></div>
    </div>    
</transition>  
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { NumericFormatter } from "../utils/numeric-formatter";
// import DonutChart from "./common/DonutChart";
// import LiquidChart from "./common/LiquidChart";

export default {
  name: "ScoreView",
  props: {
    url: String
  },
  // components: {
  //   donut: DonutChart,
  //   liquid: LiquidChart
  // },
  data: () => ({}),
  computed: {
    ...mapGetters([
      "pageUrl",
      "visitorCount",
      "commentCount",
      "sentimentScore",
      "userScore"
    ]),
    vCount() {
      return NumericFormatter.decimal(this.visitorCount);
    },
    cCount() {
      return NumericFormatter.decimal(this.commentCount);
    },
    sData() {
      let result = [];
      let s = this.sentimentScore * 100 / this.commentCount;
      return s;
    },
    sScore() {
      return NumericFormatter.floating(this.sData);
    },
    uData() {
      let result = [];
      let s = this.userScore / this.commentCount * 20;
      return s;
    },
    uScore() {
      return NumericFormatter.floating(this.uData);
    }
  }
};
</script>


<style lang="scss" scoped>
.badge-box {
  float: left;
  padding: 15px 10px;
  width: calc(25% - 2.98px);
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  margin-right: 2.98px;
}

.badge-box:last-child {
  margin-right: 0px;
}

.badge-box.green {
  background: #499662;
}
.badge-box.blue {
  background: #5d7fc9;
}
.badge-box.purple {
  background: #8b41b0;
}
.badge-box.aqua {
  background: #61aec0;
}

.badge-box > span {
  display: block;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
}
.badge-box > span:first-child {
  font-size: 18px;
  font-weight: 800;
}
</style>