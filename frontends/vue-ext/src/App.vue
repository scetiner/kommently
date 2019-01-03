<template>
<div class="main-wrapper">
    <header>    
        <nav class="navbar-fixed">
          <div class="brand-logo"><img src="logo.svg" alt="Kommently"> kommently</div> 
        </nav>    
    </header>
    <main class="container">
      <loader :loading="isAppLoading"></loader>
      <router-view></router-view>                
    </main>
    <footer class="footer-fixed">          
        © {{new Date().getFullYear()}} Sc Strider Apps, All rights reserved.        
    </footer>
  </div> 
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { NumericFormatter } from "./utils/numeric-formatter";
import { CallState } from "./utils/call-service";
import SideMenu from "./components/SideMenu.vue";
import Loader from "./components/common/Loader.vue";

export default {
  name: "MainApp",
  components: {
    "side-menu": SideMenu,
    loader: Loader
  },
  data: () => ({
    menuVisible: false,
    url: "",
    title: "",
    iconUrl: "",
    isAppLoading: true
  }),
  computed: {
    ...mapGetters(["commentCount"])
  },
  watch: {
    commentCount: function() {
      // chrome.browserAction.setBadgeText({text:"null"});// NumericFormatter.decimal(this.commentCount)});
    }
  },
  methods: {
    ...mapActions(["visitPage", "createUser"]),
    init() {
      var self = this;
      if (!(chrome && chrome.tabs)) {
        return;
      }

      chrome.tabs.getSelected(null, function(tab) {
        self.url = tab.url;
        self.$store.commit("setPageTitle", tab.title);
        self.$store.commit("setPageIcon", tab.favIconUrl);
        self.visitPage(self.url);
      });
    },
    registerUser() {
      var self = this;
      if (chrome && chrome.identity) {
        chrome.identity.getProfileUserInfo(function(userInfo) {
          self.createUser({
            email: userInfo.email,
            id: userInfo.id
          });
        });
      }
    },
    loadingChanged(isLoading) {
      var self = this;
      setTimeout(function() {
        self.isAppLoading = isLoading;
      }, 300);
    },
    initForProd() {
      this.registerUser();
      this.init();
    },
    initForDev() {
      
    }
  },
  mounted() {
    CallState.onChanged(this.loadingChanged);
    this.initForProd();
    // this.initForDev();
    this.$router.push("/home");
  }
};
</script>


<style lang="css">
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&amp;subset=latin-ext");
@import "../assets/css/custom.css";
.brand-logo {
  display: block;
  color:#94c72e;
  text-decoration: none;
  padding: 10px;
}

.brand-logo > img {
  height: 40px;
  vertical-align: middle;  
}

* {
  font-family: "Montserrat", sans-serif !important;
}
body {
  background: #1e1d23;
  color: white;
  margin: 0px;
}

.main-wrapper {
  width: 100% !important;
  max-height: 700px !important;
  padding-bottom: 20px;
}

.navbar-fixed {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  background: #25252f;
  -webkit-box-shadow: 0px 10px 8px -1px rgba(26, 25, 31, 1);
  -moz-box-shadow: 0px 10px 8px -1px rgba(26, 25, 31, 1);
  box-shadow: 0px 10px 8px -1px rgba(26, 25, 31, 1);
  width: 100%;
  height: 55px;
  margin-bottom: 10px;
  font-size: 24px;
  color: #94c72e;
}

.container {
  padding: 10px;
  overflow: hidden;
}

.footer-fixed {
    position: relative;
    width: 100%;
    text-align: center;
    color: #94c72e;
    padding: 10px;
    font-size: 12px;
}
</style>


