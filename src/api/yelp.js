import axios from "axios"

export default axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
    headers:{
        Authorization:"Bearer BaYm5A41L_Is6H3l6kQ6ci825XRTrklNHABFkrKVqGZ7hae4v0OR_2NjDfSFsig0vRnMeeDcjfMcalfplVtuDMTntIBkd_CA1HG9zj9C0jr6-pJox7YMKuaIQNX3ZXYx"
    }
})