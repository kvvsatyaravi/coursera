import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button,
    Modal, ModalHeader, ModalBody,
     Label, Input, Row,Col
     } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Errors,Control,LocalForm,Field } from 'react-redux-form';

import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
 const minLength = (len) => (val) => val && (val.length >= len);


 

class Commentform extends Component{
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        
        this.state = {
            isModalOpen: false
        };
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(){
    return(
        <div>
        <Button type="submit" onClick={this.toggleModal} value="submit comment" color="primary">Submit comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                    <ModalBody>
                    <LocalForm model="feedcomment" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>Rating </Label>
                                <Field model=".rating" id="rating" name="rating">
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </Field>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={3}>author Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="enter your name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="comments" md={2}>Comments</Label>
                                
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                     cols="10" rows="10" 
                                        placeholder="Enter comments"
                                        className="form-control"
                                        
                                         />
                                
                            </Row>
                            <Button type="submit" value="submit" color="info">Submit</Button>        
                        </LocalForm> 
                    </ModalBody>
                </Modal>
            </div>
    )
   };
}

    const Dishdetail =(props) =>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        
        if (props.dish != null) 
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                        postComment={props.postComment} 
                       dishId={props.dish.id} />
                    </div>
                </div>
                </div>
            );
        
    
        else 
            return (
            <div></div>
            );
    }
        
    


    function RenderComments({comments, postComment, dishId}) {
        if (comments == null) {
            return (<div></div>)
        }
        
        return (
            <div className='col-12 col-md-8 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    <Stagger in>{comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}</Stagger>
                    <Commentform dishId={dishId} postComment={postComment} />
                </ul>

            </div>
        )
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-8 m-1'>
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

export default Dishdetail;