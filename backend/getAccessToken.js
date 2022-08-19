
const axios = require('axios')
const { promisify } = require('util');
const fs = require('fs');
const cacheManager = require('cache-manager');

const ACCESS_TOKEN_KEY = "accessToken";
const memoryCache = cacheManager.caching({store: 'memory', ttl: 3600 /*seconds*/ });

const getTokenFromExternalAPIManager = async ()  =>{
    try {
        /*
        const response = await axios({
            method: "post",
            url: "https://",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ljklkjk'
            },
        });
        return response.data;
        */
       return 'accessToken';
    } catch (err) {
        console.error(err)
    }
}

const getAccessToken = async () => {
    const cachedToken = await memoryCache.get(ACCESS_TOKEN_KEY);
    if (cachedToken) return cachedToken;
    const { access_token: accessToken, expires_in: ttl } = await getTokenFromExternalAPIManager();
    await memoryCache.set(ACCESS_TOKEN_KEY, accessToken, { ttl });
    return accessToken;
}

module.exports = {
    getAccessToken
} 