import * as React from 'react';
import { IFieldProps, FormMode } from '../interfaces';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { BaseFieldRenderer } from './BaseFieldRenderer';
// import './FieldTextRenderer.css';
import { ValidationManager } from '../managers/ValidationManager';
import { FormFieldsStore } from '../store';

export class FieldTextRenderer extends BaseFieldRenderer {
  public constructor(props: IFieldProps) {
    super(props);
    this.state = {
      ...this.state,
      currentValue: props.FormFieldValue
    };

    let max = props.Max ? props.Max : 255;
    FormFieldsStore.actions.addValidatorToField(ValidationManager.defaultValidators.maxLength, props.InternalName, max);

  }

  protected renderNewForm() {
    return this.renderNewOrEditForm();
  }

  protected renderEditForm() {
    return this.renderNewOrEditForm();
  }

  protected renderDispForm() {
    return (<Label>{this.props.FormFieldValue}</Label>);
  }

  private onChange(evt: any) {

    this.setState({ currentValue: evt.target.value});
    this.trySetChangedValue(evt.target.value);

  }

  private renderNewOrEditForm() {
    return (<TextField
      onChange={this.onChange.bind(this)}
      value={this.state.currentValue == null ? '' : this.state.currentValue}
    />);
  }
}
