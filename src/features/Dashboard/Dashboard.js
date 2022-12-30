import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update, selectData } from '../response/responseSlice'
import uuid from 'react-uuid';
import { Col, Grid, Row } from 'antd';

import Profile from '../Profile/Profile'
import Loading from '../Loader/Loading';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    const data = useSelector(selectData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.length === 0 || sessionStorage.getItem('data') === "" || JSON.parse(sessionStorage.getItem('data')).length !== 10) {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(res => res.json())
                .then(data => {
                    data.forEach((user) => user.liked = false)
                    dispatch(update(data));
                    setLoading(false);
                    sessionStorage.setItem('data', JSON.stringify(data));
                })
        }
        else {
            dispatch(update(JSON.parse(sessionStorage.getItem('data'))))
            setLoading(false);
        }
    }, [])


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {
                loading
                    ?
                    <Loading />
                    :
                    <Row>
                        {
                            data.map((user) =>
                                <Col xs={24} sm={24} md={8} lg={8} xl={6} key={uuid()}>
                                    <Profile user={user} />
                                </Col>
                            )
                        }
                    </Row>
            }
        </div>
    )
}

export default Dashboard