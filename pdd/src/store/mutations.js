import {
   HOME_CASUAL,
   HOME_NAV,
   HOME_SHOP_LIST,
   RECOMMEND_SHOP_LIST,
   SEARCH_GOODS
} from './mutation-types'

export default {
  //更新轮播数据
  [HOME_CASUAL](state, {homecasual}){
      state.homecasual = homecasual;
  },

  //更新导航数据
  [HOME_NAV](state, {homenav}){
    state.homenav = homenav;
  },

  //更新商品列表数据
  [HOME_SHOP_LIST](state, {homeshoplist}){
    state.homeshoplist = homeshoplist;
  },

  //更新推荐列表数据
  [RECOMMEND_SHOP_LIST](state, {recommendshoplist}){
    state.recommendshoplist = recommendshoplist;
  },

  //更新搜索列表数据
  [SEARCH_GOODS](state, {searchgoods}){
    state.searchgoods = searchgoods;
  },
}
