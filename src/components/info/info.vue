<template>
    <transition name="fade">
        <div v-if="show" class="s-info" :style="style" :class="`info-${type}`">
            <!--消息前的图标-->
            <div class="info-icon">
                <i v-if="type==='ok'" class="iconfont icon-iconfontgou2"></i>
                <i v-if="type==='warning'" class="iconfont icon-72jingshi"></i>
                <i v-if="type==='error'" class="iconfont icon-cuowu"></i>
            </div>
            <!--消息的内容-->
            <div v-html="content"></div>
        </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                style: {}, // 消息弹窗的样式
                show: false,// 消息弹窗是否隐藏，默认隐藏
                type: 'ok',// 消息类型,默认为绿色效果的成功消息
                content: "", // 消息的内容
                autoClose: true,// 弹窗是否自动关闭，默认自动关闭
                showTime: 1000,// 弹窗展示时间，默认1s
                x: null,//鼠标点击的x坐标
                y: null,//鼠标点击的y坐标
            }
        },
        mounted() {
            if (this.autoClose) {
                setTimeout(() => {
                    this.close();
                }, this.showTime);
            }
            if (this.x && this.y) {
                this.$set(this.style, 'top', this.y - 60 + 'px')
                this.$set(this.style, 'left', this.x + 'px')
            }
        },
        methods: {
            close() {
                this.show = false;
            },
        }
    };
</script>
<style scoped>
    .s-info {
        position: fixed;
        z-index: 8888;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 16px;
        display: flex;
        align-items: center;
        border-radius: 4px;
        box-sizing: border-box;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
 
    /*成功的消息样式*/
    .info-ok {
        background-color: #f0f9eb;
        border-color: #e1f3d8;
        color: #67c23a;
    }
 
    /*警示的消息样式*/
    .info-warning {
        background-color: #fdf6ec;
        border-color: #faecd8;
        color: #E6A23C;
    }
 
    /*报错的消息样式*/
    .info-error {
        background-color: #fef0f0;
        border-color: #fde2e2;
        color: #F56C6C;
    }
 
    .info-icon {
        margin-right: 10px;
    }
 
    /*渐变过渡*/
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
 
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.35s;
    }
</style>