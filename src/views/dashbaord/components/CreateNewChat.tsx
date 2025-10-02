import { Button, Form, Input, Modal } from 'antd';

const CreateNewChat = ({ open, setClose }: { open: boolean, setClose: () => void }) => {

    const onSubmit = async (values:{url:string}) => {
        try{
            values.url
        }catch(err){
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
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        {/* <Button>Custom Button</Button> */}
                        {/* <CancelBtn />
            <OkBtn /> */}
                    </>
                )}
            >
                <div>
                    <div>Chat with article</div>
                    <Form
                        layout={'vertical'}
                        form={form}
                        initialValues={{ url: '' }}
                        onFinish={onSubmit}
                        onValuesChange={(chaheval, values) => {
                            console.log("values ", values)
                        }}
                    // style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
                    >
                        <Form.Item label="Url" name="url"  rules={[{ required: true, message: 'Required!' }]}>
                            <Input placeholder="Enter or peaste article url"/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type="primary" >Start Chat</Button>
                        </Form.Item>
                    </Form>                    
                </div>
            </Modal>
        </>
    );
};

export default CreateNewChat;