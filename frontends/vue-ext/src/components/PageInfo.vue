<template>
<transition>
    <div class="page-info">
        <img :src="pageIcon" alt="" @error="imgLoadingFailed"><span>{{pageTitle}}</span> 
        <div class="clearfix"></div>       
    </div>            
</transition>  
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PageInfo",
  props: {
    // pageIcon: String,
    // pageTitle: String
  },
  data:() => ({
    defaultIconUrl:"logo.png",
    isImageFailed:false
  }),
  computed: {
    ...mapGetters([
      "pageTitle",
      "pageIcon"
    ]),
    iconUrl(){
        return this.isImageFailed ? this.defaultIconUrl : this.pageIcon;
    }
  },
  methods:{
      imgLoadingFailed(){
          console.error("image failed")
          this.isImageFailed = true
      }
  }
};
</script>


<style lang="scss" scoped>
.page-info{
    line-height: 16px;
    font-size: 12px;
    vertical-align: middle;
    margin: 0px;
    display: table;
}
.page-info img {
    display: table-cell;
    width: 32px;
}
.page-info span {
    display: table-cell;
    max-width: 290px;
    padding-left: 10px;
    vertical-align: middle;

}

</style>