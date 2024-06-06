import React, { useEffect, useState } from 'react';
import { Button, Divider, Table } from 'antd';
import axios from 'axios';

async function getEvents() {
    const response = await axios.get("http://localhost:8888/api");
    console.log(response); // This line satisfies ESLint (not recommended)
}

export const ListEvents = () => {

    const [eventList, setList] = useState([]);

    // eslint-disable-line no-unused-expressions
    useEffect(() => {
        getEvents()
    }, [eventList])
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
    ];


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<>
        <Card type="inner" title="Inner Card title" extra={<Button type="primary" onClick={showModal}>Create Event</Button>}>
            <Table columns={columns} dataSource={eventList} size="middle" />
        </Card>
        <Modal title="Create Event" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

        </Modal>
    </>
    );
}