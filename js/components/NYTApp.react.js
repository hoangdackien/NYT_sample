var React = require('react');
var NYTStore = require('../stores/NYTStore');
var NYTHome = require('./NYTHome.react.js');
var createReactClass = require('create-react-class');

function getNewsState() {
    return {
        news: NYTStore.getNews(),
        pageIndex: NYTStore.getPageIndex()
    };
}
var NYTApp = createReactClass({
    getInitialState: function() {
        return getNewsState();
    },
    componentDidMount: function() {
        NYTStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        NYTStore.removeChangeListener(this._onChange);
    },
    render: function() {
        return ( 
            <div>
                <NYTHome news = { this.state.news } pageIndex={this.state.pageIndex}/> 
            </div>
        );
    },
    _onChange: function() {
        this.setState(getNewsState());
    }

});

module.exports = NYTApp;