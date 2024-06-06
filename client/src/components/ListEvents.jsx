import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Popconfirm, Space, Table, message } from 'antd';
import axios from 'axios';
import { CreateEvent } from './CreateEvent';
import dayjs from 'dayjs';
import {
    DeleteOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

function getEvents() {
    return axios.get("http://localhost:8888/api");
}

function createEvent(data) {
    return axios.post("http://localhost:8888/api", data);

}

function deleteEvent(data) {
    return axios.delete("http://localhost:8888/api?id=" + data);

}

function logoutEvent() {
    return axios.get("http://localhost:8888/logout");
}

export const ListEvents = () => {

    const [eventList, setList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    // eslint-disable-line no-unused-expressions
    useEffect(() => {
        setEventList();
    }, [])
    function setEventList() {
        getEvents().then(e => {
            const list = e.data.data?.map(e => {
                return {
                    name: e.summary,
                    id: e.id,
                    start: dayjs(e.start.dateTime).format("YYYY-MM-DD | h:mm a"),
                    end: dayjs(e.end.dateTime).format("YYYY-MM-DD | h:mm a"),
                    description: e.description
                }
            })
            console.log(e, list)
            if (Array.isArray(list)) {
                setList(list)
            }
        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Start',
            dataIndex: 'start',
        },
        {
            title: 'End',
            dataIndex: 'end',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Delete the event"
                    description="Are you sure to delete this event?"
                    onConfirm={() => {
                        deleteEventHandler(record.id)
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger icon={<DeleteOutlined />} size='small' />
                </Popconfirm>
            ),
        },
    ];


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleConvert = (date) => {
        return dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ')
    }
    const onFinish = (data) => {
        data["start"] = handleConvert(data.date[0])
        data["end"] = handleConvert(data.date[0])
        delete data.date
        createEvent(data).then(e => {
            if (e.status == 200) {
                messageApi.info('Event add success!');
                setEventList();
                setIsModalOpen(false);
            }
        });
    };

    const deleteEventHandler = (eventId) => {
        deleteEvent(eventId).then(e => {
            if (e.status == 200) {
                messageApi.info('Event delete success!');
                setEventList();
                setIsModalOpen(false);
            }
        })
    }

    const logoutHandler = () => {
        logoutEvent().then(e => {
            if (e.status == 200) {
                messageApi.info('Logout success!');
                window.location.href = "http://localhost:8888";
            }
        })
    }

    return (<>
        {contextHolder}
        <Card title="Intuji Calendar" extra={<>
            <Button type="primary" onClick={showModal} style={{ marginRight: 20 }}>Create Event</Button>
            <Button danger onClick={logoutHandler} icon={<LogoutOutlined />} />
        </>}>
            <Table columns={columns} dataSource={eventList} />
        </Card>
        <Modal title="Create Event" open={isModalOpen} footer={false}>
            <CreateEvent onFinish={onFinish} onCancel={() => { setIsModalOpen(false) }} />
        </Modal>
    </>
    );
}