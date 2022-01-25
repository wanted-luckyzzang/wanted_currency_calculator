import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const {
    isFlex,
    width,
    height,
    bg,
    column,
    justify,
    align,
    margin,
    padding,
    border,
    radius,
    none,
    children,
    onSubmit,
    checkComponent,
  } = props;

  const styles = {
    isFlex,
    width,
    height,
    bg,
    column,
    justify,
    align,
    margin,
    padding,
    border,
    radius,
  };

  return checkComponent === 'one' ? (
    <ElWrapper {...styles} onSubmit={onSubmit}>
      {children}
    </ElWrapper>
  ) : (
    <ElGrid {...styles}>{children}</ElGrid>
  );
};

Grid.defaultProps = {
  isFlex: false,
  width: '100%',
  height: 'auto',
  bg: 'rgba(255, 255, 255, 0.5)',
  column: false,
  justify: '',
  align: '',
  margin: '',
  padding: '',
  radius: '',
};

const ElGrid = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.bg ? `background: ${props.bg};` : '')}
  ${(props) => (props.isFlex ? 'display: flex;' : '')}
  ${(props) => (props.column ? 'flex-direction: column;' : '')}
	${(props) => `justify-content: ${props.justify};`};
  ${(props) => `align-items: ${props.align};`};
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')}
`;

const ElWrapper = styled.form`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.bg ? `background: ${props.bg};` : '')}
  ${(props) => (props.isFlex ? 'display: flex;' : '')}
  ${(props) => (props.column ? 'flex-direction: column;' : '')}
	${(props) => `justify-content: ${props.justify};`};
  ${(props) => `align-items: ${props.align};`};
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')}
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export default Grid;
