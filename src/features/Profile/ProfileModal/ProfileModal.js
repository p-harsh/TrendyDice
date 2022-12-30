import React from 'react'
import { Modal, Input, Form } from 'antd';
import { selectData, update } from '../../response/responseSlice';
import { useSelector, useDispatch } from 'react-redux';
import './ProfileModal.css'

const ProfileModal = ({ isModalOpen, setIsModalOpen, user }) => {
    const data = useSelector(selectData)
    const dispatch = useDispatch();

    // useing form to get form data in functions
    const [form] = Form.useForm();

    // handle Modal Ok
    const handleOk = () => {
        form.submit();
        // onFinish function will be called after this
    };

    // handle Modal Cancel
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // handle Form Submission
    const onFinish = (values) => {
        let tmp = [...data];
        let i = 0;
        for (i in tmp) {
            if (tmp[i].id === user.id) {
                tmp[i] = { ...tmp[i], ...values }
                break;
            }
        }
        dispatch(update(tmp));
        setIsModalOpen(false);
    }
    return (
        <>
            <Modal title="User Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="user-profile-modal"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        // Name is object key with which values are saved in form
                        name="name"
                        rules={[
                            { required: true, message: 'This field is required' }
                        ]}
                        initialValue={user.name}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: "email", 
                                message: 'Please input valid email!'
                            },
                            {
                                required: true, 
                                message: 'This field is required'
                            }
                        ]}
                        initialValue={user.email}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            { required: true, message: 'This field is required' }
                        ]}
                        initialValue={user.phone}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Website"
                        name="website"
                        rules={[
                            { required: true, message: 'This field is required' }
                        ]}
                        initialValue={user.website}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
}

export default ProfileModal