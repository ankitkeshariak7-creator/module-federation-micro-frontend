import React from "react";
import { Input } from "sharedUI/Input";
import { Button } from "sharedUI/Button";
import { Textarea } from "sharedUI/Textarea";

const Form = () => (
  <div>
    <h3>Form Designer</h3>
    <Input placeholder="Name" />
    <Textarea placeholder="Description" />
    <br />
    <Button>Submit</Button>
  </div>
);

export default Form;
