<template>
  <div class="ratings-box" ref="ratingscroll">
    <div class="rating-content">
      <div class="rating-info" v-if="seller.seller">
        <div class="mark">
          <div class="score">
            {{ seller.seller.score ? seller.seller.score : 0 }}
          </div>
          <div class="text">综合评分</div>
          <div class="text">
            高于周边商家{{
              seller.seller.rankRate ? seller.seller.rankRate : 0
            }}%
          </div>
        </div>
        <div class="stars">
          <div class="star1">
            <span>服务态度</span>
            <div class="star">
              <el-rate
                v-model="seller.seller.serviceScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </div>
            <!-- <div class="num">4.1</div> -->
          </div>
          <div class="star1">
            <span>食物评分</span>
            <div class="star">
              <el-rate
                v-model="seller.seller.foodScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </div>
          </div>
          <div class="time">
            送达时间<span
              >{{
                seller.seller.deliveryTime ? seller.seller.deliveryTime : 0
              }}分钟</span
            >
          </div>
        </div>
      </div>
      <div class="lines"></div>
      <div class="food-msg-box">
        <div class="good-tab-box">
          <ul>
            <li
              :class="{ tab: ratingsShowType === 1 }"
              @click="toogleRatingsShowType(1)"
            >
              全部{{ foodRatingsItemCount[0] }}
            </li>
            <li
              :class="{ tab: ratingsShowType === 2 }"
              @click="toogleRatingsShowType(2)"
            >
              推荐{{ foodRatingsItemCount[1] }}
            </li>
            <li
              :class="{ tab: ratingsShowType === 3 }"
              @click="toogleRatingsShowType(3)"
            >
              吐槽{{ foodRatingsItemCount[2] }}
            </li>
          </ul>
        </div>
        <div class="tootleline" @click="toogleShowHasTextrating()">
          <span :class="{ active: showHasTextrating }"></span>只看有内容的评价
        </div>
        <div class="msg-box" v-if="seller.ratings">
          <ul>
            <li v-for="(item, index) in foodRatingsItem" :key="index">
              <div class="left">
                <span class="avatar"><img :src="item.avatar"/></span>
              </div>
              <div class="right">
                <p class="line1">
                  <span class="time">{{ item.rateTime | time }}</span
                  ><span class="autor">{{ item.username }}</span>
                </p>
                <p class="line2">
                  <i :class="['icon', { iconbad: item.rateType == 1 }]"></i
                  >{{ item.text }}
                </p>
                <p class="line3">
                  <span
                    class="dish"
                    v-for="(item, index) in item.recommend"
                    :key="index"
                    >{{ item }}</span
                  >
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import moment from "moment";
/* import { mapState, mapMutations } from "vuex"; */
export default {
  name: "Ratings",
  props: ["seller"],
  data() {
    return {
      /*       RatingsList: this.seller.ratings, */
      ratingsShowType: 1,
      showHasTextrating: false
    };
  },
  computed: {
    foodRatingsItemCount() {
      if (this.seller.ratings) {
        return [
          this.seller.ratings.length,
          this.seller.ratings.filter(item => item.rateType == 0).length,
          this.seller.ratings.filter(item => item.rateType == 1).length
        ];
      } else {
        return [0, 0, 0];
      }
    },
    foodRatingsItem() {
      if (this.seller.ratings) {
        let outItem = [];

        switch (this.ratingsShowType) {
          case 1:
            outItem = this.seller.ratings;
            break;
          case 2:
            outItem = this.seller.ratings.filter(item => item.rateType == 0);
            break;
          case 3:
            outItem = this.seller.ratings.filter(item => item.rateType == 1);
            break;
          default:
            outItem = null;
        }
        if (this.showHasTextrating) {
          return outItem.filter(item => item.text != "");
        } else {
          return outItem;
        }
      } else {
        return [];
      }
    }
  },
  components: {},
  filters: {
    time: function(value, formatString) {
      formatString = formatString || "YYYY-MM-DD HH:mm";
      return moment(value).format(formatString);
    }
  },
  methods: {
    toogleRatingsShowType(num) {
      this.ratingsShowType = num;
    },
    toogleShowHasTextrating() {
      this.showHasTextrating = !this.showHasTextrating;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.bs = new BScroll(this.$refs.ratingscroll, {
        probeType: 3,
        click: true
      });
      console.log(this.bs);
    });
  },
  updated() {
    this.bs.refresh();
  },
  beforeDestroy() {
    this.bs.destroy();
  }
};
</script>

