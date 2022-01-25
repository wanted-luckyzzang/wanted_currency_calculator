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

  return <ElGrid {...styles}>{children}</ElGrid>;
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
  // border: '1px solid #8e8e8e',
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
  /* ${(props) => (props.border ? `border: ${props.border};` : '')}; */
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')}
`;

export default Grid;
