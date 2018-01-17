var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NYTConstants = require('../constants/NYTConstants');
var NYTAPI = require('../utils/NYTAPI');

var _ = require('underscore');

var _news = {}, _pageIndex = 0;
function loadNewsData(data) {
    _news = data;
}
function loadPageIndex(data) {
    _pageIndex = data;
}
function getNewsWithPageIndex(pageIndex){
    NYTAPI.getNewsData(pageIndex);
}
var NYTStore = _.extend({}, EventEmitter.prototype, {
    getNews: function () {
        return _news;
    },
    getPageIndex: function () {
        return _pageIndex;
    },
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});
  
AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case NYTConstants.NYT_RECEIVE_DATA:
            loadNewsData(action.data);
            break;
        case NYTConstants.NYT_REQUEST_WITH_PAGE_INDEX:
            getNewsWithPageIndex(action.data);
            break;
        case NYTConstants.NYT_UPDATE_PAGEINDEX:
            loadPageIndex(action.data);
            break;
        default:
            return true;
    }
    NYTStore.emitChange();
    return true;
});
  
module.exports = NYTStore;