import React from "react";
import { Form, Button, Input } from "antd";
import { createNote } from "../api";
import { toast } from "react-toastify";

function NoteForm({notes, setNotes}) {
  const [form] = Form.useForm();

  const onFinish = (values) => {    
      createNote(values.note).then((res) => {          
          const newNotesArray = notes.concat([res]);
          setNotes(newNotesArray)
          toast.success("Added Successfully");
          form.resetFields();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="form_notes"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{marginBottom: '25px'}} layout="horizontal"
      >
        <Form.Item name="note" rules={[{ required: true }]}>
          <Input
            className="note-input"
            size="large"
            placeholder="Add New Note"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NoteForm;
