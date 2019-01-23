import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IFormFieldProps, IFieldProps, IFormManagerProps } from '../interfaces';
import { FormFieldsStore } from '../store';
//import { getFieldPropsByInternalName } from '../utils';

import { BaseFieldRenderer } from './BaseFieldRenderer';
import { FieldTextRenderer } from './FieldTextRenderer';
import { FieldChoiceRenderer } from './FieldChoiceRenderer';
import { FieldLookupRenderer } from './FieldLookupRenderer';

import { FieldUserRenderer } from './FieldUserRenderer';
import { FieldMultilineTextRenderer } from './FieldMultilineTextRenderer';
import { FieldNumberRenderer } from './FieldNumberRenderer';
import { FieldDateTimeRenderer } from './FieldDateTimeRenderer';
import { FieldAttachmentRenderer } from './FieldAttachmentRenderer';
import { FieldTaxonomyRenderer } from './FieldTaxonomyRenderer';
import { getFieldPropsByInternalName } from '../utils';
import { FieldBooleanRenderer } from './FieldBooleanRenderer';
import { FieldCurrencyRenderer } from './FieldCurrencyRenderer';
import { FieldUrlRenderer } from './FieldUrlRenderer';

export class FormField extends React.Component<IFormFieldProps, any> {
  constructor(props: IFormFieldProps) {
    super(props);
    this.state = {
      loadedField: null
    };
  }

  //public async componentDidMount() {
  //  let currentFieldProps: IFieldProps = getFieldPropsByInternalName(FormFieldsStore.actions.getState().Fields, this.props.InternalName);
    // console.log(currentFieldProps);
    //await this.loadFieldAsync(currentFieldProps.Type);
  //}



  private renderAsyncField = (fieldProps: IFieldProps): JSX.Element => {
    if (!this.state.loadedField) {
      return <div>Loading...</div>;
    }
    console.log(fieldProps.onChange);
    return React.createElement(this.state.loadedField, {
      ...fieldProps,
      onChange: fieldProps.onChange,
      key: fieldProps.InternalName,
      saveChangedFieldData: FormFieldsStore.actions.setFieldData
    });
  }

  private registerLoadedField = (field) => {
    this.setState({
      loadedField: field
    });
  }

  private catchLoadedFieldError = (error, type) => {
    console.error(`"${type}" not yet supported, inner msg: ${error}`);
  }

  public render() {
    let ConnectedFormField = FormFieldsStore.connect((state: IFormManagerProps) => getFieldPropsByInternalName(state.Fields, this.props.InternalName))(this.SpecificFormField);
    return <ConnectedFormField />;
  }
  private onChange(evt: IFieldProps, newValue: any) {

    //console.log('FormFields handleChange: ' + newValue);
    //console.log(evt);
    this.props.onChange(evt, newValue);
  }

  private SpecificFormField = (fieldProps: IFieldProps) => {
    let defaultElement = (<BaseFieldRenderer {...fieldProps} key={fieldProps.InternalName} />);
    let onFieldDataChangeCallback = FormFieldsStore.actions.setFieldData;
    if (fieldProps.Type === 'Text') {
      return <FieldTextRenderer
        {...fieldProps}
        onChange={(evt: IFieldProps, newValue: any) => this.onChange(evt,newValue)}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type === 'Note') {
      return <FieldMultilineTextRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type === 'Boolean') {
      return <FieldBooleanRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type === 'Number') {
      return <FieldNumberRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type === 'Currency') {
      return <FieldCurrencyRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type === 'URL') {
      return <FieldUrlRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type === 'DateTime') {
      return <FieldDateTimeRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type.match(/user/gi)) {
      return <FieldUserRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type.match(/choice/gi)) {
      return <FieldChoiceRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type.match(/lookup/gi)) {
      return <FieldLookupRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type.match(/TaxonomyFieldType/gi)) {
      return <FieldTaxonomyRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type.match(/attachments/gi)) {
      return <FieldAttachmentRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    return defaultElement;
  }

}

/*
public render() {
  let ConnectedFormField = FormFieldsStore.connect((state: IFormManagerProps) => getFieldPropsByInternalName(state.Fields, this.props.InternalName))(this.renderAsyncField);
  return <ConnectedFormField />;
}

  private loadFieldAsync = async type => {
    // console.log(`Loading ${type} field...`);
    this.importComponentNameFromTypeString(type);
  }

*/
  // private importComponentNameFromTypeString(type: string) {
  //   if (type === 'Text') {
  //     import(/* webpackChunkName: "FieldTextRenderer" */ './FieldTextRenderer')
  //       .then(module => this.registerLoadedField(module.FieldTextRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type.match(/choice/gi)) {
  //     import(/* webpackChunkName: "FieldChoiceRenderer" */ './FieldChoiceRenderer')
  //       .then(module => this.registerLoadedField(module.FieldChoiceRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type.match(/lookup/gi)) {
  //     import(/* webpackChunkName: "FieldLookupRenderer" */ './FieldLookupRenderer')
  //       .then(module => this.registerLoadedField(module.FieldLookupRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type === 'Note') {
  //     import(/* webpackChunkName: "FieldMultilineTextRenderer" */ './FieldMultilineTextRenderer')
  //       .then(module => this.registerLoadedField(module.FieldMultilineTextRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type === 'Boolean') {
  //     import(/* webpackChunkName: "FieldBooleanRenderer" */ './FieldBooleanRenderer')
  //       .then(module => this.registerLoadedField(module.FieldBooleanRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type === 'Number') {
  //     import(/* webpackChunkName: "FieldNumberRenderer" */ './FieldNumberRenderer')
  //       .then(module => this.registerLoadedField(module.FieldNumberRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type === 'Currency') {
  //     import(/* webpackChunkName: "FieldCurrencyRenderer" */ './FieldCurrencyRenderer')
  //       .then(module => this.registerLoadedField(module.FieldCurrencyRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type === 'URL') {
  //     import(/* webpackChunkName: "FieldUrlRenderer" */ './FieldUrlRenderer')
  //       .then(module => this.registerLoadedField(module.FieldUrlRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type === 'DateTime') {
  //     import(/* webpackChunkName: "FieldDateTimeRenderer" */ './FieldDateTimeRenderer')
  //       .then(module => this.registerLoadedField(module.FieldDateTimeRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type.match(/user/gi)) {
  //     import(/* webpackChunkName: "FieldUserRenderer" */ './FieldUserRenderer')
  //       .then(module => this.registerLoadedField(module.FieldUserRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type.match(/TaxonomyFieldType/gi)) {
  //     import(/* webpackChunkName: "FieldTaxonomyRenderer" */ './FieldTaxonomyRenderer')
  //       .then(module => this.registerLoadedField(module.FieldTaxonomyRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else if (type.match(/attachments/gi)) {
  //     import(/* webpackChunkName: "FieldAttachmentRenderer" */ './FieldAttachmentRenderer')
  //       .then(module => this.registerLoadedField(module.FieldAttachmentRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   } else {
  //     import(/* webpackChunkName: "BaseFieldRenderer" */ './BaseFieldRenderer')
  //       .then(module => this.registerLoadedField(module.BaseFieldRenderer)).catch(e => this.catchLoadedFieldError(e, type));
  //   }
  // }