import axios from "axios";

const statisticApi = {
  // api: thống kê doanh thu theo tháng
  getStaMonthlyRevenue: (month) => {
    const axiosClient = axios.get("/api/getDay", { params: { month } });
    return axiosClient;
  },
};

export default statisticApi;
