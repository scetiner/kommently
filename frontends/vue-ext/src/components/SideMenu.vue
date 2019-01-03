<template>
  <!-- sidebar menu -->
  <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
    <div class="menu_section">
      <ul class="nav side-menu">
        <li :class="activeMenu == menu.home.icon ? 'active':''"><a><i :class="menu.home.icon"></i> {{menu.home.title}} <span class="fa fa-chevron-down"></span></a>
          <ul class="nav child_menu">
            <li v-for="item in menu.home.items" :key="item.path" :class="activeLink == item.path ? 'current-page':''"><router-link :to="item.path">{{item.title}}</router-link></li>            
          </ul>
        </li>
      </ul>
    </div>
    <!-- <div class="menu_section">
      <h3>Modules</h3>
      <ul class="nav side-menu" v-for="m in menu.modules" :key="m.icon">
        <li :class="activeMenu == m.icon ? 'active':''" ><a><i :class="m.icon"></i> {{m.title}} <span class="fa fa-chevron-down"></span></a>
          <ul class="nav child_menu">
            <li v-for="item in m.items" :key="item.path" :class="activeLink == item.path ? 'current-page':''"><router-link :to="item.path">{{item.title}}</router-link></li>
          </ul>
        </li>
      </ul>
    </div> -->
  </div>
  <!-- /sidebar menu -->
</template>
<script>
export default {
  name: "SideMenu",
  data: () => ({
    menu: {
      home: {
        title: "Pages",
        icon: "fa fa-home",
        items: [
          {
            title: "Home",
            path: "/home"
          },
          {
            title: "About",
            path: "/about"
          }
        ]
      }
    }
  }),
  computed: {
    activeLink() {
      return this.$route.path;
    },
    activeMenu(){
      let path = this.$route.path;

      // check for home menu
      var selectedIcon = this.menu.home.items.filter(item=> item.path == path);
      if(selectedIcon && selectedIcon.length > 0){
        return  this.menu.home.icon;
      }

      // check for modules menu
      // for(var key in this.menu.modules){
      //   selectedIcon = this.menu.modules[key].items.filter(item=> item.path == path);
      //   if(selectedIcon && selectedIcon.length > 0){
      //     return  this.menu.modules[key].icon;
      //   } 
      // }
    }
  },
  methods: {},
  mounted() {
    
  }
};
</script>


<style lang="scss" scoped>
// .stats-table > tbody {
//   max-height: 400px;
// }
</style>