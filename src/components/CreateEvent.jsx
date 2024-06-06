import React from 'react';
import { Button, Form, Input } from 'antd';
export const CreateEvent = ({ onFinish }) => (
    <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="start"
            name="start"
            rules={[
                {
                    required: true,
                    message: 'Please select start date!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="End date"
            name="end"
            rules={[
                {
                    required: true,
                    message: 'Please select end date!',
                },
            ]}
        >
            <Input />
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

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);
export default App;