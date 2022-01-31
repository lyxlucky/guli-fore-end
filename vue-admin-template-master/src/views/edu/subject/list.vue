<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="关键词" style="margin-bottom: 30px" />

    <el-tree
      ref="tree2"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>
<script>
import subject from "@/api/subject/subject";
export default {
  data() {
    return {
      filterText: "",
      subjectList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  created() {
    this.getAllSubjects();
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },
  methods: {
    getAllSubjects() {
      subject
        .getSubjectList()
        .then((response) => {
          if (response.success) {
            this.subjectList = response.data.list;
          }
        })
        .catch();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
};
</script>
<style scoped></style>
