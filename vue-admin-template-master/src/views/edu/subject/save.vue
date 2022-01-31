<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a
            :href="
              OSS_PATH +
              '/excel/%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB%E5%88%97%E8%A1%A8%E6%A8%A1%E6%9D%BF.xls'
            "
            >点击下载模版</a
          >
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="UPLOAD_API"
          name="file"
          accept="application/vnd.ms-excel"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      UPLOAD_API: "http://localhost:8001/eduservice/subject", // 接口API地址
      OSS_PATH: "", // 阿里云OSS地址
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false,
    };
  },
  created() {},
  methods: {
    submitUpload() {
      if (this.$refs.upload.uploadFiles.length != 0) {
        this.importBtnDisabled = true;
        this.loading = true;
        this.$refs.upload.submit();
        this.$router.push({ path: "/subject/list" });
      } else {
        this.$message.info("请选择上传文件");
      }
    },
    fileUploadSuccess() {
      this.loading = false;
      this.$message({
        type: "success",
        message: "添加课程分类成功",
      });
    },
    fileUploadError(response) {
      this.loading = false;
      this.$message({
        type: "error",
        message: "添加课程分类失败",
      });
    },
  },
};
</script>
<style scoped></style>
