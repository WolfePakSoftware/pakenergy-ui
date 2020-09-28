import React, { useEffect, useState } from 'react';
import { Intent } from '@blueprintjs/core';
import { ICustomDateTimePicker } from './type/ICustomDateTimePicker';
import { StyledDatePicker } from '../style';
import { FormFieldContainer } from '../FormFieldContainer';
import { IStateCustomDateRange } from './type/IStateCustomDateRange';
import { DateRangeUtils } from './utils/DateRangeUtils';
import { DateRange } from '@blueprintjs/datetime';
import { DateRangeComponents } from './components/DateRangeComponents';
import { Validators } from '../../Validators';
import { Observer } from 'mobx-react';

export const CustomDateTimePicker = (props: ICustomDateTimePicker) => {
  const {
    className,
    disabled,
    inline,
    fieldState,
    id,
    labelInfo,
    layer,
    fill,
    margin,
    noLabel,
    required,
    displayRequired,
    label,
    value,
    tooltip,
    tipLabel,
    dateType,
    onChange,
    format,
    maxTime,
    minTime,
    validators,
    selectedShortcutIndex,
    shortcuts,
    onShortcutChange,
    startTimeProps,
    endTimeProps,
    useAmPm,
    precision,
    dayPickerProps
  } = props;

  const startValueTime = startTimeProps?.value;
  const endValueTime = endTimeProps?.value;

  const [state, setState] = useState<IStateCustomDateRange>(
    DateRangeUtils.initialDate(fieldState, value, startValueTime, endValueTime)
  );

  const {
    startDate,
    startTime,
    endDate,
    endTime
  } = DateRangeUtils.transformState(state);

  useEffect(() => {
    initialState();
  }, []);

  const initialState = () => {
    const hasValidators = !!validators?.length;
    const newValidators: any[] = hasValidators ? validators ?? [] : [];
    if (required) {
      newValidators.push(Validators.requiredDateRange);
    }

    if (fieldState && !!newValidators.length) {
      fieldState.validators(...newValidators);
    }
  };

  const onChangeDate = (selectedDates: DateRange) => {
    const [startDateSelected, endDateSelected] = selectedDates;
    const newState = {
      start: {
        date: startDateSelected,
        time: startTime
      },
      end: {
        date: endDateSelected,
        time: endTime
      }
    };

    setState(newState);
    globalOnChange(newState);
  };

  const onChangeTime = (type: 'START' | 'END') => (value: Date) => {
    const key = type === 'START' ? 'start' : 'end';
    const newState = {
      ...state,
      [`${key}`]: {
        date: type === 'START' ? startDate : endDate,
        time: value
      }
    };

    setState(newState);
    globalOnChange(newState);
  };

  const globalOnChange = (state: IStateCustomDateRange) => {
    const newDates: DateRange = DateRangeUtils.buildRangeDate(state, dateType);

    fieldState?.onChange?.(newDates);
    onChange?.(newDates);
  };

  return (
    <Observer
      render={() => (
        <StyledDatePicker
          className={className}
          disabled={disabled}
          inline={inline}
          intent={fieldState?.hasError ? Intent.DANGER : Intent.NONE}
          labelFor={id}
          labelInfo={labelInfo}
          layer={layer}
          fill={fill}
          margin={margin}
          noLabel={noLabel}
        >
          <FormFieldContainer
            required={required || displayRequired}
            noLabel={noLabel}
            label={label}
            fieldState={fieldState}
            value={value}
            tooltip={tooltip}
          >
            {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
            <DateRangeComponents
              state={state}
              onChangeDate={onChangeDate}
              onChangeTime={onChangeTime}
              dateType={dateType}
              onChange={onChange}
              format={format}
              minTime={minTime}
              maxTime={maxTime}
              shortcuts={shortcuts}
              selectedShortcutIndex={selectedShortcutIndex}
              onShortcutChange={onShortcutChange}
              disabled={disabled}
              startTimeProps={startTimeProps}
              endTimeProps={endTimeProps}
              fieldState={fieldState}
              useAmPm={useAmPm}
              precision={precision}
              dayPickerProps={dayPickerProps}
            />
          </FormFieldContainer>
        </StyledDatePicker>
      )}
    />
  );
};
