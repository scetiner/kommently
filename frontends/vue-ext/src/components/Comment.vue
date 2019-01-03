<template>
<transition>
   <li class="comment" >
        <img :src="avatar" alt="" class="avatar">
        <rating class="comment-rating" src="star.png" :showRating="false" v-model="rating"></rating>
        <div class="user">{{username}}               
            <div class="content">{{comment.body}}</div>
        </div>
        
        <span class="time"><timeago :datetime="comment.updated_at" :auto-update="60"></timeago></span>
        <div class="clearfix"></div>
        <!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
    </li>     
</transition>  
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { ImageRating } from "vue-rate-it";
export default {
  name: "Comment",
  props: {
    comment: Object
  },
  components:{
      rating: ImageRating
  },
  computed:{
      avatar(){
          return this.comment.avatar || this.comment.user.avatar;
      },
      username(){
          return this.comment.userName || this.comment.user.username;
      },
      rating(){
          return this.comment.u_score;
      }
  }
};
</script>


<style lang="scss" scoped>
.comment{
    position: relative;
    padding: 10px;
}
.avatar{
    float: left;
    border-radius: 50%;
    width: 30px;
}
.user{
    vertical-align: middle;
    font-size: 12px;    
    font-weight: 600;
    text-transform: lowercase;
    text-align:  justify;
    padding-left: 45px;        
}
.content{
    font-size: 11px;
    font-weight: 500;
    padding: 5px 0;
    opacity: 0.7;
}
.time{
    float: right;
    font-size: 10px;
    color: gray;
}
</style>