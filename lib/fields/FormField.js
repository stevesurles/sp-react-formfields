var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { FormFieldsStore } from '../store';
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
var FormField = (function (_super) {
    __extends(FormField, _super);
    function FormField(props) {
        var _this = _super.call(this, props) || this;
        _this.renderAsyncField = function (fieldProps) {
            if (!_this.state.loadedField) {
                return React.createElement("div", null, "Loading...");
            }
            console.log(fieldProps.onChange);
            return React.createElement(_this.state.loadedField, __assign({}, fieldProps, { onChange: fieldProps.onChange, key: fieldProps.InternalName, saveChangedFieldData: FormFieldsStore.actions.setFieldData }));
        };
        _this.registerLoadedField = function (field) {
            _this.setState({
                loadedField: field
            });
        };
        _this.catchLoadedFieldError = function (error, type) {
            console.error("\"" + type + "\" not yet supported, inner msg: " + error);
        };
        _this.SpecificFormField = function (fieldProps) {
            var defaultElement = (React.createElement(BaseFieldRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName })));
            if (fieldProps.Type === 'Text') {
                return React.createElement(FieldTextRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type === 'Note') {
                return React.createElement(FieldMultilineTextRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type === 'Boolean') {
                return React.createElement(FieldBooleanRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type === 'Number') {
                return React.createElement(FieldNumberRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type === 'Currency') {
                return React.createElement(FieldCurrencyRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type === 'URL') {
                return React.createElement(FieldUrlRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type === 'DateTime') {
                return React.createElement(FieldDateTimeRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type.match(/user/gi)) {
                return React.createElement(FieldUserRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type.match(/choice/gi)) {
                return React.createElement(FieldChoiceRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type.match(/lookup/gi)) {
                return React.createElement(FieldLookupRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type.match(/TaxonomyFieldType/gi)) {
                return React.createElement(FieldTaxonomyRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            if (fieldProps.Type.match(/attachments/gi)) {
                return React.createElement(FieldAttachmentRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, onChange: function (evt, newValue) { return _this.onChange(evt, newValue); } }));
            }
            return defaultElement;
        };
        _this.state = {
            loadedField: null
        };
        return _this;
    }
    FormField.prototype.render = function () {
        var _this = this;
        var ConnectedFormField = FormFieldsStore.connect(function (state) { return getFieldPropsByInternalName(state.Fields, _this.props.InternalName); })(this.SpecificFormField);
        return React.createElement(ConnectedFormField, null);
    };
    FormField.prototype.onChange = function (evt, newValue) {
        this.props.onChange(evt, newValue);
    };
    return FormField;
}(React.Component));
export { FormField };
//# sourceMappingURL=FormField.js.map