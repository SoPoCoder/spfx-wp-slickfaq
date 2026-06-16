import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { RichTextField, IRichTextFieldProps } from './RichTextField';

export interface IPropertyPaneRichTextFieldProps extends IRichTextFieldProps {
    key: string,
    onRender: (elem: HTMLElement) => void,
    onDispose: (elem: HTMLElement) => void,
    label: string,
    value: string,
    onChange: (newValue: string) => void
}

export function PropertyPaneRichTextField(properties: IPropertyPaneRichTextFieldProps): IPropertyPaneField<IPropertyPaneRichTextFieldProps> {
    return {
        type: PropertyPaneFieldType.Custom,
        targetProperty: properties.key,
        properties: {
            label: properties.label,
            value: properties.value,
            onChange: properties.onChange,
            key: properties.key,
            onRender: (elem: HTMLElement) => {
                const element = React.createElement(RichTextField, properties);
                ReactDom.render(element, elem);
            },
            onDispose: (elem: HTMLElement) => {
                ReactDom.unmountComponentAtNode(elem);
            }
        }
    };
}