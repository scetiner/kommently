<template>
<transition>  
<div class="row">
    <div class="col s12 m5">
      <div class="card-panel">
        <span class="">I am a very simple card. I am good at containing small bits of information.
        I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
        </span>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters([
      "commentCount"
    ])
  },
  methods: {
    ...mapActions([
      "getPage"
    ]),
    getUrl(){
      return "https://milliyet.com.tr"
    }
  },
  mounted() {
    this.getPage(this.getUrl());    
  }
};
</script>

<style lang="scss" scoped>
.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}
</style>