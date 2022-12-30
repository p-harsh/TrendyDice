import React, { useState } from 'react'

import { Card } from 'antd';
import { EditOutlined, HeartFilled, HeartOutlined, DeleteFilled, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';

import { selectData, update } from '../response/responseSlice';
import { useDispatch, useSelector } from 'react-redux'

import ProfileModal from './ProfileModal/ProfileModal';
import './Profile.css'

const Profile = ({ user }) => {
    const data = useSelector(selectData)
    const dispatch = useDispatch();

    //Modal to edit Profile data
    const [isModalOpen, setIsModalOpen] = useState(false);

    // handle clicking on delete/trash button
    const handleDelete = () => {
        let tmp = [...data];
        tmp = tmp.filter((e) => e.id !== user.id)
        dispatch(update(tmp));
    }

    // handle clicking on heart/like button
    const handleLiked = () => {
        let tmp = [...data];// made the copy of array as it is freezed so immutable
        let i = 0;
        for (i in tmp) {
            if (tmp[i].id === user.id) {
                let objCopy = { ...tmp[i] }// made the copy of object as it is freezed so immutable
                objCopy.liked = !objCopy.liked;
                tmp[i] = objCopy
                break;
            }
        }
        dispatch(update(tmp));
    }

    return (
        <div>
            <ProfileModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={user} />
            <Card bordered={true}
                style={{ margin: '15px' }}
                cover={
                    //Avatar
                    <div className="cardHeadImage">
                        <img
                            alt="avatar-img"
                            src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                            style={{ width: "200px", height: "200px" }}
                        />
                    </div>
                }
                // Card Footer/Action bar
                actions={[
                    !user.liked
                        ?
                        <HeartOutlined style={{ color: 'rgb(255, 0, 0)', fontSize: '20px' }} key="heart" color="#eb2f96" onClick={() => handleLiked()} />
                        :
                        <HeartFilled style={{ color: 'rgb(255, 0, 0)', fontSize: '20px' }} key="heart" color="#eb2f96" onClick={() => handleLiked()} />,

                    <EditOutlined style={{ fontSize: '18px' }} onClick={() => setIsModalOpen(prev => !prev)} key="update" />,

                    <DeleteFilled style={{ fontSize: '18px' }} key="delete" onClick={() => handleDelete()} />,
                ]}
            >
                {/* Card body */}
                <h3>{user.name}</h3>
                <div>
                    <MailOutlined style={{ fontSize: '18px' }} />
                    <p>{user.email}</p>
                </div>
                <div>
                    <PhoneOutlined style={{ fontSize: '18px' }} />
                    <p>{user.phone}</p>
                </div>
                <div>
                    <GlobalOutlined style={{ fontSize: '18px' }} />
                    <p>http://{user.website}</p>
                </div>
            </Card>
        </div>
    )
}

export default Profile