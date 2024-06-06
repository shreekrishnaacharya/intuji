import React from 'react';
import { Button, DatePicker, Form, Input, Space } from 'antd';
export const CreateEvent = ({ onFinish, onCancel }) => (
    <Form
        onFinish={onFinish}
        autoComplete="off"
    >
        <Form.Item
            label="Start / End"
            name="date"
            rules={[
                {
                    required: true,
                    message: 'Please select start / end date!',
                },
            ]}
        >
            <DatePicker.RangePicker showTime />
        </Form.Item>
        <Form.Item
            label="Summary"
            name="summary"
            rules={[
                {
                    required: true,
                    message: 'Please input your summary!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Description"
            name="description"
        >
            <Input.TextArea />
        </Form.Item>

        <Space direction='horizontal' align='start'>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            <Button danger onClick={onCancel}>
                Cancel
            </Button>
        </Space>
    </Form>
);