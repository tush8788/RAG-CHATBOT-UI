import { Button, Form, Input, Modal } from 'antd';
import { fetchArticleData } from '../../../services/AiService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateChatList } from '../../../store/slice/dashboardSlice';
import { cloneDeep } from 'lodash';
import { useState } from 'react';

const CreateNewChat = ({ open, setClose }: { open: boolean, setClose: () => void }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading,setLoading] = useState(false)
    const {chatList} = useAppSelector((state)=>state.dashboard)

    const onSubmit = async (values:{url:string}) => {
        try{
            setLoading(true)
            let resp = await fetchArticleData({url:values.url})
            console.log("resp",resp);
            if(!resp?.data?.status) throw new Error(`${resp}`)
            let cloneChatList = cloneDeep(chatList);
            cloneChatList.push(resp?.data?.results);
            console.log("resp?.data?.results ",resp?.data?.results)
            dispatch(updateChatList(cloneChatList));
            navigate(`/chat/${resp?.data?.results?.chatId}`)
            setLoading(false)
            setClose();
        }catch(err){
            setLoading(false)
            console.log(err);
        }
    } 

    const [form] = Form.useForm();

    return (
        <>
            <Modal
                open={open}
                title="Create New Chat"
                onOk={setClose}
                onCancel={setClose}
                footer={()=><></>}
            >
                <div>
                    <div>Chat with article</div>
                    <Form
                        layout={'vertical'}
                        form={form}
                        initialValues={{ url: '' }}
                        onFinish={onSubmit}
                    >
                        <Form.Item label="Url" name="url"  rules={[{ required: true, message: 'Required!' }]}>
                            <Input placeholder="Enter or peaste article url"/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' loading={loading} type="primary">Start Chat</Button>
                        </Form.Item>
                    </Form>                    
                </div>
            </Modal>
        </>
    );
};

export default CreateNewChat;