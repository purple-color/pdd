<template>
  <div class="search">

    <!--搜索导航-->
    <search-nav :isShowSearchPanel="isShowSearchPanel"/>

    <!-- 联动列表 -->
    <div class="shop">
      <!-- 左边 -->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" 
            v-for="(good, index) in searchgoods" 
            :key="index"
            :class="{current: index === currentIndex}"
            @click="clickLeftItem(index)"
            ref = "menulist"
          >
            <span>{{good.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="shop-wrapper">
        <ul ref="shopsParent">
          <li class="shops-li" v-for="(goods, index1) in searchgoods" :key="index1">
            <div class="shops-title">
              <h4>{{goods.name}}</h4>
              <a href="">查看更多> </a> 
            </div>
            <ul class="phone-type" v-if="goods.tag === 'phone'">
              <li v-for="(phone, index) in goods.category" :key="index">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
            <ul class="shops-items">
              <li v-for="(item, index2) in goods.items" :key="index2">
                <img :src="item.icon" alt="">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 搜索面板 -->
    <search-panel v-if="isShow" :isShowSearchPanel="isShowSearchPanel"/>
  </div>
</template>

<script>
import SearchNav from './children/SearchNav'
import SearchPanel from './children/SearchPanel'

import {mapState} from 'vuex'

//引入滚动插件
import BScroll from 'better-scroll'

  export default {
    name: "Search",
    data() {
      return {
        scrollY: 0,//右侧列表滑动的Y轴坐标实时更新
        rightLiTops:[], //所有分类的头部位置
        isShow: false //设置搜索面板显示隐藏
      }
    },
    components: {
      SearchNav,
      SearchPanel
    },
    mounted(){
      this.$store.dispatch('reqSearchGoods')
    },
    computed: {
      ...mapState(['searchgoods']),

      //用于决定左侧哪个选项被选中
      currentIndex(){
        const {scrollY, rightLiTops} = this;
        console.log(this);
        
        return rightLiTops.findIndex((liTop, index)=>{
          this._leftScroll(index);
          return scrollY >= liTop && scrollY < rightLiTops[index + 1]
        })
      }

    },
    watch: {
      searchgoods() {
        this.$nextTick(()=>{
          //初始化
          this.initBScroll();
          //求出右边所有板块头部位置
          this.initRightLiTops()
        })
      }
    },
    methods:{
      //1.1初始化
      initBScroll(){
        //初始化左边
        this.leftScroll = new BScroll('.menu-wrapper',{
          scrollY: true,
          click: true
        });
        //初始化右边
        this.rightScroll = new BScroll('.shop-wrapper',{
          scrollY: true,
          click: true,
          probeType: 3
        });

        // 监听右侧滑动事件
        this.rightScroll.on('scroll', (pos)=>{
          this.scrollY = Math.abs(pos.y);
        });

      },
      
      //1.2求出右边所有板块头部位置
      initRightLiTops(){
        
        // 临时数组
        const tempArr = [];
        //定义变量记录高度
        let top = 0;
        tempArr.push(top);
        //遍历li标签取出高度
        let allLis = this.$refs.shopsParent.getElementsByClassName('shops-li');
        Array.prototype.slice.call(allLis).forEach(li=>{
          top += li.clientHeight
          tempArr.push(top);
        })

        //更新数据
        this.rightLiTops = tempArr;

      },
      
      //1.3点击切换对应商品列表
      clickLeftItem(index){
        this.scrollY = this.rightLiTops[index];
        this.rightScroll.scrollTo(0,- this.scrollY, 300)
      },

      //1.4左侧联动
      _leftScroll(index){
        let menulists = this.$refs.menulist;
        let el = menulists[index];
        this.leftScroll.scrollToElement(el, 300, 0, -100)
      },
      //1.5设置搜索面板的显示
      isShowSearchPanel(flag){
        this.isShow = flag;
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.search 
  background: #f5f5f5;
  width: 100%;
  height: 100%;
.shop 
  display: flex;
  position: absolute;
  overflow: hidden;
  top: 60px;
  bottom: 50px;
  width: 100%;
  .menu-wrapper 
    background-color: #e0e0e0;
    flex: 2;
    .menu-item 
      width: 100%;
      height: 60px;
      background-color: #fafafa;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
    .current 
      color: #e02e24;
    .current::before
      content: '';
      background-color: #e02e24;
      width: 4px;
      height: 30px;
      position: absolute;
      left: 0;
  .shop-wrapper 
    flex: 10;
    background-color: #fff;
    .shops-title 
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      height: 60px;
      align-items: center;
      justify-content: space-between;
      color: #999;
      a 
        color: #999999;
        text-decoration: none;
        font-weight: lighter;
    .shops-items 
      display: flex;
      flex-wrap: wrap;
      li 
        display: flex;
        flex-direction: column;
        width: 33.3%;
        height: 90px;
        justify-content: center;
        align-items: center;
        color: #999;
        font-size: 14px;
        img 
          width: 65%;
          margin-bottom: 5px;
    .phone-type
      width 100%
      display flex
      flex-direction row
      flex-wrap wrap
      border-bottom-1px(#ccc)
      li
        width 33.3%
        display flex
        justify-content center
        align-items center
        margin 5px 0

        img 
          width 80%


</style>
