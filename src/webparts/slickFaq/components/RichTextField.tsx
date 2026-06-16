// import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
// import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import React from "react";
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }],
    ['clean']
  ]
};

export interface IRichTextFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const RichTextField: React.FC<IRichTextFieldProps> = ({ label = "", value = "", onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};








