<template>
    <el-card class="dk-box-card-main" shadow="never">
        <dk-result class="dk-page-result" state="error" title="提交失败" content="请核对并修改以下信息后，再重新提交。">
            <div class="dk-page-result-content">
                <div class="dk-page-result-content-title">您提交的内容有如下错误：</div>
                <p><i class="el-icon-circle-close dk-text-danger dk-mr-2"></i>您的账户已被冻结 <a href="javascript:void(0);" class="dk-ml-4">立即解冻 <i class="el-icon-arrow-right"></i></a></p>
                <p><i class="el-icon-circle-close dk-text-danger dk-mr-2"></i>您的账户还不具备申请资格 <a href="javascript:void(0);" class="dk-ml-4">立即解冻 <i class="el-icon-arrow-right"></i></a></p>
            </div>
        </dk-result>
    </el-card>
</template>

<script>
  export default {
    name: "ResultFail"
  }
</script>

<style scoped>

</style>