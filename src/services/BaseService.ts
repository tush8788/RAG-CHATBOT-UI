import appConfig from '../utils/app.config'
import axios from 'axios'
import {isEmpty} from 'lodash'
import { LOCALSTOREAGEKEY } from '../utils/hooks/useAuth';
import _ from 'lodash';
const BaseService = axios.create({
    timeout:50000,
    baseURL:appConfig.apiUrl
});

//req
BaseService.interceptors.request.use((config)=>{
    let token:string = '';
    let userInfo:any = localStorage.getItem(LOCALSTOREAGEKEY) || '';
    if(!_.isEmpty(userInfo)){
        userInfo=JSON.parse(userInfo);
        token = userInfo.token
    }
    if(!isEmpty(token)){
        config.headers['x-rag-chatbot-token'] = token
    }
    return config
})

//res
BaseService.interceptors.response.use((response:any)=>response,(err:any)=>{
    const {response} = err;
    if(response && response.status == 401){
        //clear token
        localStorage.removeItem(LOCALSTOREAGEKEY)
        return window.location.href = '/signin'; // force redirect
    }
    return Promise.reject(err);
})

export default BaseService