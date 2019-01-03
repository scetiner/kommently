<template>
<transition>
  <div class="comment-list" v-if="showList">
      <div class="comment-header">   
          Recent comments             
      </div>
      <ul class="comments">
          <comment class="comment-item" v-for="comment in pageComments" v-bind:key="comment._id" :comment="comment"></comment>
          <li class="comment-item" v-if="showLoadMore">
            <a id="btn_load_more" class="waves-effect waves-teal btn-small btn-flat col s12 center-align" @click="loadMore()">Load More</a>                            
          </li>   
      </ul>                
  </div>       
</transition>  
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Comment from "./Comment";

export default {
  name: "CommentList",
  components:{
    comment: Comment
  },
  props: {
    url: String
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["pageId", "pageComments","commentCount","commentPageIndex","commentPageSize","commentPageCount"]),
    showList(){
      return this.pageComments && this.pageComments.length>0;
    },
    showLoadMore(){
      return this.commentPageCount != this.commentPageIndex;
    }
  },
  watch: {
    pageId: function(ov, nv) {
      this.loadComments();
    }
  },
  methods: {
    ...mapActions(["getComments"]),
    loadComments(){
      this.getComments({
        page_id: this.pageId,
        index: 1,
        size: 10,
        reset:true
      });
    },
    loadMore(){

      this.getComments({
        page_id: this.pageId,
        index: this.commentPageIndex + 1,
        size: 10,
        reset:true
      });
    }
  },
  mounted() {
    this.loadComments();
  }
};
</script>


<style lang="scss" scoped>
// .stats-table > tbody {
//   max-height: 400px;
// }
#btn_load_more{
  margin-bottom: 10px;
}

.comment-header {
  display: block;
  border-bottom: 1px solid #3b3746;
  // width: 100%;
  min-height: 15px;
  padding: 15px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: 800;
}

.comments {
  display: block;
  // width: 100%;
  padding: 0px;
  // padding-left: 20px;
  list-style-type: none;
}

.comment-item {
  display: block;
  // width: 100%;
  min-height: 20px;
  border-bottom: 1px solid #3b3746;
}
.comment-item:last-child {  
  border-bottom: none;
}
</style>