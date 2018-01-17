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
    }
  };
  
  module.exports = NYTActions;
  