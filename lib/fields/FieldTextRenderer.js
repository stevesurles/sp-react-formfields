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
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import { ValidationManager } from '../managers/ValidationManager';
import { FormFieldsStore } from '../store';
var FieldTextRenderer = (function (_super) {
    __extends(FieldTextRenderer, _super);
    function FieldTextRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = __assign({}, _this.state, { currentValue: props.FormFieldValue });
        var max = props.Max ? props.Max : 255;
        FormFieldsStore.actions.addValidatorToField(ValidationManager.defaultValidators.maxLength, props.InternalName, max);
        return _this;
    }
    FieldTextRenderer.prototype.renderNewForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldTextRenderer.prototype.renderEditForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldTextRenderer.prototype.renderDispForm = function () {
        return (React.createElement(Label, null, this.props.FormFieldValue));
    };
    FieldTextRenderer.prototype.handleChange = function (evt, newValue) {
        this.setState({ currentValue: newValue });
        this.trySetChangedValue(newValue);
        console.log('handleChange: ' + newValue);
        this.props.onChange(newValue);
    };
    FieldTextRenderer.prototype.renderNewOrEditForm = function () {
        var _this = this;
        return (React.createElement(TextField, { onChange: function (evt, newValue) { return _this.handleChange.bind(evt, newValue); }, value: this.state.currentValue == null ? '' : this.state.currentValue }));
    };
    return FieldTextRenderer;
}(BaseFieldRenderer));
export { FieldTextRenderer };
//# sourceMappingURL=FieldTextRenderer.js.map