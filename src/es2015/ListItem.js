import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {
  render() {
    const { primaryText, style } = this.props;
    const { onTouchTap, leftIcon } = this.props;

    const styles = {
      root: {
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
      },
      primaryText: {
        lineHeight: '32px',
      },
    };

    return (
      <div style={Object.assign({}, styles.root, style)} onClick={onTouchTap}>
        {leftIcon}
        <span style={Object.assign({}, styles.primaryText)}>{primaryText}</span>
      </div>
    );
  }
}

ListItem.propTypes = {
  primaryText: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  onTouchTap: PropTypes.func,
};

export default ListItem;
