import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import {
  FormGroup,
  HTMLSelect,
  IIconProps,
  Intent,
  IOptionProps
} from '@blueprintjs/core';
/** FieldState */
import { FieldState } from 'formstate';
import { IFieldProps } from './IFieldProps';
import { StyledFormGroup } from './style';

/**
 * Field Props
 */
export interface IBasicSelectFieldProps extends IFieldProps {
  icon?: Partial<IIconProps>;
  options: IOptionProps[];
  minimal?: boolean;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VBasicSelectField extends React.Component<IBasicSelectFieldProps> {
  constructor(props: IBasicSelectFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      size,
      disabled,
      inline,
      icon,
      id,
      placeholder,
      options,
      minimal,
      className,
      layer
    } = this.props;

    return (
      <StyledFormGroup
        disabled={disabled}
        helperText={fieldState.hasError && fieldState.error}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        className={className}
      >
        <label>{label}</label>
        <HTMLSelect
          options={options}
          iconProps={icon}
          name={id}
          large={size === 'large'}
          onChange={this.onChange}
          value={fieldState.value || ''}
          {...{
            disabled,
            placeholder,
            id,
            minimal
          }}
        />
      </StyledFormGroup>
    );
  }
  onChange = (e: any) => {
    this.props.fieldState.onChange(e.target.value);
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };
}