<style scoped lang="less">
.ratings-box {
  width: 100%;
  position: absolute;
  top: 3.3rem;
  bottom: 0;
  left: 0;
  z-index: 990;
  overflow: hidden;
  .rating-content {
    width: 100%;
    overflow: hidden;
    font-size: 0.26rem;
    height: auto;
    .rating-info {
      width: 100%;
      height: 2rem;
      border-bottom: 1px solid #b8b6b6;
      display: flex;
      .mark {
        float: left;
        padding: 0.2rem;
        box-sizing: border-box;
        height: 100%;
        width: 3rem;
        flex: none;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #b8b6b6;
        .score {
          color: #f90;
          font-size: 0.45rem;
        }
        .text {
          line-height: 0.36rem;
          font-size: 0.24rem;
        }
      }
      .stars {
        height: 100%;
        flex: 1;
        padding: 0.2rem;
        box-sizing: border-box;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        display: flex;
        .star1 {
          display: flex;
          height: 0.35rem;
          line-height: 0.35rem;
          font-size: 0.24rem;
          align-items: center;
          justify-content: space-between;
          margin: 0.05rem 0;
        }
        .time {
          font-size: 0.24rem;
          span {
            margin: 0 0 0 0.35rem;
            color: #93999f;
          }
        }
      }
    }
    .lines {
      width: 100%;
      height: 0.26rem;
      border-bottom: 1px solid #b8b6b6;
      background: #f3f5f7;
    }
    .food-msg-box {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.2rem 0.26rem;
      background: #fff;
      margin-top: 0.1rem;
      overflow: hidden;
      .title {
        width: 100%;
        color: #07111b;
        font-size: 0.28rem;
        font-weight: bold;
        padding: 0.2rem 0 0;
      }
      .good-tab-box {
        width: 100%;
        height: 0.6rem;
        margin: 0.2rem 0;
        ul {
          height: 100%;
          display: flex;
          align-items: center;
          margin: 0;
          li {
            display: inline-block;
            width: 1.2rem;
            height: 100%;
            font-size: 0.22rem;
            text-align: center;
            line-height: 0.6rem;
            margin-right: 0.2rem;
            background: rgba(0, 160, 220, 0.2);
            &:last-child {
              background: rgba(77, 85, 93, 0.2);
            }
            &.tab {
              background: #00a9dc;
              color: #fff;
            }
            &:last-child.tab {
              background: #4d555d;
              color: #fff;
            }
          }
        }
      }

      .tootleline {
        padding: 0.2rem 0;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 0.22rem;
        color: #93999f;
        line-height: 0.4rem;
        span {
          display: block;
          float: left;
          width: 0.4rem;
          height: 0.4rem;
          background: url(../assets/success-filling.png) no-repeat center
            center/100% 100%;
          margin-right: 0.1rem;
          &.active {
            background: url(../assets/success-filling1.png) no-repeat center
              center/100% 100%;
          }
        }
      }
      .msg-box {
        width: 100%;
        overflow: hidden;
        ul {
          margin: 0;
          overflow: hidden;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          margin-bottom: 1rem;
          width: 100%;
          li {
            padding: 0.2rem 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            font-size: 0.22rem;
            display: flex;
            .left {
              flex: none;
              width: 0.6rem;
              margin-right: 0.2rem;
              .avatar {
                float: left;
                width: 100%;
                height: auto;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
              }
            }
            .right {
              flex: 1;
              .line1 {
                height: 0.2rem;
                width: 100%;
                line-height: 0.2rem;
                margin: 0.1rem 0;
                .time {
                  color: #93999f;
                  float: right;
                }
                .autor {
                  float: left;
                  color: #93999f;
                }
              }
              .line2 {
                height: auto;
                width: 100%;
                line-height: 0.4rem;
                .icon {
                  display: block;
                  float: left;
                  width: 0.4rem;
                  height: 0.4rem;
                  background: url(../assets/good.png) no-repeat center
                    center/100% 100%;
                  margin-right: 0.1rem;
                }
                .iconbad {
                  background: url(../assets/bad.png) no-repeat center
                    center/100% 100%;
                }
              }
              .line3 {
                width: 100%;
                margin: 0.1rem 0;
                .dish {
                  display: inline-block;
                  padding: 0.02rem 0.05rem;
                  border: 1px solid rgba(7, 17, 27, 0.1);
                  font-size: 0.24rem;
                  color: #93999f;
                  margin: 0.1rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
