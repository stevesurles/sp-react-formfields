import * as React from 'react';
import { IFormFieldProps } from '../interfaces';
export declare class FormField extends React.Component<IFormFieldProps, any> {
    constructor(props: IFormFieldProps);
    private renderAsyncField;
    private registerLoadedField;
    private catchLoadedFieldError;
    render(): JSX.Element;
    private onChange;
    private SpecificFormField;
}
