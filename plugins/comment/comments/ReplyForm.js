import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, Button} from 'semantic-ui-react';
import {InputField, TextAreaField} from 'react-semantic-redux-form';

const LoginForm = props => {
    const {handleSubmit} = props;
    return (
        <Form onSubmit={handleSubmit}>
            <Field name='name' component={InputField} label='称呼' required/>
            <Field name='email' component={InputField} label='Email' placeholder="填写Email以便有新的回复时能够即时通知您，您的Email不会被公开"/>
            <Field name='content' component={TextAreaField} label='内容' required/>
            <Button content='提交评论' positive type='submit'/>
            <Button content='取消' negative floated='right'/>
        </Form>
    )
};

export default reduxForm({
    form: 'replyCommentForm'

})(LoginForm)