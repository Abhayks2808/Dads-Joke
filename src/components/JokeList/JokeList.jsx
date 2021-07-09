import React, { Component } from 'react';
import Joke from '../Joke/Joke';
import './JokeList.css';
import axios from "axios";
import { v4 as uuid } from 'uuid';
class JokeList extends Component {
    state = {  
        jokes:JSON.parse(localStorage.getItem("jokes") || "[]"),
        loading:false
    }
    
    async componentDidMount(){
      // Load Jokes
      if(this.state.jokes.length===0){
        this.getJokes();
      }
    }
    async getJokes(){
        let jokes=[];
        while(jokes.length < 10){
          let res=await axios.get("https://icanhazdadjoke.com/",{
              headers:{Accept:"application/json"}
          });
           jokes.push({id:uuid(),text:res.data.joke,votes:0});
           
        }
        this.setState({
            jokes:[...this.state.jokes,...jokes]
        },function(){
            localStorage.setItem("jokes",JSON.stringify(this.state.jokes));
        })
    }
    handleVote = (id,delta) =>{
        const jokes=this.state.jokes.map(function(joke) {
          if(joke.id===id){
              return {...joke,votes:joke.votes+delta}
          }
          return joke;
        })
        this.setState({
            jokes:jokes
        },function() {
            localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
        })
    }
    handleClick=() =>{
        this.setState({loading:true},this.getJokes)
        setTimeout(() => {
            this.setState({loading:false})    
        }, 2000);
        
        
    }
    render() { 
        if(this.state.loading){
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin">
                        <h1 className="JokeList-title">Loading...</h1>
                    </i>
                </div>
            )
        }
        let jokes=this.state.jokes.sort((a,b) => b.votes - a.votes);
        return (  
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dads</span> Jokes</h1>
                    <button className="JokeList-getmore" onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {jokes.map(J =>(
                     <Joke key={J.id} votes={J.votes} text={J.text} upvote={() => this.handleVote(J.id,1)} downvote={() => this.handleVote(J.id,-1)}/>
                    ))}
                </div>
            </div>
        );
    }
}
 
export default JokeList;