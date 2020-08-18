import React from "react";
import { Form, Input } from "antd";
import { createNote } from "../api";
import { toast } from "react-toastify";

function NoteForm({ notes, setNotes }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    createNote(values.note)
      .then((res) => {
        const newNotesArray = notes.concat([res]);
        setNotes(newNotesArray);
        toast.success("Added Successfully");
        form.resetFields();
      })
      .catch((errorInfo) => {
        toast.error(errorInfo);
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
        style={{ marginBottom: "25px" }}
        layout="horizontal"
      >
        <Form.Item          
          name="note"          
          size="large"
          placeholder="Add New Note"
          rules={[{ required: true, message: "Por favor, incluir a nota!" }]}
        >
          <Input className="note-input" />
        </Form.Item>
       
      </Form>
    </>
  );
}

export default NoteForm;
