<template>
  <div></div>
</template>
<script>
import u from "../../../api/swagger/swagger";
export default {
  data() {
    return {};
  },
  created() {
    this.getSwaggerInfo();
  },
  methods: {
    getSwaggerInfo() {
      u.getSwaggerList().then();
    },
  },
};
</script>
<style lang=""></style>
