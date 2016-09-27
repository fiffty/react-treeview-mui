# React Treeview with Material UI

A Treeview React Component that can use [material-ui](https://github.com/callemall/material-ui)'s styling.

* [LIVE DEMO](https://fiffty.github.io/react-treeview-mui/)
* [Example code](https://github.com/fiffty/react-treeview-mui/blob/master/demo/example.js)

![react-treeview-mui Demo Gif](http://minigrande.com/treelist-demo.gif)

## Installation

```
$ npm install --save react-treeview-mui
```

```javascript
import import React, {Component, PropTypes} from 'react'
// With material-ui
// be sure to have <MuiTreeList /> inside <MuiThemeProvider />
import {MuiTreeList} from 'react-treeview-mui'
// Without material-ui styling
import {TreeList} from 'react-treeview-mui'

// UI state (e.g., expanded list items) is tracked locally
const listItems = [...,{title: 'List Item'},...]
class MyComponent extends Component {
	render() {
		<MuiTreeList
			listItems={listItems}
			contentKey={'title'} />
	}
}

// UI state is tracked outside of <MuiTreeList />
// Maybe through Redux
class MySecondComponent extends Component {
	render() {
		<MuiTreeList 
			listItems={listItems}
			contentKey={'title'}
			useFolderIcons={true}
			haveSearchbar={true}
			listItemIsEnabled={this.props.listItemIsEnabled}
			expandedListItems={this.props.expandedListItems}
			activeListItem={this.props.activeListItem}
			handleTouchTap={this.props.handleTouchTap}
			handleTouchTapInSearchMode={this.props.handleTouchTapInSearchMode}
			handleSearch={this.props.handleSearch}
			searchTerm={this.props.searchTerm} />
	}
}
```

## Usage

### Data for nodes

One of the required props for the Component is the data for the list items. Instead of an object data structure with child list items nested inside parent list items, the Component takes in an array of list item objects. To accomodate this structure, the objects have a few required keys as following:

```javascript
const listItems = [
{
    // Each list item is tracked by its index in the master array
    depth: 0, // Used to style the list item. Items with 0 depth will not be rendered and act as the root parent
    children: [1, 3, 10] // Indexes for child list items. If undefined, list item will be treated as leaf
}   
...,
{
    depth: 1,
    children: [12,16],
    parentIndex: 0, // Index of parent list item
    disabled: false // false by default, disables click event listeners for disabled list items
},{
    depth: 2,
    children: [13,14,15],
    parentIndex: 11,
    disabled: false
},
...
]
```
**Why use an Array?**

First off, it's [faster](https://medium.com/@fiffty/things-i-learned-while-trying-to-make-a-fast-treeview-in-react-e3b23cd4ab74#.7pw9t9943). But unless you're rendering hundreds and hundreds of list items, speed wouldn't be your concern.

Apart from that, it comes from personal preference. I found it to be easier to reason about how the Component should react to change in state. Specifically, I found that it aligned well with "the Redux-way" of thinking about state management with reducers. 

### Props

| name | type | default  | description |
| --- | --- | --- | --- |
| listItems | [Object] | **required** | An array of list item objects. |
| contentKey | String | **required** | The name of the key inside list item objects whose value should be used for the content in the rendered list items. |
| style | Object | undefined | JavaScript style object to overwrite preset styles. |
| expandedListItems | [Integer] | undefined | An array of the index values of list items that should be expanded. If no value is given, the expansion of tree nodes will be tracked by state internal to the Component. |
| activeListItem | Integer | undefined | Index value of the active list item. If no value is given, it will be tracked by state internal to the Component. |
| haveSearchbar | Boolean | false | If true, a searchbar component will be added. |
| searchTerm | String | undefined | String value for search term. If no value is given, it will be tracked by state internal to the Component. |
| handleSearch | Function | undefined | The default search function is very rudimentary. Insert a function to override the default behavior. Receives the search term (String) as first parameter. |
| handleTouchTap | Function | undefined | Function that gets called when a If `expandedListItems` and `activeListItem` is tracked outside of the Component, this function must deal with those states as well. Receives the list item (Object) and the index value of that list item (Int) as parameters. |
| handleTouchTapInSearchMode | Function | undefined | Receives the search term (String) as first parameter. |
| listHeight | Integer | undefined | Overwrites the height (in px) of list items |
| useFolderIcons | Boolean | undefined | Only for MuiTreeList. If true, will use folder and file icons for list items. |

### Animation 

The Component uses [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html) to animate the items inside the treeview. It exposes the classes `tree-list-enter` and `tree-list-leave` to style.

**example**
```css
.tree-list-enter {
	animation-name: tree-list-enter;
	animation-duration: 0.3s;
	animation-fill-mode: forwards;
  transform: translateZ(0);
}
.tree-list-leave {
	animation-name: tree-list-leave;
	animation-duration: 0.2s;
	animation-fill-mode: forwards;
}
@keyframes tree-list-enter {
	0% {
		height: 0px;
		opacity: 0.01;
	}
	100% {
		height: 32px;
		opacity: 1;
	}
}
@keyframes tree-list-leave {
	0% {
		height: 32px;
		opacity: 1;
	}
	100% {
		height: 0px;
		opacity: 0.01;
	}
}
```
