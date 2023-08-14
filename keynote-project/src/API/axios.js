import axios from "axios";


// localhost:5000/predict
const instance = axios.create({
   baseURL: 'http://localhost:5000',
   // headers: {},
   headers: {
      'Content-Type': 'application/json'
      // 'Authorization': authHeader, // Include the Authorization header
   },
});


//quản lý những cái lỗi axios
instance.interceptors.response.use(
   (res) => res, //nếu có res thì trả ra res
   (err) => err //nếu có lỗi thì trả ra lỗi
)

// instance.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
// instance.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization, Content-Type';
// instance.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, OPTIONS';

// instance.defaults.headers['Content-Type'] = 'application/json'; // Set Content-Type header


export default instance;