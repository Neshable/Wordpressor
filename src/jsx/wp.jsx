import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

import Loader from './loader.jsx';


// import { StickyContainer, Sticky } from 'react-sticky';


let Main = React.createClass({
	render() {
		return(

			<div className="container">

				<ul className="nav nav-tabs nav-tabs-cover">
				  <li><Link to="/wp-themes"><span className="glyphicon glyphicon-search"></span>Official WP Themes</Link></li>
				  <li><Link to="/wp-news"><span className="glyphicon glyphicon-envelope"></span>WP News</Link></li>
				  <li><Link to="/wp-envato"><span className="glyphicon glyphicon-search"></span>Envato WP Themes</Link></li>
				</ul>
			{this.props.children} 
			</div>
			
		);
	}
});

let Welcome = React.createClass({
	render() {
		return(
			<WpStats />
		);
	}
});


let WpStats = React.createClass({
	
	getInitialState() {
		return {
			posts: [],
			excerpts: [],
			htmltag: '',
			loading: false
		}
	},

	componentDidMount() {
    var xth = this;
    this.setState({loading: true})
    this.serverRequest = 
      axios.get("https://wordpress.org/news/wp-json/wp/v2/posts")
           .then(function(result) {    
	          	xth.setState({
	            posts: result.data,
	            loading: false
          		});
        	})
 	},

	render() {

		return(
			<div>
				
				{this.state.loading ? <Loader /> : ""}
				
				<p className="lead">WordPress latest news</p>
	                <div className="list-group text-left">
	                  {this.state.posts.map(function(info, i) { 
					return(

						<div key={i} className="list-group-item">
							<p><a href={info.link}><strong>{info.title.rendered}</strong></a></p>
							<p>Published on {info.date.replace(/T.*/, "")}</p>
							<p></p>
						
						</div>
					);
				})}
	            </div>
					<p><i>Loaded from WordPress.org</i></p>	

			</div>


			

			
		);
	}

});

// Get the themes from Wordpress.com

let Wp = React.createClass({
  
  getInitialState() {
    return {
      themes: [],
      featthemes: [],
      newthemes: [],
      defthemes: [],
      popularthemeforest: [],
      loading: false,
      blank: '',
      themeDisplay: 'Popular Themes'
    }
  },
  
  componentDidMount() {
    var xth = this;
    this.setState({loading: true});
    this.serverRequest = 
      axios.get("https://api.wordpress.org/themes/info/1.1/?action=query_themes&request[browse]=popular")
        .then(function(result) {    
          xth.setState({
            themes: result.data.themes,
            defthemes: result.data.themes,
            loading: false
          });
        })
  },

	
  defaltThemes() {
  	let arr = this.state.defthemes;
  	this.setState({
  		themes: arr,
  		themeDisplay: 'Popular Themes'
  	});
  },

  newThemes() {
  	let xth = this;
  	if(this.state.newthemes.length < 10) {
  	this.setState({loading: true});
    this.serverRequest = 
      axios.get("https://api.wordpress.org/themes/info/1.1/?action=query_themes&request[browse]=new")
        .then(function(result) {    
          xth.setState({
            newthemes: result.data.themes,
            themes: result.data.themes,
            loading: '',
            themeDisplay: 'New Themes',
            loading: false
          });
        })
    } else {
    	this.setState({themes: this.state.newthemes});
    }
  },

   featuredThemes() {
    var xth = this;
    if(this.state.featthemes.length < 10) {
    this.setState({loading: true});
    this.serverRequest = 
      axios.get("https://api.wordpress.org/themes/info/1.1/?action=query_themes&request[browse]=featured")
        .then(function(result) {    
          xth.setState({
            featthemes: result.data.themes,
            themes: result.data.themes,
            themeDisplay: 'Featured Themes',
            loading: false
          });
        })
    } else {
    	this.setState({themes: this.state.featthemes});
    }
  },
  
  // componentWillUnmount() {
  //   this.serverRequest.abort();
  // },
 
  render() {
    return (
      <div>
      	  
          <Operation default={this.defaltThemes} featured={this.featuredThemes} 
          				new={this.newThemes} themeDisplay={this.state.themeDisplay}/>

          {this.state.loading ? <Loader /> : ""}

          {this.state.themes.map(function(theme, i) {
            return (
              
				<div key={theme.slug} className="col-sm-4 col-lg-4 col-md-4">
                        <div className="thumbnail">
                            <img src={theme.screenshot_url} alt="" />
                            <div className="caption text-left">
                                <h4 className="pull-right">Free</h4>
                                <h4><a href={theme.homepage}>{i + 1}. {theme.name}</a>
                                </h4>
                                <p><strong>Author:</strong> {theme.author}</p>
                                <p><strong>Version number:</strong> {theme.version}</p>
                                <p><a href={theme.preview_url} target="_blank">Live Preview</a> | <a href={theme.homepage} target="_blank">Download</a></p>
                            </div><hr />
                            <div className="ratings text-left">
                                <p className="pull-right">Rating: {theme.rating}</p>
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
    )
  }
});

let Operation = React.createClass({


	render() {
		return(
			<div className="row">
			<div className="col-md-12 text-center clearfix wp-nav">
	          <div className="btn-group text-center mb-3" role="group" aria-label="Basic example">
	            <button onClick={this.props.featured} type="button" className="btn btn-primary">Featured</button>
	            <button onClick={this.props.default} type="button" className="btn btn-primary">Popular</button>
	            <button onClick={this.props.new} type="button" className="btn btn-primary">New</button>
	          </div>
	          <p className="bg-warning"><i>Currently displaying: Latest {this.props.themeDisplay} on WordPress.org</i></p>
        	</div>

        	</div>
		);
	}

});


export {Wp, WpStats, Main, Welcome};
