


    <template>
<transition>
    <div class="comment-input" v-if="registrationStatus">                    
      <form class="" v-if="!username">          
        <div class="box-wrapper">
          <page-info></page-info>
          <div class="box-arrow">
            
          </div>

        </div>
        <div class="form__group">
            <img :src="userImg" alt="">
            <textarea id="comment_area" type="text" class="form__field validate" :placeholder="placeHolder" v-model="comment" :maxlength="max"></textarea>
            <!-- <label for="comment_area" class="form__label">{{placeHolder}}</label> -->
            <span class="text-limit">{{comment.length}} / {{max}}</span>
        </div>
        <div class="form__group">                  
            <rating class="input-rating" id="rating" src="star.png" :showRating="false" v-model="rating"></rating>    
            <a class="btn-share green" :class="{disabled: !isValid}" @click="submitComment()">Share</a>
            <div class="clearfix"></div>
        </div>
      </form>            
      <div v-if="username">
          <div class="congrats">Thanks, you already shared your comment.</div>
          <div class="comment-wrapper">
            <comment :comment="commentUser"></comment>
          </div>
      </div>
    </div>    
</transition>  
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { ImageRating } from "vue-rate-it";
import Comment from "./Comment";
import PageInfo from "./PageInfo";
export default {
  name: "CommentInput",
  components: {
    comment: Comment,
    rating: ImageRating,
    "page-info":PageInfo
  },
  props: {
    // url: String
  },
  data: () => ({
    comment: "",
    rating: 3,
    placeholder1: "be the first one to comment for this page",
    placeholder2: "share a public comment..",
    max: 250
  }),
  computed: {
    ...mapGetters([
      "commentUser",
      "commentCount",
      "registrationStatus",
      "pageUrl",
      "pageId",
      "userId",
      "avatar"
    ]),
    userImg() {      
      return this.avatar || "profile.png";
    },
    username() {
      if (this.commentUser && this.commentUser.user) {
        return this.commentUser.user.username;
      }
      return "";
    },
    isValid() {
      let r = Number(this.rating);
      return this.comment && this.comment.length > 0 && this.comment.length < 251 && r > 0 && r <= 5;
    },
    placeHolder() {
      return this.commentCount < 1 ? this.placeholder1 : this.placeholder2;
    }
  },
  watch: {
    pageId: function(ov, nv) {
      if (this.pageId && this.userId) {
        this.getUserComment({
          page_id: this.pageId,
          user_id: this.userId
        });
      }
    },
    userId: function(ov, nv) {
      if (this.pageId && this.userId) {
        this.getUserComment({
          page_id: this.pageId,
          user_id: this.userId
        });
      }
    }
  },
  methods: {
    ...mapActions(["createComment", "getUserComment"]),
    submitComment() {
      if (this.comment && this.isValid) {
        this.createComment({
          body: this.comment,
          page_id: this.pageId,
          user_id: this.userId,
          user_score: Number(this.rating),
          page_url: this.pageUrl
        });
      }
    },
    
  },
  mounted() {}
};
</script>


<style lang="css" scoped>
img{
  float: left;
  border-radius: 50%;
  width: 32px;
  margin-top: 10px;
}
.box-wrapper {
	position: relative;
    padding: 20px;
    border: 1px solid #d0d0d0;
}
.box-arrow {
    position: absolute;
    bottom: -6px;
    left: 20px;
    width: 10px;
    height: 10px;
    background: #25252f;
    border-right: 1px solid #d0d0d0;
    border-bottom: 1px solid #d0d0d0;
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
}

.form__field {
  margin-left: 10px;  
  font-family: inherit;
  width: calc(100% - 42px);
  border: 0;
  border-bottom: 1px solid #94c72e;
  outline: 0;
  font-size: 13px;
  color: white;
  padding: 7px 0;
  resize: none;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: #94c72e;
}


.comment-wrapper{
  background: #1e1d23;
  list-style: none;
}
.text-limit{
  float: right;
  font-size:11px;
}

.btn-share {
  float: right; 
  cursor: pointer;
  padding: 10px 15px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 3px;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -ms-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
  border: none; 
  font-size: 15px;
  font-weight: 600;
  text-align: center;
}

.btn-share:hover {
  box-shadow: 1px 6px 15px rgba(0,0,0,0.5);
}

.green {
  background-color: #94c72e;
  color: white;
}


.congrats{
  font-size: 14px;
    margin-bottom: 10px;
    color: #94c72e;
}
.form__group:last-child {
  padding: 20px 0
}

.disabled{
  pointer-events: none;
  opacity: 0.6;
}
</style>