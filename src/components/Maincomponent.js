import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import  Contact  from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment,postFeedback, fetchDishes, fetchComments, fetchPromos,fetchLeaders } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { baseUrl } from '../shared/baseUrl';



const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback:(firstnumber, lastnumber, telnum,email,message) =>dispatch(postFeedback(firstnumber,lastnumber,telnum,email,message)),
  fetchDishes: () => { dispatch(fetchDishes())},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  componentDidMount() {
    this.props.fetchDishes();
  }
  

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  onLeader(leaderId){
    this.setState({ leader: leaderId });
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

  }

  

  render() {
    

    const HomePage = () => {
      return(
        <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}/>
      );
    }

    const DishWithId = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
      );
    };

    return (
      <div>
        <Header />
        <div>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={() => <Contact postFeedback={ this.props.postFeedback } />} />
                <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));