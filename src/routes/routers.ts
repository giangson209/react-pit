const Routers = {
  HOME: '/',

  // Authen
  LOGIN: '/login',

  // Imal
  IMALL: '/imall',
  IMALL_DEVICE: '/imall/device',
  IMALL_FASHION: '/imall/fashion',
  IMALL_MOTHER_TO_BABY: '/imall/mother-to-baby',
  IMALL_MOTHER_TO_BABY_SEARCH: '/imall/mother-to-baby/search',
  IMALL_FOOD: '/imall/food',
  IMALL_DETAIL: '/imall/[id]',

  // Sim
  SIM: '/sim',
  SIM_FENG_SHUI: '/sim/geo-sim', // '/sim/feng-shui',
  SIM_FENG_SHUI_SEARCH: '/sim/geo-sim-result', // '/sim/feng-shui/search', // Result
  SIM_NUMEROLOGY: '/sim/numerology-sim', // '/sim/numerology',
  SIM_NUMEROLOGY_SEARCH: '/sim/numerology-sim-result', // '/sim/numerology/search' // Result
  SIM_COUPLE: '/sim/sim-couple',

  // IWow
  IWOW_CLUB: '/iwow/club',
  IWOW_COUPON_DETAIL: '/iwow/club/coupon/[id]',
  IWOW_IZUI: '/iwow/izui',
  IWOW_HOT: '/iwow/hot',

  // Services
  ITRAVEL_SERVIVE: '/service/i-travel',
  ITRAVEL_VEXERE_SERVIVE: '/service/i-travel/vexere',
  IFINANCE_SERVIVE: '/service/i-finance',
  IFINANCE_VIETLOTT_SERVIVE: '/service/i-finance/vietloot',
  IFINANCE_TIMA_SERVIVE: '/service/i-finance/tima',
  IHEALTH_SERVIVE: '/service/i-health',

  // Cart - checkout
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_RESULT: '/checkout/result', // this is shallow

  // Recharge
  RECHARGE: '/recharge',
  RECHARGE_PAYMENT: '/recharge/payment',
  RECHARGE_STATUS: '/recharge/payment-status',

  // IGame
  IGAME: '/igame',
  IGAME_ACTION: '/igame/action',
  IGAME_SPORTS: '/igame/sports',
  IGAME_INTELLECTUAL: '/igame/intellectual',
  IGAME_DETAIL: '/igame/[id]',
  IGAME_PLAY: '/igame/play/[id]',

  //News
  NEWS: '/news',
  NEWS_DETAIL: '/news/[...detail]',
  NEWS_ITEL: '/news/itel',
  NEWS_ACTIVE: '/news/active',
  NEWS_SERVICE: '/news/service',
  NEWS_VIDEO: '/news/video',

  // DataPack
  DATA: '/data',
  DATA_SUGGESTION: '/data/suggestion',

  // IFilm
  IFILM: '/ifilm',
  FILM_SERIES: '/ifilm/film-series',
  FILM_FEATURED: '/ifilm/film-featured',
  FILM_POPULAR: '/ifilm/film-popular',
  FILM_FAVORITE: '/ifilm/film-favorite',

  // Support
  TRACKING_ORDER: '/tracking-order',
  ACTIVATE_SIM: '/active-sim',
  SUBSCRIBER_INFORMATION: '/subscriber-information',
  CHANGE_SIM: '/change-sim',
  UNLOCK_SIMS: '/unlock-sim',
  DOWNLOAD_ITEL: '/download-itel'
};
export default Routers;
