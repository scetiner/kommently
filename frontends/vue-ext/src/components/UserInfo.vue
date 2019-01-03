<template>
<transition>
    <div class="user-info">
        <p class="greeting" v-if="registrationStatus && !isUserLoading">Welcome <span class="highlight">{{userName}}</span>, you are visiting</p>                        
        <p class="greeting" v-if="!registrationStatus  && !isUserLoading">Welcome <span class="highlight">guest</span> please register to your browser to comment..</p> 
    </div>    
</transition>  
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserInfo",
  props: {
    // pageIcon: String,
    // pageTitle: String
  },
  computed: {
    ...mapGetters(["registrationStatus", "isUserLoading", "userName"])
  }
};
</script>


<style lang="scss" scoped>
.user-info {
  display: block;
}

.greeting{
    margin-top: 0;
    font-size: 13px;
}
.highlight{  
    text-decoration: underline;
    color: #94c72e;
}
</style>