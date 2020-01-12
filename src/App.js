import React from 'react';
import './App.css';
import {Value, Image, List, useLDflex} from '@solid/react';
import Email from './Email';
import BlogPosts from './BlogPosts';

class App extends React.Component {

    state = {
        profile: 'https://robertoos1105.solid.community/profile/card#me',
        posts: 'https://robertoos1105.solid.community/profile/card#posts',
        renderProfile: false
    };

    constructor() {
        super();
    }

    viewProfile(profile, posts) {
        this.setState({profile: profile, posts: posts, renderProfile: true});
    }


    render() {
        const {profile, posts, renderProfile} = this.state;
        return (
            <div>
                <h1>Profile viewer</h1>
                <p>
                    <label htmlFor="profile">Profile:</label>
                    <input id="profile" value={profile} onChange={e => this.setState(
                        {profile: e.target.value})}/>
                    <button onClick={() => this.viewProfile(profile, posts)}>View</button>
                </p>
                {renderProfile &&
                <div>
                    <p>
                        <Image className="profile-img" src={`[${profile}][foaf:img]`}/>
                        <br/>
                        <label htmlFor="name">Name: </label>
                        <span id="name">
                <Value src={`[${profile}][foaf:name]`}/>
              </span>
                        <br/>
                        <label htmlFor="email">Email: </label>
                        <span id="email">
                <Email src={`[${profile}][foaf:mbox]`}/>
              </span>
                        <br/>
                        <span>
                            <label>Posty:</label>
                        <BlogPosts author={posts}/>
                        </span>
                        <br/>
                        <label htmlFor="friends">Friends: </label>
                    </p>
                    <List src={`[${profile}][foaf:knows]`}>{friend =>
                        <li key={friend}>
                            <Image className="profile-img" src={`[${friend}][foaf:img]`}/>
                            <br/>
                            <label>Name: </label>
                            <button onClick={() => this.viewProfile(friend)}>
                                <Value src={`[${friend}].name`}>{`${friend}`}</Value>
                            </button>
                            <br/>
                            <label>Email: </label>
                            <Email src={`[${friend}][foaf:mbox]`}/>
                        </li>}
                    </List>
                </div>
                }
            </div>
        );
    }
}

export default App;
