const { ref, reactive } = Vue;

const App = {
  setup() {
    const email = ref('');
    const password = ref('');

    const login = () => {
      const baseUrl = 'https://vue3-course-api.hexschool.io/v2';

      const data = {
        username: email.value,
        password: password.value,
      };

      console.log(data);

      axios
        .post(`${baseUrl}/admin/signin`, data)
        .then((res) => {
          const { token, expired } = res.data;

          console.log(token);

          // cookie token
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`;
          window.location = 'products.html';
        })
        .catch((error) => {
          alert(error.data.message);
        });
    };

    return {
      email,
      password,
      login,
    };
  },
};

Vue.createApp(App).mount('#app');
