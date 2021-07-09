import React, { Component } from 'react';
import './Joke.css'
class Joke extends Component {
    state = {  }

    getColor=() => {
    if(this.props.votes >=15){
            return "#4cAF50";
    }
    else if(this.props.votes>=12){
             return "#8BC34A";
    }
    else if(this.props.votes>=9){
            return "#CDDC39";
    }
    else if(this.props.votes>=6){
        return "#FFEB3B";
     }
    else if(this.props.votes>=3){
        return "#FFC107";
   } 
   else if(this.props.votes>=0){
    return "#F89800";
   }
   else {
    return "red";
    }
  }
   
  getsmiley=() =>{
    if(this.props.votes >=15){
        return "far fa-grin-tears";
}
 else if(this.props.votes>=12){
         return "far fa-kiss-wink-heart";
}
 else if(this.props.votes>=9){
        return "far fa-laugh";
}
 else if(this.props.votes>=6){
    return "far fa-laugh-beam";
 }
 else if(this.props.votes>=3){
    return "far fa-smile";
} 
 else if(this.props.votes>=0){
return "far fa-meh";
}
 else {
return "far fa-tired";
}
  }
    render() { 
        const text=this.props.text;
        const votes=this.props.votes
        const upvote=this.props.upvote;
        const downvote=this.props.downvote;
        return ( 
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" onClick={upvote}></i>
                    <span className="Joke-votes" style={{borderColor:this.getColor()}}>{votes}</span>
                    <i className="fas fa-arrow-down" onClick={downvote}></i>
                </div>
                <div className="Joke-text">
                    {text}
                </div>
                <div className="Joke-smiley">
                <i className={this.getsmiley()}></i>
                </div>
            </div>
         );
    }
}
 
export default Joke;