export const useUserStore = defineStore('userStore', {
  state: () => ({
    isUserCardAuth: false
  }),
  getters: {
    getIsUserCardAuth: (state) => {
      return state.isUserCardAuth
    },
  }
})