import React from 'react';
import styled, { CSSProp, css } from 'styled-components';
import { fontFamily } from '@web/design/styles/font';
import { Color } from '@web/design/styles/color';

const TEXT_TESTID = 'text';

export enum TextStyle {
  Title1 = 'title1',
  Title2 = 'title2',
  Title3 = 'title3',
  Title4 = 'title4',
  Title5 = 'title5',
  Title6 = 'title6',
  Body = 'body',
}

export enum TextAs {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  Div = 'div',
  P = 'p',
}

export enum TextAlign {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export enum TextWeight {
  Normal = 'normal',
  Bold = 'bold',
}

export interface TextProps {
  styleOf: TextStyle;
  as: TextAs;
  children: React.ReactNode | string;
  margin: string;
  textAlign?: TextAlign;
  color: Color;
  fontWeight: TextWeight;
}

interface TextBaseProps {
  styleOf: TextStyle;
  margin: string;
  textAlign?: TextAlign;
  color: Color;
  fontWeight: TextWeight;
}

const textStyleMapping = {
  [TextStyle.Title1]: {
    fontSize: '64px',
  },
  [TextStyle.Title2]: {
    fontSize: '32px',
  },
  [TextStyle.Title3]: {
    fontSize: '28px',
  },
  [TextStyle.Title4]: {
    fontSize: '24px',
  },
  [TextStyle.Title5]: {
    fontSize: '20px',
  },
  [TextStyle.Title6]: {
    fontSize: '16px',
  },
  [TextStyle.Body]: {
    fontSize: '14px',
  },
};

const applyTextCSSProperties = (props: TextBaseProps): CSSProp => {
  const { styleOf, margin, textAlign, color, fontWeight } = props;
  return css`
    color: ${color};
    ${fontFamily};
    font-size: ${textStyleMapping[styleOf].fontSize};
    margin: ${margin};
    ${textAlign &&
      css`
        text-align: ${textAlign};
      `}
    ${fontWeight === TextWeight.Bold &&
      css`
        font-weight: 700;
      `}
  `;
};

const TextHeading1 = styled('h1')<TextBaseProps>`
  ${(props: TextBaseProps): CSSProp => {
    return applyTextCSSProperties(props);
  }}
`;

const TextHeading2 = styled('h2')<TextBaseProps>`
  ${(props: TextBaseProps): CSSProp => {
    return applyTextCSSProperties(props);
  }}
`;

const TextHeading3 = styled('h3')<TextBaseProps>`
  ${(props: TextBaseProps): CSSProp => {
    return applyTextCSSProperties(props);
  }}
`;

const TextHeading4 = styled('h4')<TextBaseProps>`
  ${(props: TextBaseProps): CSSProp => {
    return applyTextCSSProperties(props);
  }}
`;

const TextHeading5 = styled('h5')<TextBaseProps>`
  ${(props: TextBaseProps): CSSProp => {
    return applyTextCSSProperties(props);
  }}
`;

const TextHeading6 = styled('h6')<TextBaseProps>`
  ${(props: TextBaseProps): CSSProp => {
    return applyTextCSSProperties(props);
  }}
`;

const TextDiv = styled('div')<TextBaseProps>`
  ${(props: TextBaseProps): CSSProp => {
    return applyTextCSSProperties(props);
  }}
`;

const TextParagraph = styled('p')`
  ${(props: TextBaseProps): CSSProp => {
    return applyTextCSSProperties(props);
  }}
`;

const textTagTypeToComponentMap = {
  [TextAs.H1]: TextHeading1,
  [TextAs.H2]: TextHeading2,
  [TextAs.H3]: TextHeading3,
  [TextAs.H4]: TextHeading4,
  [TextAs.H5]: TextHeading5,
  [TextAs.H6]: TextHeading6,
  [TextAs.Div]: TextDiv,
  [TextAs.P]: TextParagraph,
};

const Text = ({
  styleOf,
  as,
  margin,
  textAlign,
  color,
  fontWeight,
  children,
}: TextProps): JSX.Element => {
  const BaseComponent = textTagTypeToComponentMap[as];
  return (
    <BaseComponent
      data-testid="text"
      styleOf={styleOf}
      margin={margin}
      textAlign={textAlign}
      color={color}
      fontWeight={fontWeight}
    >
      {children}
    </BaseComponent>
  );
};

Text.defaultProps = {
  as: TextAs.Div,
  styleOf: TextStyle.Body,
  margin: '0',
  color: Color.Gray900,
  fontWeight: TextWeight.Normal,
};

export { Text, TEXT_TESTID };
