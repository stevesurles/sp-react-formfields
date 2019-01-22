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

  handleChange(evt: any, newValue: string) {

    this.setState({ currentValue: newValue });
    this.trySetChangedValue(newValue);
    console.log('handleChange: ' + newValue);
    this.props.onChange(newValue);
  }

  private renderNewOrEditForm() {
    return (<TextField
      onChange={(evt, newValue) => this.handleChange.bind(evt, newValue)}
      value={this.state.currentValue == null ? '' : this.state.currentValue}
    />);
  }
}
