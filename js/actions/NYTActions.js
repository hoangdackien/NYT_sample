var AppDispatcher = require('../dispatcher/AppDispatcher');
var NYTConstants = require('../constants/NYTConstants');
var NYTActions = {
    receiveNews: function (data) {
      AppDispatcher.handleAction({
        actionType: NYTConstants.NYT_RECEIVE_DATA,
        data: data
      })
    },
    requestNewsWithPageIndex: function (pageIndex) {
      AppDispatcher.handleAction({
        actionType: NYTConstants.NYT_REQUEST_WITH_PAGE_INDEX,
        data: pageIndex
      })
    },
    updatePageIndex: function (pageIndex) {
      AppDispatcher.handleAction({
        actionType: NYTConstants.NYT_UPDATE_PAGEINDEX,
        data: pageIndex
      })
    }
  };
  
  module.exports = NYTActions;
  