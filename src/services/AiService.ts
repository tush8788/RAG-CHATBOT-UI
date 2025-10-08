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

const deleteChat = async (data:any) => {
    return fetchData({
        url:'ai/delete-chat',
        method:'delete',
        data
    })
}

const getMarkupString = async (data:any) => {
    return fetchData({
        url:'ai/markup',
        method:'post',
        data
    })
}


export {
    fetchArticleData,
    fetchAllChats,
    deleteChat,
    getMarkupString
}