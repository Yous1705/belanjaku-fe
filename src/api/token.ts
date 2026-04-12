export const token = {
  set(value: string) {
    document.cookie = `belanjaku_token=${value}; path=/`;
  },

  getToken() {
    const match = document.cookie.match(/belanjaku_token=([^;]+)/);
    return match?.[1];
  },

  clear() {
    document.cookie = "belanjaku_token=; Max-Age=0; path=/";
  },
};
