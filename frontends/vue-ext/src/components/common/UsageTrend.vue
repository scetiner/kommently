<template>
<transition>
    <div>
        <div class="title">Comment Trend</div>
        <trend
        :data="trendData"
        :gradient="['#499662', '#5d7fc9', '#8b41b0','#61aec0']"
        auto-draw
        smooth>
        </trend>    
    </div>
       
</transition>  
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UsageTrend",  
  computed: {
     ...mapGetters(["pageId","commentTrend"]),
     trendData(){
         return Object.values(this.commentTrend).sort();
     }
  },
  methods: {
      ...mapActions(["getCommentTrend"])
  },
  mounted(){
      this.getCommentTrend({page_id:this.pageId});
  }
};
</script>

<style lang="scss" scoped>
.title {
    position: relative;
    width: 100%;
    text-align: center;
    color: #94c72e;
    padding: 10px;
    font-size: 12px;
}
</style>