<template>
  <div style="padding: 0px">
    <div class="menuBox">
      <!-- 目录搜索框 -->
      <Sinput
        v-model="searchTitleKeyWords"
        style="width: 100%"
        @input="searchTitle"
        tip="请输入关键字"
      />
      <!-- 目录级别选择按钮 -->
      <div class="levelBtnBox">
        <div
          class="levelBtn"
          :class="{ activeBtn: activeLevel === item }"
          @click="changeLevel(item)"
          v-for="(item, index) in 6"
          :key="index"
        >
          {{ item }}
        </div>
      </div>

      <!-- 目录列表 -->
      <div style="margin-left: 10px">
        <div v-if="searchTitleKeyWords">
          <div v-for="(item, index) in searchmenuResultList" :key="index">
            <div
              style="cursor: pointer"
              @click="scrollToLinkTitle(item.offsetTop)"
              v-html="item.title"
            ></div>
          </div>
        </div>
        <div v-else class="menuListBox" ref="scrollMenu">
          <div
            v-for="(item, index) in menuList"
            :key="index"
            style="display: flex; cursor: pointer"
          >
            <div
              v-for="(item2, index2) in item.level"
              :key="index2"
              style="width: 15px"
            ></div>
            <div
              @click="toggle(index)"
              v-if="item.children && !item.hide"
              style="position: relative"
            >
              <!--折叠图标-->
              <svg
                v-show="item.fold"
                :class="{
                  foldIcon1: item.level === 1,
                  foldIcon2: item.level === 2,
                  foldIcon3:
                    item.level === 3 ||
                    item.level === 4 ||
                    item.level === 5 ||
                    item.level === 6,
                }"
                style="font-size: 12px !important"
                class="menuIcon"
                t="1615294217990"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="16812"
                width="12"
                height="12"
              >
                <path
                  d="M312.888889 995.555556c-17.066667 0-28.444444-5.688889-39.822222-17.066667-22.755556-22.755556-17.066667-56.888889 5.688889-79.644445l364.088888-329.955555c11.377778-11.377778 17.066667-22.755556 17.066667-34.133333 0-11.377778-5.688889-22.755556-17.066667-34.133334L273.066667 187.733333c-22.755556-22.755556-28.444444-56.888889-5.688889-79.644444 22.755556-22.755556 56.888889-28.444444 79.644444-5.688889l364.088889 312.888889c34.133333 28.444444 56.888889 73.955556 56.888889 119.466667s-17.066667 85.333333-51.2 119.466666l-364.088889 329.955556c-11.377778 5.688889-28.444444 11.377778-39.822222 11.377778z"
                  p-id="16813"
                ></path>
              </svg>

              <!--展开图标-->

              <svg
                v-show="!item.fold"
                :class="{
                  unfoldIcon1: item.level === 1,
                  unfoldIcon2: item.level === 2,
                  unfoldIcon3:
                    item.level === 3 ||
                    item.level === 4 ||
                    item.level === 5 ||
                    item.level === 6,
                }"
                class="menuIcon"
                t="1615294556006"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="20184"
                width="20"
                height="20"
              >
                <path
                  d="M778.496 403.456a30.72 30.72 0 0 1-8.96 21.76l-230.4 230.4a30.72 30.72 0 0 1-43.52 0l-230.4-230.4a30.72 30.72 0 1 1 43.52-43.52l208.64 208.64 208.64-208.64a30.72 30.72 0 0 1 51.2 21.76z"
                  p-id="20185"
                ></path>
              </svg>
            </div>
            <div
              v-show="!item.hide"
              :style="{
                color: activeIndex === index ? '#409EFF' : '',
              }"
              @click="scrollToLinkTitle(item.offsetTop, index)"
              v-html="item.title"
            ></div>
          </div>
        </div>
      </div>

      <!-- 目录底栏 -->
      <div class="menuBanner">
        <svg
          title="去顶部"
          @click="scrollToLinkTitle(0)"
          style="cursor: pointer"
          t="1615296189191"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="21001"
          width="16"
          height="16"
        >
          <path
            d="M796.422846 524.478323 537.312727 265.185862c-6.368176-6.39914-14.688778-9.471415-22.976697-9.407768-1.119849-0.096331-2.07972-0.639914-3.19957-0.639914-4.67206 0-9.024163 1.087166-13.023626 2.879613-4.032146 1.536138-7.87163 3.872168-11.136568 7.135385L227.647682 524.27706c-12.512727 12.480043-12.54369 32.735385-0.032684 45.248112 6.239161 6.271845 14.432469 9.407768 22.65674 9.407768 8.191587 0 16.352211-3.135923 22.624056-9.34412L479.1356 363.426421l0 563.712619c0 17.695686 14.336138 31.99914 32.00086 31.99914s32.00086-14.303454 32.00086-31.99914L543.13732 361.8576l207.91012 207.73982c6.240882 6.271845 14.496116 9.440452 22.687703 9.440452s16.319527-3.103239 22.560409-9.311437C808.870206 557.277355 808.902889 536.989329 796.422846 524.478323z"
            p-id="21002"
          ></path>
          <path
            d="M864.00258 192 160.00258 192c-17.664722 0-32.00086-14.336138-32.00086-32.00086S142.337858 128 160.00258 128l704 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.698266 192 864.00258 192z"
            p-id="21003"
          ></path>
        </svg>

        <div>目录</div>

        <svg
          title="去底部"
          @click="scrollToLinkTitle(scrollHeight)"
          style="cursor: pointer"
          t="1615296261569"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="21822"
          width="16"
          height="16"
        >
          <path
            d="M811.579 484.059c-6.656-6.622-15.327-9.933-24.064-9.933s-17.543 3.38-24.201 10.069l-221.771 221.589v-602.965c0-18.877-15.292-34.133-34.133-34.133s-34.135 15.257-34.135 34.133v601.293l-219.989-219.908c-6.689-6.623-15.394-9.967-24.132-9.967-8.772 0-17.511 3.344-24.166 10.034-13.345 13.347-13.312 34.953 0.034 48.265l276.618 276.402c3.483 3.481 7.578 5.973 11.878 7.611 4.267 1.913 8.909 3.072 13.892 3.072 1.195 0 2.219-0.58 3.413-0.683 8.841 0.068 17.715-3.21 24.508-10.035l276.384-276.578c13.312-13.345 13.278-34.987-0.135-48.265zM917.932 921.099c0 18.843-15.257 34.134-34.132 34.134h-750.933c-18.843 0-34.133-15.29-34.133-34.132s15.291-34.133 34.133-34.133h750.933c18.876 0 34.133 15.29 34.133 34.131z"
            p-id="21823"
          ></path>
        </svg>
      </div>
    </div>
    <div class="contentBox">
      <main v-for="(item,index) in 20" :key="index">
        <h1>一级标题</h1>
        <Scode
          code='<s-pinyin content="我们都有一个家，名字叫中国。"></s-pinyin>'
          lan="html"
        />
        <h2>二级标题</h2>
        <h3>三级标题</h3>
        <h4>四级标题</h4>
        <h5>五级标题</h5>
        <h6>六级标题</h6>
      </main>
    </div>
  </div>
