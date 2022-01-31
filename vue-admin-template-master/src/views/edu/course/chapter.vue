<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>
    <el-form label-width="120px">
      <!-- 添加和修改课时表单 -->
      <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
        <el-form :model="video" label-width="120px">
          <el-form-item label="课时标题">
            <el-input v-model="video.title" />
          </el-form-item>
          <el-form-item label="课时排序">
            <el-input-number v-model="video.sort" :min="0" controls-position="right" />
          </el-form-item>
          <el-form-item label="是否免费">
            <el-radio-group v-model="video.free">
              <el-radio :label="0">免费</el-radio>
              <el-radio :label="1">默认</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- TODO -->
          <el-form-item label="上传视频">
            <el-upload
              :on-success="handleVodUploadSuccess"
              :on-remove="handleVodRemove"
              :before-remove="beforeVodRemove"
              :on-exceed="handleUploadExceed"
              :file-list="fileList"
              :action="UPLOADVIDEO_URL"
              :limit="1"
              class="upload-demo"
            >
              <el-button size="small" type="primary">上传视频</el-button>
              <el-tooltip placement="right-end">
                <div slot="content">
                  最大支持10MB，<br />
                  支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                  GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                  MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                  SWF、TS、VOB、WMV、WEBM 等视频格式上传
                </div>
                <i class="el-icon-question" />
              </el-tooltip>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
          <el-button
            :disabled="saveVideoBtnDisabled"
            type="primary"
            @click="saveOrUpdateVideo"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加和修改章节表单 -->
      <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
          <el-form-item label="章节标题">
            <el-input v-model="chapter.title" />
          </el-form-item>
          <el-form-item label="章节排序">
            <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
        </div>
      </el-dialog>
      <el-button type="primary" size="medium" @click="open()">添加章节</el-button>
      <el-form-item>
        <ul class="chanpterList">
          <li v-for="chapter in chapterList" :key="chapter.id">
            <p>
              {{ chapter.title }}
              <span class="acts">
                <el-button type="text" @click="openChapter(chapter.id)"
                  >添加课时</el-button
                >
                <el-button style="" @click="getChapterById(chapter.id)" type="text"
                  >编辑</el-button
                >
                <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
              </span>
            </p>
            <!-- 视频 -->
            <ul class="chanpterList videoList">
              <li v-for="video in chapter.children" :key="video.id">
                <p>
                  {{ video.title }}
                  <span class="acts">
                    <el-button @click="getVideoById(video.id)" type="text"
                      >编辑</el-button
                    >
                    <el-button @click="deleteVideo(video.id)" type="text">删除</el-button>
                  </span>
                </p>
              </li>
            </ul>
          </li>
        </ul>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/course/course";
import chapter from "@/api/chapter/chaper";
import v from "@/api/video/video";
export default {
  data() {
    return {
      UPLOADVIDEO_URL: "http://localhost:8003/eduvod/video",
      fileList: [],
      saveBtnDisabled: false, // 保存按钮是否禁用
      chapterList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      chapter: {
        title: "",
        sort: "",
      },
      dialogChapterFormVisible: false,
      courseId: "",
      saveVideoBtnDisabled: false, // 课时按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示课时表单
      chapterId: "", // 课时所在的章节id
      video: {
        // 课时对象
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: "",
        videoOriginalName: "",
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleVodRemove() {
      v.deleteAliyunVideo(this.video.videoSourceId).then((resp) => {
        this.$message.success("删除视频成功");
        this.fileList = [];
        //删除视屏之后还需要把videoid和name设为空
        this.video.videoSourceId = "";
        this.video.videoOriginalName = "";
      });
    },
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除${file.name} ?`);
    },
    //成功回调
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.id;
      this.video.videoOriginalName = file.name;
    },
    //视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },
    //根据小节Id回显
    getVideoById(id) {
      this.dialogVideoFormVisible = true;
      v.getVideoById(id).then((resp) => {
        this.video = resp.data.item;
      });
    },
    //更新小节
    updateVideo() {
      v.updateVideoByVideoId(this.video)
        .then((resp) => {
          this.dialogVideoFormVisible = false;
          this.$message.success("修改成功");
        })
        .catch();
    },
    //删除小节
    deleteVideo(id) {
      this.$confirm("此操作将删除小节，是否继续", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          v.deleteVideo(id).then((resp) => {
            this.$message.success("删除成功");
            this.dialogVideoFormVisible = false;
            this.getChapterlist();
          });
        })
        .catch((error) => {
          // 失败
          if (error === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },
    openChapter(chapterId) {
      this.video = {};
      this.dialogVideoFormVisible = true;
      this.video.chapterId = chapterId;
    },
    //添加小节
    addVideo() {
      //设置课程Id
      this.video.courseId = this.courseId;
      v.addVideo(this.video)
        .then((resp) => {
          this.$message.success("新增成功");
          this.dialogVideoFormVisible = false;
          this.getChapterlist();
        })
        .catch((error) => {});
    },
    saveOrUpdateVideo() {
      if (!this.video.id) {
        this.addVideo();
      } else {
        this.updateVideo();
      }
    },
    deleteChapter(id) {
      this.$confirm("此操作将删除章节，是否继续", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          chapter.deleteChapter(id).then((resp) => {
            if (resp.code == 20000) {
              this.$message.success("删除成功");
              this.getChapterlist();
            } else {
              this.$message.warning(resp.message);
            }
            this.dialogChapterFormVisible = false;
          });
        })
        .catch((error) => {
          // 失败
          if (error === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },
    open() {
      this.dialogChapterFormVisible = true;
      this.chapter = {};
    },
    //回显章节方法
    getChapterById(id) {
      this.dialogChapterFormVisible = true;
      chapter.getChapterById(id).then((resp) => {
        this.chapter.title = resp.data.item.title;
        this.chapter.sort = resp.data.item.sort;
        this.chapter.id = resp.data.item.id;
      });
    },
    //修改章节方法
    updateChapterById() {
      chapter.updateChapter(this.chapter.id, this.chapter).then((resp) => {
        this.$message.success("修改成功");
        this.dialogChapterFormVisible = false;
        this.getChapterlist();
      });
    },
    addChapter() {
      this.chapter.courseId = this.courseId;
      chapter.addChapter(this.chapter).then((response) => {
        //关闭弹框
        this.dialogChapterFormVisible = false;
        //提示
        this.$message.success("添加成功");
        //刷新页面
        this.getChapterlist();
      });
    },
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.addChapter();
      } else {
        this.updateChapterById();
      }
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        this.getChapterlist();
      }
    },
    getChapterlist() {
      course
        .getChapterList(this.courseId)
        .then((response) => {
          this.chapterList = response.data.list;
        })
        .catch();
    },
    previous() {
      this.$router.push({ path: `/course/info/${this.courseId}` });
    },
    next() {
      this.$router.push({ path: `/course/publish/${this.courseId}` });
    },
  },
};
</script>
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>
