import fetchData from './ApiService'

const fetchArticleData = async (data:any) => {
    return fetchData({
        url:'ai/fetch-news',
        method:'post',
        data
    })
}

const fetchAllChats = async () => {
    return fetchData({
        url:'ai/fetch-all-chats',
        method:'get',
    })
}


export {
    fetchArticleData,
    fetchAllChats
}