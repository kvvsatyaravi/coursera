
import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button,
    Modal, ModalHeader, ModalBody,
     Label, Input, Row,Col
     } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Errors,Control,LocalForm,Field } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
 const minLength = (len) => (val) => val && (val.length >= len);
 const isNumber = (val) => !isNaN(Number(val));
 const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Comment extends Component{
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
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render(){
    return(
        <div>
        <Button type="submit" onClick={this.toggleModal} value="submit comment" color="primary">Submit comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>Rating </Label>
                                <Field model="user.favoriteColors">
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </Field>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={3}>Your Name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="enter your name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Comments</Label>
                                
                                    <Control.textarea className="form" cols="10" rows="10" model=".email" id="email" name="email"
                                        placeholder="Enter comments"
                                        className="form-control"
                                        
                                         />
                                
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>        
                        </LocalForm> 
                    </ModalBody>
                </Modal>
            </div>
    )
   };
}

    const Dishdetail =(props) =>{
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
                        <RenderComments comments={props.comments} />
                        <Comment />
                    </div>
                </div>
                </div>
            );
        
    
        else 
            return (
            <div></div>
            );
    }
        
    


    function RenderComments({comments}) {
        if (comments == null) {
            return (<div></div>)
        }
    
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-8 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>

            </div>
        )
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-8 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

export default Dishdetail;