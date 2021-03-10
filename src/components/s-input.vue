// 自定义封装的input组件
<template>
  <div class="inputBox">
    <slot name="prepend"></slot>

    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      class="sinput"
      :style="inputStyle"
      type="text"
      :placeholder="tip"
    />
    <!-- 直接使用阿里图标的svg 参考博文 https://blog.csdn.net/weixin_41192489/article/details/103289763 -->
    <svg
      @click="clear"
      v-show="value && value.length > 0"
      t="1615288815540"
      class="clearIcon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4549"
      width="16"
      height="16"
    >
      <path
        d="M566.97558594 521.09667969L856.8828125 231.18945312c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355468l-1.58203125-1.58203125c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0L512 466.51660156 222.09277344 176.21386719c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0l-1.58203125 1.58203125c-15.02929688 14.63378906-15.02929688 38.75976563 0 53.39355469l289.90722656 289.90722656L167.1171875 811.00390625c-14.63378906 14.63378906-14.63378906 38.75976563 0 53.39355469l1.58203125 1.58203125c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0L512 576.07226563 801.90722656 865.97949219c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0l1.58203125-1.58203125c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355469L566.97558594 521.09667969z"
        fill="#363F4D"
        p-id="4550"
      ></path>
    </svg>

    <slot name="append"></slot>
  </div>
</template>
<script>
export default {
  name: "s-input",
  props: {
    value: String,
    tip: String,
    themeColor: {
      type: String,
      default: "#409EFF",
    },
    radius: {
      type: String,
      default: "4px",
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
    clear() {
      this.$emit("input", "");
      this.$emit("change", "");
      this.$emit("clear");
    },
  },
  data() {
    return {
      currentValue: this.value,
      inputStyle: {
        "border-color": this.themeColor,
        "border-radius": this.radius,
      },
    };
  },
};
</script>
<style scoped>
.inputBox {
  display: flex;
  align-items: center;
  position: relative;
}

.sinput {
  height: 36px;
  border: 1px solid;
  width: 100%;
  padding: 4px 8px;
  flex-grow: 1;
  outline: none;
  background: white;
  box-sizing: border-box;
}

.clearIcon {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
</style>