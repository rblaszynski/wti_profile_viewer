import React from 'react';
import './App.css';
import {Image, List, Value} from '@solid/react';
import Email from './Email';
import BlogPosts from './BlogPosts';
import {Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

class App extends React.Component {

    state = {
        profile: 'https://robertoos1105.solid.community/profile/card#me',
        renderProfile: false
    };

    constructor() {
        super();
    }

    viewProfile(profile) {
        this.setState({profile: profile, renderProfile: true});
    }


    render() {
        const {profile, renderProfile} = this.state;
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <div>
                            <h1>Profile viewer</h1>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Recipient's username"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={profile} onChange={e => this.setState(
                                    {profile: e.target.value})}
                                />
                                <InputGroup.Append>
                                    <Button onClick={() => this.viewProfile(profile)}
                                            variant="outline-secondary">View</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            {renderProfile && <Card>
                                <Row>
                                    <Col xs={6}>
                                        <Card style={{width: ''}}>
                                            <Card.Body>
                                                <Card.Title className="profile-title">
                                                    <Value src={`[${profile}][foaf:name]`}/>
                                                    <Image className="profile-img" src={`[${profile}][foaf:img]`}/>
                                                </Card.Title>
                                                <Card.Text>
                                                    <Email src={`[${profile}][foaf:mbox]`}/>
                                                </Card.Text>
                                                <Card>
                                                    <Card.Title>
                                                        Posty użytkownika
                                                    </Card.Title>
                                                    <BlogPosts author={profile}/>
                                                </Card>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={6}>
                                        <Card>
                                            <Card.Img variant="top"/>
                                            <Card.Body>
                                                <Card.Title>Friends</Card.Title>
                                                <Card.Text>
                                                    <List src={`[${profile}][foaf:knows]`}>{friend =>
                                                        <Card style={{padding: '10px'}}>
                                                            <Image onClick={() => this.viewProfile(friend.value)}
                                                                   className="profile-img"
                                                                   src={`[${friend}][foaf:img]`}/>
                                                            <Card.Title>
                                                                <button onClick={() => this.viewProfile(friend.value)}>
                                                                    <Value
                                                                        src={`[${friend}].name`}>{`${friend}`}</Value>
                                                                </button>
                                                            </Card.Title>
                                                            <Card.Text>
                                                                <Email src={`[${friend}][foaf:mbox]`}/>
                                                            </Card.Text>
                                                        </Card>
                                                    }
                                                    </List>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <div>
                                </div>
                            </Card>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default App;
