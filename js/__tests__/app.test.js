var NYTAPI = require('../utils/NYTAPI');
var NYTConstants = require('../constants/NYTConstants');
var NYTApp = require("../components/NYTApp.react.js");
var NYTHome = require("../components/NYTHome.react.js");
var NYTDetailModal = require("../components/NYTDetailModal.react.js");
var NYTNewsItem = require("../components/NYTNewsItem.react.js");

var fetch = require('node-fetch');
var req_url_nytapi = NYTConstants.NYT_API_SEARCH + NYTConstants.NYT_API_KEY;
var req_url_ggfont = "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700";
import { matchers } from 'jest-json-schema'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

expect.extend(matchers);
Enzyme.configure({ adapter: new Adapter() });
var jsonData = "";

it('check NYT API Alive', async () => {
    const response = await fetch(req_url_nytapi)
    const data = await response.text();
    jsonData = JSON.parse(data);
    expect(jsonData).not.toBe(null);
    expect(jsonData.status).toBe("OK");
});

it('validates NYT JSON schema', () => {
    const schema = {
        properties: {   
            status: { type: 'string' },
            copyright: { type: 'string' },
            response: { 
                doc: {type: 'array'},
                meta: {
                    hits : {type: 'number'},
                    offset : {type: 'number'},
                    time : {type: 'number'},
                } 
            },
        },
        required: ['status', 'copyright', 'response'],
    };
    expect(jsonData).toMatchSchema(schema);
});

it('validates quantity of news per one page (= 10 articles)', () => {
    var num_articles = jsonData.response.docs.length;
    expect(num_articles).not.toBe(null);
    expect(num_articles).toEqual(10);
});


it('validate GGFont API ', async () => {
    const response = await fetch(req_url_ggfont)
    expect(response).not.toBe(null);
});


it('validate components', () => {
    const nyt_app = Enzyme.shallow(<NYTApp />);
    const nyt_home = Enzyme.shallow(
        <NYTHome news={jsonData.response.docs} pageIndex={0} />
    );
    const mockFn = jest.fn();
    const nyt_detail_modal = Enzyme.shallow(<NYTDetailModal onClose={mockFn}/>);
    const nyt_news_item = Enzyme.shallow(<NYTNewsItem />);
    expect(nyt_home.props('news')).not.toBeNull();
    expect(nyt_home.props('news').children.length).toBeGreaterThan(1);
});