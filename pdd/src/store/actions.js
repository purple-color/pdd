import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecommendShopList,
  getSearchGoods
} from '../api'

import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOP_LIST,
  RECOMMEND_SHOP_LIST,
  SEARCH_GOODS
} from './mutation-types'

export default {
  // 1. 获取首页的轮播图
  async reqHomeCasual({commit}) {
    const result = await getHomeCasual();
    commit(HOME_CASUAL, {homecasual: result.message.data})
  },

  // 2. 获取首页的导航
  async reqHomeNav({commit}) {
    const result = await getHomeNav();
    commit(HOME_NAV, {homenav: result.message.data})
  },

  // 3. 获取首页的商品列表
  async reqHomeShopList({commit}) {
    const result = await getHomeShopList();
    commit(HOME_SHOP_LIST, {homeshoplist: result.message.goods_list})
  },

  // 4. 获取推荐的商品数据
  async reqRecommendShopList({commit}) {
    const result = await getRecommendShopList();
    commit(RECOMMEND_SHOP_LIST, {recommendshoplist: result.message.data})
  },

  // 5. 获取数据
  async reqSearchGoods({commit}) {
    const result = await getSearchGoods();
    commit(SEARCH_GOODS, {searchgoods: result.message.data})
  },
}
