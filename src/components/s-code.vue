需安装插件——代码高亮  "vue-highlightjs": "^1.3.3"    "highlight.js": "^9.18.0", 和 复制     "vue-clipboard2": "^0.3.1",
<template>
    <pre class="codeBox" v-highlightjs><code :class="lan">{{code}}</code>
    <button class="copyBtn" round size="mini" v-clipboard:copy="code" v-clipboard:success="onCopy">复制</button></pre>
</template>
<script>
    export default {
        props: {
            code: String,
            lan: String
        },
        methods: {
            onCopy() {
     

              this.$info('复制成功！')
      
            }
        }
    }
</script>
<style scoped>
.codeBox{
    position: relative;
    margin-right: 10px;
    min-height: 45px;
    background: #23241f;
}
.copyBtn{
    position: absolute;
    right: 8px;
    top:8px;
}
</style>