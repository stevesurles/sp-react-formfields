import * as React from 'react';
import { IFieldProps, FormMode, IFormManagerProps } from '../interfaces';
import { FormFieldsStore } from '../store';
import ErrorBoundary from '../ErrorBoundary';
import { ValidationManager } from '../managers/ValidationManager';

export class BaseFieldRenderer extends React.Component<IFieldProps, any> {
  public constructor(props: IFieldProps) {
    super(props);

    let initialState = {
      valueForSaving: null,
      isValid: false,
      validationErrors: [],
      validators: []
    };

    FormFieldsStore.actions.clearValidatorsFromField(props.InternalName);
    if (props.IsRequired) {
      FormFieldsStore.actions.addValidatorToField(ValidationManager.defaultValidators.required, props.InternalName);
    }

    this.state = initialState;
  }

  public render() {
    return (
      <React.Fragment>
        <ErrorBoundary>
          {this.props.CurrentMode === FormMode.New ? this.renderNewForm(this.props) : null}
          {this.props.CurrentMode === FormMode.Edit ? this.renderEditForm(this.props) : null}
          {this.props.CurrentMode === FormMode.Display ? this.renderDispForm(this.props) : null}
        </ErrorBoundary>
        {this.props.ShowValidationErrors && !this.props.IsValid ? this.renderValidationErrors(this.props.ValidationErrors) : null}
      </React.Fragment>
    );
  }

  public setFieldMode(mode: number) {
    this.setState({ currentMode: mode }, () => {
      FormFieldsStore.actions.setFormMode(mode);
    });
  }

  public validate(): boolean {
    FormFieldsStore.actions.validateForm();
    let validatedProps = ValidationManager.validateField(this.props);

    this.setState({
      isValid: validatedProps.IsValid,
      validationErrors: validatedProps.ValidationErrors
    });
    return validatedProps.IsValid;
  }

  public getValue() {
    return this.state.valueForSaving;
  }

  protected renderNewForm(props: IFieldProps) {
    return (<div>Not implemented, field type: {props.Type}, form mode: new</div>);
  }

  protected renderEditForm(props: IFieldProps) {
    return (<div>Not implemented, field type: {props.Type}, form mode: edit</div>);
  }

  protected renderDispForm(props: IFieldProps) {
    return (<div>Not implemented, field type: {props.Type}, form mode: disp</div>);
  }

  protected renderValidationErrors(validationErrors: string[]) {
    if (!validationErrors) {
      return null;
    }

    const errorStyle = {
      color: 'red'
    };
    return (
      <React.Fragment>
        {validationErrors.map((err, i) => <div key={`err_${i}`} style={errorStyle}>{err}</div>)}
      </React.Fragment>
    );
  }

  protected trySetChangedValue(newValue: any) {
    console.log('BaseFieldRenderer.trySetChangedValue: ' + newValue);
    console.log(this.props);
    this.props.onChange(this.props, newValue);
    if (this.props != null && this.props.saveChangedFieldData != null) {
      this.props.saveChangedFieldData(this.props.InternalName, newValue);
    }

    FormFieldsStore.actions.setFieldData(this.props.InternalName, newValue);
    this.setState({ valueForSaving: newValue }, () => {
      this.validate();
    });
  }
}
