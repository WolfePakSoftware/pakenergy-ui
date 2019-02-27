import { ChromePicker, SketchPicker } from 'react-color';
import styled from 'styled-components';

export interface ITypeInputColor {
  width?: number;
  height?: number;
  defaultColor?: any;
}

export const getBackground = (props: ITypeInputColor) => {
  if (
    props.defaultColor.r >= 0 &&
    props.defaultColor.g >= 0 &&
    props.defaultColor.b >= 0
  ) {
    console.log(props.defaultColor);

    return `rgba(${props.defaultColor.r}, ${props.defaultColor.g}, ${
      props.defaultColor.b
    }, ${props.defaultColor.a})`;
  }

  return props.defaultColor;
};

export const SketchPickerStyled = styled(SketchPicker)`
  box-shadow: none !important;
`;

export const ChromePickerStyled = styled(ChromePicker)`
  box-shadow: none !important;
`;

export const InputColor = styled.button`
  width: ${(props: ITypeInputColor) => (props.width ? props.width : '40px')};
  height: ${(props: ITypeInputColor) => (props.height ? props.height : '40px')};

  background: ${(props: ITypeInputColor) =>
    props.defaultColor ? getBackground(props) : '#A1A3A2'};

  border: none;
  border-radius: 7px;
`;