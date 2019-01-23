import * as React from 'react';
import { IFieldProps } from '../interfaces';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { BaseFieldRenderer } from './BaseFieldRenderer';

export class FieldBooleanRenderer extends BaseFieldRenderer {
  public constructor(props: IFieldProps) {
    super(props);
    this.state = {
      ...this.state,
      currentValue: props.FormFieldValue
    };
  }

  protected renderNewForm() {
    return this.renderNewOrEditForm();
  }

  protected renderEditForm() {
    return this.renderNewOrEditForm();
  }

  protected renderDispForm() {
    if (this.props.FormFieldValue) {
      return <Icon iconName='CheckboxComposite' />;
    } else {
      return <Icon iconName='Checkbox' />;
    }
    // return (<Label>{this.props.FormFieldValue}</Label>);
  }

  private renderNewOrEditForm() {
    return (<Toggle
      onChange={(ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
        this.setState({ currentValue: checked });
        this.trySetChangedValue(checked);
      }}
      checked={this.state.currentValue}
    />);
  }
}
