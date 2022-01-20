const { ref, reactive, onMounted } = Vue;

const App = {
  setup() {
    const baseUrl = ref('https://vue3-course-api.hexschool.io/v2');

    const apiPath = ref('aprilchen');

    let products = ref([]);

    let prodInfo = ref({});

    let isEnabled = ref(false);

    // 檢查權限
    const checkAuth = () => {
      axios
        .post(`${baseUrl.value}/api/user/check`)
        .then(() => {
          getProducts();
        })
        .catch((err) => {
          console.log(err);
          alert(err.data.message);
          window.location = 'index.html';
        });
    };

    // 載入所有商品
    const getProducts = () => {
      axios
        .get(`${baseUrl.value}/api/${apiPath.value}/admin/products`)
        .then((res) => {
          console.log(res);

          products.value = res.data.products;

          isEnabled.value = res.data.is_enabled ? true : false;

          console.log(products);
        })
        .catch((error) => {
          console.log(error);
          alert(error.data.message);
        });
    };

    const prodsDetail = (item) => {
      prodInfo.value = item;
    };

    onMounted(() => {
      // 取得 Token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      axios.defaults.headers.common.Authorization = token;

      checkAuth();
    });

    return {
      products,
      isEnabled,
      prodsDetail,
      prodInfo,
    };
  },
};

Vue.createApp(App).mount('#app');
