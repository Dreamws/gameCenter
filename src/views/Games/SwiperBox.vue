<template>
  <div class="swiper-box">
    <h3 class="title">Recommend</h3>
    <div class="swiper" v-if="recommendList.length">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in recommendList"
          :key="index"
        >
          <a :href="item['im:artist'].attributes.href">
            <div class="item-img-box">
              <img
                class="item-img"
                v-if="item['im:image'] && item['im:image'].length"
                :src="item['im:image'].reverse()[0].label"
                alt="..."
              />
            </div>
            <h3 class="item-title txt-cut">{{ item['im:name'].label }}</h3>
            <p class="item-type">
              {{ item['im:contentType'].attributes.label }}
            </p>
          </a>
        </div>
      </div>
    </div>
    <div class="noData" v-else><span>暂无数据</span></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { getRecommendList } from '@/api/games'
export default {
  name: 'SwiperBox',
  components: {},
  data() {
    return {
      recommendList: [],
    }
  },
  watch: {},
  computed: {},
  created() {},
  async mounted() {
    // this.initswiper()
    await this.getData()
  },
  methods: {
    initswiper() {
      new Swiper('.swiper', {
        slidesPerView: 'auto',
        preventClicks: false,
      })
    },
    async getData() {
      let { feed } = await getRecommendList({ limit: 10 })
      if (feed.entry && feed.entry.length) {
        this.recommendList = Object.freeze(feed.entry)
        this.$nextTick(() => {
          this.initswiper()
        })
      } else {
        this.recommendList = []
      }
    },
  },
  beforeDestroy() {},
}
</script>
<style lang="less" scoped>
.swiper-box {
  width: 100%;
  height: 190px;
  border-radius: 5px;
  border: 1px solid #ebeef5;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.7);
    padding: 12px 15px 0;
    font-weight: 500;
  }
  .swiper {
    flex: 1;
    width: 100%;
    padding: 12px 6px 0;
    .swiper-wrapper {
      .swiper-slide {
        width: 86px;
        display: flex;
        flex-direction: column;
        margin: 0 10px;
        // border-bottom: 1px solid #ebeef5;
        .item-img-box {
          width: 86px;
          height: 86px;
          display: flex;
          overflow: hidden;
          border-radius: 32px;
          align-items: center;
          justify-content: center;
          .item-img {
            width: 86px;
          }
        }
        h3,
        p {
          font-size: 14px;
          text-align: center;
        }
        .item-title {
          white-space: nowrap;
          margin: 10px 0 6px;
        }
        .item-type {
          color: #aaa;
        }
      }
    }
  }
  .noData {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
