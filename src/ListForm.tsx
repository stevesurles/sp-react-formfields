// require('core-js/shim');
import * as React from 'react';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IListFormProps, FormMode, getQueryString } from './interfaces';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { FormHeader } from './FormHeader';
import { FormField } from './fields/FormField';
import { FormFieldsStore } from './store';
import { FormFieldLabel } from './fields/FormFieldLabel';

export class ListForm extends React.Component<IListFormProps, IListFormProps> {
  private localContext: SP.ClientContext;

  public constructor(props) {
    super(props);
    this.localContext = SP.ClientContext.get_current();
    initializeIcons();

    this.state = {
      ...props
    };
  }

  public render() {
    let ListFormStateless = FormFieldsStore.connect(state => {
      let enhancedState = {
        ...state,
        // closeForm: this.closeForm,
        children: this.props.children,
        getButtonsByFormMode: this.getButtonsByFormMode
      };
      return enhancedState;
    })(ListFormInternal);
    return (
      <div className='formContainer'>
        <FormFieldsStore.Provider>
          <ListFormStateless />
        </FormFieldsStore.Provider>
      </div>
    );
  }

  public componentDidMount() {
    FormFieldsStore.actions.initStore(
      this.state.SpWebUrl, this.state.CurrentListId,
      this.state.CurrentMode, this.state.CurrentItemId);
  }

  private getButtonsByFormMode(mode: number) {
    let commandBarItemSave = {
      className: 'ms-bgColor-neutral',
      key: 'save',
      name: 'Save',
      iconProps: {
        iconName: 'Save'
      },
      onClick: (ev: Event) => {
        // debugger;
        ev.preventDefault();
        const isValid = FormFieldsStore.actions.validateForm();
        if (isValid) {
          FormFieldsStore.actions.saveFormData().then(res => {
            if (res.IsSuccessful) {
              // this.setState({ CurrentItemId: res.ItemId });
              FormFieldsStore.actions.setFormMode(FormMode.Display);
            } else {
              // we need to do show save error dialog
              FormFieldsStore.actions.setFormMessage(res.Error ? res.Error.toString() : 'Error has occurred while saving, reload the page and try again', () => {
                // window.location.href = window.location.href;
              });
            }
          });
        } else {
          FormFieldsStore.actions.setShowValidationErrors(true);
        }
      }
    };

    let commandBarItemEdit = {
      className: 'ms-bgColor-neutral',
      key: 'edit',
      name: 'Edit',
      iconProps: {
        iconName: 'Edit'
      },
      onClick: (ev: Event) => {
        ev.preventDefault();
        FormFieldsStore.actions.setFormMode(FormMode.Edit);
      }
    };

    return mode === FormMode.Display ? [commandBarItemEdit] : [commandBarItemSave];
  }
}

export const ListFormInternal = (props) => {
  // console.log(props);
  return <div>
    <FormHeader CurrentMode={props.CurrentMode as number} Fields={props.Fields} />
    {props.IsLoading ?
      <div className='formContainer' style={{ padding: '5em' }}><Spinner title='Loading...' /></div> :
      <React.Fragment>
        <CommandBar key='commandBar'
          items={props.getButtonsByFormMode(props.CurrentMode)}
          farItems={[
            {
              className: 'ms-bgColor-neutral',
              key: 'close',
              name: 'Close',
              iconProps: {
                iconName: 'RemoveFilter'
              },
              onClick: (ev) => {
                ev.preventDefault();
                if (props.closeForm) {
                  props.closeForm();
                } else {
                  // check are we in a classic modal dialog?
                  let isdlg = getQueryString(null, 'isdlg');
                  if (isdlg && isdlg === '1') {
                    try {
                      SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel, null);
                    } catch {
                      console.log('Error trying to call SP.UI.ModalDialog.commonModalDialogClose - trying to set parent window url');
                      window.frames.top.location.href = props.CurrentListDefaultViewUrl;
                    }
                  } else {
                    window.location.href = props.CurrentListDefaultViewUrl;
                  }
                }
              }
            }
          ]}
        />
        {props.children ? props.children : props.Fields.map(f => (
          <div className='formRow' key={`formRow_${f.InternalName}`}>
            <div className='rowLabel' key={`formLabelContainer_${f.InternalName}`}>
              <FormFieldLabel key={`formFieldLabel_${f.InternalName}`} InternalName={f.InternalName} />
            </div>
            <div className='rowField' key={`formFieldContainer_${f.InternalName}`}>
              <FormField key={`formfield_${f.InternalName}`} InternalName={f.InternalName} FormMode={f.CurrentMode} />
              {/* <FormField key={`formfield_${f.InternalName}`} {...f} /> */}
            </div>
          </div>
        ))}
      </React.Fragment>
    }
  </div>;
};
