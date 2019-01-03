<template>
  <transition>  
    <div class="home">      
      <usage-trend class="row p0 first-box"></usage-trend>             
      <score-view class="row p0"></score-view>
      <comment-list class="row p0"></comment-list>        
      <comment-input class="row"></comment-input>     
     </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import ScoreView from "../components/ScoreView";
import UsageTrend from "../components/common/UsageTrend";




export default {
  components:{
    "comment-list":CommentList,
    "comment-input": CommentInput,
    "score-view":ScoreView,
    "usage-trend":UsageTrend
  },
  data: () => ({
    email: null,
    userId: null,
    chartData: [45,55]
  }),
  computed: {
    ...mapGetters([ "commentCount"])
  },
  methods: {
    ...mapActions(["getPage","visitPage"]),
  },
  mounted() {
    // this.init();    
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: auto;
  max-width: 100%;
}
.row {
  box-sizing: border-box;
  width: 100%;
  background: #25252f;
  padding: 10px;
  margin-bottom: 10px;
  -webkit-box-shadow: 0px 2px 8px 4px #1a191f;
  -moz-box-shadow: 0px 2px 8px 4px #1a191f;
  box-shadow: 0px 2px 8px 4px #1a191f;
}
.p0{
  padding: 0!important;
}

.first-box{
  margin-top: 55px;
}
</style>