import React from 'react';
import {Form, Input, Button, Row} from "antd";


class ReplyForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 20,
                    offset: 4,
                },
            },
        };
        return (
            <Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label='称呼'>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请填写您的称呼'}]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='Email'>
                        {getFieldDecorator('email')(<Input placeholder='填写Email以便有新的回复时能够即时通知您，您的Email不会被公开'/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='内容'>
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: '内容不能为空'}]
                        })(<Input.TextArea autosize={{minRows: 2, maxRows: 6}}/>)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </Row>
        )
    }
}

export default Form.create({name: 'test'})(ReplyForm);
