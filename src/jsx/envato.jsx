import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

import Loader from './loader.jsx'

const envato = React.createClass({
	
	getInitialState() {
		return {
			envatoThemes: [],
			loading: true
		}
	},

	componentDidMount() {
	
	let config = {
	  headers: {
	  	'Authorization': 'Bearer 6sNO28feDIB5Dtk5kYqHmyNvoPZI9o0e',
	  	'Accept': 'application/json'
	  }
	};
	
	let xth = this;
	if (this.state.envatoThemes.length < 10) {
		this.serverRequest = 
		axios.get('https://api.envato.com/v1/discovery/search/search/item?term=wordpress&site=themeforest.net&page=1&sort_by=rating', config)
		.then(function(result) {
			xth.setState({
				envatoThemes: result.data.matches,
				loading: false
			})
		})
	}
	},

  
 	render() {
 		return (
 			<div>
 				
 				<div className="col-md-12 text-center clearfix wp-nav">
<p className="bg-warning"><i>Currently displaying: Popular Themes on Themeforest</i></p>
</div>
		{this.state.loading ? <Loader /> : ""}

          {this.state.envatoThemes.map(function(theme, i) {
            return (
              
				<div key={theme.slug} className="col-sm-6 col-lg-6 col-md-6">
                        <div className="thumbnail">
                            <img src={theme.previews.landscape_preview.landscape_url} alt="" />
                            <div className="caption text-left">
                                <h4><a href={theme.url}>{i + 1}. {theme.name.replace(/-.*/, "")}</a>
                                </h4>
                                <p><strong>Author:</strong> {theme.author_username}</p>
                                <p><a href={theme.previews.live_site.url}>Live Preview</a> | <a href={theme.url}>Download</a></p>
                            </div><hr />
                            <div className="ratings text-left">
                                <p className="pull-right">Number of sales: {theme.number_of_sales}</p>
                                <p>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                    <span className="glyphicon glyphicon-star"></span>
                                </p>
                            </div>
                        </div>
                </div>

            );
          })}
 			</div>
 		);
 	}

 })

export default envato;
