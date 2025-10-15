import { Button, Form, Input, message, Modal, /*Upload*/ } from "antd";
import { chatTypes } from "../CreateNewChat";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useState } from "react";
import { createFirstChat } from "../../../services/AiService";
import { cloneDeep } from "lodash";
import { updateChatList } from "../../../store/slice/dashboardSlice";
type ChatType = 'article' | 'youtube' | 'pdf'
type CreateChatType = {
    selectedType: ChatType
    open: boolean
    setClose: () => void
}
let SameTypes = ['article', 'youtube']

const CreateChat = ({ selectedType, open, setClose }: CreateChatType) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const { chatList } = useAppSelector((state) => state.dashboard)
    const [messageApi, contextHolder] = message.useMessage();


    const onSubmit = async (values: { url?: string, pdf?: any, type: ChatType }) => {
        try {
            setLoading(true)
            console.log("values ", values)
            let data:any;
            switch (values.type) {
                case 'article':
                case 'youtube':
                    data = {
                        url: values.url,
                        type: values.type
                    }
                    break;
                case 'pdf':
                    data = new FormData();
                    data.append('pdf', values.pdf[0])
                    data.append('type', values.type);
                    throw new Error("Need to implement");
                    break;

            }

            let resp = await createFirstChat(data);
            // let resp = await fetchArticleData(values)
            // console.log("resp", resp);
            if (!resp?.data?.status) throw new Error(`${resp}`)
            let cloneChatList = cloneDeep(chatList);
            cloneChatList.push(resp?.data?.results || []);
            // console.log("resp?.data?.results ", resp?.data?.results)
            dispatch(updateChatList(cloneChatList));
            navigate(`/chat/${resp?.data?.results?.chatId}`)
            setLoading(false)
            setClose();
            messageApi.open({
                type: 'success',
                content: 'Done',
            });
        } catch (err) {
            setLoading(false)
            console.log(err);
            messageApi.open({
                type: 'error',
                content: 'Error',
            });
        }
    }

    // const normFile = (e: any) => {
    //     console.log('Upload event:', e);
    //     if (Array?.isArray(e)) {
    //         return e;
    //     }
    //     return e?.fileList;
    // };

    // const beforeUpload = (file: File) => {
    //     const isPDF = file.type === 'application/pdf';
    //     let maxSize = 10 * 1024 * 1024
    //     if (!isPDF || file.size > maxSize) {
    //         return isPDF || Upload.LIST_IGNORE;
    //     }
    //     return false
    // }



    return (<>
        <Modal
            open={open}
            title={chatTypes.find(t => t.id === selectedType)?.title}
            onOk={setClose}
            onCancel={setClose}
            className="!p-8"
            footer={() => <></>}
        >
            {contextHolder}
            <Form
                layout={'vertical'}
                form={form}
                initialValues={{
                    type: selectedType,
                    ...((SameTypes.includes(selectedType)) ? { url: '' } : { pdf: '' }),
                }}
                onFinish={onSubmit}
                className="!mt-4"
            >
                <Form.Item className="hidden" name={'type'}></Form.Item>

                {SameTypes.includes(selectedType) ? (
                    <>
                        <Form.Item label={selectedType === 'youtube' ? 'YouTube URL ( MAX Time: 15 Min )' : 'Article URL'} name="url" rules={[{ required: true, message: 'Required!', type: 'url' }]}>
                            <Input size="large" placeholder={chatTypes.find(t => t.id === selectedType)?.placeholder} />
                        </Form.Item>
                    </>
                ) : (
                    <>
                        <div>Comming Soon</div>
                        {/* <Form.Item label="">
                            <Form.Item name="pdf" valuePropName="pdf" getValueFromEvent={normFile} noStyle>
                                <Upload.Dragger maxCount={1} beforeUpload={beforeUpload} name="pdf">
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">PDF files only (Max 10MB).</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item> */}
                    </>
                )}

                <Form.Item>
                    <Button
                        htmlType='submit'
                        className="w-full"
                        disabled={selectedType=='pdf'}
                        loading={loading}
                        type="primary"
                        size="large"
                    >
                        Start Chat
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
    )
}

export default CreateChat