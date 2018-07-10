'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require('react-transition-group');

var _core = require('@material-ui/core');

var _ExpandMore = require('@material-ui/icons/ExpandMore');

var _ExpandMore2 = _interopRequireDefault(_ExpandMore);

var _ExpandLess = require('@material-ui/icons/ExpandLess');

var _ExpandLess2 = _interopRequireDefault(_ExpandLess);

var _Folder = require('@material-ui/icons/Folder');

var _Folder2 = _interopRequireDefault(_Folder);

var _InsertDriveFile = require('@material-ui/icons/InsertDriveFile');

var _InsertDriveFile2 = _interopRequireDefault(_InsertDriveFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeList = function (_React$Component) {
  _inherits(TreeList, _React$Component);

  function TreeList(props) {
    _classCallCheck(this, TreeList);

    var _this = _possibleConstructorReturn(this, (TreeList.__proto__ || Object.getPrototypeOf(TreeList)).call(this, props));

    _this.state = {
      expandedListItems: [],
      activeListItem: null,
      searchTerm: ''
    };
    _this.searchMode = false;
    _this.handleTouchTap = _this.handleTouchTap.bind(_this);
    return _this;
  }

  _createClass(TreeList, [{
    key: 'handleTouchTap',
    value: function handleTouchTap(listItem, index) {
      if (this.searchMode) {
        if (!listItem.children) {
          this.setState({
            activeListItem: index
          });
        }
      } else {
        if (listItem.children) {
          var indexOfListItemInArray = this.state.expandedListItems.indexOf(index);
          if (indexOfListItemInArray === -1) {
            this.setState({
              expandedListItems: this.state.expandedListItems.concat([index])
            });
          } else {
            var newArray = [].concat(this.state.expandedListItems);
            newArray.splice(indexOfListItemInArray, 1);
            this.setState({
              expandedListItems: newArray
            });
          }
        } else {
          this.setState({
            activeListItem: index
          });
        }
      }

      if (this.searchMode && this.props.handleTouchTapInSearchMode) this.props.handleTouchTapInSearchMode(listItem, index);
      if (!this.searchMode && this.props.handleTouchTap) this.props.handleTouchTap(listItem, index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // required props
      var _props = this.props,
          children = _props.children,
          listItems = _props.listItems,
          contentKey = _props.contentKey;
      // optional props

      var style = this.props.style ? this.props.style : {};
      var startingDepth = this.props.startingDepth ? this.props.startingDepth : 1;
      var expandedListItems = this.props.expandedListItems ? this.props.expandedListItems : this.state.expandedListItems;
      var activeListItem = this.props.activeListItem ? this.props.activeListItem : this.state.activeListItem;
      var listHeight = this.props.listHeight ? this.props.listHeight : '48px';
      var _props2 = this.props,
          haveSearchbar = _props2.haveSearchbar,
          handleSearch = _props2.handleSearch;


      var listItemsModified = listItems.map(function (listItem, i, inputArray) {
        listItem._styles = {
          root: {
            paddingLeft: (listItem.depth - startingDepth) * 16,
            backgroundColor: activeListItem === i ? 'rgba(0,0,0,0.2)' : null,
            height: listHeight,
            cursor: listItem.disabled ? 'not-allowed' : 'pointer',
            color: listItem.disabled ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.87)',
            overflow: 'hidden',
            transform: 'translateZ(0)'
          }
        };
        return listItem;
      });
      var searchTerm = this.props.searchTerm ? this.props.searchTerm : this.state.searchTerm;
      if (searchTerm) {
        this.searchMode = true;
        listItemsModified = listItemsModified.map(tagListItemsWithSearchTerm(searchTerm)).map(function (listItem, i, inputArray) {
          listItem._shouldRender = listItem.searchMatched || childIsTaggedWithSearch(listItem, inputArray);
          // highlighting search terms
          if (listItem.highlight) {
            var left = listItem[contentKey].substring(0, listItem.highlight[0]);
            var middle = listItem[contentKey].substring(listItem.highlight[0], listItem.highlight[0] + listItem.highlight[1]);
            var right = listItem[contentKey].substring(listItem.highlight[0] + listItem.highlight[1]);
            listItem._primaryText = _react2.default.createElement(
              'span',
              null,
              left,
              _react2.default.createElement(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    backgroundColor: 'rgba(255,235,59,0.5)',
                    padding: '3px'
                  }
                },
                middle
              ),
              right
            );
          } else {
            listItem._primaryText = listItem[contentKey];
          }
          return listItem;
        });
      } else {
        this.searchMode = false;
        listItemsModified = listItemsModified.map(function (listItem, i) {
          listItem._shouldRender = listItem.depth >= startingDepth && parentsAreExpanded(listItem);
          listItem._primaryText = listItem[contentKey];
          return listItem;
        });
      }
      // JSX: array of listItems
      var listItemsJSX = listItemsModified.map(function (listItem, i) {
        if (listItem._shouldRender) {
          return _react2.default.createElement(
            _core.ListItem,
            {
              key: 'treeListItem-' + i,
              style: listItem._styles.root,
              onClick: function onClick() {
                if (listItem.disabled) return;
                _this2.handleTouchTap(listItem, i);
              },
              button: true
            },
            _react2.default.createElement(
              _core.ListItemIcon,
              null,
              getLeftIcon(listItem, _this2.props.useFolderIcons)
            ),
            _react2.default.createElement(_core.ListItemText, { primary: listItem._primaryText }),
            !listItem.children ? null : expandedListItems.indexOf(i) === -1 ? _react2.default.createElement(_ExpandMore2.default, null) : _react2.default.createElement(_ExpandLess2.default, null)
          );
        } else {
          return null;
        }
      });

      // styles for entire wrapper
      var styles = {
        root: {
          padding: 0,
          paddingBottom: 8,
          paddingTop: children ? 0 : 8
        }
      };
      return _react2.default.createElement(
        'div',
        { style: Object.assign({}, styles.root, style) },
        children,
        haveSearchbar && _react2.default.createElement(
          'form',
          {
            style: { padding: '0px 16px' },
            onSubmit: function onSubmit(e) {
              e.preventDefault();
              if (handleSearch) {
                handleSearch(document.getElementById('searchfield').value);
              } else {
                _this2.setState({ searchTerm: document.getElementById('searchfield').value });
              }
              document.getElementById('searchfield').value = '';
            }
          },
          _react2.default.createElement(_core.TextField, { hintText: 'Search', fullWidth: true, id: 'searchfield' })
        ),
        _react2.default.createElement(
          _core.List,
          null,
          _react2.default.createElement(
            _reactTransitionGroup.CSSTransitionGroup,
            {
              transitionName: 'tree-list',
              transitionEnterTimeout: 300,
              transitionLeaveTimeout: 150
            },
            listItemsJSX
          )
        )
      );

      function getLeftIcon(listItem, useFolderIcons) {
        if (useFolderIcons) {
          if (listItem.children) {
            return _react2.default.createElement(_Folder2.default, null);
          } else {
            return _react2.default.createElement(_InsertDriveFile2.default, null);
          }
        } else {
          return listItem.icon;
        }
      }

      function parentsAreExpanded(listitem) {
        if (listitem.depth > startingDepth) {
          if (expandedListItems.indexOf(listitem.parentIndex) === -1) {
            return false;
          } else {
            var parent = listItems.filter(function (_listItem, index) {
              return index === listitem.parentIndex;
            })[0];
            return parentsAreExpanded(parent);
          }
        } else {
          return true;
        }
      }

      function tagListItemsWithSearchTerm(searchTerm, listItem) {
        var f = function f(listItem) {
          var searchTerms = searchTerm.split(' ');
          var match = false;
          var matchIndex = void 0,
              matchTermLength = void 0;

          if (searchTerms[0] !== '') {
            searchTerms.forEach(function (searchTerm) {
              var content = listItem[contentKey] ? listItem[contentKey] : '';
              matchIndex = content.toLowerCase().indexOf(searchTerm.toLowerCase());
              if (matchIndex !== -1) {
                match = true;
                matchTermLength = searchTerm.length;
              }
            });
          }

          if (match) {
            return Object.assign({}, listItem, {
              searchMatched: true,
              highlight: [matchIndex, matchTermLength]
            });
          } else {
            return listItem;
          }
        };

        if (listItem) {
          return f(listItem);
        } else {
          return f;
        }
      }

      function childIsTaggedWithSearch(listItem, listItems) {
        if (listItem.children) {
          for (var i = 0; i < listItem.children.length; i++) {
            if (listItems[listItem.children[i]].searchMatched) {
              return true;
            }
          }
        }
      }
    }
  }]);

  return TreeList;
}(_react2.default.Component);

TreeList.contextTypes = {
  muiTheme: _propTypes2.default.object
};

TreeList.propTypes = {
  activeListItem: _propTypes2.default.number,
  children: _propTypes2.default.any,
  contentKey: _propTypes2.default.string.isRequired,
  expandedListItems: _propTypes2.default.array,
  handleSearch: _propTypes2.default.func,
  handleTouchTap: _propTypes2.default.func,
  handleTouchTapInSearchMode: _propTypes2.default.func,
  haveSearchbar: _propTypes2.default.bool,
  listHeight: _propTypes2.default.number,
  listItems: _propTypes2.default.array.isRequired,
  searchTerm: _propTypes2.default.string,
  startingDepth: _propTypes2.default.number,
  style: _propTypes2.default.object,
  useFolderIcons: _propTypes2.default.bool
};

exports.default = TreeList;