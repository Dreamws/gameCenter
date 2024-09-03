<template>
  <div class="games">
    <div class="fxied">
      <van-search
        v-model="gameName"
        clearable
        placeholder="Search..."
        @input="onSearch"
        @cancel="onCancel"
        @blur="onFocus"
      />
      <SwiperBox></SwiperBox>
    </div>
    <div class="game-list" v-if="listAll.length">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item, i) in list" :key="i">
          <template #title>
            <!-- <span>{{ i }}</span> -->
            <a :href="item['im:artist'].attributes.href" class="game-item">
              <div class="item-num">{{ i + 1 }}</div>
              <div class="item-icon">
                <img
                  class="item-img"
                  v-if="item['im:image'] && item['im:image'].length"
                  :src="item['im:image'][item['im:image'].length - 1].label"
                  alt="..."
                />
              </div>
              <div class="item-info">
                <h3 class="info-title txt-cut">{{ item['im:name'].label }}</h3>
                <div class="info-type">
                  {{ item['im:contentType'].attributes.label }}
                </div>
                <div class="info-score">
                  <van-rate
                    v-model="rate"
                    allow-half
                    :size="13"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                  &nbsp;{{ `(106)` }}
                </div>
              </div>
            </a>
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import SwiperBox from './SwiperBox.vue'
import { getGameList } from '@/api/games'
export default {
  name: 'GameCenter',
  components: { SwiperBox },
  data() {
    return {
      gameName: '',
      listAll: [],
      list: [],
      rate: 2.5,
      loading: false,
      finished: false,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    onLoad() {
      if (this.gameName) {
        this.loading = false
        this.finished = true
        return
      }
      this.list = this.listAll.slice(0, this.list.length + 10)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (this.list.length >= this.listAll.length) {
        this.finished = true
      }
    },
    async getData() {
      this.finished = false
      let { feed } = await getGameList({ limit: 100 })
      if (feed.entry && feed.entry.length) {
        this.listAll = Object.freeze(feed.entry)
        this.onLoad()
      } else {
        this.listAll = []
      }
    },
    searchData() {
      if (!this.gameName) {
        // this.list = this.listAll.slice(0, 10)
        this.getData()
        return
      }
      this.list = this.listAll.filter(item => {
        if (item['im:name'].label.indexOf(this.gameName) > -1) return true
        if (item.summary.label.indexOf(this.gameName) > -1) return true
        return false
      })
      this.finished = true
    },
    onSearch() {
      this.searchData()
    },
    onCancel() {
      this.getData()
    },
    onFocus() {
      this.searchData()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.border-b {
  border-bottom: 1px solid #e1e1e1;
}
.games {
  width: 100%;
  height: 100%;
  position: relative;
  .van-search {
    .border-b;
    .van-search__content {
      border-radius: 26px;
      .van-field__control {
        font-size: 16px;
      }
    }
  }
  .game-list {
    width: 100%;
    height: calc(100vh - 246px);
    overflow-y: auto;
    .van-cell {
      padding: 10px 16px;
      border-bottom: none;
      padding-bottom: 0;
      &:nth-child(2n) {
        .item-icon {
          border-radius: 50%;
        }
      }
      .van-cell__title {
        width: 100%;
      }
    }
    .game-item {
      .border-b;
      display: flex;
      height: 78px;
      font-size: 16px;
      padding-bottom: 12px;
      .item-num {
        width: 32px;
        line-height: 66px;
      }
      .item-icon {
        width: 66px;
        line-height: 66px;
        border-radius: 22px;
        margin-right: 15px;
        overflow: hidden;
        img {
          width: 66px;
        }
      }
      .item-info {
        width: calc(100% - 113px);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        div,
        h3 {
          height: 32%;
          display: flex;
          align-items: center;
        }
        .info-title {
          font-size: 16px;
        }
        .info-type {
          font-size: 15px;
          color: #929292;
        }
        .info-score {
          font-size: 14px;
          color: #a7a7a7;
          /deep/.van-rate i {
            font-size: 13px !important;
          }
        }
      }
    }
  }
}
</style>
