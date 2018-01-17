var React = require('react');
var PropTypes = require('prop-types');
var NYTConstants = require('../constants/NYTConstants');
var createReactClass = require('create-react-class');
var NYTNewsItem = createReactClass({
    getDefaultProps: function(){
        return { 
            snippet: '',
            source: '',
            multimedia: [],
            pub_date: '',
            figure_size: '',
            first_article_class: ''
        }; 
    },
    imgRender: function(){
        if(this.props.multimedia && this.props.multimedia.length > 0)
            return  <figure className={"article-image " + this.props.figure_size}>
                        <img src={NYTConstants.NYT_RES_DOMAIN + this.props.multimedia[0].url} alt="" />
                    </figure>
    },
    formatPubdate : function(){
        if(this.props.pub_date){
            var date = new Date(this.props.pub_date);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options)
        }
    },
    onShowDetail: function(){
        this.props.parentToggle(this)
    },
    render: function() {
        return ( 
            <a className={"article " + this.props.first_article_class} href="javascript:void(0);" onClick={() => this.onShowDetail()}>
                {this.imgRender()}
                <div className="article-body">
                    <h2 className="article-title">
                        {this.props.title}
                    </h2>
                    <p className="article-content">
                        {this.props.snippet}
                    </p>
                    <footer className="article-info">
                        <span>{this.formatPubdate()}</span>
                        <span>{this.props.source}</span>
                    </footer>
                </div>
            </a>
        );
    }
});
NYTNewsItem.propTypes = {
    snippet: PropTypes.string.isRequired,
    source: PropTypes.string,
    multimedia: PropTypes.array,
    pub_date: PropTypes.string,
    figure_size: PropTypes.string,
    first_article_class: PropTypes.string
};
module.exports = NYTNewsItem;
