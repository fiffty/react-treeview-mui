import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import MuiTreeList from './components/TreeList/muiTreeList'
import TreeList from './components/TreeList'
import {listItems} from './data'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const files = listItems
	.map((listItem, i) => {
		if (!listItem.children) {
			return i
		} else {
			return null
		}
	})
	.filter((listItemIndex) => !!listItemIndex)

class App extends Component {
	constructor(props) {
		super(props)

		const firstFile = files[0]

		const listItemIsEnabled = listItems.map((listItem, i) => {
			if (i >= 12) {
			return false
			} else {
			return true
			}
		})

		this.state = {
			expandedListItems: [],
			activeListItem: firstFile,
			listItemIsEnabled,
			listItems,
			searchTerm: '',
			isUsingMuiTheme: true
		}
		this.collapseAll = this.collapseAll.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleTouchTap = this.handleTouchTap.bind(this)
		this.handleTouchTapInSearchMode = this.handleTouchTapInSearchMode.bind(this)
		this.moveToPrev = this.moveToPrev.bind(this)
		this.moveToNext = this.moveToNext.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	collapseAll() {
		this.setState({expandedListItems: []})
	}

	handleSearch(searchTerm) {
		this.setState({searchTerm})
	}

	handleTouchTap(listItem, index) {
		if (listItem.children) {
			const indexOfListItemInArray = this.state.expandedListItems.indexOf(index)
			if  (indexOfListItemInArray === -1) {
				this.setState({
					expandedListItems: this.state.expandedListItems.concat([index])
				})
			} else {
				let newArray = [].concat(this.state.expandedListItems)
				newArray.splice(indexOfListItemInArray, 1)
				this.setState({
					expandedListItems: newArray
				})
			}
		} else {
			this.setState({
				activeListItem: index
			})
		} 
	}

	handleTouchTapInSearchMode(listItem, index) {
		if (!listItem.children) {
			const expandedListItems = getAllParents(listItem, listItems)

			this.setState({
				activeListItem: index,
				expandedListItems,
				searchTerm: ''
			})
		}
	}

	moveToPrev() {
		const index = files.indexOf(this.state.activeListItem)
		const nextActiveListItem = files[files.indexOf(this.state.activeListItem) - 1]
		if (index !== 0 && !this.state.listItems[nextActiveListItem].disabled) {
			this.setState({
				activeListItem: nextActiveListItem
			})
		}
	}

	moveToNext() {
		const index = files.indexOf(this.state.activeListItem)
		const nextActiveListItem = files[files.indexOf(this.state.activeListItem) + 1]
		if (index !== files.length - 1 && !this.state.listItems[nextActiveListItem].disabled) {
			this.setState({
				activeListItem: nextActiveListItem
			})
		}
	}

	handleChange(e, i, value) {
		this.setState({
			isUsingMuiTheme: value
		})
	}

	componentDidUpdate(prevProps, prevState) {
		const {activeListItem, listItems} = this.state
		if (activeListItem !== prevState.activeListItem) {
			const expandedListItems = getAllParents(listItems[activeListItem], listItems)
			this.setState({
				expandedListItems: expandedListItems
			})
		}
	}

  render() {
    const {listItems, listItemIsEnabled, expandedListItems, activeListItem, searchTerm} = this.state

	const icons = {
		leftIconCollapsed: <i style={{height: 16, width: 16, color: '#CCCCCC'}} className="fa fa-caret-right" />,
		leftIconExpanded: <i style={{height: 16, width: 16, color: '#CCCCCC'}} className="fa fa-caret-down" />
	}

	let treeListJSX
	if (this.state.isUsingMuiTheme) {
		treeListJSX = (
            <MuiTreeList 
              listItems={listItems}
              contentKey={'title'}
              useFolderIcons={true}
              haveSearchbar={true}
              listItemIsEnabled={listItemIsEnabled}
              expandedListItems={expandedListItems}
              activeListItem={activeListItem}
              handleTouchTap={this.handleTouchTap}
              handleTouchTapInSearchMode={this.handleTouchTapInSearchMode}
              handleSearch={this.handleSearch}
              searchTerm={searchTerm}
              >
              <Subheader>Material UI Version</Subheader>
            </MuiTreeList>			
		)
	} else {
		treeListJSX = (
            <TreeList 
              listItems={listItems}
              contentKey={'title'}
              useFolderIcons={true}
              haveSearchbar={true}
              listItemIsEnabled={listItemIsEnabled}
              expandedListItems={expandedListItems}
              activeListItem={activeListItem}
              handleTouchTap={this.handleTouchTap}
              handleTouchTapInSearchMode={this.handleTouchTapInSearchMode}
              handleSearch={this.handleSearch}
              searchTerm={searchTerm}
			  icons={icons}
              >
              <Subheader>Material UI Version</Subheader>
            </TreeList>			
		)		
	}

    return (
      <MuiThemeProvider>
        <div>
          <Drawer
            open={true}
            width={400}>
            {treeListJSX}
          </Drawer>
          <div style={{paddingLeft: 400}}>
            <div style={{width: 600, height: 400, margin: '20px auto'}}>
				<SelectField value={this.state.isUsingMuiTheme} onChange={this.handleChange}>
					<MenuItem value={true} primaryText="Material UI" />
					<MenuItem value={false} primaryText="Custom UI" />
				</SelectField>
              <div style={{marginTop: 20}}>
                <RaisedButton 
                  label="Collapse All"
                  primary={true}
                  style={{marginRight: 10}}
                  onClick={this.collapseAll} />
                <RaisedButton 
                  label="Previous"
                  secondary={true}
                  style={{marginRight: 10}}
                  onClick={this.moveToPrev} />
                <RaisedButton 
                  label="Next"
                  secondary={true}
                  onClick={this.moveToNext} />
              </div>
              <Card
                style={{marginTop: 20}}>
                <CardTitle title={listItems[activeListItem].title} />
                <CardText>
                  {listItems[activeListItem].content}
                </CardText>
              </Card>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

function getAllParents(listItem, listItems, parents=[]) {
	if (listItem.parentIndex) {
		return getAllParents(listItems[listItem.parentIndex], listItems, parents.concat([listItem.parentIndex]))
	} else {
		return parents
	}
}