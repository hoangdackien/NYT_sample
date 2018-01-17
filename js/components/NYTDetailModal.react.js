var React = require('react');
var PropTypes = require('prop-types');
var NYTConstants = require('../constants/NYTConstants');
var createReactClass = require('create-react-class');
var NYTDetailModal = createReactClass({
    getDefaultProps: function(){
        return { 
            onClose: null,
            show: false,
            children_node: null
        }; 
    },
    show_content: function(obj){
        document.body.className = "stop_scroll";
        return <a className="article" href="javascript:void(0);">
                {this.imgRender(obj)}
                <div className="article-body">
                    <p className="article-content text_left">
                        {obj.snippet}
                    </p>
                    <footer className="article-info">
                        <span>{this.formatPubdate(obj)}</span>
                        <span>{obj.source}</span>
                    </footer>
                </div>
            </a>
    },
    formatPubdate : function(obj){
        if(obj.pub_date){
            var date = new Date(obj.pub_date);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options)
        }
    },
    imgRender: function(obj){
        if(obj.multimedia && obj.multimedia.length > 0)
            return  <figure className={"article-image"}>
                        <img src={NYTConstants.NYT_RES_DOMAIN + obj.multimedia[0].url} alt="" />
                    </figure>
    },
    forceClose: function(e){
        if(e.target.className == "popup")
            this.props.onClose();
    },
    render: function() {
        if(!this.props.show) {
            return null;
        }
        return ( 
            <div className="popup" onClick={(e) => this.forceClose(e)}>
                <div className="popup-inner">
                    {this.show_content(this.props.children_node.props)}
                    <a className="popup-close" href="javascript:void(0);" onClick={this.props.onClose}>x</a>
                </div>
            </div>
        );
    }
});
NYTDetailModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children_node: PropTypes.any
};
module.exports = NYTDetailModal;