</template>


<script>
import Scode from "@/components/s-code";
import Sinput from "@/components/s-input";
import { pinyinUtil } from "@/utils/pinyin_withtone.js";
export default {
  components: { Scode, Sinput },
  data() {
    return {
      scrollHeight: 0,
      activeLevel: "",
      activeIndex: "",
      searchTitleKeyWords: "",
      searchmenuResultList: [],
      menuList: [],
    };
  },
  mounted() {
    // 网页正文全文高
    this.scrollHeight = document.body.scrollHeight;
    // 监听页面滚动事件
    window.addEventListener("scroll", this.scroll);

    [...document.getElementsByTagName("main")].forEach((item) => {
      [...item.children].forEach((item2) => {
        if (item2.tagName === "H1") {
          this.menuList.push({
            content: item2.innerText,
            title: item2.outerHTML,
            level: 1,
            offsetTop: item2.offsetTop,
          });
        }
        if (item2.tagName === "H2") {
          this.menuList.push({
            content: item2.innerText,
            title: item2.outerHTML,
            level: 2,
            offsetTop: item2.offsetTop,
          });
        }
        if (item2.tagName === "H3") {
          this.menuList.push({
            content: item2.innerText,
            title: item2.outerHTML,
            level: 3,
            offsetTop: item2.offsetTop,
          });
        }
        if (item2.tagName === "H4") {
          this.menuList.push({
            content: item2.innerText,
            title: item2.outerHTML,
            level: 4,
            offsetTop: item2.offsetTop,
          });
        }
        if (item2.tagName === "H5") {
          this.menuList.push({
            content: item2.innerText,
            title: item2.outerHTML,
            level: 5,
            offsetTop: item2.offsetTop,
          });
        }
        if (item2.tagName === "H6") {
          this.menuList.push({
            content: item2.innerText,
            title: item2.outerHTML,
            level: 6,
            offsetTop: item2.offsetTop,
          });
        }
      });
    });

    this.menuList.forEach((item, index) => {
      if (index < this.menuList.length - 1) {
        if (this.menuList[index + 1].level > item.level) {
          this.$set(this.menuList[index], "children", true);
        }
      }
    });
  },
  methods: {
    changeLevel(level) {
      this.activeLevel = level;
      this.menuList.forEach((item, index) => {
        if (item.level > level) {
          this.menuList[index].hide = true;
        }
        if (item.level <= level) {
          this.menuList[index].hide = false;
        }
        if (item.level === level) {
          this.$set(this.menuList[index], "fold", true);
        } else {
          this.$set(this.menuList[index], "fold", false);
        }
      });
    },
    //页面滚动时触发
    scroll() {
      // scrollTop为显示屏顶部与整个文档顶部间的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      this.$refs.scrollMenu.scrollTop =
        (scrollTop / document.body.scrollHeight) *
        this.$refs.scrollMenu.scrollHeight-30

      scrollTop = scrollTop + 30;

      if (scrollTop >= this.menuList[this.menuList.length - 1].offsetTop) {
        this.activeIndex = this.menuList.length - 1;
      } else {
        try {
          this.menuList.forEach((item, index) => {
            if (index < this.menuList.length - 1) {
              if (
                scrollTop >= item.offsetTop &&
                scrollTop < this.menuList[index + 1].offsetTop
              ) {
                this.activeIndex = index;
                throw new Error("End");
              }
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    // 搜索标题
    searchTitle(keyword) {
      this.searchmenuResultList = this.menuList.filter((item) => {
        let pinyin = pinyinUtil
          .getPinyin(item.content, " ", false)
          .replace(" ", "");
        return item.content.includes(keyword) || pinyin.includes(keyword);
      });
    },
    // 菜单展开/折叠
    toggle(index) {
      if (this.menuList[index].fold) {
        // 展开下一级
        this.$set(this.menuList[index], "fold", false);
        this.$set(this.menuList[index + 1], "hide", false);
        this.$set(this.menuList[index + 1], "fold", true);
      } else {
        // 折叠所有下级
        this.$set(this.menuList[index], "fold", true);
        this.menuList.forEach((item, index2) => {
          if (index2 > index) {
            if (item.level > this.menuList[index].level) {
              this.$set(this.menuList[index2], "hide", true);
            } else {
              throw new Error("End");
            }
          }
        });
      }
    },
    scrollToLinkTitle(offsetTop, index) {
      if (index) {
        this.activeIndex = index;
      }
      let offset = 10;
      offsetTop -= offset;
      // scrollTop为显示屏顶部与整个文档顶部间的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 步长（时长500ms，每10ms一跳，共50跳）
      let step = Math.abs(offsetTop - scrollTop) / 50;
      if (offsetTop > scrollTop) {
        // offsetTop > scrollTop 时元素在显示屏下方时，滚动条需下滑
        // scrollTop需增加（offsetTop-scrollTop）
        smoothDown();
      } else {
        // offsetTop < scrollTop 时元素在显示屏上方时，滚动条需上滑
        // scrollTop需减少（scrollTop - offsetTop）
        smoothUp();
      }

      // 向上平滑滚动
      function smoothUp() {
        if (scrollTop > offsetTop) {
          scrollTop -= step;
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          setTimeout(smoothUp, 1);
        } else {
          document.body.scrollTop = offsetTop;
          document.documentElement.scrollTop = offsetTop;
        }
      }

      // 向下平滑滚动
      function smoothDown() {
        if (scrollTop < offsetTop) {
          scrollTop += step;
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          setTimeout(smoothDown, 1);
        } else {
          document.body.scrollTop = offsetTop;
          document.documentElement.scrollTop = offsetTop;
        }
      }
    },
  },
};
</script>
<style scoped>
/*目录悬浮*/
.menuBox {
  width: 18%;
  position: fixed;
  height: 100vh;
}

/*内容居中*/
.contentBox {
  width: 60%;
  margin: auto;
}

/deep/ .menuBox h1 {
  font-size: 16px;
  margin: 6px auto;
}

/deep/ .menuBox h2 {
  font-size: 14px;
  margin: 4px auto;
  font-weight: normal;
}

/deep/ .menuBox h3 {
  font-size: 12px;
  margin: 2px auto;
  font-weight: lighter;
}

/deep/ .menuBox h4 {
  font-size: 12px;
  margin: 2px auto;
  font-weight: lighter;
}

/deep/ .menuBox h5 {
  font-size: 12px;
  margin: 2px auto;
  font-weight: lighter;
}

/deep/ .menuBox h6 {
  font-size: 12px;
  margin: 2px auto;
  font-weight: lighter;
}

.levelBtnBox {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}

.levelBtn {
  height: 24px;
  width: 24px;
  text-align: center;
  line-height: 24px;
  border-radius: 4px;
  border: 1px solid gray;
  cursor: pointer;
  font-size: 12px;
}

.menuIcon {
  color: rgb(192, 196, 204);
  transform: rotate(0deg);
  transition: transform 0.3s ease-in-out 0s;
  position: absolute;
}

.foldIcon1 {
  top: 11px;
  left: -16px;
}

.foldIcon2 {
  top: 7px;
  left: -16px;
}

.foldIcon3 {
  top: 4px;
  left: -16px;
}

.unfoldIcon1 {
  top: 8px;
  left: -20px;
}

.unfoldIcon2 {
  top: 4px;
  left: -20px;
}

.unfoldIcon3 {
  top: 1px;
  left: -20px;
}

.menuListBox {
  margin-top: 20px;
  height: 520px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.activeBtn {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.menuBanner {
  display: flex;
  height: 70px;
  line-height: 70px;
  align-items: center;
  justify-content: space-around;
  padding: 0px 20px;
}
</style>