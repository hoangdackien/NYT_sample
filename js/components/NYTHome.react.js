var React = require('react');
var NYTActions = require('../actions/NYTActions');
var NYTNewsItem = require('./NYTNewsItem.react.js');
var NYTDetailModal = require('./NYTDetailModal.react.js');
var createReactClass = require('create-react-class');
var NYTHome = createReactClass({
    getInitialState: function() {
        return {
            isDetailOpen: false,
            children_node: null,
            pageIndex: 0
         };
    },
    renderSingleItem : function(index, fsize = "", first_a_c = ""){
        var item = this.props.news[index];
        if(item)
            return <NYTNewsItem key={index} snippet={item.snippet} source={item.source} multimedia={item.multimedia} 
                    pub_date={item.pub_date} figure_size={fsize} first_article_class={first_a_c} 
                    parentToggle={this.toggleModal}/>
    },
    prevPage: function() {
        var prevPageIndex = parseInt(this.state.pageIndex - 1);
        NYTActions.requestNewsWithPageIndex(prevPageIndex);
        if(prevPageIndex <= 0)
            document.getElementById("btnPrev").className = "disabled";
        else
            document.getElementById("btnPrev").className = "";
        this.state.pageIndex = prevPageIndex;
    },
    nextPage: function() {
        var nextPageIndex = parseInt(this.state.pageIndex) + 1;
        NYTActions.requestNewsWithPageIndex(nextPageIndex);
        if(nextPageIndex <= 0)
            document.getElementById("btnPrev").className = "disabled";
        else
            document.getElementById("btnPrev").className = "";
        this.state.pageIndex = nextPageIndex;
    },
    toggleModal: function(that) {
        document.body.className = "";
        this.setState({
            isDetailOpen: !this.state.isDetailOpen,
            children_node: that
        });
    },
    componentDidMount: function() {
        NYTActions.requestNewsWithPageIndex(0);
    },
    render: function () {
      var self = this;
      return (
        <div>
            <main className="main columns">
                <section className="column main-column">
                    {this.renderSingleItem(0, "is-4by3", "first-article")}
                    <div className="columns">
                        <div className="column nested-column">
                            {this.renderSingleItem(1, "is-16by9")}
                            {this.renderSingleItem(5, "is-3by2")}
                            {this.renderSingleItem(6, "is-3by2")}
                        </div>
                        <div className="column">
                            {this.renderSingleItem(2, "is-16by9")}
                            {this.renderSingleItem(3, "is-16by9")}
                        </div>
                    </div>    
                </section>
                <section className="column">
                    {this.renderSingleItem(4, "is-16by9")}
                    {this.renderSingleItem(7, "is-3by2")}
                    {this.renderSingleItem(8, "is-3by2")}
                    {this.renderSingleItem(9, "is-3by2")}
                    {this.renderSingleItem(10, "is-3by2")}
                </section>
            </main>
            <section className="section_pagination">
                <div className="pagination clearfix">
                    <a id="btnPrev" href="javascript:void(0);" className="disabled" onClick={() => self.prevPage()}>Prev</a>
                    <a href="javascript:void(0);" className="pageValue">{this.state.pageIndex+1}</a>
                    <a id="btnNext" href="javascript:void(0);" onClick={() => self.nextPage()}>Next</a>
                </div>
            </section>
            <NYTDetailModal show={this.state.isDetailOpen} onClose={this.toggleModal} children_node={this.state.children_node}/>
        </div>
      );
    }
});

module.exports = NYTHome;